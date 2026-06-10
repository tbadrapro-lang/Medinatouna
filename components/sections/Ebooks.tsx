'use client'

import { useState, FormEvent } from 'react'
import { X } from 'lucide-react'
import { saveLead } from '@/lib/supabase'

// Pour déposer vos PDFs : uploadez vos fichiers dans /public/ebooks/ sur GitHub.
// Ex: /public/ebooks/arabe-30-jours.pdf
const EBOOKS = [
  {
    title: 'Les 100 phrases essentielles',
    arabic: 'مائة جملة أساسية',
    desc: 'Pour communiquer dès votre arrivée en Arabie.',
    pages: '42 pages',
    price: '9€',
    file: '/ebooks/100-phrases-essentielles.pdf',
  },
  {
    title: "Guide de l'Omra sereine",
    arabic: 'دليل العمرة',
    desc: 'Toutes les étapes de votre Omra expliquées simplement.',
    pages: '58 pages',
    price: '12€',
    file: '/ebooks/guide-omra-sereine.pdf',
  },
  {
    title: 'Adresses confidentielles',
    arabic: 'عناوين خاصة',
    desc: 'Les meilleures adresses locales à Médine et Djeddah.',
    pages: '30 pages',
    price: '7€',
    file: '/ebooks/adresses-confidentielles.pdf',
  },
]

const PAYPAL_LINK = 'https://www.paypal.com/paypalme/REMPLACER_PAR_PAYPAL_DU_CLIENT'

type Status = 'idle' | 'loading' | 'ok' | 'err'

function EbookModal({ ebook, onClose }: { ebook: (typeof EBOOKS)[number]; onClose: () => void }) {
  const waText = encodeURIComponent(`Bonjour, je souhaite acheter l'e-book "${ebook.title}" (${ebook.price})`)
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-night/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-deep border border-gold/20 p-6 md:p-8">
        <button onClick={onClose} aria-label="Fermer" className="absolute top-4 right-4 text-ivory/60 hover:text-gold transition-colors">
          <X size={20} />
        </button>
        <p className="font-arabic text-2xl text-gold mb-2" dir="rtl">{ebook.arabic}</p>
        <h3 className="font-display text-2xl font-semibold mb-1">{ebook.title}</h3>
        <p className="text-sm text-ivory/50 mb-3">{ebook.pages}</p>
        <p className="font-body text-sm text-ivory/70 mb-4">{ebook.desc}</p>
        <p className="font-display text-2xl text-gold mb-6">{ebook.price}</p>
        <div className="space-y-2">
          <a href={PAYPAL_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center">
            Payer par PayPal
          </a>
          <a
            href={`https://wa.me/33764850414?text=${waText}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-outline w-full justify-center"
          >
            Acheter via WhatsApp
          </a>
        </div>
        <p className="text-xs text-ivory/40 mt-4 text-center">
          Après paiement, votre e-book vous sera envoyé par email/WhatsApp.
        </p>
      </div>
    </div>
  )
}

export default function Ebooks() {
  const [status, setStatus] = useState<Status>('idle')
  const [open, setOpen] = useState<number | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') || '')

    const { error } = await saveLead({
      nom: email,
      email,
      service: 'lead_magnet',
      source: 'ebooks',
    })

    try {
      await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: email, email, service: 'lead_magnet' }),
      })
    } catch {}

    if (error) {
      setStatus('err')
    } else {
      setStatus('ok')
      form.reset()
    }
  }

  return (
    <section id="ebooks" className="relative py-24 px-6 bg-deep">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label justify-center">Ressources</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4">
            Nos e-books exclusifs
          </h2>
          <p className="font-body text-ivory/70 max-w-2xl mx-auto mt-4">
            Préparez votre voyage avec nos guides pratiques rédigés par des locaux.
          </p>
        </div>

        {/* Ebook cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {EBOOKS.map((ebook, i) => (
            <div key={ebook.title} className="pack-card overflow-hidden flex flex-col">
              <div className="h-48 bg-gradient-to-br from-forest to-night flex items-center justify-center">
                <p className="font-arabic text-3xl text-gold" dir="rtl">
                  {ebook.arabic}
                </p>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl font-semibold mb-1">{ebook.title}</h3>
                <p className="text-xs text-ivory/50 mb-2">{ebook.pages}</p>
                <p className="font-body text-sm text-ivory/70 mb-4 flex-1">{ebook.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl text-gold">{ebook.price}</span>
                  <button onClick={() => setOpen(i)} className="btn-outline">
                    Acheter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {open !== null && <EbookModal ebook={EBOOKS[open]} onClose={() => setOpen(null)} />}

        {/* Lead magnet */}
        <div className="max-w-2xl mx-auto bg-forest/30 border border-white/5 rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl font-semibold mb-2">
            Recevez gratuitement notre guide de bienvenue
          </h3>
          <p className="font-body text-sm text-ivory/70 mb-6">
            Inscrivez-vous et recevez immédiatement notre e-book offert par email.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              name="email"
              type="email"
              required
              placeholder="Votre adresse email"
              className="form-input flex-1"
            />
            <button type="submit" disabled={status === 'loading'} className="btn-gold whitespace-nowrap">
              {status === 'loading' ? 'Envoi...' : 'Recevoir le guide'}
            </button>
          </form>
          {status === 'ok' && (
            <p className="text-emerald text-sm mt-4">Merci ! Vérifiez votre boîte mail.</p>
          )}
          {status === 'err' && (
            <p className="text-sm mt-4 text-red-400">Une erreur est survenue, réessayez.</p>
          )}
        </div>
      </div>
    </section>
  )
}
