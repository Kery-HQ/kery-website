export const prerender = false;

import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';

const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  let email: string;

  try {
    const body = await request.json();
    email = (body?.email ?? '').trim().toLowerCase();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: 'A valid email address is required.' }, 400);
  }

  const alreadyJoined = await redis.sismember('waitlist', email);
  if (alreadyJoined) {
    return json({ ok: true, alreadyJoined: true });
  }

  await redis.sadd('waitlist', email);

  try {
    await resend.emails.send({
      from: 'Kery <waitlist@kery.dev>',
      to: email,
      subject: "You're on the Kery Cloud waitlist",
      html: confirmationEmail(email),
    });
  } catch {
    // email failure is non-fatal — the signup is already recorded
  }

  return json({ ok: true });
};

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function confirmationEmail(email: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f1210; color: #e8ece9; padding: 48px 24px; max-width: 520px; margin: 0 auto;">
  <img src="https://kery.dev/kery.png" width="40" height="40" alt="Kery" style="margin-bottom: 24px;" />
  <h1 style="font-size: 1.5rem; font-weight: 600; margin: 0 0 12px;">You're on the list.</h1>
  <p style="color: #b8c0bb; line-height: 1.6; margin: 0 0 24px;">
    We'll reach out to <strong style="color: #e8ece9;">${email}</strong> when Kery Cloud is ready — CI/CD with GitHub &amp; Vercel, scheduled runs, Linear &amp; Slack integrations, regression detection, and more.
  </p>
  <p style="color: #6b756f; font-size: 0.85rem; margin: 0;">
    — The Kery team
  </p>
</body>
</html>`;
}
