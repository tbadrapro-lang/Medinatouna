'use client'

import { useEffect, useState } from 'react'

type Lead = {
  id: string
  nom: string
  email: string
  service: string
  status?: string
  created_at: string
}

type Stats = {
  totalLeads: number
  newLeads: number
  uncontacted: number
  activeContents: number
  recentLeads: Lead[]
}

const SERVICE_LABELS: Record<string, string> = {
  institut: 'Institut',
  camp_bedouin: 'Camp bédouin',
  ebook_medine: 'E-book Médine',
  ebook_mecque: 'E-book Mecque',
  ebook_pack: 'Pack e-books',
  lead_magnet: 'Guide gratuit',
  waitlist_ebook_mecque: 'Liste d\'attente Mecque',
  waitlist_pack: 'Liste d\'attente Pack',
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ background: 'rgba(18, 48, 30, 0.4)', borderColor: 'rgba(196, 154, 60, 0.2)' }}
    >
      <p className="text-sm text-[#f4efe4]/60 mb-2">{label}</p>
      <p className="font-display text-3xl font-semibold text-gold">{value}</p>
    </div>
  )
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then(setStats)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-[#f4efe4]/60">Chargement...</p>
  }

  if (!stats) {
    return <p className="text-red-400">Erreur de chargement des statistiques.</p>
  }

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Nouveaux leads (7j)" value={stats.newLeads} />
        <StatCard label="Total leads" value={stats.totalLeads} />
        <StatCard label="Leads non contactés" value={stats.uncontacted} />
        <StatCard label="Contenus actifs" value={stats.activeContents} />
      </div>

      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: 'rgba(18, 48, 30, 0.4)', borderColor: 'rgba(196, 154, 60, 0.2)' }}
      >
        <div className="p-5 border-b" style={{ borderColor: 'rgba(196, 154, 60, 0.15)' }}>
          <h2 className="font-display text-lg font-semibold">10 derniers leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#f4efe4]/50 border-b" style={{ borderColor: 'rgba(196, 154, 60, 0.1)' }}>
                <th className="px-5 py-3">Nom</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Service</th>
                <th className="px-5 py-3">Statut</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLeads.map((lead) => (
                <tr key={lead.id} className="border-b" style={{ borderColor: 'rgba(196, 154, 60, 0.05)' }}>
                  <td className="px-5 py-3">{lead.nom}</td>
                  <td className="px-5 py-3 text-[#f4efe4]/70">{lead.email}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-forest/60 border border-gold/20">
                      {SERVICE_LABELS[lead.service] || lead.service}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full ${
                        lead.status === 'contacte'
                          ? 'bg-[#287a4f]/30 text-[#4ade80] border border-[#287a4f]/40'
                          : 'bg-[#c49a3c]/15 text-[#e0b85a] border border-[#c49a3c]/30'
                      }`}
                    >
                      {lead.status === 'contacte' ? 'Contacté' : 'Nouveau'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[#f4efe4]/50">
                    {new Date(lead.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                </tr>
              ))}
              {stats.recentLeads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-[#f4efe4]/50">
                    Aucun lead pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
