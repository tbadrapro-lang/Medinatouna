'use client'

import { useState, FormEvent } from 'react'
import { Play, Star, Quote } from 'lucide-react'
import { saveLead } from '@/lib/supabase'
import Carousel from '@/components/ui/Carousel'
import PaymentModal from '@/components/ui/PaymentModal'

const CAMP_IMAGES = [
  'https://i.ibb.co/DHsvdSY2/camp1.jpg',
  'https://i.ibb.co/B2N5JhP7/camp2.jpg',
  'https://i.ibb.co/27HQzhqF/camp3.jpg',
  'https://i.ibb.co/NnjGgdCD/camp4.jpg',
  'https://i.ibb.co/whnsgWwx/camp5.jpg',
  'https://i.ibb.co/0ycDNkGc/camp6.jpg',
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

const AVIS = [
  {
    name: 'Fayçal',
    date: '18 mai 2026',
    stars: 5,
    text: "Superbe organisation, équipe très accueillante et professionnelle. La soirée dans le désert restera un souvenir inoubliable, je recommande vivement !",
  },
  {
    name: 'Yassine B.',
    date: '12 mars 2026',
    stars: 5,
    text: "Excellente expérience, tout était parfaitement organisé du transport jusqu'au campement. L'ambiance bédouine était authentique et chaleureuse.",
  },
  {
    name: 'Dounia',
    date: '2 mars 2026',
    stars: 5,
    text: "Nous avons vécu une expérience incroyable dans le désert, entre dîner traditionnel, feu de camp et ciel étoilé. Un vrai moment hors du temps.",
  },
  {
    name: 'Lina',
    date: '28 février 2026',
    stars: 5,
    text: "Journée incroyable et inoubliable, l'équipe est aux petits soins et très bienveillante. Merci pour ce magnifique moment partagé en famille.",
  },
  {
    name: 'benrached',
    date: '25 février 2026',
    stars: 5,
    text: "Nous sommes très contents de notre expérience, organisation impeccable et accueil chaleureux. À refaire sans hésiter !",
  },
]

const WHATSAPP_CAMP = '966582538386'

type Status = 'idle' | 'loading' | 'ok' | 'err'

export default function Camp() {
  const [status, setStatus] = useState<Status>('idle')
  const [modalPack, setModalPack] = useState<(typeof PACKS)[number] | null>(null)
  const [videoError, setVideoError] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const data = new FormData(form)

    const message = `Date souhaitée: ${data.get('date_souhait') || ''}\nNb personnes: ${data.get('personnes') || ''}\nMessage: ${data.get('message') || ''}`

    const { error } = await saveLead({
      nom: String(data.get('nom') || ''),
      email: String(data.get('email') || ''),
      whatsapp: String(data.get('whatsapp') || ''),
      service: 'camp_bedouin',
      formule: String(data.get('formule') || ''),
      date_souhait: String(data.get('date_souhait') || ''),
      message,
      source: 'site',
    })

    try {
      await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: String(data.get('nom') || ''),
          email: String(data.get('email') || ''),
          service: 'camp_bedouin',
          formule: String(data.get('formule') || ''),
          whatsapp: String(data.get('whatsapp') || ''),
          message,
        }),
      })
    } catch {}

    if (error) {
      setStatus('err')
    } else {
      setStatus('ok')
      form.reset()
      window.open(`https://wa.me/${WHATSAPP_CAMP}?text=${encodeURIComponent("Bonjour, je m'appelle [Votre Nom] et je souhaite réserver une expérience au camp bédouin dans le désert de Médine. Pouvez-vous me donner plus d'informations sur les disponibilités et les tarifs ?")}`, '_blank')
    }
  }

  return (
    <section id="camp" className="relative py-24 px-6 bg-void">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label justify-center">Expérience désert</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4">
            Le camp bédouin
          </h2>
        </div>

        {/* Carousel */}
        <div className="mb-16">
          <Carousel images={CAMP_IMAGES} caption="Immersion dans le désert · PrestaArabia" aspect="aspect-video" />
        </div>

        {/* PrestaArabia presentation */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Une immersion bédouine signée PrestaArabia
            </h3>
            <p className="font-body text-ivory/70 leading-relaxed mb-4">
              À quelques encablures de Médine, notre partenaire PrestaArabia vous ouvre les portes
              d&apos;un campement privé niché au cœur du désert d&apos;Arabie. Loin de l&apos;agitation
              de la ville, vous y découvrirez l&apos;hospitalité authentique des Bédouins, leurs
              traditions culinaires et leur rapport intime au désert, transmis de génération en
              génération.
            </p>
            <p className="font-body text-ivory/70 leading-relaxed mb-6">
              Au programme : accueil chaleureux à votre arrivée, activités traditionnelles, dîner
              typique préparé sur place et une soirée mémorable autour du feu, sous un ciel étoilé
              d&apos;une pureté rare. Une parenthèse hors du temps, pensée pour petits et grands.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Campement privé', 'Accueil bédouin', 'Soirée autour du feu'].map((b) => (
                <span key={b} className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full bg-forest/50 border border-white/5 text-ivory/80">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="relative aspect-video border border-gold/20 bg-forest/20 overflow-hidden">
            {!videoError ? (
              <video
                src="/videos/camp-video.mp4"
                controls
                className="w-full h-full object-cover"
                onError={() => setVideoError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-ivory/60 px-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center">
                  <Play className="text-gold" size={28} />
                </div>
                <p className="text-sm">
                  Vidéo à venir — uploadez <code className="text-gold">/public/videos/camp-video.mp4</code>
                </p>
                <p className="text-xs text-ivory/40">
                  (Badra : envoyer la vidéo par WhatsApp au 0764850414)
                </p>
              </div>
            )}
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
              <button
                onClick={() => setModalPack(pack)}
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
            whatsappNumber={WHATSAPP_CAMP}
            service="camp_bedouin"
            onClose={() => setModalPack(null)}
          />
        )}

        {/* Reviews */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <span className="section-label justify-center">Avis clients</span>
            <h3 className="font-display text-3xl md:text-4xl font-semibold mt-4">
              Ce qu&apos;ils en disent
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

        {/* Form */}
        <div id="camp-form" className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Réservez votre nuit dans le désert
            </h3>
            <p className="font-body text-ivory/70 leading-relaxed mb-6">
              Remplissez le formulaire ci-contre, notre partenaire PrestaArabia vous recontacte
              rapidement pour organiser votre expérience.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_CAMP}?text=${encodeURIComponent("Bonjour, je m'appelle [Votre Nom] et je souhaite réserver une expérience au camp bédouin dans le désert de Médine. Pouvez-vous me donner plus d'informations sur les disponibilités et les tarifs ?")}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-outline"
            >
              Contacter PrestaArabia sur WhatsApp
            </a>
          </div>

          <div className="bg-forest/30 border border-white/5 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input name="nom" required placeholder="Nom complet" className="form-input" />
              <input name="email" type="email" required placeholder="Email" className="form-input" />
              <input name="whatsapp" placeholder="WhatsApp (optionnel)" className="form-input" />
              <input name="date_souhait" type="date" className="form-input" />
              <input name="personnes" placeholder="Nombre de personnes" className="form-input" />
              <select name="formule" className="form-input" defaultValue="">
                <option value="">Choisir une formule</option>
                {PACKS.map((pack) => (
                  <option key={pack.name} value={pack.name}>
                    {pack.name} — {pack.price}
                  </option>
                ))}
              </select>
              <textarea name="message" placeholder="Message (optionnel)" rows={3} className="form-input resize-none" />

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
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
