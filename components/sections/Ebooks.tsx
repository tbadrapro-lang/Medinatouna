'use client'

import { useState, FormEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { saveLead } from '@/lib/supabase'
import PaymentModal from '@/components/ui/PaymentModal'
import { CONFIG, waLink } from '@/lib/config'
import { track } from '@/lib/track'
import { ContentItem } from '@/lib/data'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FALLBACK_EBOOKS = [
  {
    id: 'medine',
    badge: 'Disponible',
    badgeStyle: 'disponible',
    title: 'Bons Plans à Médine',
    subtitle: 'Guide PDF · Édition 2026',
    tagline: '+ de 50 bons plans',
    desc: "Évite les erreurs coûteuses sur place. Gagne un temps précieux durant ton séjour et découvre les meilleures adresses avant même d'arriver.",
    sommaire: [
      'Prépare ton séjour : appartements, hôtels, guide Omra, visa en 30 min',
      'Découvre Médine : restaurants, visites, shopping, loisirs',
      'E-commerce : fournisseurs Abaya, Qamis, Musc',
      'Un pas vers la science : halaqat Coran, assises des savants, musées',
      "Laisse une œuvre : sadaqa Coran, eau, nourriture, parrainage orphelin",
    ],
    price: '29,90 €',
    oldPrice: '49,90 €',
    available: true,
  },
  {
    id: 'mecque',
    badge: 'Bientôt disponible',
    badgeStyle: 'bientot',
    title: 'Bons Plans à la Mecque',
    subtitle: 'Guide PDF · Édition 2026',
    tagline: 'Le complément indispensable',
    desc: 'Toutes les adresses et astuces pour vivre ta Omra à la Mecque sereinement : hébergement, restaurants, transports, lieux historiques.',
    sommaire: [],
    price: '29,90 €',
    oldPrice: '49,90 €',
    available: false,
    waitlistService: 'waitlist_ebook_mecque',
  },
  {
    id: 'pack',
    badge: '🔥 Meilleure offre',
    badgeStyle: 'meilleure',
    title: 'Pack Complet — Médine + Mecque',
    subtitle: '2 Guides PDF · Édition 2026',
    tagline: 'Économise 50%',
    desc: "Les deux guides réunis : tout ce qu'il faut savoir pour ton séjour complet en Arabie. Rentabilisé dès les premiers jours sur place.",
    sommaire: [],
    price: '49,90 €',
    oldPrice: '99,80 €',
    available: false,
    waitlistService: 'waitlist_pack',
  },
]

const ARGUMENTS = [
  'Faire des économies grâce aux réductions et bons plans partagés',
  'Gagner un temps précieux durant votre séjour',
  "Atterrir en Arabie l'esprit tranquille, tout est déjà rassemblé",
]

const BADGE_STYLES: Record<string, string> = {
  disponible: 'bg-[#287a4f] text-ivory',
  bientot: 'bg-[#c49a3c]/15 border border-[#c49a3c]/30 text-[#e0b85a]',
  meilleure: 'bg-gradient-to-r from-[#c49a3c] to-[#e0b85a] text-deep font-semibold',
}

type Status = 'idle' | 'loading' | 'ok' | 'err'

function Cover({ id }: { id: string }) {
  if (id === 'medine') {
    return (
      <div className="h-48 relative flex flex-col items-center justify-between p-4 overflow-hidden bg-gradient-to-b from-[#7ec8e3] via-[#cdb88c] to-[#b8965c]">
        <div className="text-center">
          <p className="font-display font-bold text-white text-lg leading-tight drop-shadow">BONS PLANS</p>
          <p className="font-display font-bold text-white text-2xl leading-tight drop-shadow">À MÉDINE</p>
        </div>
        <span className="text-5xl drop-shadow">🕌</span>
        <p className="text-[10px] tracking-[0.3em] text-white/80 uppercase">Guide PDF</p>
      </div>
    )
  }
  if (id === 'mecque') {
    return (
      <div className="h-48 relative flex flex-col items-center justify-between p-4 overflow-hidden bg-gradient-to-b from-[#7ec8e3] via-[#cdb88c] to-[#b8965c]">
        <div className="text-center">
          <p className="font-display font-bold text-white text-lg leading-tight drop-shadow">BONS PLANS</p>
          <p className="font-display font-bold text-white text-2xl leading-tight drop-shadow">À LA MECQUE</p>
        </div>
        <span className="text-5xl drop-shadow">🕋</span>
        <p className="text-[10px] tracking-[0.3em] text-white/80 uppercase">Guide PDF</p>
      </div>
    )
  }
  return (
    <div className="h-48 relative flex flex-col items-center justify-between p-4 overflow-hidden bg-gradient-to-b from-[#7ec8e3] via-[#cdb88c] to-[#b8965c]">
      <div className="text-center">
        <p className="font-display font-bold text-white text-lg leading-tight drop-shadow">BONS PLANS</p>
        <p className="font-display font-bold text-white text-2xl leading-tight drop-shadow">PACK COMPLET</p>
      </div>
      <span className="text-5xl drop-shadow flex gap-3">
        <span>🕌</span>
        <span>🕋</span>
      </span>
      <p className="text-[10px] tracking-[0.3em] text-white/80 uppercase">Guide PDF</p>
    </div>
  )
}

export default function Ebooks({ ebooks }: { ebooks?: ContentItem[] }) {
  const EBOOKS =
    ebooks && ebooks.length > 0
      ? ebooks.map((e) => {
          const extra = (e.extra || {}) as Record<string, unknown>
          return {
            id: String(extra.id || e.id),
            badge: e.badge || '',
            badgeStyle: String(extra.badgeStyle || 'disponible'),
            title: e.titre,
            subtitle: e.sous_titre || '',
            tagline: String(extra.tagline || ''),
            desc: e.description || '',
            sommaire: e.items || [],
            price: e.prix || '',
            oldPrice: e.ancien_prix || '',
            available: extra.available !== undefined ? Boolean(extra.available) : true,
            waitlistService: extra.waitlistService as string | undefined,
          }
        })
      : FALLBACK_EBOOKS

  const [openModal, setOpenModal] = useState<(typeof EBOOKS)[number] | null>(null)
  const [showSommaire, setShowSommaire] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [emailError, setEmailError] = useState(false)

  async function handleWaitlist(e: FormEvent<HTMLFormElement>, service: string) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = new FormData(form)
    const email = String(data.get('email') || '')
    const website = String(data.get('website') || '')

    const { error } = await saveLead({
      nom: email,
      email,
      service,
      source: 'ebooks',
    })

    try {
      await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: email, email, service, website }),
      })
    } catch {}

    if (error) {
      setStatus('err')
    } else {
      setStatus('ok')
      track('waitlist_submitted', { service })
      form.reset()
    }
  }

  return (
    <section id="ebooks" className="relative py-20 md:py-28 px-5 md:px-10 bg-deep">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-label justify-center">Ressources</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4">
            Nos e-books exclusifs
          </h2>
          <p className="font-body text-ivory/70 max-w-2xl mx-auto mt-4">
            Préparez votre voyage avec nos guides pratiques rédigés par des locaux.
          </p>
        </div>

        {/* Arguments de vente */}
        <div className="max-w-3xl mx-auto mb-16 grid sm:grid-cols-3 gap-4 text-center">
          {ARGUMENTS.map((arg) => (
            <div key={arg} className="flex flex-col items-center gap-2 px-2">
              <span className="text-gem text-xl">✓</span>
              <p className="text-sm text-ivory/75 leading-snug">{arg}</p>
            </div>
          ))}
        </div>

        {/* Ebook cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {EBOOKS.map((ebook) => (
            <div key={ebook.id} className="pack-card overflow-hidden flex flex-col">
              <Cover id={ebook.id} />
              <div className="p-6 flex flex-col flex-1">
                <span className={`self-start text-xs px-3 py-1 rounded-full mb-3 ${BADGE_STYLES[ebook.badgeStyle]}`}>
                  {ebook.badge}
                </span>
                <h3 className="font-display text-xl font-semibold mb-1">{ebook.title}</h3>
                <p className="text-xs text-ivory/50 mb-1">{ebook.subtitle}</p>
                <p className="text-xs text-gold mb-3">{ebook.tagline}</p>
                <p className="font-body text-sm text-ivory/70 mb-4 flex-1">{ebook.desc}</p>

                {ebook.sommaire.length > 0 && (
                  <div className="mb-4">
                    <button
                      onClick={() => setShowSommaire((s) => !s)}
                      className="flex items-center gap-1 text-sm text-gold hover:text-gold-hi transition-colors"
                    >
                      Voir le sommaire
                      <ChevronDown size={16} className={`transition-transform ${showSommaire ? 'rotate-180' : ''}`} />
                    </button>
                    {showSommaire && (
                      <ul className="mt-3 space-y-2">
                        {ebook.sommaire.map((chap, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-ivory/70">
                            <span className="text-gold mt-0.5">{i + 1}.</span>
                            {chap}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-display text-2xl text-gold">{ebook.price}</span>
                  <span className="text-sm text-ivory/30 line-through">{ebook.oldPrice}</span>
                </div>

                {ebook.available ? (
                  <button onClick={() => setOpenModal(ebook)} className="btn-gold w-full justify-center">
                    Acheter — {ebook.price}
                  </button>
                ) : (
                  <>
                    <button disabled className="btn-outline w-full justify-center opacity-50 cursor-not-allowed">
                      Bientôt disponible
                    </button>
                    <button
                      onClick={() => setWaitlistOpen(ebook.id)}
                      className="text-xs text-gold hover:text-gold-hi mt-2 text-center transition-colors"
                    >
                      Être prévenu de la sortie →
                    </button>
                  </>
                )}

                {waitlistOpen === ebook.id && (
                  <form onSubmit={(e) => handleWaitlist(e, ebook.waitlistService || 'waitlist_ebook')} className="mt-4 space-y-2">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Votre adresse email"
                      className={`form-input w-full text-sm ${emailError ? 'border-red-400' : ''}`}
                      onBlur={(e) => setEmailError(e.target.value.length > 0 && !EMAIL_REGEX.test(e.target.value))}
                    />
                    {emailError && <p className="text-red-400 text-xs text-left">Veuillez saisir un email valide</p>}
                    <button type="submit" disabled={status === 'loading'} className="btn-outline w-full justify-center text-sm">
                      {status === 'loading' ? 'Envoi en cours...' : 'M\'avertir'}
                    </button>
                    {status === 'ok' && <p className="text-emerald text-xs text-center">Merci ! Vous serez prévenu(e).</p>}
                    {status === 'err' && (
                      <p className="text-red-400 text-xs text-center">
                        Erreur. Contactez-nous sur{' '}
                        <a href={waLink(CONFIG.WHATSAPP_FR, "Bonjour, je souhaite être prévenu de la sortie d'un e-book.")} target="_blank" rel="noopener noreferrer" className="underline">
                          WhatsApp
                        </a>
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>

        {openModal && (
          <PaymentModal
            title={openModal.title}
            price={openModal.price}
            whatsappNumber={CONFIG.WHATSAPP_FR}
            service={`ebook_${openModal.id}`}
            onClose={() => setOpenModal(null)}
          />
        )}
      </div>
    </section>
  )
}
