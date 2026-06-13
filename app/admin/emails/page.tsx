'use client'

import { useEffect, useState } from 'react'

type Lead = {
  id: string
  nom: string
  email: string
  service: string
  status?: string
  temperature?: string
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

const TEMPLATES_CHAUD = [
  {
    id: 'chaud_j1',
    label: 'J+1 — Votre place vous attend',
    subject: 'Votre place vous attend',
    text: "As-salamu alaykum {nom}, vous avez choisi {formule}. Il reste quelques places pour la prochaine session. On en parle sur WhatsApp aujourd'hui ?",
  },
  {
    id: 'chaud_j3',
    label: 'J+3 — Dernières places',
    subject: 'Dernières places disponibles',
    text: "{nom}, la session se remplit vite (24 places maximum). Réservez la vôtre avant qu'il ne soit trop tard.",
  },
  {
    id: 'chaud_j7',
    label: 'J+7 — On vous accompagne',
    subject: 'On vous accompagne',
    text: "{nom}, une question vous retient ? Notre équipe répond à tout sur WhatsApp, sans engagement. Barak Allahu fik.",
  },
]

const TEMPLATES_FROID = [
  {
    id: 'froid_j3',
    label: 'J+3 — Votre bon plan + bonus',
    subject: 'Votre bon plan + bonus',
    text: "As-salamu alaykum {nom}, voici votre bon plan de Médine promis. Bonus : saviez-vous que l'institut inclut la Omra complète ?",
  },
  {
    id: 'froid_j10',
    label: "J+10 — L'expérience en images",
    subject: "L'expérience en images",
    text: "{nom}, découvrez en vidéo le camp bédouin et l'institut à Médine. Une immersion qui donne envie de partir.",
  },
  {
    id: 'froid_j21',
    label: 'J+21 — Offre découverte',
    subject: 'Offre découverte',
    text: "{nom}, prêt à vivre Médine de l'intérieur ? Parlons de votre projet quand vous voulez, sans pression.",
  },
]

const COOLDOWN_MS = 72 * 60 * 60 * 1000

export default function AdminEmailsPage() {
  const [tab, setTab] = useState<'chaud' | 'froid'>('chaud')
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [service, setService] = useState('tous')
  const [statut, setStatut] = useState('tous')

  const TEMPLATES = tab === 'chaud' ? TEMPLATES_CHAUD : TEMPLATES_FROID
  const [templateId, setTemplateId] = useState(TEMPLATES_CHAUD[0].id)
  const [texts, setTexts] = useState<Record<string, string>>(
    Object.fromEntries([...TEMPLATES_CHAUD, ...TEMPLATES_FROID].map((t) => [t.id, t.text]))
  )
  const [subjects, setSubjects] = useState<Record<string, string>>(
    Object.fromEntries([...TEMPLATES_CHAUD, ...TEMPLATES_FROID].map((t) => [t.id, t.subject]))
  )
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ sent: number; skipped: number } | null>(null)

  useEffect(() => {
    setTemplateId(tab === 'chaud' ? TEMPLATES_CHAUD[0].id : TEMPLATES_FROID[0].id)
    setResult(null)
  }, [tab])

  useEffect(() => {
    const params = new URLSearchParams()
    if (service !== 'tous') params.set('service', service)
    if (statut !== 'tous') params.set('statut', statut)
    params.set('temperature', tab)

    setLoading(true)
    fetch(`/api/admin/leads?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setLeads(data.leads || []))
      .finally(() => setLoading(false))
  }, [service, statut, tab])

  const now = Date.now()
  const eligible = leads.filter((l) => !l.last_email_sent || now - new Date(l.last_email_sent).getTime() > COOLDOWN_MS)
  const onCooldown = leads.length - eligible.length

  const previewText = texts[templateId]
    .replace(/\{nom\}/g, eligible[0]?.nom || 'Prénom')
    .replace(/\{service\}/g, SERVICE_LABELS[eligible[0]?.service] || 'notre offre')
    .replace(/\{formule\}/g, 'votre formule')

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
        relanceType: templateId,
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

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('chaud')}
          className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
            tab === 'chaud' ? 'bg-red-500/15 text-red-300 border-red-500/30' : 'border-white/10 text-[#f4efe4]/60'
          }`}
        >
          🔥 Leads chauds
        </button>
        <button
          onClick={() => setTab('froid')}
          className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
            tab === 'froid' ? 'bg-blue-500/15 text-blue-300 border-blue-500/30' : 'border-white/10 text-[#f4efe4]/60'
          }`}
        >
          ❄️ Leads froids
        </button>
      </div>

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
            {eligible.length} destinataire(s) éligible(s) — {tab === 'chaud' ? '🔥 chauds' : '❄️ froids'}
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
