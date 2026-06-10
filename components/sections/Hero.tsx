'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920&auto=format&fit=crop&q=85'

const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: Math.round(Math.random() * 100),
  size: 2 + Math.round(Math.random() * 2),
  duration: 8 + Math.round(Math.random() * 6),
  delay: Math.round(Math.random() * 10),
}))

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const onScroll = () => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden flex items-center">
      {/* Background image with parallax */}
      <div
        ref={imgRef}
        className="absolute z-0"
        style={{
          inset: '-20%',
          backgroundAttachment: isMobile ? 'scroll' : undefined,
        }}
      >
        <Image
          src={HERO_IMAGE}
          alt="Désert d'Arabie au coucher du soleil"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Overlay base */}
      <div className="absolute inset-0 z-[1] bg-void/55" />

      {/* Geometric islamic pattern */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23f4efe4' stroke-width='1'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Ccircle cx='40' cy='40' r='28'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(circle at center, transparent 35%, var(--void) 100%)',
          opacity: 0.8,
        }}
      />

      {/* Golden glow at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, var(--gold) 0%, transparent 70%)',
          opacity: 0.06,
        }}
      />

      {/* Golden particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 w-full">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tracking-widest uppercase text-gold backdrop-blur-md border border-gold/30"
              style={{
                background: 'rgba(196,154,60,0.08)',
                boxShadow: '0 0 24px rgba(196,154,60,0.08), inset 0 1px 0 rgba(196,154,60,0.12)',
                animation: 'pulse 2.4s ease-in-out infinite',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
              Depuis Médine · 11ᵉ session
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-forest/60 border border-white/10 text-xs tracking-widest uppercase text-ivory/80">
              NEOM 2030
            </span>
          </div>

          <p
            className="font-arabic text-2xl md:text-3xl text-gold mb-4"
            dir="rtl"
            style={{ animation: 'arabicGlow 3.5s ease-in-out infinite' }}
          >
            الخطط الرائعة من الجزيرة العربية
          </p>

          <h1
            className="font-display font-semibold leading-[1.05] mb-6 text-ivory"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            Vivez l&apos;Arabie{' '}
            <em
              className="not-italic bg-clip-text text-transparent bg-[length:200%_auto]"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, var(--gold), var(--gold-hi), var(--gold))',
                animation: 'shimmer 4s linear infinite',
              }}
            >
              de l&apos;intérieur.
            </em>
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <span className="block w-[120px] h-px bg-gold" />
            <span className="block w-2.5 h-2.5 bg-gold rotate-45" />
            <span className="block w-[120px] h-px bg-gold" />
          </div>

          <div
            className="backdrop-blur-xl border border-gold/15 rounded-xl mb-10 max-w-xl"
            style={{ background: 'rgba(12,29,20,0.5)', padding: '1.5rem 2rem' }}
          >
            <p className="font-body text-ivory/90 leading-relaxed">
              Institut de langue arabe agréé à Médine, camp bédouin dans le désert,
              e-books et adresses confidentielles. Omra incluse, professeurs natifs.
            </p>
          </div>

          <div className="flex flex-wrap" style={{ gap: '1rem' }}>
            <a href="#institut" className="btn-gold">
              Découvrir l&apos;institut
            </a>
            <a href="#camp" className="btn-outline">
              Le camp bédouin
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="w-6 h-10 rounded-full border border-ivory/30 flex items-start justify-center p-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-gold"
            style={{ animation: 'scrollDot 1.4s ease-in-out infinite' }}
          />
        </span>
      </div>

      {/* Bottom wave */}
      <svg
        className="absolute bottom-0 left-0 w-full z-10"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#0c1d14"
          d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
        />
      </svg>
    </section>
  )
}
