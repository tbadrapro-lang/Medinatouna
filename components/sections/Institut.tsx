'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { saveLead } from '@/lib/supabase'
import BlurReveal from '@/components/ui/BlurReveal'

// CONTENU RÉEL MEDINATOUNA.SHOP
const PACKS = [
  {
    id: 'ete',
    badge: '☀️ Spécial Été · Places limitées',
    title: 'Pack Spécial Été',
    sub: 'Réservé aux hommes',
    price: '995 €',
    period: '/ mois',
    payment: 'Paiement en 2× sans frais',
    featured: false,
    items: [
      { icon: '🌊', title: 'Activités estivales', desc: 'Mer Rouge, excursions Badr & Uhud' },
      { icon: '🏠', title: 'Hébergement meublé climatisé', desc: 'Confort optimal en plein été' },
      { icon: '🕋', title: 'Omra complète incluse', desc: 'Guide francophone dédié' },
      { icon: '📖', title: "Cours d'arabe", desc: '+38h/mois · 12 niveaux' },
    ],
  },
  {
    id: 'intensif',
    badge: '⭐ Le plus choisi',
    title: 'Langue Arabe Intensif',
    sub: "Cours d'arabe intensifs · 1 à 3 mois",
    price: 'À partir de 795 €',
    period: '/ mois',
    payment: 'Paiement en 2× sans frais',
    featured: true,
    items: [
      { icon: '🚀', title: "Cours d'arabe intensifs", desc: '+38h de cours/mois · 12 niveaux' },
      { icon: '📍', title: 'Appartement meublé', desc: 'À 18 min à pied du Masjid An-Nabawi' },
      { icon: '🕋', title: 'Omra complète incluse', desc: 'Avec guide francophone' },
      { icon: '🎓', title: 'Suivi pédagogique', desc: 'Professeurs natifs qualifiés' },
    ],
  },
  {
    id: 'famille',
    badge: '👑 Premium Famille',
    title: 'Pack Famille Premium',
    sub: 'Hébergement privé · Sessions H/F',
    price: 'À partir de 1 990 €',
    period: '',
    payment: 'Paiement en 2× sans frais',
    featured: false,
    items: [
      { icon: '🏡', title: 'Hébergement privé', desc: 'Wifi fibre optique inclus' },
      { icon: '📚', title: "Cours d'arabe", desc: 'Adaptés famille · sessions H/F' },
      { icon: '🕋', title: 'Omra complète incluse', desc: 'Excursions famille à Médine' },
      { icon: '👨‍👩‍👧', title: 'Activités familiales', desc: 'Programme éducatif et ludique' },
    ],
  },
]

// AVIS RÉELS GOOGLE
const AVIS = [
  {
    name: 'Lucas',
    stars: 5,
    date: 'il y a un mois',
    text: "« J'ai passé un mois chez Medinatouna à Médine et mon expérience a été exceptionnelle. L'enseignement est de grande qualité, structuré et adapté au niveau de chacun. »",
  },
  {
    name: 'Djibrilhamza S.',
    stars: 5,
    date: 'il y a un mois',
    text: "« Très bon merkez pour l'apprentissage de la langue arabe. J'étais parti pour rester 1 mois. Ça fait 3 mois que j'y suis et j'espère rester jusqu'en fin d'année. Le prof est super compétent. »",
  },
  {
    name: 'Toufiq',
    stars: 5,
    date: 'il y a un mois',
    text: "« Très bon merkez, je recommande. Je n'avais aucune base en arabe et grâce à leur programme j'ai pu apprendre à lire et écrire l'arabe. Première fois pour la Omra, j'ai été très bien accompagné. »",
  },
]

// PROCESSUS 4 ÉTAPES (Medinatouna)
const STEPS = [
  { n: '1', title: 'Tu choisis ton pack', desc: 'Parcours nos packs et sélectionne celui qui correspond à ton projet : durée, profil, objectifs.' },
  { n: '2', title: 'Tu réserves en ligne', desc: 'Réservation sécurisée ou via WhatsApp. Réponse sous 24h, accompagnement personnalisé.' },
  { n: '3', title: 'Tu rejoins le groupe WhatsApp', desc: 'Un groupe dédié te donne toutes les infos : conseils départ, checklist, contacts sur place.' },
  { n: '4', title: 'Tu arrives à Médine', desc: "On s'occupe de tout : accueil, hébergement, cours, Omra, excursions. Tu profites." },
]

