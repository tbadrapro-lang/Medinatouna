'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const LOGO_FALLBACK = (
  <div style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#12301e,#040d08)',border:'1px solid rgba(196,154,60,.5)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',color:'#c49a3c',flexShrink:0,boxShadow:'0 0 16px rgba(196,154,60,.2)'}}>
    ب
  </div>
)

const NAV_TABS = [
  { id: 'institut', label: 'Institut', href: '#institut' },
  { id: 'camp', label: 'Camp bédouin', href: '#camp' },
  { id: 'ebooks', label: 'E-books', href: '#ebooks' },
  { id: 'catalogue', label: 'Catalogue', href: '#catalogue' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('institut')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      // Detect active section
      const sections = ['catalogue', 'ebooks', 'camp', 'institut']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActiveTab(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string, id: string) => {
    setActiveTab(id)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07110c]/90 backdrop-blur-xl border-b border-[#c49a3c]/10 shadow-lg'
          : 'bg-transparent'
      }`} style={{height:64}}>
        <div className="flex items-center justify-between h-full px-5 md:px-10 max-w-7xl mx-auto">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 flex-shrink-0" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
            {LOGO_FALLBACK}
            <div className="flex flex-col leading-none">
              <span className="font-serif text-[1rem] font-medium text-[#f4efe4] hidden sm:block">Les Bons Plans</span>
              <span className="text-[0.55rem] tracking-[.28em] uppercase text-[#c49a3c] hidden sm:block">d&apos;Arabie · Médine</span>
            </div>
          </a>

          {/* Desktop tabs */}
          <div className="hidden md:flex items-center gap-1 bg-[#0c1d14]/80 border border-[#c49a3c]/10 rounded-full px-2 py-1.5 backdrop-blur-sm">
            {NAV_TABS.map(t => (
              <button
                key={t.id}
                onClick={() => scrollTo(t.href, t.id)}
                className={`px-4 py-1.5 rounded-full text-[.78rem] font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                  activeTab === t.id
                    ? 'bg-gradient-to-r from-[#12301e] to-[#1a5c38] text-[#f4efe4] shadow-sm border border-[#c49a3c]/20'
                    : 'text-[#f4efe4]/50 hover:text-[#f4efe4]/80 hover:bg-[#12301e]/40'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Right CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/33764850414?text=Bonjour%2C%20je%20souhaite%20plus%20d%27informations"
              target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-[.78rem] text-[#f4efe4]/60 hover:text-[#4ade80] transition-colors px-3 py-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a href="#institut" className="btn-gold hidden md:inline-flex !py-2 !px-4 !text-[.78rem]">S&apos;inscrire</a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#f4efe4] rounded-lg hover:bg-[#12301e]/60 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-[#07110c]/95 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />
        <div className={`relative z-10 flex flex-col items-center justify-center h-full gap-6 transition-all duration-300 ${
          menuOpen ? 'translate-y-0' : '-translate-y-8'
        }`}>
          {NAV_TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => scrollTo(t.href, t.id)}
              className="font-serif text-3xl font-light text-[#f4efe4] hover:text-[#c49a3c] transition-colors"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {t.label}
            </button>
          ))}
          <div className="w-12 h-px bg-[#c49a3c]/30 my-2" />
          <a
            href="https://wa.me/33764850414"
            target="_blank" rel="noopener noreferrer"
            className="btn-gold mt-2"
          >
            Nous contacter sur WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}
