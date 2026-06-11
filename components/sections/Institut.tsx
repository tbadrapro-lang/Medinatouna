'use client'

import { useState, FormEvent } from 'react'
import { Star, Quote, GraduationCap, FileCheck, MessageCircle, Plane, MessageSquare, ShieldCheck, Clock } from 'lucide-react'
import { saveLead } from '@/lib/supabase'
import { CONFIG, waLink } from '@/lib/config'
import { track } from '@/lib/track'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
import Carousel from '@/components/ui/Carousel'
import PaymentModal from '@/components/ui/PaymentModal'
import FAQAccordion from '@/components/ui/FAQAccordion'
import SafeImage from '@/components/ui/SafeImage'

const PACKS = [
  {
    name: 'Pack Été',
    price: '995€',
    featured: false,
    items: [
      '2 semaines intensives',
      'Hébergement inclus',
      'Cours en petit groupe',
      'Activités culturelles',
    ],
  },
  {
    name: 'Intensif',
    price: '795€',
    featured: true,
    items: [
      '1 semaine intensive',
      'Professeurs natifs',
      'Suivi personnalisé',
      'Certificat de niveau',
    ],
  },
  {
    name: 'Famille',
    price: '1990€',
    featured: false,
    items: [
      '2 semaines pour 2 personnes',
      'Hébergement familial',
      'Programme enfants',
      'Omra incluse',
    ],
  },
]

const STATS = [
  { value: '11', label: 'Sessions organisées' },
  { value: '450+', label: 'Étudiants formés' },
  { value: '100%', label: 'Professeurs natifs' },
  { value: '4.9/5', label: 'Satisfaction' },
]

const CAROUSEL_IMAGES = [
  'https://i.ibb.co/jkL1QkT0/img1.jpg',
  'https://i.ibb.co/xtGyfdg9/img2.jpg',
  'https://i.ibb.co/3mj6vCBb/img3.jpg',
  'https://i.ibb.co/Cp9SX0mc/img4.jpg',
  'https://i.ibb.co/vnVQL9d/img5.jpg',
  'https://i.ibb.co/TM0Mms4V/img6.jpg',
  'https://i.ibb.co/SDQkJzpy/img7.jpg',
  'https://i.ibb.co/ZRLqsJSt/img8.jpg',
]

const STEPS = [
  {
    icon: MessageCircle,
    title: '1. Prise de contact',
    text: "Vous nous contactez via le formulaire ou WhatsApp pour échanger sur vos besoins, votre niveau et vos disponibilités.",
  },
  {
    icon: FileCheck,
    title: '2. Inscription & dossier',
    text: "Nous validons votre formule, constituons votre dossier et vous accompagnons dans les démarches administratives (visa, justificatifs).",
  },
  {
    icon: Plane,
    title: '3. Voyage & accueil',
    text: "À votre arrivée à Médine, notre équipe vous accueille et vous accompagne pour votre installation et votre orientation sur place.",
  },
  {
    icon: GraduationCap,
    title: '4. Cours & immersion',
    text: "Vous démarrez vos cours avec des professeurs natifs, dans un cadre structuré sur 12 niveaux, avec un accompagnement humain au quotidien.",
  },
]

const AVIS = [
  {
    name: 'L.',
    date: '14 avril 2026',
    stars: 5,
    text: "Une expérience extraordinaire ! L'équipe est très professionnelle et bienveillante, les cours sont de qualité et l'ambiance générale est propice à l'apprentissage. Je recommande vivement.",
  },
  {
    name: 'D.',
    date: '2 avril 2026',
    stars: 5,
    text: "Séjour parfaitement organisé du début à la fin. Les professeurs sont natifs et compétents, le suivi est personnalisé et l'ambiance respectueuse. Une vraie réussite.",
  },
  {
    name: 'T.',
    date: '20 mars 2026',
    stars: 5,
    text: "J'ai énormément progressé en arabe en très peu de temps. L'accompagnement humain fait toute la différence, on se sent pris en charge du début à la fin du séjour.",
  },
]

type Status = 'idle' | 'loading' | 'ok' | 'err'

