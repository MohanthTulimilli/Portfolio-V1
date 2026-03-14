import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || 'Mohanth <onboarding@resend.dev>';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }
  const { email, name } = body || {};
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ error: 'Email service not configured' });
  }

  const displayName = (name && String(name).trim()) || 'there';

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [email.trim()],
      subject: "Thanks for reaching out – Mohanth",
      html: `
        <p>Hi ${displayName},</p>
        <p>Thank you for sending a message. I've received it and will get back to you as soon as I can.</p>
        <p>Best,<br/>Mohanth</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Send thank-you email error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
