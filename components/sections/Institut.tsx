'use client'

import { useState, FormEvent } from 'react'
import { saveLead } from '@/lib/supabase'

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
    <section id="institut" className="relative py-24 px-6 bg-deep">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label justify-center">Institut de langue</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4">
            Apprenez l&apos;arabe à Médine
          </h2>
          <p className="font-body text-ivory/70 max-w-2xl mx-auto mt-4">
            Un institut agréé, des professeurs natifs et un cadre unique pour progresser
            rapidement tout en vivant une expérience spirituelle inoubliable.
          </p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl text-gold font-semibold">{stat.value}</p>
              <p className="font-body text-sm text-ivory/60 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div id="institut-form" className="max-w-2xl mx-auto bg-forest/30 border border-white/5 rounded-2xl p-8">
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
