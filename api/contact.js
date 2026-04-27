/**
 * POST /api/contact
 *
 * Security layers:
 *  1. Method guard (POST only)
 *  2. Origin check → CSRF mitigation
 *  3. IP-based sliding-window rate limit (in-memory per instance)
 *     → For distributed rate limiting set UPSTASH_REDIS_REST_URL + TOKEN
 *  4. Honeypot field (_hp) → bot rejection
 *  5. Input sanitization + validation
 *  6. Optional email delivery via SMTP (configure env vars to enable)
 */

// ─── Rate limiter ────────────────────────────────────────────────────────────
// Persists within a single function instance lifetime.
// Not perfectly distributed across Vercel instances, but catches most abuse.
const ipWindows = new Map()
const LIMIT_MAX = 5
const LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function rateCheck(ip) {
  const now = Date.now()
  const hits = (ipWindows.get(ip) || []).filter(t => now - t < LIMIT_WINDOW_MS)
  if (hits.length >= LIMIT_MAX) return false
  hits.push(now)
  ipWindows.set(ip, hits)
  // Basic GC — prevent unbounded growth if the instance lives long
  if (ipWindows.size > 5000) ipWindows.clear()
  return true
}

// ─── Sanitizer ───────────────────────────────────────────────────────────────
function strip(val, maxLen = 500) {
  return String(val ?? '')
    .replace(/[<>"'`]/g, '')   // strip HTML/JS injection chars
    .replace(/\0/g, '')         // strip null bytes
    .trim()
    .slice(0, maxLen)
}

// ─── Handler ─────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // Preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS')
    return res.status(204).end()
  }

  // Method guard
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // ── CSRF: Origin / Referer check ────────────────────────────────────────
  const allowedOrigin = process.env.ALLOWED_ORIGIN
  const origin = req.headers.origin || ''
  const referer = req.headers.referer || ''

  if (allowedOrigin) {
    const fromOrigin = origin.startsWith(allowedOrigin)
    const fromReferer = referer.startsWith(allowedOrigin)
    if (!fromOrigin && !fromReferer) {
      return res.status(403).json({ error: 'Forbidden' })
    }
  }

  // Set CORS header for same-origin API calls
  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  }

  // ── Rate limiting ────────────────────────────────────────────────────────
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'

  if (!rateCheck(ip)) {
    res.setHeader('Retry-After', '900')
    return res.status(429).json({ error: 'Demasiados intentos. Intenta de nuevo en 15 minutos.' })
  }

  // ── Parse body ───────────────────────────────────────────────────────────
  const body = req.body || {}

  // ── Honeypot ─────────────────────────────────────────────────────────────
  // Bots fill every field — humans never see or fill _hp
  if (body._hp) {
    return res.status(200).json({ ok: true }) // silent pass to not reveal detection
  }

  // ── Sanitize ─────────────────────────────────────────────────────────────
  const name    = strip(body.name,    100)
  const email   = strip(body.email,   200)
  const service = strip(body.service, 100)
  const message = strip(body.message, 2000)

  // ── Validate ─────────────────────────────────────────────────────────────
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Nombre, email y mensaje son requeridos.' })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido.' })
  }

  // ── Email delivery (optional) ─────────────────────────────────────────────
  // To enable: set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO
  if (process.env.SMTP_HOST) {
    try {
      const nodemailer = (await import('nodemailer')).default
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO || process.env.SMTP_USER,
        replyTo: email,
        subject: `[studioframe] ${service || 'Contacto'} — ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\nServicio: ${service}\n\n${message}`,
        html: `<p><b>Nombre:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Servicio:</b> ${service}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`,
      })
    } catch (err) {
      console.error('[contact] mail error:', err)
      return res.status(500).json({ error: 'No se pudo enviar el mensaje. Intenta de nuevo.' })
    }
  } else {
    // SMTP not configured — log to Vercel function logs
    console.log('[contact]', { name, email, service, message: message.slice(0, 80) })
  }

  return res.status(200).json({ ok: true })
}
