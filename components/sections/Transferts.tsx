'use client'

import { waLink } from '@/lib/config'
import { useConfig } from '@/components/ConfigProvider'

const CARDS = [
  {
    title: 'Transfert + Guide francophone (Monospace)',
    items: [
      ['Aéroport Médine → Hôtel', '300 SAR'],
      ['Hôtel → Aéroport Médine', '200 SAR'],
      ['Visite matinale Médine (Quba, Uhud, Al-Qiblatain)', '400 SAR'],
      ['Transfert Médine → Mekka', '1000 SAR'],
      ['Guide Omra', '550 SAR'],
      ['Pack complet', '1500 SAR'],
    ],
  },
  {
    title: 'Transfert + Guide arabophone',
    items: [
      ['Médine → Mekka', '750 SAR'],
      ['Mekka → Médine', '750 SAR'],
      ['Hôtel Mekka → Aéroport Jeddah', '300 SAR'],
    ],
  },
  {
    title: 'Transfert chauffeur (groupes)',
    items: [
      ['Médine → Mekka', '1200 SAR'],
      ['Mekka → Médine', '1200 SAR'],
      ['Aéroport Jeddah → Médine', '1200 SAR'],
    ],
  },
]

export default function Transferts() {
  const CONFIG = useConfig()
  const WA = waLink(CONFIG.WHATSAPP_PRESTARABIA, "Bonjour, je souhaite réserver un transfert ou un guide à Médine. Pouvez-vous m'indiquer vos disponibilités et vos tarifs ? Merci.")
  return (
    <section id="transferts" className="relative py-20 md:py-28 px-5 md:px-10 bg-void">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label justify-center">Mobilité</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4">
            Transferts &amp; Guide à Médine
          </h2>
          <p className="font-body text-ivory/70 max-w-2xl mx-auto mt-4">
            En partenariat avec PrestaArabia, profitez de plus de 13 ans d&apos;expérience sur le terrain :
            guides agréés en droit islamique, bilingues français/arabe, pour des transferts sereins entre
            Médine, Mekka et les aéroports.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CARDS.map((card) => (
            <div key={card.title} className="pack-card p-6 flex flex-col">
              <h3 className="font-display text-xl font-semibold mb-4">{card.title}</h3>
              <ul className="space-y-2 mb-6 flex-1">
                {card.items.map(([label, price]) => (
                  <li key={label} className="flex items-start justify-between gap-3 text-sm text-ivory/80 border-b border-white/5 pb-2">
                    <span>{label}</span>
                    <span className="text-gold whitespace-nowrap font-semibold">{price}</span>
                  </li>
                ))}
              </ul>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center">
                Réserver via WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
