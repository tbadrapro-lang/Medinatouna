'use client'

import { useState, FormEvent } from 'react'
import { saveLead } from '@/lib/supabase'

const EBOOKS = [
  {
    title: 'Les 100 phrases essentielles',
    arabic: 'مائة جملة أساسية',
    desc: 'Pour communiquer dès votre arrivée en Arabie.',
  },
  {
    title: 'Guide de l\'Omra sereine',
    arabic: 'دليل العمرة',
    desc: 'Toutes les étapes de votre Omra expliquées simplement.',
  },
  {
    title: 'Adresses confidentielles',
    arabic: 'عناوين خاصة',
    desc: 'Les meilleures adresses locales à Médine et Djeddah.',
  },
]

const CATALOGUE_TAGS = ['Tout', 'Institut', 'Camp', 'E-books'] as const
type Tag = (typeof CATALOGUE_TAGS)[number]

const CATALOGUE_ITEMS: { title: string; desc: string; tag: Tag }[] = [
  {
    title: 'Session intensive Médine',
    desc: '1 semaine de cours intensifs avec professeurs natifs.',
    tag: 'Institut',
  },
  {
    title: 'Nuit dans le désert',
    desc: 'Camp bédouin premium avec dîner et spectacle.',
    tag: 'Camp',
  },
  {
    title: 'Pack e-books complet',
    desc: 'Les 3 e-books pour préparer votre voyage.',
    tag: 'E-books',
  },
]

type Status = 'idle' | 'loading' | 'ok' | 'err'

export default function Ebooks() {
  const [status, setStatus] = useState<Status>('idle')
  const [filter, setFilter] = useState<Tag>('Tout')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = new FormData(form)

    const { error } = await saveLead({
      nom: String(data.get('email') || ''),
      email: String(data.get('email') || ''),
      service: 'lead_magnet',
      source: 'ebooks',
    })

    if (error) {
      setStatus('err')
    } else {
      setStatus('ok')
      form.reset()
    }
  }

  const filtered =
    filter === 'Tout' ? CATALOGUE_ITEMS : CATALOGUE_ITEMS.filter((item) => item.tag === filter)

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
          {EBOOKS.map((ebook) => (
            <div key={ebook.title} className="pack-card overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-forest to-night flex items-center justify-center">
                <p className="font-arabic text-3xl text-gold" dir="rtl">
                  {ebook.arabic}
                </p>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold mb-2">{ebook.title}</h3>
                <p className="font-body text-sm text-ivory/70">{ebook.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lead magnet */}
        <div className="max-w-2xl mx-auto bg-forest/30 border border-white/5 rounded-2xl p-8 text-center mb-24">
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

        {/* Catalogue */}
        <div id="catalogue">
          <div className="text-center mb-10">
            <span className="section-label justify-center">Catalogue</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4">
              Toutes nos offres
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATALOGUE_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-colors ${
                  filter === tag
                    ? 'border-gold text-gold bg-gold/10'
                    : 'border-white/10 text-ivory/60 hover:border-gold/40'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {filtered.map((item) => (
              <div key={item.title} className="pack-card p-6">
                <span className="text-xs uppercase tracking-widest text-gold">{item.tag}</span>
                <h3 className="font-display text-xl font-semibold mt-2 mb-2">{item.title}</h3>
                <p className="font-body text-sm text-ivory/70">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Bonus cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="pack-card p-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">Miel de Sidr</h3>
                <p className="font-body text-sm text-ivory/70">
                  Miel d&apos;Arabie pur, livré directement depuis nos partenaires locaux.
                </p>
              </div>
              <a
                href="https://wa.me/33764850414?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20miel%20de%20Sidr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline whitespace-nowrap"
              >
                WhatsApp
              </a>
            </div>
            <div className="pack-card p-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">Location E-scooter</h3>
                <p className="font-body text-sm text-ivory/70">
                  Déplacez-vous facilement à Médine avec nos e-scooters en location.
                </p>
              </div>
              <a
                href="https://wa.me/33764850414?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20la%20location%20d%27e-scooter"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline whitespace-nowrap"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
