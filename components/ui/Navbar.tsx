'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const TABS = [
  { id: 'institut', label: 'Institut' },
  { id: 'camp', label: 'Camp bédouin' },
  { id: 'ebooks', label: 'E-books' },
  { id: 'catalogue', label: 'Catalogue' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('institut')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-[#07110c]/90 backdrop-blur border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-[#12301e] to-[#040d08] border border-[#c49a3c]/40 flex items-center justify-center">
              <span className="font-arabic text-[#c49a3c] text-xl">ب</span>
            </div>
            <span className="font-display leading-tight">
              <span className="block text-lg font-semibold text-ivory">Les Bons Plans</span>
              <span className="block text-sm text-gold -mt-1">d&apos;Arabie</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-body text-sm">
            {TABS.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={`transition-colors ${
                  active === tab.id ? 'text-gold' : 'text-ivory/80 hover:text-gold'
                }`}
              >
                {tab.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="#institut" className="btn-gold text-sm">
              S&apos;inscrire
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Ouvrir le menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="block w-6 h-px bg-ivory" />
            <span className="block w-6 h-px bg-ivory" />
            <span className="block w-6 h-px bg-ivory" />
          </button>
        </div>
      </header>

      {/* Sticky sub-tabs */}
      <div
        className={`fixed top-[68px] left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled ? 'bg-[#07110c]/90 backdrop-blur' : 'bg-transparent'
        } border-b border-white/5 hidden md:block`}
      >
        <div className="max-w-7xl mx-auto px-6 flex gap-8 font-body text-xs uppercase tracking-widest py-3">
          {TABS.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className={`transition-colors ${
                active === tab.id ? 'text-gold' : 'text-ivory/50 hover:text-gold'
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
            className="absolute top-6 right-6 text-ivory text-3xl leading-none"
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
                active === tab.id ? 'text-gold' : 'text-ivory'
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
