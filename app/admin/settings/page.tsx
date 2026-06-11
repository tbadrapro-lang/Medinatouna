'use client'

import { useEffect, useState } from 'react'

type Setting = { key: string; value: string }

const KNOWN_KEYS = [
  { key: 'whatsapp_fr', label: 'Numéro WhatsApp France' },
  { key: 'whatsapp_prestarabia', label: 'Numéro WhatsApp PrestaArabia' },
  { key: 'email_contact', label: 'Email de contact' },
  { key: 'instagram_url', label: 'Lien Instagram' },
  { key: 'tiktok_url', label: 'Lien TikTok' },
]

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        const map: Record<string, string> = {}
        ;(data.settings || []).forEach((s: Setting) => {
          map[s.key] = s.value
        })
        setSettings(map)
      })
      .finally(() => setLoading(false))
  }, [])

  async function save(key: string) {
    setSaving(key)
    setSaved(null)
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: settings[key] || '' }),
    })
    setSaving(null)
    setSaved(key)
    setTimeout(() => setSaved(null), 2000)
  }

  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-2">Réglages du site</h2>
      <p className="text-sm text-[#f4efe4]/60 mb-5">
        Modifiez les informations générales du site. Les changements sont enregistrés immédiatement.
      </p>

      {loading ? (
        <p className="text-[#f4efe4]/60">Chargement...</p>
      ) : (
        <div className="grid gap-4 max-w-xl">
          {KNOWN_KEYS.map(({ key, label }) => (
            <div
              key={key}
              className="rounded-xl border p-4"
              style={{ background: 'rgba(18, 48, 30, 0.4)', borderColor: 'rgba(196, 154, 60, 0.2)' }}
            >
              <label className="block text-sm text-[#f4efe4]/70 mb-2">{label}</label>
              <div className="flex gap-2">
                <input
                  className="form-input flex-1"
                  value={settings[key] || ''}
                  onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                />
                <button onClick={() => save(key)} disabled={saving === key} className="btn-gold text-sm whitespace-nowrap">
                  {saving === key ? '...' : saved === key ? '✓' : 'Enregistrer'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
