'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { saveLead } from '@/lib/supabase'
import BlurReveal from '@/components/ui/BlurReveal'

// CONTENU RÉEL PRESTARABIA.COM
const PACKS_CAMP = [
  {
    id: 'cavalier',
    title: 'Package Cavalier',
    tagline: 'Une aventure équestre inoubliable',
    price: '50€',
    sub: '/ personne',
    featured: false,
    items: [
      'Transfert aller-retour',
      'Équitation ou quad dans le désert (~1h30)',
      'Thé et lait de chamelle (si disponible)',
    ],
  },
  {
    id: 'soiree',
    title: 'Package Soirée Bédouine',
    tagline: 'Une soirée authentique sous les étoiles',
    price: '50€',
    sub: '/ personne',
    featured: false,
    items: [
      'Transfert aller-retour',
      'Soirée dans un camp privatisé',
      "Initiation tir à l'arc",
      "Équitation dans l'enclos",
      'Thé et lait de chamelle (si disponible)',
      'Repas inclus',
      'Bois de feu (en hiver)',
    ],
  },
  {
    id: 'premium',
    title: 'Package Premium Tout Inclus',
    tagline: "L'expérience bédouine ultime — tout compris",
    price: '85€',
    sub: '/ personne',
    featured: true,
    items: [
      'Transfert aller-retour',
      'Équitation ou quad dans le désert (~1h30)',
      'Soirée dans un camp privatisé',
      "Initiation tir à l'arc",
      "Équitation dans l'enclos",
      'Thé et lait de chamelle (si disponible)',
      'Repas inclus',
      'Bois de feu (en hiver)',
    ],
  },
]

const ACTIVITES = [
  'Feux de camp bédouins', 'Café saoudien / thé à la menthe',
  "Tir à l'arc", 'Tentes traditionnelles / modernes',
  'Barbecue / plats traditionnels', 'Équitation dans le désert',
  'Lait de chamelle', 'Volley / Badminton',
]

const AUTHENTICITE = [
  'Cuisine bédouine extérieure', 'Assises saoudiennes',
  'Tente bédouine traditionnelle', 'Deux espaces feu de camp',
]

const CONFORT = [
  'Eau potable', 'Tente pyramidale moderne',
  'Paddock pour chevaux', 'Toilettes',
]

