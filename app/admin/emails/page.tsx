'use client'

import { useEffect, useState } from 'react'

type Lead = {
  id: string
  nom: string
  email: string
  service: string
  status?: string
  last_email_sent?: string
}

const SERVICE_LABELS: Record<string, string> = {
  institut: 'Institut',
  camp_bedouin: 'Camp bédouin',
  ebook_medine: 'E-book Médine',
  ebook_mecque: 'E-book Mecque',
  ebook_pack: 'Pack e-books',
  lead_magnet: 'Guide gratuit',
  waitlist_ebook_mecque: "Liste d'attente Mecque",
  waitlist_pack: "Liste d'attente Pack",
}

const STATUS_LABELS: Record<string, string> = {
  nouveau: 'Nouveau',
  contacte: 'Contacté',
  converti: 'Converti',
  perdu: 'Perdu',
}

const TEMPLATES = [
  {
    id: 'relance_douce',
    label: 'Relance douce',
    subject: "Toujours intéressé(e) ?",
    text: "As-salamu alaykum {nom}, vous avez manifesté de l'intérêt pour {service}. Les places de la prochaine session se remplissent — souhaitez-vous qu'on en discute sur WhatsApp ?",
  },
  {
    id: 'dernieres_places',
    label: 'Dernières places',
    subject: "Dernières places disponibles",
    text: "As-salamu alaykum {nom}, nous tenions à vous prévenir : il ne reste que quelques places pour {service} (24 places par session). N'hésitez pas à nous contacter rapidement pour réserver la vôtre.",
  },
  {
    id: 'nouveaute',
    label: 'Nouveauté',
    subject: "Une nouveauté chez Les Bons Plans d'Arabie",
    text: "As-salamu alaykum {nom}, nous avons une nouveauté à vous annoncer concernant {service}. Restez connecté(e), plus d'informations arrivent très bientôt !",
  },
]

const COOLDOWN_MS = 72 * 60 * 60 * 1000

export default function AdminEmailsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [service, setService] = useState('tous')
  const [statut, setStatut] = useState('nouveau')
  const [templateId, setTemplateId] = useState(TEMPLATES[0].id)
  const [texts, setTexts] = useState<Record<string, string>>(
    Object.fromEntries(TEMPLATES.map((t) => [t.id, t.text]))
  )
  const [subjects, setSubjects] = useState<Record<string, string>>(
    Object.fromEntries(TEMPLATES.map((t) => [t.id, t.subject]))
  )
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ sent: number; skipped: number } | null>(null)

  useEffect(() => {
    const params = new URLSearchParams()
    if (service !== 'tous') params.set('service', service)
    if (statut !== 'tous') params.set('statut', statut)

    setLoading(true)
    fetch(`/api/admin/leads?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setLeads(data.leads || []))
      .finally(() => setLoading(false))
  }, [service, statut])

  const now = Date.now()
  const eligible = leads.filter((l) => !l.last_email_sent || now - new Date(l.last_email_sent).getTime() > COOLDOWN_MS)
  const onCooldown = leads.length - eligible.length

  const previewText = texts[templateId]
    .replace(/\{nom\}/g, eligible[0]?.nom || 'Prénom')
    .replace(/\{service\}/g, SERVICE_LABELS[eligible[0]?.service] || 'notre offre')

  async function send() {
    if (eligible.length === 0) return
    if (!confirm(`Envoyer cet email à ${eligible.length} personne(s) ?`)) return

    setSending(true)
    setResult(null)

    const res = await fetch('/api/admin/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadIds: eligible.slice(0, 50).map((l) => l.id),
        message: texts[templateId],
        subject: subjects[templateId],
      }),
    })

    const data = await res.json()
    setSending(false)
    if (res.ok) {
      setResult({ sent: data.sent, skipped: data.skipped })
    }
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-2">Relances email</h2>
      <p className="text-sm text-[#f4efe4]/60 mb-5">
        Choisissez un modèle, sélectionnez vos destinataires, prévisualisez puis envoyez. Une personne ne reçoit pas
        plus d&apos;un email tous les 3 jours.
      </p>

      {/* Templates */}
      <div className="grid gap-3 mb-6">
        {TEMPLATES.map((t) => (
          <div
            key={t.id}
            className={`rounded-xl border p-4 cursor-pointer transition-colors ${
              templateId === t.id ? 'border-gold/40' : 'border-white/10'
            }`}
            style={{ background: 'rgba(18, 48, 30, 0.4)' }}
            onClick={() => setTemplateId(t.id)}
          >
            <div className="flex items-center gap-2 mb-2">
              <input type="radio" checked={templateId === t.id} onChange={() => setTemplateId(t.id)} />
              <p className="font-semibold">{t.label}</p>
            </div>
            <input
              className="form-input w-full mb-2 text-sm"
              value={subjects[t.id]}
              onChange={(e) => setSubjects({ ...subjects, [t.id]: e.target.value })}
              placeholder="Objet de l'email"
            />
            <textarea
              className="form-input w-full text-sm resize-none"
              rows={3}
              value={texts[t.id]}
              onChange={(e) => setTexts({ ...texts, [t.id]: e.target.value })}
            />
          </div>
        ))}
      </div>

      {/* Recipients */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select value={service} onChange={(e) => setService(e.target.value)} className="form-input w-auto text-sm">
          <option value="tous">Tous les services</option>
          <option value="institut">Institut</option>
          <option value="camp_bedouin">Camp bédouin</option>
          <option value="ebook_medine">E-book Médine</option>
          <option value="ebook_mecque">E-book Mecque</option>
          <option value="ebook_pack">Pack e-books</option>
          <option value="lead_magnet">Guide gratuit</option>
        </select>
        <select value={statut} onChange={(e) => setStatut(e.target.value)} className="form-input w-auto text-sm">
          <option value="tous">Tous les statuts</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-[#f4efe4]/60">Chargement...</p>
      ) : (
        <>
          <p className="text-sm text-[#f4efe4]/70 mb-1">
            {eligible.length} destinataire(s) éligible(s)
            {onCooldown > 0 && <span className="text-[#f4efe4]/40"> · {onCooldown} déjà relancé(s) récemment (exclus)</span>}
          </p>

          {/* Preview */}
          <div className="rounded-xl border p-5 my-4" style={{ background: '#07110c', borderColor: 'rgba(196, 154, 60, 0.2)' }}>
            <p className="text-xs text-[#f4efe4]/40 mb-2">Aperçu</p>
            <p className="font-display text-gold mb-2">{subjects[templateId]}</p>
            <p className="text-sm text-[#f4efe4]/80 whitespace-pre-wrap">{previewText}</p>
          </div>

          <button onClick={send} disabled={sending || eligible.length === 0} className="btn-gold">
            {sending ? 'Envoi en cours...' : `Envoyer à ${eligible.length} personne(s)`}
          </button>

          {result && (
            <p className="text-sm text-emerald mt-3">
              ✓ {result.sent} email(s) envoyé(s){result.skipped > 0 ? `, ${result.skipped} ignoré(s)` : ''}
            </p>
          )}
        </>
      )}
    </div>
  )
}
