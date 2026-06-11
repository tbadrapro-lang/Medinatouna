import { NextRequest, NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HTML_RE = /<[^>]*>/

const RATE_LIMIT_WINDOW = 60 * 1000
const RATE_LIMIT_MAX = 5
const rateLimitMap = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW)
  timestamps.push(now)
  rateLimitMap.set(ip, timestamps)
  return timestamps.length > RATE_LIMIT_MAX
}

const SUBJECTS: Record<string, string> = {
  institut: 'Votre demande — Institut Medinatouna',
  camp_bedouin: 'Votre demande — Camp Bédouin',
  ebook: 'Votre commande — E-book Medinatouna',
  lead_magnet: 'Votre bon plan Medinatouna',
}

const INTROS: Record<string, string> = {
  institut: "Nous avons bien reçu votre demande concernant l'institut de langue arabe à Médine. Notre équipe revient vers vous sous 24h sur WhatsApp pour finaliser votre inscription.",
  camp_bedouin: "Nous avons bien reçu votre demande de réservation pour le camp bédouin. Notre équipe revient vers vous sous 24h sur WhatsApp pour confirmer votre place.",
  ebook: "Merci pour votre commande ! Votre e-book vous sera transmis très prochainement.",
  lead_magnet: "Merci pour votre inscription. Votre bon plan exclusif arrive dans votre boîte mail.",
}

function buildHtml(service: string, nom: string, formule?: string, message?: string) {
  const intro = INTROS[service] || "Nous avons bien reçu votre message."
  return `
  <div style="background:#07110c;padding:40px 20px;font-family:Georgia,'Times New Roman',serif;color:#f4efe4;">
    <div style="max-width:560px;margin:0 auto;background:#0c1d14;border:1px solid rgba(196,154,60,0.25);padding:32px;">
      <div style="width:48px;height:2px;background:#c49a3c;margin-bottom:24px;"></div>
      <h1 style="color:#e0b85a;font-size:24px;margin:0 0 16px;">Medinatouna</h1>
      <p style="font-size:16px;line-height:1.6;">Bonjour ${nom || ''},</p>
      <p style="font-size:16px;line-height:1.6;">${intro}</p>
      ${formule ? `<p style="font-size:14px;color:#c49a3c;margin-top:16px;">Formule : ${formule}</p>` : ''}
      ${message ? `<p style="font-size:13px;color:rgba(244,239,228,0.7);white-space:pre-wrap;border-top:1px solid rgba(196,154,60,0.15);padding-top:12px;margin-top:16px;">${message}</p>` : ''}
      <div style="width:48px;height:2px;background:#c49a3c;margin-top:32px;"></div>
      <p style="font-size:12px;color:rgba(244,239,228,0.5);margin-top:16px;">Medinatouna — Médine, Arabie Saoudite</p>
    </div>
  </div>`
}

export async function POST(req: NextRequest) {
  try {
    const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim()
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Trop de requêtes, réessayez plus tard.' }, { status: 429 })
    }

    const body = await req.json()
    const { nom, email, service, formule, message, website } = body || {}

    // Honeypot
    if (typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json({ ok: true })
    }

    if (!email) {
      return NextResponse.json({ error: 'email requis' }, { status: 400 })
    }

    if (!EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: 'email invalide' }, { status: 400 })
    }

    if (typeof nom === 'string' && nom.length > 100) {
      return NextResponse.json({ error: 'nom trop long' }, { status: 400 })
    }

    if (typeof message === 'string' && message.length > 1000) {
      return NextResponse.json({ error: 'message trop long' }, { status: 400 })
    }

    for (const field of [nom, email, message, formule]) {
      if (typeof field === 'string' && HTML_RE.test(field)) {
        return NextResponse.json({ error: 'contenu invalide' }, { status: 400 })
      }
    }

    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) {
      return NextResponse.json({ ok: true })
    }

    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'contact@medinatouna.com'

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: 'Medinatouna' },
        to: [{ email }],
        subject: SUBJECTS[service] || 'Votre demande — Medinatouna',
        htmlContent: buildHtml(service, nom, formule, message),
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
