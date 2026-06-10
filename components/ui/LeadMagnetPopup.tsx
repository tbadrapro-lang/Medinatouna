'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { saveLead } from '@/lib/supabase'

export default function LeadMagnetPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem('popup_dismissed')) return
    const t = setTimeout(() => setVisible(true), 8000)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    localStorage.setItem('popup_dismissed', '1')
    setVisible(false)
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const { error } = await saveLead({ nom: 'Lead magnet', email, service: 'lead_magnet', source: 'popup' })
    try {
      await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: 'Lead magnet', email, service: 'lead_magnet' }),
      })
    } catch {}
    setStatus(error ? 'err' : 'ok')
    if (!error) localStorage.setItem('popup_dismissed', '1')
  }

  if (!visible) return null

  return (
    <div className="fixed z-[150] bottom-20 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-[320px] bg-[#0c1d14] border border-gold/30 shadow-2xl p-5 rounded-none">
      <div className="w-10 h-px bg-gold mb-3" />
      <button onClick={dismiss} aria-label="Fermer" className="absolute top-3 right-3 text-ivory/60 hover:text-gold transition-colors">
        <X size={18} />
      </button>
      <span className="inline-block text-xs uppercase tracking-widest text-gold border border-gold/30 px-2 py-1 mb-3">
        🎁 Offre exclusive
      </span>
      <h3 className="font-display text-lg font-semibold text-ivory mb-1">
        1 bon plan secret de Médine offert
      </h3>
      <p className="font-body text-xs text-ivory/60 mb-4">
        Rien d&apos;autre. Désinscription en 1 clic.
      </p>
      {status === 'ok' ? (
        <p className="text-emerald text-sm">Merci ! Vérifiez votre boîte mail.</p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            className="form-input text-sm"
          />
          <button type="submit" disabled={status === 'loading'} className="btn-gold justify-center text-sm">
            {status === 'loading' ? 'Envoi...' : 'Recevoir →'}
          </button>
          {status === 'err' && <p className="text-red-400 text-xs">Erreur, réessayez.</p>}
        </form>
      )}
    </div>
  )
}
