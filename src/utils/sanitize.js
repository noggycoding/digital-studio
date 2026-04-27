/**
 * Client-side input sanitization.
 * Strips characters that could be used for XSS before sending to the server.
 * The server (api/contact.js) also sanitizes independently — never trust client alone.
 */
export function sanitize(value, maxLen = 500) {
  return String(value ?? '')
    .replace(/[<>"'`]/g, '')
    .replace(/\0/g, '')
    .trim()
    .slice(0, maxLen)
}

/**
 * Lightweight email format check (server validates more strictly).
 */
export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())
}

/**
 * Client-side submission throttle using localStorage.
 * Returns true if the submission is allowed.
 * Minimum 60 seconds between form submissions per browser.
 */
export function checkSubmitThrottle(key = '__sf_last_submit') {
  try {
    const last = parseInt(localStorage.getItem(key) || '0', 10)
    if (Date.now() - last < 60_000) return false
    localStorage.setItem(key, String(Date.now()))
    return true
  } catch {
    return true // localStorage blocked (private mode, etc.) — allow submission
  }
}
