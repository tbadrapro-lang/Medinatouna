'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import BlurReveal from '@/components/ui/BlurReveal'

const HERO_IMAGE =
  process.env.NEXT_PUBLIC_HERO_IMAGE ||
  'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920&auto=format&fit=crop&q=85'

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const [particles] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      left: `${(i * 67 + 8) % 100}%`,
      size: 1.5 + (i % 3),
      duration: `${9 + (i % 6)}s`,
      delay: `${(i * 0.7) % 8}s`,
    }))
  )

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current && window.innerWidth > 768) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.38}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-end overflow-hidden bg-[#040d08]">
      {/* ── IMAGE FOND PARALLAX ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
        style={{
          backgroundImage: `url('${HERO_IMAGE}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />

      {/* ── OVERLAYS ── */}
      <div className="absolute inset-0 bg-[#040d08]/[.58]" />
      <div className="absolute inset-0 geo-pattern opacity-[0.025]" />
      {/* Elegance vertical lines */}
      <div className="absolute inset-0 hidden lg:flex justify-between px-16 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-px h-full bg-[#c49a3c]/5" />
        ))}
      </div>
      {/* Animated accent line (Elegance) */}
      <div
        className="absolute left-16 top-0 w-px bg-[#c49a3c]/35 hidden lg:block"
        style={{ height: '40%', animation: 'fadeUp 1.5s 0.8s both' }}
      />
      {/* Bottom gold gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c49a3c]/25 to-transparent" />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(4,13,8,.75) 100%)'}} />

      {/* ── PARTICULES DORÉES ── */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#c49a3c] pointer-events-none"
          style={{
            left: p.left, bottom: 0,
            width: p.size, height: p.size,
            animation: `rise ${p.duration} ${p.delay} linear infinite`,
            boxShadow: `0 0 ${p.size * 3}px rgba(196,154,60,.8)`,
          }}
        />
      ))}

      {/* ── CONTENU — Layout Elegance (justify-end + grid 12 cols) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 lg:pb-32 pt-24">
        <div className="grid lg:grid-cols-12 gap-8 items-end">

          {/* Gauche — texte principal */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tag saison */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-px bg-[#c49a3c]" />
              <span className="text-[.65rem] tracking-[.4em] uppercase text-[#f4efe4]/55">
                Médine · 11ᵉ session · NEOM 2030
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c49a3c] pulse-dot" />
            </motion.div>

            {/* Calligraphie */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="arabic-glow text-[#c49a3c] text-[clamp(1.2rem,2.5vw,1.8rem)]"
              style={{ fontFamily: 'var(--font-noto-arabic)', direction: 'rtl' }}
            >
              الخطط الرائعة من الجزيرة العربية
            </motion.p>

            {/* H1 — Elegance style */}
            <h1 className="font-serif text-[clamp(2.8rem,7vw,6.5rem)] font-light leading-[.9] tracking-tight text-[#f4efe4]">
              <BlurReveal text="Vivez l'Arabie" delay={0.6} />
              <br />
              <span className="text-gold-shimmer italic font-medium">
                <BlurReveal text="de l'intérieur." delay={0.9} />
              </span>
            </h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="max-w-xl p-4 md:p-5 bg-[#0c1d14]/[.55] backdrop-blur-xl border border-[#c49a3c]/10"
            >
              <p className="text-[#f4efe4]/70 text-[.92rem] font-light leading-relaxed">
                Institut de langue arabe agréé à Médine, camp bédouin dans le désert,
                <strong className="text-[#e0b85a] font-medium"> e-books exclusifs</strong> et
                adresses confidentielles. Omra incluse, professeurs natifs,
                <strong className="text-[#e0b85a] font-medium"> note 5,0/5</strong> sur Google.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <a href="#institut" className="btn-gold group">
                Découvrir l&apos;institut
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#camp" className="btn-outline">
                Camp bédouin →
              </a>
            </motion.div>
          </div>

          {/* Droite — Stats card glassmorphism (Elegance) — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="lg:col-span-4 hidden lg:block"
          >
            <div
              className="bg-[#f4efe4]/5 backdrop-blur-md border border-[#f4efe4]/10 p-7"
              style={{ boxShadow: 'rgba(14,63,126,.04) 0 0 0 1px, rgba(42,51,69,.04) 0 1px 1px -.5px, rgba(14,63,126,.04) 0 12px 12px -6px, rgba(14,63,126,.04) 0 24px 24px -12px' }}
            >
              <p className="text-[.6rem] tracking-[.4em] uppercase text-[#f4efe4]/40 mb-5">Medinatouna · Stats</p>
              <div className="space-y-5">
                {[
                  { v: '+38h', l: 'de cours / mois' },
                  { v: '12', l: 'niveaux pédagogiques' },
                  { v: '18 min', l: 'du Masjid Nabawi' },
                  { v: '5,0/5', l: 'sur Google Maps' },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="font-serif text-3xl text-[#c49a3c]">{s.v}</p>
                    <p className="text-[.78rem] text-[#f4efe4]/45 mt-0.5">{s.l}</p>
                    {i < 3 && <div className="w-full h-px bg-[#f4efe4]/[.08] mt-4" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[.5rem] tracking-[.45em] uppercase text-[#c49a3c]/45">Scroller</span>
        <div className="w-5 h-8 rounded-full border border-[#c49a3c]/35 flex items-start justify-center pt-1.5">
          <div className="w-[2px] h-[7px] rounded-sm bg-[#c49a3c]" style={{ animation: 'scrollDot 2s infinite' }} />
        </div>
      </div>
    </section>
  )
}
