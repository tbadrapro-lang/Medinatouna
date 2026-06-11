'use client'

import { useEffect, useRef, useState } from 'react'

const HERO_IMAGE = '/images/hero-masjid-nabawi.jpg'

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
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden flex items-center">
      <div
        ref={imgRef}
        className="absolute inset-0 -top-[10%] h-[120%] bg-cover bg-center"
        style={{
          backgroundColor: '#07110c',
          backgroundImage: `url('${HERO_IMAGE}')`,
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#040d08]/70 via-[#07110c]/60 to-[#0c1d14]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 w-full">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 text-xs tracking-widest uppercase text-gold"
              style={{ animation: 'pulse 2.4s ease-in-out infinite' }}
            >
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
              Depuis Médine · 11ᵉ session
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-forest/60 border border-white/10 text-xs tracking-widest uppercase text-ivory/80">
              NEOM 2030
            </span>
          </div>

          <p className="font-arabic text-2xl md:text-3xl text-gold mb-4" dir="rtl">
            الخطط الرائعة من الجزيرة العربية
          </p>

          <h1
            className="font-display font-semibold leading-[1.05] mb-6"
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
            <span className="block w-16 h-px bg-gold" />
            <span className="block w-2.5 h-2.5 bg-gold rotate-45" />
          </div>

          <div className="bg-forest/45 backdrop-blur rounded-2xl border border-white/5 p-6 mb-10 max-w-xl">
            <p className="font-body text-ivory/90 leading-relaxed">
              Institut de langue arabe agréé à Médine, camp bédouin dans le désert,
              e-books et adresses confidentielles. Omra incluse, professeurs natifs.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
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
