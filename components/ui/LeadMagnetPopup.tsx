'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { saveLead } from '@/lib/supabase'
import { CONFIG, waLink } from '@/lib/config'
import { track } from '@/lib/track'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LeadMagnetPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [modalOpen, setModalOpen] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onOpen = () => setModalOpen(true)
    const onClose = () => setModalOpen(false)
    window.addEventListener('paymentmodal:open', onOpen)
    window.addEventListener('paymentmodal:close', onClose)
    return () => {
      window.removeEventListener('paymentmodal:open', onOpen)
      window.removeEventListener('paymentmodal:close', onClose)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem('popup_dismissed')) return
    const t = setTimeout(() => setVisible(true), 12000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (visible && !modalOpen) emailRef.current?.focus()
  }, [visible, modalOpen])

  useEffect(() => {
    if (!visible) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [visible])

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
        body: JSON.stringify({ nom: 'Lead magnet', email, service: 'lead_magnet', website }),
      })
    } catch {}
    setStatus(error ? 'err' : 'ok')
    if (!error) {
      track('lead_magnet_submitted')
      localStorage.setItem('popup_dismissed', '1')
    }
  }

  if (!visible || modalOpen) return null

  return (
    <div className="fixed z-[45] bottom-28 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-[320px] bg-[#0c1d14] border border-gold/30 shadow-2xl p-5 rounded-none">
      <div className="w-10 h-px bg-gold mb-3" />
      <button onClick={dismiss} aria-label="Fermer" className="absolute top-3 right-3 text-ivory/60 hover:text-gold transition-colors">
        <X size={18} />
      </button>
      <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
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
            ref={emailRef}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setEmailError(email.length > 0 && !EMAIL_REGEX.test(email))}
            placeholder="Votre email"
            className={`form-input text-sm ${emailError ? 'border-red-400' : ''}`}
          />
          {emailError && <p className="text-red-400 text-xs">Veuillez saisir un email valide</p>}
          <button type="submit" disabled={status === 'loading'} className="btn-gold justify-center text-sm">
            {status === 'loading' ? 'Envoi en cours...' : 'Recevoir →'}
          </button>
          {status === 'err' && (
            <div className="space-y-1">
              <p className="text-red-400 text-xs">Une erreur est survenue. Contactez-nous sur WhatsApp, nous répondons sous 24h.</p>
              <a href={waLink(CONFIG.WHATSAPP_FR, "Bonjour, je souhaite recevoir le bon plan secret de Médine.")} target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center text-xs">
                Contacter sur WhatsApp
              </a>
            </div>
          )}
        </form>
      )}
    </div>
  )
}
