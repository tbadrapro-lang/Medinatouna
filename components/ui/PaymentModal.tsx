'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { saveLead } from '@/lib/supabase'

const PAYPAL_LINK = 'https://www.paypal.com/paypalme/REMPLACER_PAR_PAYPAL_DU_CLIENT'

export default function PaymentModal({
  title,
  price,
  whatsappNumber,
  service,
  onClose,
}: {
  title: string
  price: string
  whatsappNumber: string
  service: string
  onClose: () => void
}) {
  const [step, setStep] = useState(1)
  const [accepted, setAccepted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [form, setForm] = useState({ nom: '', email: '', whatsapp: '', personnes: '', dates: '' })

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const message = `Pack: ${title} (${price})\nNb personnes: ${form.personnes}\nDates souhaitées: ${form.dates}`

  const confirm = async () => {
    setStatus('loading')
    const { error } = await saveLead({
      nom: form.nom,
      email: form.email,
      whatsapp: form.whatsapp,
      service,
      formule: title,
      message,
      source: 'payment_modal',
    })
    try {
      await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: form.nom, email: form.email, service, formule: title, whatsapp: form.whatsapp, message }),
      })
    } catch {}
    setStatus(error ? 'err' : 'ok')
  }

  const waText = encodeURIComponent(`Bonjour, je souhaite réserver : ${title} (${price}). Nom: ${form.nom}, Email: ${form.email}, Personnes: ${form.personnes}, Dates: ${form.dates}`)

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-night/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-deep border border-gold/20 p-6 md:p-8">
        <button onClick={onClose} aria-label="Fermer" className="absolute top-4 right-4 text-ivory/60 hover:text-gold transition-colors">
          <X size={20} />
        </button>

        <h3 className="font-display text-2xl font-semibold text-ivory mb-1">{title}</h3>
        <p className="font-display text-xl text-gold mb-6">{price}</p>

        {status === 'ok' ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-ivory/80 font-body">Demande envoyée ! Nous vous recontactons sous 24h sur WhatsApp.</p>
          </div>
        ) : step === 1 ? (
          <div className="space-y-3">
            <input className="form-input" placeholder="Nom complet *" value={form.nom} onChange={update('nom')} required />
            <input type="email" className="form-input" placeholder="Email *" value={form.email} onChange={update('email')} required />
            <input className="form-input" placeholder="WhatsApp *" value={form.whatsapp} onChange={update('whatsapp')} required />
            <input className="form-input" placeholder="Nombre de personnes" value={form.personnes} onChange={update('personnes')} />
            <input className="form-input" placeholder="Dates souhaitées" value={form.dates} onChange={update('dates')} />
            <button
              onClick={() => setStep(2)}
              disabled={!form.nom || !form.email || !form.whatsapp}
              className="btn-gold w-full justify-center disabled:opacity-40"
            >
              Continuer →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <a href={PAYPAL_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center">
                Payer par PayPal
              </a>
              <div className="border border-gold/15 p-3">
                <p className="font-body text-sm text-ivory/70 mb-2">Virement bancaire — RIB disponible sur demande WhatsApp</p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Bonjour, pourriez-vous m\'envoyer le RIB pour le virement ?')}`}
                  target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center"
                >
                  Demander le RIB par WhatsApp
                </a>
              </div>
              <a href={`https://wa.me/${whatsappNumber}?text=${waText}`} target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center">
                Contacter directement sur WhatsApp
              </a>
            </div>

            <p className="text-xs text-ivory/50 font-body leading-relaxed border-t border-white/5 pt-3">
              Aucun remboursement ne pourra être effectué. Toutefois, dans certains cas et sous réserve de
              disponibilité, un avoir pourra être proposé afin de reporter le séjour sur une autre période.
            </p>

            <label className="flex items-start gap-2 text-sm text-ivory/70 font-body">
              <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1" />
              J&apos;ai lu et j&apos;accepte les conditions d&apos;annulation
            </label>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-outline flex-1 justify-center">Retour</button>
              <button onClick={confirm} disabled={!accepted || status === 'loading'} className="btn-gold flex-1 justify-center disabled:opacity-40">
                {status === 'loading' ? 'Envoi...' : 'Confirmer'}
              </button>
            </div>
            {status === 'err' && <p className="text-red-400 text-sm text-center">Erreur. Contactez-nous sur WhatsApp.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
