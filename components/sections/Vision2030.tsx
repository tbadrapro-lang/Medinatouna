'use client'

import { useConfig } from '@/components/ConfigProvider'

const POINTS = [
  { icon: '🕋', label: 'Tourisme spirituel facilité' },
  { icon: '🏗️', label: 'Infrastructures NEOM' },
  { icon: '🤝', label: 'Accueil francophone renforcé' },
]

export default function Vision2030() {
  const CONFIG = useConfig()
  if (!CONFIG.visible.vision2030) return null

  return (
    <section
      id="vision2030"
      className="relative py-20 md:py-28 px-5 md:px-10 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--deep), var(--forest))' }}
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23c49a3c' stroke-width='1'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Ccircle cx='40' cy='40' r='28'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url('/medine-mecque.webp')" }}
      />

      <div className="max-w-5xl mx-auto relative text-center">
        <span className="section-label justify-center mb-4 inline-flex">Saudi Vision 2030</span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold mt-4 mb-6 max-w-3xl mx-auto">
          {CONFIG.texts.vision2030_titre}
        </h2>
        <p className="font-body text-ivory/75 leading-relaxed max-w-3xl mx-auto mb-12">
          {CONFIG.texts.vision2030_texte}
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {POINTS.map((p) => (
            <div
              key={p.label}
              className="rounded-2xl border p-6"
              style={{ background: 'rgba(18, 48, 30, 0.4)', borderColor: 'rgba(196, 154, 60, 0.2)' }}
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <p className="font-body text-ivory/85">{p.label}</p>
            </div>
          ))}
        </div>

        <img
          src="/vision2030.png"
          alt="Saudi Vision 2030"
          width={64}
          height={64}
          style={{ objectFit: 'contain', opacity: 0.85, margin: '0 auto' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </div>
    </section>
  )
}
