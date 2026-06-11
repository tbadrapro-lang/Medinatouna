'use client'

import { useEffect, useState } from 'react'
import { CONFIG, waLink } from '@/lib/config'

type Lead = {
  id: string
  nom: string
  email: string
  whatsapp?: string
  service: string
  formule?: string
  message?: string
  status?: string
  notes?: string
  created_at: string
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

const STATUS_ORDER = ['nouveau', 'contacte', 'converti', 'perdu']

const STATUS_LABELS: Record<string, string> = {
  nouveau: 'Nouveau',
  contacte: 'Contacté',
  converti: 'Converti',
  perdu: 'Perdu',
}

const STATUS_STYLES: Record<string, string> = {
  nouveau: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  contacte: 'bg-[#c49a3c]/15 text-[#e0b85a] border-[#c49a3c]/30',
  converti: 'bg-[#287a4f]/30 text-[#4ade80] border-[#287a4f]/40',
  perdu: 'bg-white/5 text-[#f4efe4]/40 border-white/10',
}

function nextStatus(current?: string) {
  const idx = STATUS_ORDER.indexOf(current || 'nouveau')
  return STATUS_ORDER[(idx + 1) % STATUS_ORDER.length]
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [service, setService] = useState('tous')
  const [statut, setStatut] = useState('tous')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [notesDraft, setNotesDraft] = useState('')
  const [notesSaved, setNotesSaved] = useState(false)

  function load() {
    setLoading(true)
    const params = new URLSearchParams()
    if (service !== 'tous') params.set('service', service)
    if (statut !== 'tous') params.set('statut', statut)
    if (search) params.set('search', search)

    fetch(`/api/admin/leads?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setLeads(data.leads || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const timeout = setTimeout(load, 300)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, statut, search])

  async function cycleStatus(lead: Lead) {
    const newStatus = nextStatus(lead.status)
    setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, status: newStatus } : l)))
    if (selected?.id === lead.id) setSelected({ ...selected, status: newStatus })
    await fetch('/api/admin/leads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: lead.id, status: newStatus }),
    })
  }

  function openDetail(lead: Lead) {
    setSelected(lead)
    setNotesDraft(lead.notes || '')
    setNotesSaved(false)
  }

  async function saveNotes() {
    if (!selected) return
    await fetch('/api/admin/leads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, notes: notesDraft }),
    })
    setLeads((ls) => ls.map((l) => (l.id === selected.id ? { ...l, notes: notesDraft } : l)))
    setNotesSaved(true)
    setTimeout(() => setNotesSaved(false), 1500)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="font-display text-xl font-semibold">Mes clients</h2>
        <a href="/api/admin/leads/export" className="btn-outline text-sm">
          ⬇️ Exporter CSV
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
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
          {STATUS_ORDER.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
        <input
          placeholder="Rechercher par nom ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input flex-1 min-w-[200px] text-sm"
        />
      </div>

      {loading ? (
        <p className="text-[#f4efe4]/60">Chargement...</p>
      ) : (
        <div className="grid gap-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => openDetail(lead)}
              className="rounded-xl border p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 cursor-pointer hover:border-gold/30 transition-colors"
              style={{ background: 'rgba(18, 48, 30, 0.4)', borderColor: 'rgba(196, 154, 60, 0.2)' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-semibold">{lead.nom}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-forest/60 border border-gold/20">
                    {SERVICE_LABELS[lead.service] || lead.service}
                  </span>
                  {lead.formule && <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{lead.formule}</span>}
                </div>
                <p className="text-sm text-[#f4efe4]/60 truncate">{lead.email}</p>
                <p className="text-xs text-[#f4efe4]/40 mt-1">{new Date(lead.created_at).toLocaleString('fr-FR')}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); cycleStatus(lead) }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors shrink-0 ${STATUS_STYLES[lead.status || 'nouveau']}`}
              >
                {STATUS_LABELS[lead.status || 'nouveau']}
              </button>
            </div>
          ))}
          {leads.length === 0 && <p className="text-[#f4efe4]/50 text-center py-8">Aucun lead.</p>}
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelected(null)} />
          <div
            className="relative w-full md:max-w-lg max-h-[88vh] overflow-y-auto rounded-t-2xl md:rounded-2xl border p-6"
            style={{ background: '#0c1d14', borderColor: 'rgba(196, 154, 60, 0.25)' }}
          >
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-[#f4efe4]/60 hover:text-gold text-xl">
              ×
            </button>
            <h3 className="font-display text-xl font-semibold mb-1">{selected.nom}</h3>
            <p className="text-sm text-[#f4efe4]/60 mb-4">{selected.email}</p>

            <div className="grid gap-2 text-sm mb-4">
              <p><span className="text-[#f4efe4]/50">Service :</span> {SERVICE_LABELS[selected.service] || selected.service}</p>
              {selected.formule && <p><span className="text-[#f4efe4]/50">Formule :</span> {selected.formule}</p>}
              {selected.whatsapp && <p><span className="text-[#f4efe4]/50">WhatsApp :</span> {selected.whatsapp}</p>}
              <p><span className="text-[#f4efe4]/50">Date :</span> {new Date(selected.created_at).toLocaleString('fr-FR')}</p>
              {selected.message && <p className="whitespace-pre-wrap"><span className="text-[#f4efe4]/50">Message :</span> {selected.message}</p>}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-[#f4efe4]/50">Statut :</span>
              <button
                onClick={() => cycleStatus(selected)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${STATUS_STYLES[selected.status || 'nouveau']}`}
              >
                {STATUS_LABELS[selected.status || 'nouveau']}
              </button>
            </div>

            <label className="block text-sm text-[#f4efe4]/70 mb-2">Notes internes</label>
            <textarea
              value={notesDraft}
              onChange={(e) => setNotesDraft(e.target.value)}
              onBlur={saveNotes}
              rows={4}
              className="form-input w-full resize-none mb-1"
              placeholder="Ajouter une note sur ce client..."
            />
            {notesSaved && <p className="text-emerald text-xs mb-3">Notes enregistrées ✓</p>}

            <div className="flex flex-wrap gap-2 mt-4">
              {selected.whatsapp && (
                <a
                  href={waLink(selected.whatsapp.replace(/\D/g, '') || CONFIG.WHATSAPP_FR, `Bonjour ${selected.nom}, suite à votre demande sur notre site...`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-sm"
                >
                  💬 WhatsApp
                </a>
              )}
              <a
                href={`mailto:${selected.email}?subject=${encodeURIComponent("Suite à votre demande — Les Bons Plans d'Arabie")}`}
                className="btn-outline text-sm"
              >
                📧 Envoyer un email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
