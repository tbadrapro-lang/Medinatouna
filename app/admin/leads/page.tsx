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

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'nouveau' | 'contacte'>('all')

  function load() {
    setLoading(true)
    fetch('/api/admin/leads')
      .then((res) => res.json())
      .then((data) => setLeads(data.leads || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  async function toggleStatus(lead: Lead) {
    const newStatus = lead.status === 'contacte' ? 'nouveau' : 'contacte'
    setLeads((ls) => ls.map((l) => (l.id === lead.id ? { ...l, status: newStatus } : l)))
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: lead.id, status: newStatus }),
    })
  }

  const filtered = leads.filter((l) => {
    if (filter === 'all') return true
    if (filter === 'contacte') return l.status === 'contacte'
    return l.status !== 'contacte'
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="font-display text-xl font-semibold">Mes clients</h2>
        <div className="flex gap-2">
          {(['all', 'nouveau', 'contacte'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                filter === f ? 'bg-forest/60 border-gold/30 text-[#f4efe4]' : 'border-white/10 text-[#f4efe4]/60'
              }`}
            >
              {f === 'all' ? 'Tous' : f === 'nouveau' ? 'Nouveaux' : 'Contactés'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-[#f4efe4]/60">Chargement...</p>
      ) : (
        <div className="grid gap-3">
          {filtered.map((lead) => (
            <div
              key={lead.id}
              className="rounded-xl border p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
              style={{ background: 'rgba(18, 48, 30, 0.4)', borderColor: 'rgba(196, 154, 60, 0.2)' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-semibold">{lead.nom}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-forest/60 border border-gold/20">
                    {SERVICE_LABELS[lead.service] || lead.service}
                  </span>
                  {lead.formule && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{lead.formule}</span>
                  )}
                </div>
                <p className="text-sm text-[#f4efe4]/60 truncate">{lead.email}</p>
                {lead.message && <p className="text-xs text-[#f4efe4]/45 mt-1 line-clamp-2">{lead.message}</p>}
                <p className="text-xs text-[#f4efe4]/40 mt-1">
                  {new Date(lead.created_at).toLocaleString('fr-FR')}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {lead.whatsapp && (
                  <a
                    href={waLink(lead.whatsapp.replace(/\D/g, '') || CONFIG.WHATSAPP_FR, `Bonjour ${lead.nom}, suite à votre demande sur notre site...`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-xs"
                  >
                    WhatsApp
                  </a>
                )}
                <button
                  onClick={() => toggleStatus(lead)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    lead.status === 'contacte'
                      ? 'bg-[#287a4f]/30 text-[#4ade80] border-[#287a4f]/40'
                      : 'bg-[#c49a3c]/15 text-[#e0b85a] border-[#c49a3c]/30'
                  }`}
                >
                  {lead.status === 'contacte' ? '✓ Contacté' : 'Marquer contacté'}
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-[#f4efe4]/50 text-center py-8">Aucun lead.</p>}
        </div>
      )}
    </div>
  )
}