export default function Camp() {
  const [form, setForm] = useState({ nom: '', email: '', whatsapp: '', formule: 'premium', date_souhait: '', message: '' })
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'err'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const { error } = await saveLead({ ...form, service: 'camp_bedouin' })
    setStatus(error ? 'err' : 'ok')
  }

  return (
    <section id="camp" className="relative py-24 md:py-32 overflow-hidden bg-[#07110c]">
      {/* Image désert en fond subtil */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1400&auto=format&fit=crop&q=60')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07,
        }} />
      <div className="absolute inset-0 geo-pattern opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="section-label justify-center mb-4">Camp bédouin · Désert de Médine</div>
          <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3.5rem)] font-light text-[#f4efe4] leading-tight mb-4">
            <BlurReveal text="Une nuit dans le désert" delay={0} />
            <span className="block italic text-[#c49a3c]">
              <BlurReveal text="de Médine." delay={0.2} />
            </span>
          </h2>
          <p className="text-[#f4efe4]/55 text-[.9rem] leading-relaxed">
            Le Bedouin Camp est une immersion dans la culture saoudienne, au cœur du désert médinois.
            Un moment de partage, de calme, de traditions et de convivialité, loin de l&apos;agitation du quotidien.
          </p>
          <p className="text-[#c49a3c]/60 text-[.75rem] mt-2">
            🏷️ Remise disponible pour les agences ou groupes de 20 personnes et plus.
          </p>
        </div>

        {/* Grid : infos gauche + placeholder vidéo droite */}
        <div className="grid md:grid-cols-2 gap-8 mb-14">
          <div>
            <p className="text-[.72rem] tracking-widest uppercase text-[#c49a3c]/60 mb-3">Activités incluses</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {ACTIVITES.map(a => (
                <span key={a} className="text-[.75rem] px-3 py-1.5 border border-[#c49a3c]/20 text-[#f4efe4]/55 min-h-[36px] flex items-center">{a}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[.68rem] uppercase tracking-widest text-[#c49a3c]/55 mb-2">L&apos;authenticité</p>
                {AUTHENTICITE.map(a => (
                  <p key={a} className="text-[.78rem] text-[#f4efe4]/50 py-1 border-b border-[#c49a3c]/[.08]">{a}</p>
                ))}
              </div>
              <div>
                <p className="text-[.68rem] uppercase tracking-widest text-[#c49a3c]/55 mb-2">Le confort</p>
                {CONFORT.map(a => (
                  <p key={a} className="text-[.78rem] text-[#f4efe4]/50 py-1 border-b border-[#c49a3c]/[.08]">{a}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Placeholder vidéo premium */}
          <div className="relative aspect-video border border-[#c49a3c]/15 bg-gradient-to-br from-[#12301e]/60 to-[#040d08]/80 flex items-center justify-center overflow-hidden">
            <p className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center font-serif text-[8rem] text-[#c49a3c]/[.06] select-none" style={{fontFamily:'var(--font-noto-arabic)'}}>صحراء</p>
            <div className="relative text-center">
              <div className="w-14 h-14 rounded-full bg-[#c49a3c]/15 border border-[#c49a3c]/35 flex items-center justify-center mx-auto mb-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#f4efe4]/70 ml-0.5"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <p className="text-[#f4efe4]/35 text-sm">Vidéo du camp</p>
              <p className="text-[#f4efe4]/20 text-xs mt-1">Envoyez votre vidéo → intégration directe</p>
            </div>
          </div>
        </div>

        {/* Packs — scroll horizontal mobile */}
        <div className="flex overflow-x-auto gap-4 pb-3 mb-14 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
          {PACKS_CAMP.map(p => (
            <motion.div
              key={p.id}
              whileHover={{ y: -6 }}
              className={`pack-card flex-shrink-0 w-[82vw] md:w-auto snap-start p-6 flex flex-col ${p.featured ? 'featured' : ''}`}
            >
              {p.featured && (
                <div className="text-center mb-3">
                  <span className="text-[.62rem] font-semibold tracking-widest uppercase bg-[#c49a3c] text-[#0c1d14] px-3 py-1">⭐ PREMIUM</span>
                </div>
              )}
              <h3 className="font-serif text-lg text-[#f4efe4] font-medium mb-1">{p.title}</h3>
              <p className="text-[.74rem] text-[#f4efe4]/40 italic mb-4">{p.tagline}</p>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="font-serif text-3xl text-[#c49a3c] font-semibold">{p.price}</span>
                <span className="text-[.78rem] text-[#f4efe4]/40">{p.sub}</span>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {p.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-[.8rem] text-[#f4efe4]/65 font-light">
                    <span className="text-[#287a4f] mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setForm(f => ({ ...f, formule: p.id }))}
                className={`w-full py-3 text-[.84rem] font-medium transition-all min-h-[48px] flex items-center justify-center gap-2 ${
                  form.formule === p.id ? 'btn-gold' : 'border border-[#c49a3c]/30 text-[#f4efe4]/65 hover:border-[#c49a3c] hover:text-[#c49a3c]'
                }`}
              >
                {form.formule === p.id ? '✓ Sélectionné' : 'Réserver'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Formulaire réservation */}
        <div className="max-w-lg mx-auto">
          <div className="border border-[#c49a3c]/[.18] bg-[#07110c]/70 backdrop-blur-sm p-6 md:p-8">
            <h3 className="font-serif text-xl text-[#c49a3c] mb-5">Réserver une date</h3>
            {status === 'ok' ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-[#f4efe4]/75 font-light">Réservation reçue ! Confirmation sous 24h sur WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <input className="form-input" placeholder="Nom complet *" value={form.nom} onChange={e => setForm(f => ({...f, nom: e.target.value}))} required />
                <input type="email" className="form-input" placeholder="Email *" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required />
                <input className="form-input" placeholder="WhatsApp *" value={form.whatsapp} onChange={e => setForm(f => ({...f, whatsapp: e.target.value}))} required />
                <input type="date" className="form-input" value={form.date_souhait} onChange={e => setForm(f => ({...f, date_souhait: e.target.value}))} />
                <select className="form-input" value={form.formule} onChange={e => setForm(f => ({...f, formule: e.target.value}))}>
                  <option value="cavalier">Package Cavalier — 50€/pers</option>
                  <option value="soiree">Soirée Bédouine — 50€/pers</option>
                  <option value="premium">Premium Tout Inclus — 85€/pers</option>
                </select>
                <textarea className="form-input" placeholder="Nombre de personnes + message" rows={2} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} />
                <div className="flex gap-3 pt-1">
                  <button type="submit" disabled={status==='loading'} className="btn-gold flex-1">
                    {status === 'loading' ? 'Envoi...' : 'Envoyer →'}
                  </button>
                  <a href="https://wa.me/33764850414?text=Bonjour%2C%20je%20souhaite%20r%C3%A9server%20le%20camp%20b%C3%A9douin%20PrestaArabia"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 border border-[#25d366]/35 text-[#4ade80] text-sm hover:bg-[#25d366]/10 transition-all min-h-[48px]">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WA
                  </a>
                </div>
                {status === 'err' && <p className="text-red-400 text-sm">Erreur. Contactez-nous sur WhatsApp.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
