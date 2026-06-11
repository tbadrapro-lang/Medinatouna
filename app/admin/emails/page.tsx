'use client'

import { useEffect, useState } from 'react'
import { CONFIG, waLink } from '@/lib/config'

type Lead = {
  id: string
  nom: string
  email: string
  whatsapp?: string
  service: string
  status?: string
  created_at: string
}

export default function AdminEmailsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/leads')
      .then((res) => res.json())
      .then((data) => setLeads(data.leads || []))
      .finally(() => setLoading(false))
  }, [])

  const aRelancer = leads.filter((l) => l.status !== 'contacte')

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-2">Relances email</h2>
      <p className="text-sm text-[#f4efe4]/60 mb-5">
        Liste des prospects non encore contactés. Cliquez pour ouvrir une relance par email ou WhatsApp.
      </p>

      {loading ? (
        <p className="text-[#f4efe4]/60">Chargement...</p>
      ) : (
        <div className="grid gap-3">
          {aRelancer.map((lead) => (
            <div
              key={lead.id}
              className="rounded-xl border p-4 flex items-center justify-between gap-4 flex-wrap"
              style={{ background: 'rgba(18, 48, 30, 0.4)', borderColor: 'rgba(196, 154, 60, 0.2)' }}
            >
              <div>
                <p className="font-semibold">{lead.nom}</p>
                <p className="text-sm text-[#f4efe4]/60">{lead.email}</p>
                <p className="text-xs text-[#f4efe4]/40 mt-1">
                  Inscrit le {new Date(lead.created_at).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={`mailto:${lead.email}?subject=${encodeURIComponent("Suite à votre demande — Les Bons Plans d'Arabie")}`}
                  className="btn-outline text-xs"
                >
                  Email
                </a>
                {lead.whatsapp && (
                  <a
                    href={waLink(lead.whatsapp.replace(/\D/g, '') || CONFIG.WHATSAPP_FR, `Bonjour ${lead.nom}, suite à votre demande sur notre site, où en êtes-vous ?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold text-xs"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))}
          {aRelancer.length === 0 && <p className="text-[#f4efe4]/50 text-center py-8">Aucune relance en attente 🎉</p>}
        </div>
      )}
    </div>
  )
}
