'use client'

import { useState, FormEvent } from 'react'
import { saveLead } from '@/lib/supabase'

const ACTIVITES = [
  'Balade à dos de chameau',
  'Tir à l\'arc',
  'Soirée musicale',
  'Cuisine bédouine',
  'Observation des étoiles',
  'Quad dans le désert',
]

const PACKS = [
  {
    name: 'Cavalier',
    price: '50€',
    featured: false,
    items: ['Balade à cheval', 'Goûter bédouin', '2h sur place'],
  },
  {
    name: 'Soirée',
    price: '50€',
    featured: false,
    items: ['Dîner traditionnel', 'Spectacle musical', 'Veillée sous les étoiles'],
  },
  {
    name: 'Premium',
    price: '85€',
    featured: true,
    items: ['Journée complète', 'Toutes activités incluses', 'Transport aller-retour'],
  },
]

type Status = 'idle' | 'loading' | 'ok' | 'err'

export default function Camp() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = new FormData(form)

    const { error } = await saveLead({
      nom: String(data.get('nom') || ''),
      email: String(data.get('email') || ''),
      whatsapp: String(data.get('whatsapp') || ''),
      service: 'camp_bedouin',
      formule: String(data.get('formule') || ''),
      date_souhait: String(data.get('date_souhait') || ''),
      source: 'site',
    })

    if (error) {
      setStatus('err')
    } else {
      setStatus('ok')
      form.reset()
    }
  }

  return (
    <section id="camp" className="relative py-24 px-6 bg-void">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="section-label">Expérience désert</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4 mb-6">
              Le camp bédouin
            </h2>
            <p className="font-body text-ivory/70 leading-relaxed mb-6">
              Plongez au cœur du désert d&apos;Arabie, dans un campement traditionnel où
              hospitalité bédouine et ciel étoilé se mêlent pour une expérience inoubliable.
              Entre traditions ancestrales et confort moderne, vivez une nuit hors du temps.
            </p>
            <div className="flex flex-wrap gap-2">
              {ACTIVITES.map((activite) => (
                <span
                  key={activite}
                  className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full bg-forest/50 border border-white/5 text-ivory/80"
                >
                  {activite}
                </span>
              ))}
            </div>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-forest/40 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-ivory/50">
              <div
                className="w-16 h-16 rounded-full border-2 border-gold/40 border-t-gold flex items-center justify-center"
                style={{ animation: 'spin 3s linear infinite' }}
              >
                <span className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-gold ml-1" />
              </div>
              <p className="text-sm">Vidéo de présentation à venir</p>
            </div>
          </div>
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
                href="#camp-form"
                className={pack.featured ? 'btn-gold w-full justify-center' : 'btn-outline w-full justify-center'}
              >
                Réserver
              </a>
            </div>
          ))}
        </div>

        {/* Form */}
        <div id="camp-form" className="max-w-2xl mx-auto bg-forest/30 border border-white/5 rounded-2xl p-8">
          <h3 className="font-display text-2xl font-semibold mb-6 text-center">
            Réserver votre expérience
          </h3>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input name="nom" required placeholder="Nom complet" className="form-input" />
            <input name="email" type="email" required placeholder="Email" className="form-input" />
            <input name="whatsapp" placeholder="WhatsApp (optionnel)" className="form-input" />
            <select name="formule" className="form-input" defaultValue="">
              <option value="">Choisir une formule</option>
              {PACKS.map((pack) => (
                <option key={pack.name} value={pack.name}>
                  {pack.name} — {pack.price}
                </option>
              ))}
            </select>
            <input name="date_souhait" type="date" className="form-input" />

            <button type="submit" disabled={status === 'loading'} className="btn-gold justify-center">
              {status === 'loading' ? 'Envoi en cours...' : 'Réserver maintenant'}
            </button>

            {status === 'ok' && (
              <p className="text-emerald text-sm text-center">
                Merci ! Votre demande de réservation a bien été envoyée.
              </p>
            )}
            {status === 'err' && (
              <p className="text-sm text-center text-red-400">
                Une erreur est survenue. Vous pouvez aussi nous contacter directement sur WhatsApp.
              </p>
            )}

            <a
              href="https://wa.me/33764850414?text=Bonjour%2C%20je%20souhaite%20r%C3%A9server%20le%20camp%20b%C3%A9douin"
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
