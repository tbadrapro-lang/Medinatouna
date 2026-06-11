'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const TABS = [
  { id: 'institut', label: 'Institut' },
  { id: 'camp', label: 'Camp bédouin' },
  { id: 'ebooks', label: 'E-books' },
  { id: 'transferts', label: 'Transferts' },
  { id: 'miel-scooter', label: 'Miel & Scooter' },
]

export default function Navbar() {
  const [active, setActive] = useState('institut')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = TABS.map((t) => document.getElementById(t.id)).filter(
      (el): el is HTMLElement => !!el
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: 'rgba(4, 13, 8, 0.96)',
          backdropFilter: 'blur(24px)',
          borderBottomColor: 'rgba(196, 154, 60, 0.25)',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-[60px] md:h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.ibb.co/yF2D2PQJ/logo.jpg"
                alt="Medinatouna"
                width={44}
                height={44}
                className="rounded-full border border-gold/40 object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.ibb.co/nMPt3MjX/vision2030.png"
                alt="Vision 2030"
                width={32}
                height={32}
                className="opacity-80 hidden sm:block"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <span className="font-display leading-tight">
              <span className="block text-lg font-semibold text-[#f4efe4]">Les Bons Plans</span>
              <span className="block text-sm text-gold -mt-1">d&apos;Arabie</span>
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-1 rounded-full px-1.5 py-1.5 border"
            style={{ background: 'rgba(18, 48, 30, 0.8)', borderColor: 'rgba(196, 154, 60, 0.2)' }}
          >
            {TABS.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={`rounded-full px-4 py-1.5 transition-colors ${
                  active === tab.id
                    ? 'text-[#f4efe4] border border-gold/30'
                    : 'text-[#f4efe4]/70 hover:text-[#f4efe4]'
                }`}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  background: active === tab.id ? 'linear-gradient(135deg, #12301e, #1a5c38)' : 'transparent',
                }}
              >
                {tab.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/33764850414?text=Bonjour%2C%20je%20souhaite%20obtenir%20des%20informations%20sur%20vos%20services%20%28institut%20de%20langue%2C%20camp%20b%C3%A9douin%2C%20e-books%29.%20Pourriez-vous%20me%20contacter%20%3F%20Merci."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#4ade80]"
              style={{ opacity: 0.9 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#4ade80" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
            <a
              href="#institut"
              className="rounded-md px-5 py-2 font-display"
              style={{
                background: 'linear-gradient(135deg, #c49a3c, #e0b85a)',
                color: '#0c1d14',
                fontWeight: 600,
              }}
            >
              S&apos;inscrire
            </a>
          </div>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg border"
            style={{ background: 'rgba(18,48,30,.6)', borderColor: 'rgba(196,154,60,.2)' }}
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen(true)}
          >
            <div className="flex flex-col gap-1.5">
              <span className="block w-5 h-px bg-[#f4efe4]" />
              <span className="block w-5 h-px bg-[#f4efe4]" />
              <span className="block w-5 h-px bg-[#f4efe4]" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile sticky sub-tabs */}
      <div
        className="fixed top-[60px] left-0 right-0 z-40 md:hidden border-b"
        style={{ background: 'rgba(4,13,8,.95)', backdropFilter: 'blur(24px)', borderBottomColor: 'rgba(196,154,60,.15)' }}
      >
        <div className="flex overflow-x-auto gap-1 px-3 py-2 no-scrollbar">
          {TABS.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className={`text-xs font-medium px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                active === tab.id
                  ? 'bg-forest/80 text-[#f4efe4] border border-gold/25'
                  : 'text-[#f4efe4]/65'
              }`}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#07110c] flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-6 right-6 text-[#f4efe4] text-3xl leading-none"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>
          {TABS.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={() => setMenuOpen(false)}
              className={`font-display text-2xl ${
                active === tab.id ? 'text-gold' : 'text-[#f4efe4]'
              }`}
            >
              {tab.label}
            </a>
          ))}
          <a href="#institut" onClick={() => setMenuOpen(false)} className="btn-gold mt-4">
            S&apos;inscrire
          </a>
        </div>
      )}
    </>
  )
}
