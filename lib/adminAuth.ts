export const ADMIN_COOKIE = 'admin_session'
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 jours

async function hmac(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function createAdminToken(): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD || ''
  const timestamp = Date.now().toString()
  const signature = await hmac(timestamp, secret)
  return `${timestamp}.${signature}`
}

export async function verifyAdminToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const secret = process.env.ADMIN_PASSWORD || ''
  if (!secret) return false

  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [timestamp, signature] = parts

  const expected = await hmac(timestamp, secret)
  if (expected !== signature) return false

  const ts = parseInt(timestamp, 10)
  if (Number.isNaN(ts)) return false
  if (Date.now() - ts > SESSION_DURATION) return false

  return true
}