export default function Institut() {
  const [form, setForm] = useState({ nom: '', email: '', whatsapp: '', formule: 'intensif', message: '' })
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'err'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    const { error } = await saveLead({ ...form, service: 'institut' })
    setStatus(error ? 'err' : 'ok')
  }

  return (
    <section id="institut" className="relative py-24 md:py-32 overflow-hidden" style={{background:'linear-gradient(180deg, #0c1d14 0%, #07110c 100%)'}}>
      {/* Déco rings */}
      <div className="absolute top-[-8rem] right-[-8rem] w-[36rem] h-[36rem] rounded-full border border-[#c49a3c]/[.06] pointer-events-none" style={{animation:'spin 80s linear infinite'}} />
      <div className="absolute inset-0 geo-pattern opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-label justify-center mb-4">Institut de langue arabe · Médine</div>
          <h2 className="font-serif text-[clamp(1.9rem,4.5vw,3.5rem)] font-light text-[#f4efe4] leading-tight mb-4">
            <BlurReveal text="Apprends l'arabe" delay={0} />
            <span className="block italic text-[#c49a3c]">
              <BlurReveal text="au cœur de Médine." delay={0.2} />
            </span>
          </h2>
          <p className="text-[#f4efe4]/55 text-[.9rem] font-light leading-relaxed">
            Centre agréé par l&apos;État · À 18 min à pied du Masjid an-Nabawi · Note{' '}
            <span className="text-[#c49a3c] font-medium">5,0/5</span> sur Google
          </p>
          {/* Citation arabe */}
          <div className="mt-5">
            <p className="arabic-glow text-[#c49a3c]/65 text-lg" style={{fontFamily:'var(--font-noto-arabic)', direction:'rtl'}}>
              طلب العلم فريضة على كل مسلم
            </p>
            <p className="text-[.72rem] italic text-[#f4efe4]/30 mt-1">
              « La quête du savoir est une obligation pour tout musulman »
            </p>
          </div>
        </div>

        {/* Stats — mobile scroll horizontal */}
        <div className="flex overflow-x-auto gap-3 pb-2 mb-12 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible">
          {[
            { v: '+38h', l: 'de cours / mois' },
            { v: '12', l: 'niveaux pédagogiques' },
            { v: '18 min', l: 'du Masjid Nabawi' },
            { v: '5,0/5', l: 'sur Google Maps' },
          ].map((s, i) => (
            <div key={i} className="flex-shrink-0 w-[44vw] md:w-auto snap-start text-center p-4 border border-[#c49a3c]/10 bg-[#12301e]/35">
              <div className="font-serif text-2xl text-[#287a4f] font-semibold">{s.v}</div>
              <div className="text-[.68rem] text-[#f4efe4]/40 uppercase tracking-widest mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Packs — mobile scroll horizontal */}
        <div className="flex overflow-x-auto gap-4 pb-3 mb-14 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
          {PACKS.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -6 }}
              className={`pack-card flex-shrink-0 w-[85vw] md:w-auto snap-start p-6 flex flex-col ${p.featured ? 'featured' : ''}`}
            >
              <div className="text-[.68rem] text-[#c49a3c] mb-2 tracking-wide">{p.badge}</div>
              <h3 className="font-serif text-xl text-[#f4efe4] font-medium mb-1">{p.title}</h3>
              <p className="text-[.74rem] text-[#f4efe4]/40 mb-4">{p.sub}</p>
              <div className="mb-1">
                <span className="font-serif text-2xl text-[#c49a3c] font-semibold">{p.price}</span>
                {p.period && <span className="text-[.78rem] text-[#f4efe4]/40 ml-1">{p.period}</span>}
              </div>
              <p className="text-[.7rem] text-[#c49a3c]/55 mb-5">💳 {p.payment}</p>
              <ul className="space-y-3 flex-1 mb-6">
                {p.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <span className="text-[.82rem] text-[#f4efe4]/85 font-medium">{item.title}</span>
                      <span className="text-[.75rem] text-[#f4efe4]/40 block">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setForm(f => ({ ...f, formule: p.id }))}
                className={`w-full py-3 text-[.85rem] font-medium transition-all flex items-center justify-center gap-2 min-h-[48px] ${
                  p.featured || form.formule === p.id
                    ? 'btn-gold'
                    : 'border border-[#c49a3c]/35 text-[#f4efe4]/70 hover:border-[#c49a3c] hover:text-[#c49a3c]'
                }`}
              >
                {form.formule === p.id ? '✓ Sélectionné' : 'Choisir ce pack'}
                {form.formule !== p.id && <ArrowRight size={14} />}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Process 4 étapes */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="font-serif text-2xl text-[#f4efe4] text-center mb-8 font-light">Comment ça se passe ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-4 border border-[#c49a3c]/10 bg-[#12301e]/25"
              >
                <div className="w-8 h-8 rounded-full bg-[#c49a3c]/15 border border-[#c49a3c]/30 flex items-center justify-center flex-shrink-0 font-serif text-[#c49a3c] font-semibold text-sm">
                  {s.n}
                </div>
                <div>
                  <p className="text-[.85rem] font-medium text-[#f4efe4]/85 mb-1">{s.title}</p>
                  <p className="text-[.78rem] text-[#f4efe4]/45 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Avis Google réels */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="section-label justify-center mb-2">Avis Google vérifiés</div>
            <p className="text-[#f4efe4]/40 text-sm">Note <span className="text-[#c49a3c]">5,0 / 5</span> ·{' '}
              <a href="https://maps.app.goo.gl/wy16heEf6eNbzaL17" target="_blank" rel="noopener noreferrer" className="text-[#c49a3c] hover:underline">
                Voir sur Google Maps →
              </a>
            </p>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-3 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
            {AVIS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="pack-card flex-shrink-0 w-[80vw] md:w-auto snap-start p-5"
              >
                <div className="text-[#c49a3c] text-sm mb-3">{'★'.repeat(a.stars)}</div>
                <p className="text-[.83rem] text-[#f4efe4]/75 font-light leading-relaxed italic mb-4">{a.text}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[.78rem] font-medium text-[#f4efe4]/65">{a.name}</span>
                  <span className="text-[.68rem] text-[#f4efe4]/30">{a.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Formulaire inscription */}
        <div className="max-w-lg mx-auto">
          <div className="border border-[#c49a3c]/[.18] bg-[#07110c]/70 backdrop-blur-sm p-6 md:p-8">
            <h3 className="font-serif text-xl text-[#c49a3c] mb-5">Demande d&apos;inscription</h3>
            {status === 'ok' ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-[#f4efe4]/75 font-light">Demande reçue ! Nous vous contactons sous 24h sur WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <input className="form-input" placeholder="Votre nom complet *" value={form.nom} onChange={e => setForm(f => ({...f, nom: e.target.value}))} required />
                <input type="email" className="form-input" placeholder="Email *" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required />
                <input className="form-input" placeholder="WhatsApp (ex: +33...)" value={form.whatsapp} onChange={e => setForm(f => ({...f, whatsapp: e.target.value}))} />
                <select className="form-input" value={form.formule} onChange={e => setForm(f => ({...f, formule: e.target.value}))}>
                  <option value="intensif">Langue Arabe Intensif — à partir de 795€/mois</option>
                  <option value="ete">Pack Spécial Été — 995€/mois</option>
                  <option value="famille">Pack Famille Premium — à partir de 1990€</option>
                </select>
                <textarea className="form-input" placeholder="Message (optionnel)" rows={3} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} />
                <p className="text-[.68rem] text-[#f4efe4]/25">En envoyant ce formulaire, vous acceptez d&apos;être recontacté par l&apos;équipe Medinatouna.</p>
                <div className="flex gap-3 pt-1">
                  <button type="submit" disabled={status==='loading'} className="btn-gold flex-1">
                    {status === 'loading' ? 'Envoi...' : 'Envoyer ma demande →'}
                  </button>
                  <a href="https://wa.me/33764850414?text=Bonjour%2C%20je%20souhaite%20m%27inscrire%20%C3%A0%20l%27institut%20Medinatouna"
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
