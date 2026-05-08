export const prerender = false;

import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';

const redis = new Redis({
  url: import.meta.env.KV_REST_API_URL,
  token: import.meta.env.KV_REST_API_TOKEN,
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
      from: 'Keval Shah <keval@kery.dev>',
      to: email,
      subject: "You're on the list",
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

function confirmationEmail(_email: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #ffffff; color: #111111; padding: 48px 24px; max-width: 480px; margin: 0 auto;">
  <p style="margin: 0 0 20px 0; font-size: 0.95rem; line-height: 1.7; color: #111;">Hey — got your signup, you're on the list.</p>
  <p style="margin: 0 0 16px 0; font-size: 0.95rem; line-height: 1.7; color: #444;">
    I'm Keval, building Kery. The hosted version is what I'm most excited about — no infra to manage, CI/CD that runs your tests on every GitHub push or Vercel deploy, scheduled monitoring, Linear &amp; Slack integrations, and regression detection that actually catches things before users do.
  </p>
  <p style="margin: 0 0 16px 0; font-size: 0.95rem; line-height: 1.7; color: #444;">
    Still early, but I'll reach out personally when it's ready for you.
  </p>
  <p style="margin: 0 0 32px 0; font-size: 0.95rem; line-height: 1.7; color: #444;">
    In the meantime, come hang in our Discord — happy to answer questions, hear what you're building, or just chat. <a href="https://discord.gg/A3sCcxCMyq" style="color: #5865F2; text-decoration: none;">Join here →</a>
  </p>
  <p style="margin: 0; font-size: 0.95rem; color: #111;">
    Keval<br />
    <span style="color: #888; font-size: 0.85rem;">kery.dev</span>
  </p>
</body>
</html>`;
}
