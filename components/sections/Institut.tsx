'use client'

import { useState, FormEvent } from 'react'
import { saveLead } from '@/lib/supabase'
import { useReveal } from '@/hooks/useReveal'

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

type Status = 'idle' | 'loading' | 'ok' | 'err'

export default function Institut() {
  const [status, setStatus] = useState<Status>('idle')
  const [formule, setFormule] = useState('')

  const header = useReveal<HTMLDivElement>()
  const packsBlock = useReveal<HTMLDivElement>()
  const statsBlock = useReveal<HTMLDivElement>()
  const formBlock = useReveal<HTMLDivElement>()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = new FormData(form)

    const { error } = await saveLead({
      nom: String(data.get('nom') || ''),
      email: String(data.get('email') || ''),
      whatsapp: String(data.get('whatsapp') || ''),
      service: 'institut',
      formule: String(data.get('formule') || ''),
      message: String(data.get('message') || ''),
      source: 'site',
    })

    if (error) {
      setStatus('err')
    } else {
      setStatus('ok')
      form.reset()
      setFormule('')
    }
  }

  return (
    <section id="institut" className="relative py-24 px-6 bg-deep overflow-hidden">
      {/* Geometric islamic pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23c49a3c' stroke-width='1'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Ccircle cx='40' cy='40' r='28'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div
          ref={header.ref}
          className={`text-center mb-16 reveal ${header.isVisible ? 'is-visible' : ''}`}
        >
          <span className="section-label justify-center">Institut de langue</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4">
            Apprenez <em className="italic text-gold">l&apos;arabe</em> à Médine
          </h2>
          <p className="font-arabic text-xl text-gold/60 mt-6" dir="rtl">
            طلب العلم فريضة على كل مسلم
          </p>
          <p className="font-body text-xs italic text-ivory/35 mt-2">
            La quête du savoir est une obligation pour tout musulman
          </p>
          <p className="font-body text-ivory/70 max-w-2xl mx-auto mt-4">
            Un institut agréé, des professeurs natifs et un cadre unique pour progresser
            rapidement tout en vivant une expérience spirituelle inoubliable.
          </p>
        </div>

        {/* Packs */}
        <div
          ref={packsBlock.ref}
          className={`grid md:grid-cols-3 gap-6 mb-20 reveal ${packsBlock.isVisible ? 'is-visible' : ''}`}
        >
          {PACKS.map((pack, i) => (
            <div
              key={pack.name}
              className={`pack-card p-8 flex flex-col ${pack.featured ? 'featured' : ''} ${
                i === 1 ? 'delay-100' : i === 2 ? 'delay-200' : ''
              }`}
            >
              {pack.featured && (
                <span className="text-xs uppercase tracking-widest text-gold mb-3">
                  Le plus populaire
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold mb-2">{pack.name}</h3>
              <p className="font-display text-3xl text-gold mb-6">{pack.price}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {pack.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ivory/80">
                    <span className="text-gold mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#institut-form"
                className={pack.featured ? 'btn-gold w-full justify-center' : 'btn-outline w-full justify-center'}
                onClick={() => setFormule(pack.name)}
              >
                Choisir ce pack
              </a>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          ref={statsBlock.ref}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 reveal ${statsBlock.isVisible ? 'is-visible' : ''}`}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-4 text-center bg-forest/40 border border-gold/10"
            >
              <p className="font-display text-2xl text-gem font-semibold">{stat.value}</p>
              <p className="font-body text-xs text-ivory/40 uppercase tracking-widest mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div
          ref={formBlock.ref}
          id="institut-form"
          className={`max-w-2xl mx-auto bg-forest/30 border border-white/5 rounded-2xl p-8 reveal ${formBlock.isVisible ? 'is-visible' : ''}`}
        >
          <h3 className="font-display text-2xl font-semibold mb-6 text-center">
            Demande d&apos;information
          </h3>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input name="nom" required placeholder="Nom complet" className="form-input" />
            <input name="email" type="email" required placeholder="Email" className="form-input" />
            <input name="whatsapp" placeholder="WhatsApp (optionnel)" className="form-input" />
            <select
              name="formule"
              className="form-input"
              value={formule}
              onChange={(e) => setFormule(e.target.value)}
            >
              <option value="">Choisir une formule</option>
              {PACKS.map((pack) => (
                <option key={pack.name} value={pack.name}>
                  {pack.name} — {pack.price}
                </option>
              ))}
            </select>
            <textarea
              name="message"
              placeholder="Votre message"
              rows={4}
              className="form-input resize-none"
            />

            <button type="submit" disabled={status === 'loading'} className="btn-gold justify-center">
              {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>

            {status === 'ok' && (
              <p className="text-emerald text-sm text-center">
                Merci ! Votre demande a bien été envoyée.
              </p>
            )}
            {status === 'err' && (
              <p className="text-sm text-center text-red-400">
                Une erreur est survenue. Vous pouvez aussi nous contacter directement sur WhatsApp.
              </p>
            )}

            <a
              href="https://wa.me/33764850414?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20l%27institut"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline justify-center"
            >
              Contacter sur WhatsApp
            </a>
          </form>
        </div>
      </div>
    </section>
  )
}
