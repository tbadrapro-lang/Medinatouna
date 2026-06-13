import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const MAX_RECIPIENTS = 50
const COOLDOWN_HOURS = 72

const SERVICE_LABELS: Record<string, string> = {
  institut: "l'institut de langue arabe",
  camp_bedouin: 'le camp bédouin',
  ebook_medine: "l'e-book Bons Plans à Médine",
  ebook_mecque: "l'e-book Bons Plans à la Mecque",
  ebook_pack: 'le pack e-books',
  lead_magnet: 'notre guide gratuit',
  waitlist_ebook_mecque: "l'e-book Mecque",
  waitlist_pack: 'le pack complet',
}

function buildHtml(nom: string, message: string) {
  return `
  <div style="background:#07110c;padding:40px 20px;font-family:Georgia,'Times New Roman',serif;color:#f4efe4;">
    <div style="max-width:560px;margin:0 auto;background:#0c1d14;border:1px solid rgba(196,154,60,0.25);padding:32px;">
      <div style="width:48px;height:2px;background:#c49a3c;margin-bottom:24px;"></div>
      <h1 style="color:#e0b85a;font-size:24px;margin:0 0 16px;">Les Bons Plans d'Arabie</h1>
      <p style="font-size:16px;line-height:1.6;">Bonjour ${nom || ''},</p>
      <p style="font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</p>
      <div style="width:48px;height:2px;background:#c49a3c;margin-top:32px;"></div>
      <p style="font-size:12px;color:rgba(244,239,228,0.5);margin-top:16px;">Les Bons Plans d'Arabie — Médine, Arabie Saoudite</p>
    </div>
  </div>`
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { leadIds, message, subject, relanceType } = body as { leadIds: string[]; message: string; subject: string; relanceType?: string }

  if (!Array.isArray(leadIds) || leadIds.length === 0) {
    return NextResponse.json({ error: 'Aucun destinataire sélectionné' }, { status: 400 })
  }

  if (leadIds.length > MAX_RECIPIENTS) {
    return NextResponse.json({ error: `Maximum ${MAX_RECIPIENTS} envois par requête` }, { status: 400 })
  }

  if (!message) {
    return NextResponse.json({ error: 'Message requis' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'contact@lesbonsplansdarabie.com'
  const senderName = process.env.BREVO_SENDER_NAME || "Les Bons Plans d'Arabie"

  const { data: leads, error } = await supabaseAdmin.from('leads').select('*').in('id', leadIds)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const cooldownDate = new Date(Date.now() - COOLDOWN_HOURS * 60 * 60 * 1000)

  let sent = 0
  let skipped = 0
  const errors: string[] = []

  for (const lead of leads || []) {
    if (lead.last_email_sent && new Date(lead.last_email_sent) > cooldownDate) {
      skipped++
      continue
    }

    const personalized = message
      .replace(/\{nom\}/g, lead.nom || '')
      .replace(/\{service\}/g, SERVICE_LABELS[lead.service] || lead.service || '')

    if (!apiKey) {
      skipped++
      continue
    }

    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          sender: { email: senderEmail, name: senderName },
          to: [{ email: lead.email }],
          subject: subject || "Les Bons Plans d'Arabie",
          htmlContent: buildHtml(lead.nom, personalized),
        }),
      })

      if (res.ok) {
        sent++
        await supabaseAdmin.from('leads').update({
          last_email_sent: new Date().toISOString(),
          relance_count: (lead.relance_count || 0) + 1,
          last_relance_type: relanceType || null,
        }).eq('id', lead.id)
      } else {
        errors.push(lead.email)
      }
    } catch {
      errors.push(lead.email)
    }
  }

  return NextResponse.json({ ok: true, sent, skipped, errors })
}
