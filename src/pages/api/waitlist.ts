export const prerender = false;

import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';
import nodemailer from 'nodemailer';

const redis = new Redis({
  url: import.meta.env.KV_REST_API_URL,
  token: import.meta.env.KV_REST_API_TOKEN,
});

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'keval@kery.dev',
    clientId: import.meta.env.GMAIL_CLIENT_ID,
    clientSecret: import.meta.env.GMAIL_CLIENT_SECRET,
    refreshToken: import.meta.env.GMAIL_REFRESH_TOKEN,
  },
});

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
    await transport.sendMail({
      from: 'Keval Shah <keval@kery.dev>',
      to: email,
      subject: "You're on the list",
      text: confirmationEmail(email),
    });
  } catch {
    // non-fatal — signup is recorded regardless
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
  return `Hey, you're on the list!

I'm Keval, I'm building Kery. Really glad you signed up. I'll reach out personally when the hosted version is ready for early access.

In the meantime if you want to follow along, ask questions, or just say hi, we have a Discord: https://discord.gg/A3sCcxCMyq

And feel free to reply to this email too, I read everything.

Keval`;
}
