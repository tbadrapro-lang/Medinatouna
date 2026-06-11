import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, createAdminToken } from '@/lib/adminAuth'

export async function POST(req: NextRequest) {
  let password = ''
  try {
    const body = await req.json()
    password = String(body.password || '')
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }

  const adminPassword = process.env.ADMIN_PASSWORD || ''

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const token = await createAdminToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  })
  return res
}