export default function Institut() {
  const [modalPack, setModalPack] = useState<(typeof PACKS)[number] | null>(null)

  // Multi-step registration form
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    nom: '', email: '', whatsapp: '', nationalite: '',
    formule: '', dates: '', duree: '', niveau: '',
    message: '', accepted: false, website: '',
  })
  const [emailError, setEmailError] = useState(false)

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm((f) => ({ ...f, [k]: value as never }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const message = `Nationalité: ${form.nationalite}\nDates souhaitées: ${form.dates}\nDurée: ${form.duree}\nNiveau d'arabe: ${form.niveau}\nMessage: ${form.message}`

    const { error } = await saveLead({
      nom: form.nom,
      email: form.email,
      whatsapp: form.whatsapp,
      service: 'institut',
      formule: form.formule,
      message,
      source: 'site',
    })

    try {
      await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: form.nom, email: form.email, service: 'institut', formule: form.formule, whatsapp: form.whatsapp, message, website: form.website }),
      })
    } catch {}

    if (error) {
      setStatus('err')
    } else {
      setStatus('ok')
      track('form_submitted', { service: 'institut' })
    }
  }

  return (
    <section id="institut" className="relative py-20 md:py-28 px-5 md:px-10 bg-deep">
      <div className="max-w-7xl mx-auto">
        {/* About */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative aspect-[4/3] border border-gold/15 overflow-hidden bg-forest/40 order-2 lg:order-1">
            <SafeImage
              src="https://i.ibb.co/jkL1QkT0/institut-facade.jpg"
              alt="Centre Medinatouna à Médine"
              className="w-full h-full object-cover"
              fallbackText="مدرسة"
            />
          </div>

          <div className="order-1 lg:order-2">
            <span className="section-label">Institut de langue</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 mb-2">
              Centre Medinatouna à Médine
            </h2>
            <p className="font-body text-gold mb-6">
              Centre de langue arabe agréé par l&apos;État saoudien
            </p>
            <p className="font-body text-ivory/70 leading-relaxed mb-4">
              Medinatouna vous propose un apprentissage de l&apos;arabe selon la méthode égyptienne,
              reconnue pour son efficacité, structurée en 12 niveaux pédagogiques progressifs allant
              du débutant complet jusqu&apos;à un niveau avancé de maîtrise.
            </p>
            <p className="font-body text-ivory/70 leading-relaxed mb-4">
              Au-delà des cours, notre mission est d&apos;offrir un accompagnement humain complet :
              de la préparation de votre voyage jusqu&apos;à votre quotidien à Médine, notre équipe
              est présente à chaque étape pour que vous puissiez vous concentrer sur l&apos;essentiel
              — votre apprentissage et votre expérience spirituelle.
            </p>
            <p className="font-body text-ivory/70 leading-relaxed mb-6">
              Installé au cœur de la ville du Prophète, notre centre vous offre un cadre serein,
              respectueux et propice à la concentration, dans une ambiance bienveillante entre
              étudiants venus du monde entier.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Centre agréé par l\'État', 'Accompagnement humain', 'Expérience complète', 'Ambiance respectueuse'].map((b) => (
                <span key={b} className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full bg-forest/50 border border-white/5 text-ivory/80">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="mb-24">
          <Carousel images={CAROUSEL_IMAGES} caption="Immersion en images · Centre Medinatouna" />
        </div>

        {/* Packs */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {PACKS.map((pack) => (
            <div
              key={pack.name}
              className={`pack-card p-8 flex flex-col ${pack.featured ? 'featured' : ''}`}
            >
              {pack.featured && (
                <span className="text-xs uppercase tracking-widest text-gold mb-3">
                  Le plus populaire
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold mb-2">{pack.name}</h3>
              <p className="font-display text-[2.5rem] leading-none text-[#c49a3c] font-semibold mb-6">{pack.price}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {pack.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ivory/80">
                    <span className="text-gold mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => { track('pack_selected', { pack: pack.name, service: 'institut' }); setModalPack(pack) }}
                className={pack.featured ? 'btn-gold w-full justify-center' : 'btn-outline w-full justify-center'}
              >
                Choisir ce pack
              </button>
            </div>
          ))}
        </div>

        {modalPack && (
          <PaymentModal
            title={modalPack.name}
            price={modalPack.price}
            whatsappNumber={CONFIG.WHATSAPP_FR}
            service="institut"
            onClose={() => setModalPack(null)}
          />
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl text-gold font-semibold">{stat.value}</p>
              <p className="font-body text-sm text-ivory/60 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Process timeline */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="section-label justify-center">Comment ça marche</span>
            <h3 className="font-display text-3xl md:text-4xl font-semibold mt-4">
              Votre parcours, étape par étape
            </h3>
          </div>
          <div className="relative grid md:grid-cols-2 gap-6">
            {/* mobile connecting line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gold/20 md:hidden" />
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.title}
                  className={`relative pl-10 md:pl-8 py-6 border-l-2 border-gold overflow-hidden ${i % 2 === 0 ? 'bg-forest/20' : 'bg-forest/5'}`}
                >
                  <span
                    className="absolute -right-4 -top-6 font-display font-bold select-none pointer-events-none"
                    style={{ fontSize: '6rem', color: 'var(--gold)', opacity: 0.08 }}
                  >
                    {i + 1}
                  </span>
                  <div className="absolute left-[-1px] top-7 md:static md:mb-3 w-8 h-8 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center -translate-x-1/2 md:translate-x-0">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <h4 className="font-display text-lg font-semibold mb-2 relative">{step.title}</h4>
                  <p className="font-body text-sm text-ivory/70 leading-relaxed relative">{step.text}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-24">
          <div className="text-center mb-10">
            <span className="section-label justify-center">Avis clients</span>
            <h3 className="font-display text-3xl md:text-4xl font-semibold mt-4">
              Ils ont vécu l&apos;expérience
            </h3>
          </div>
          <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-1 px-1">
            {AVIS.map((avis) => (
              <div key={avis.name + avis.date} className="pack-card p-6 flex-shrink-0 w-[85vw] md:w-auto snap-start flex flex-col">
                <Quote className="text-gold/30 mb-2" size={28} />
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: avis.stars }).map((_, i) => (
                    <Star key={i} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="font-body text-sm text-ivory/80 leading-relaxed mb-4 flex-1">{avis.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center font-display text-gold font-semibold">
                    {avis.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ivory">{avis.name}</p>
                    <p className="text-xs text-ivory/50">{avis.date} · Avis Google vérifié</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a
              href="https://www.google.com/maps"
              target="_blank" rel="noopener noreferrer"
              className="text-sm text-gold underline underline-offset-4"
            >
              Voir tous les avis sur Google Maps
            </a>
          </div>
        </div>

        {/* Registration form */}
        <div id="institut-form" className="grid lg:grid-cols-2 gap-10 items-start mb-24">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-6">
              Prêt à vivre l&apos;expérience Medinatouna ?
            </h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm text-ivory/80">
                <Clock size={18} className="text-gold mt-0.5" />
                Réponse sous 24h
              </li>
              <li className="flex items-start gap-3 text-sm text-ivory/80">
                <ShieldCheck size={18} className="text-gold mt-0.5" />
                Paiement sécurisé
              </li>
              <li className="flex items-start gap-3 text-sm text-ivory/80">
                <MessageSquare size={18} className="text-gold mt-0.5" />
                Accompagnement personnalisé
              </li>
            </ul>
            <a
              href={waLink(CONFIG.WHATSAPP_FR, "Bonjour, je m'appelle [Votre Nom] et je souhaite obtenir des informations sur les packs de l'institut Medinatouna à Médine. Pourriez-vous me contacter ? Merci.")}
              target="_blank" rel="noopener noreferrer"
              className="btn-outline"
            >
              Contacter sur WhatsApp · 33 7 64 85 04 14
            </a>
          </div>

          <div className="bg-forest/30 border border-white/5 rounded-2xl p-8">
            {status === 'ok' ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-ivory/80 font-body">Merci ! Votre demande a bien été envoyée. Nous revenons vers vous sous 24h.</p>
              </div>
            ) : (
              <>
                {/* Stepper */}
                <div className="flex items-center gap-2 mb-8">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex-1 flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border ${step >= s ? 'bg-gold text-deep border-gold' : 'border-white/20 text-ivory/50'}`}>
                        {s}
                      </div>
                      {s < 3 && <div className={`flex-1 h-px ${step > s ? 'bg-gold' : 'bg-white/10'}`} />}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4">
                  <input type="text" name="website" value={form.website} onChange={update('website')} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
                  {step === 1 && (
                    <>
                      <p className="text-xs uppercase tracking-widest text-gold mb-1">Étape 1 — Profil</p>
                      <input className="form-input" placeholder="Nom complet *" value={form.nom} onChange={update('nom')} required />
                      <div>
                        <input
                          type="email"
                          className={`form-input ${emailError ? 'border-red-400' : ''}`}
                          placeholder="Email *"
                          value={form.email}
                          onChange={update('email')}
                          onBlur={() => setEmailError(form.email.length > 0 && !EMAIL_REGEX.test(form.email))}
                          required
                        />
                        {emailError && <p className="text-red-400 text-xs mt-1">Veuillez saisir un email valide</p>}
                      </div>
                      <input className="form-input" placeholder="WhatsApp *" value={form.whatsapp} onChange={update('whatsapp')} required />
                      <input className="form-input" placeholder="Nationalité" value={form.nationalite} onChange={update('nationalite')} />
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!form.nom || !form.email || !form.whatsapp}
                        className="btn-gold justify-center disabled:opacity-40"
                      >
                        Continuer →
                      </button>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <p className="text-xs uppercase tracking-widest text-gold mb-1">Étape 2 — Pack</p>
                      <select className="form-input" value={form.formule} onChange={update('formule')}>
                        <option value="">Choisir une formule</option>
                        {PACKS.map((pack) => (
                          <option key={pack.name} value={pack.name}>{pack.name} — {pack.price}</option>
                        ))}
                      </select>
                      <input type="date" className="form-input" placeholder="Dates souhaitées" min={new Date().toISOString().split('T')[0]} value={form.dates} onChange={update('dates')} />
                      <input className="form-input" placeholder="Durée du séjour" value={form.duree} onChange={update('duree')} />
                      <select className="form-input" value={form.niveau} onChange={update('niveau')}>
                        <option value="">Niveau d&apos;arabe</option>
                        <option value="Débutant">Débutant</option>
                        <option value="Intermédiaire">Intermédiaire</option>
                        <option value="Avancé">Avancé</option>
                      </select>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1 justify-center">Retour</button>
                        <button type="button" onClick={() => setStep(3)} className="btn-gold flex-1 justify-center">Continuer →</button>
                      </div>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <p className="text-xs uppercase tracking-widest text-gold mb-1">Étape 3 — Message</p>
                      <textarea className="form-input resize-none" placeholder="Votre message (optionnel)" rows={4} value={form.message} onChange={update('message')} />
                      <label className="flex items-start gap-2 text-sm text-ivory/70 font-body">
                        <input type="checkbox" checked={form.accepted} onChange={update('accepted')} className="mt-1" />
                        J&apos;ai lu et j&apos;accepte les conditions d&apos;annulation
                      </label>
                      <p className="text-xs text-ivory/50 leading-relaxed">
                        Aucun remboursement ne pourra être effectué. Toutefois, dans certains cas et sous réserve de
                        disponibilité, un avoir pourra être proposé afin de reporter le séjour sur une autre période.
                      </p>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => setStep(2)} className="btn-outline flex-1 justify-center">Retour</button>
                        <button type="submit" disabled={!form.accepted || status === 'loading'} className="btn-gold flex-1 justify-center disabled:opacity-40">
                          {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                        </button>
                      </div>
                      {status === 'err' && (
                        <div className="text-center space-y-2">
                          <p className="text-red-400 text-sm">Une erreur est survenue. Contactez-nous directement sur WhatsApp, nous répondons sous 24h.</p>
                          <a href={waLink(CONFIG.WHATSAPP_FR, "Bonjour, je souhaite m'inscrire à l'institut Medinatouna.")} target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center">
                            Contacter sur WhatsApp
                          </a>
                        </div>
                      )}
                    </>
                  )}
                </form>
              </>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div className="text-center mb-10">
            <span className="section-label justify-center">FAQ</span>
            <h3 className="font-display text-3xl md:text-4xl font-semibold mt-4">
              Questions fréquentes
            </h3>
          </div>
          <FAQAccordion />
        </div>
      </div>
    </section>
  )
}
