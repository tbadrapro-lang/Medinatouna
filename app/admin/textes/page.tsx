'use client'

import { useEffect, useState } from 'react'
import { DEFAULT_TEXTS } from '@/lib/getSettings'

const PUBLIC_IMAGES = [
  '/hero-masjid-nabawi.jpg',
  '/badr-vue-aerienne.webp',
  '/camp-equitation.webp',
  '/camp-feu-groupe.webp',
  '/camp-feu-tente.webp',
  '/camp-lait-chamelle.webp',
  '/camp-mandi-bbq.webp',
  '/camp-tente-nuit.webp',
  '/institut-chambre.webp',
  '/institut-facade.webp',
  '/medine-mecque.webp',
  '/mer-rouge-bateaux.webp',
  '/omra-pelerins.webp',
  '/quad-desert.webp',
  '/rais-beach-ponton.webp',
]

type Field = { key: string; label: string; type?: 'text' | 'textarea' | 'select' }

type Section = {
  id: string
  title: string
  sectionKey?: string
  fields: Field[]
}

const SECTIONS: Section[] = [
  {
    id: 'hero',
    title: 'Hero (page d\'accueil)',
    sectionKey: 'hero',
    fields: [
      { key: 'hero_titre', label: 'Titre principal', type: 'text' },
      { key: 'hero_titre_accent', label: 'Titre — partie en doré', type: 'text' },
      { key: 'hero_tagline', label: 'Texte de présentation', type: 'textarea' },
      { key: 'hero_arabic', label: 'Texte en arabe', type: 'text' },
      { key: 'hero_bg_image', label: 'Image de fond', type: 'select' },
    ],
  },
  {
    id: 'institut',
    title: 'Institut de langue',
    sectionKey: 'institut',
    fields: [
      { key: 'institut_titre', label: 'Titre de la section', type: 'text' },
      { key: 'institut_description', label: 'Description (paragraphes séparés par une ligne vide)', type: 'textarea' },
    ],
  },
  {
    id: 'camp',
    title: 'Camp bédouin',
    sectionKey: 'camp',
    fields: [
      { key: 'camp_titre', label: 'Titre de la section', type: 'text' },
      { key: 'camp_description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    id: 'vision2030',
    title: 'Vision 2030',
    sectionKey: 'vision2030',
    fields: [
      { key: 'vision2030_titre', label: 'Titre de la section', type: 'text' },
      { key: 'vision2030_texte', label: 'Texte de présentation', type: 'textarea' },
    ],
  },
  {
    id: 'ebooks',
    title: 'E-books',
    sectionKey: 'ebooks',
    fields: [],
  },
  {
    id: 'transferts',
    title: 'Transferts',
    sectionKey: 'transferts',
    fields: [],
  },
  {
    id: 'mielscooter',
    title: 'Miel & Scooter',
    sectionKey: 'mielscooter',
    fields: [],
  },
]

export default function AdminTextesPage() {
  const [values, setValues] = useState<Record<string, string>>({})
  const [visible, setVisible] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState<string | null>('hero')
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, string> = { ...DEFAULT_TEXTS }
        const vis: Record<string, boolean> = {}
        for (const s of SECTIONS) {
          if (s.sectionKey) vis[s.sectionKey] = true
        }
        ;(data.settings || []).forEach((row: { key: string; value: string }) => {
          if (row.key in map) map[row.key] = row.value
          if (row.key.startsWith('section_') && row.key.endsWith('_visible')) {
            const sec = row.key.slice('section_'.length, -'_visible'.length)
            vis[sec] = row.value !== 'false'
          }
        })
        setValues(map)
        setVisible(vis)
      })
      .finally(() => setLoading(false))
  }, [])

  async function saveSection(section: Section) {
    setSaving(section.id)
    setSaved(null)

    await Promise.all([
      ...section.fields.map((f) =>
        fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: f.key, value: values[f.key] || '' }),
        })
      ),
      section.sectionKey
        ? fetch('/api/admin/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              key: `section_${section.sectionKey}_visible`,
              value: visible[section.sectionKey] === false ? 'false' : 'true',
            }),
          })
        : null,
    ])

    setSaving(null)
    setSaved(section.id)
    setTimeout(() => setSaved(null), 2000)
  }

  if (loading) return <p className="text-[#f4efe4]/60">Chargement...</p>

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-2">✏️ Textes du site</h2>
      <p className="text-sm text-[#f4efe4]/60 mb-2">
        Modifiez les textes et l&apos;affichage des sections de la page d&apos;accueil.
      </p>
      <p className="text-xs text-[#f4efe4]/40 mb-5">
        Les modifications apparaissent sur le site en 1 minute.{' '}
        <a href="/" target="_blank" className="text-gold hover:text-gold-hi">Voir le résultat sur le site →</a>
      </p>

      <div className="grid gap-3 max-w-2xl">
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: 'rgba(196, 154, 60, 0.2)' }}
          >
            <button
              onClick={() => setOpen(open === section.id ? null : section.id)}
              className="w-full flex items-center justify-between p-4 text-left"
              style={{ background: 'rgba(18, 48, 30, 0.4)' }}
            >
              <span className="font-semibold">{section.title}</span>
              <span className="text-[#f4efe4]/50 text-sm">{open === section.id ? '▲' : '▼'}</span>
            </button>

            {open === section.id && (
              <div className="p-4 grid gap-4" style={{ background: '#07110c' }}>
                {section.sectionKey && (
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={visible[section.sectionKey] !== false}
                      onChange={(e) => setVisible({ ...visible, [section.sectionKey!]: e.target.checked })}
                    />
                    Afficher cette section sur le site
                  </label>
                )}

                {section.fields.map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm text-[#f4efe4]/70 mb-2">{f.label}</label>
                    {f.type === 'textarea' ? (
                      <textarea
                        value={values[f.key] || ''}
                        onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                        rows={5}
                        className="form-input w-full resize-none"
                      />
                    ) : f.type === 'select' ? (
                      <select
                        value={values[f.key] || ''}
                        onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                        className="form-input w-full"
                      >
                        {PUBLIC_IMAGES.map((img) => (
                          <option key={img} value={img}>{img}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={values[f.key] || ''}
                        onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                        className="form-input w-full"
                      />
                    )}
                  </div>
                ))}

                <button onClick={() => saveSection(section)} disabled={saving === section.id} className="btn-gold text-sm w-fit">
                  {saving === section.id ? '...' : saved === section.id ? '✓ Enregistré' : 'Enregistrer'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
