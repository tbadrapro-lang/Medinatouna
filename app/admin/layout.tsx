'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { href: '/admin', label: 'Vue d\'ensemble', icon: '📊' },
  { href: '/admin/leads', label: 'Mes clients', icon: '👥' },
  { href: '/admin/contents?type=pack_institut', label: 'Packs Institut', icon: '🕌' },
  { href: '/admin/contents?type=pack_camp', label: 'Packs Camp', icon: '🏕️' },
  { href: '/admin/contents?type=ebook', label: 'E-books', icon: '📖' },
  { href: '/admin/contents?type=bon_plan', label: 'Bons plans', icon: '📍' },
  { href: '/admin/contents?type=transfert', label: 'Transferts', icon: '🚗' },
  { href: '/admin/emails', label: 'Relances email', icon: '📧' },
  { href: '/admin/settings', label: 'Réglages', icon: '⚙️' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const isActive = (href: string) => {
    const path = href.split('?')[0]
    if (path === '/admin') return pathname === '/admin'
    return pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#07110c] text-[#f4efe4]">
      {/* Sidebar desktop */}
      <aside
        className="hidden md:flex md:flex-col w-64 shrink-0 border-r p-5"
        style={{ borderColor: 'rgba(196, 154, 60, 0.15)', background: 'rgba(12, 29, 20, 0.5)' }}
      >
        <div className="mb-8">
          <p className="font-display text-lg font-semibold">Dashboard</p>
          <p className="text-xs text-gold">Les Bons Plans d&apos;Arabie</p>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive(item.href)
                  ? 'bg-forest/60 text-[#f4efe4] border border-gold/20'
                  : 'text-[#f4efe4]/65 hover:text-[#f4efe4] hover:bg-forest/30'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#f4efe4]/65 hover:text-red-400 transition-colors mt-4"
        >
          🚪 Déconnexion
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header
          className="flex items-center justify-between px-5 py-4 border-b sticky top-0 z-30"
          style={{ borderColor: 'rgba(196, 154, 60, 0.15)', background: 'rgba(7, 17, 12, 0.95)', backdropFilter: 'blur(12px)' }}
        >
          <h1 className="font-display text-lg font-semibold">Dashboard — Les Bons Plans d&apos;Arabie</h1>
          <Link href="/" target="_blank" className="text-sm text-gold hover:text-gold-hi transition-colors">
            Voir le site →
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 pb-24 md:pb-5">{children}</main>
      </div>

      {/* Bottom tabs mobile */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex overflow-x-auto border-t"
        style={{ borderColor: 'rgba(196, 154, 60, 0.15)', background: 'rgba(7, 17, 12, 0.97)', backdropFilter: 'blur(12px)' }}
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-4 py-2 text-[10px] whitespace-nowrap ${
              isActive(item.href) ? 'text-gold' : 'text-[#f4efe4]/60'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
        <button onClick={handleLogout} className="flex flex-col items-center gap-0.5 px-4 py-2 text-[10px] text-[#f4efe4]/60 whitespace-nowrap">
          <span className="text-base">🚪</span>
          Déco
        </button>
      </nav>
    </div>
  )
}
