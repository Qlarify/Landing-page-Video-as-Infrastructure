// Vercel serverless function: receives lead form submissions,
// sends a notification email via Resend.
//
// Required env vars (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY     — from https://resend.com/api-keys
//   LEAD_TO_EMAIL      — recipient (e.g. info@qlarify.health)
//   LEAD_FROM_EMAIL    — verified sender on a verified Resend domain
//                        (e.g. leads@qlarify.health). For initial testing
//                        before domain verification, use "onboarding@resend.dev"
//                        — but Resend will only deliver to the email on file.

const RESEND_API = 'https://api.resend.com/emails';

const ATTRIBUTION_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'gclid', 'fbclid', 'referrer', 'landing_page'
];

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body && typeof req.body === 'object' ? req.body : {};

  // Honeypot — bots fill hidden fields; humans don't
  if (data.website) return res.status(200).json({ ok: true });

  const required = ['name', 'email', 'hospital', 'phone', 'role'];
  const missing = required.filter(k => !data[k] || !String(data[k]).trim());
  if (missing.length) {
    return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to     = process.env.LEAD_TO_EMAIL;
  const from   = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error('Lead API misconfigured: missing env vars', {
      hasKey: !!apiKey, hasTo: !!to, hasFrom: !!from
    });
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const attributionRows = ATTRIBUTION_KEYS
    .filter(k => data[k])
    .map(k => `<tr><td style="padding:6px 12px"><b>${escapeHtml(k)}</b></td><td style="padding:6px 12px">${escapeHtml(data[k])}</td></tr>`)
    .join('');

  const subject = `New audit request — ${data.hospital} (${data.role})`;

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:600px">
      <h2 style="color:#163460;margin-bottom:8px">${escapeHtml(subject)}</h2>
      <p style="color:#666;margin-top:0">Submitted via <b>${escapeHtml(data.form_source || 'lead form')}</b> on video.qlarify.health</p>
      <table style="border-collapse:collapse;border:1px solid #e5e7eb;margin-top:12px">
        <tr><td style="padding:6px 12px;background:#f9fafb"><b>Name</b></td><td style="padding:6px 12px">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f9fafb"><b>Hospital</b></td><td style="padding:6px 12px">${escapeHtml(data.hospital)}</td></tr>
        <tr><td style="padding:6px 12px;background:#f9fafb"><b>Email</b></td><td style="padding:6px 12px"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding:6px 12px;background:#f9fafb"><b>Phone</b></td><td style="padding:6px 12px"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td></tr>
        <tr><td style="padding:6px 12px;background:#f9fafb"><b>Role</b></td><td style="padding:6px 12px">${escapeHtml(data.role)}</td></tr>
        ${attributionRows ? `<tr><td colspan="2" style="padding:12px;background:#f9fafb"><b>Attribution</b></td></tr>${attributionRows}` : ''}
      </table>
    </div>
  `;

  try {
    const resendRes = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject,
        html
      })
    });

    if (!resendRes.ok) {
      const body = await resendRes.text();
      console.error('Resend rejected the send', { status: resendRes.status, body });
      return res.status(502).json({ error: 'Email delivery failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Lead handler exception', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
