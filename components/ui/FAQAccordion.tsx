'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Faut-il un visa pour Médine ?',
    a: "Oui, un visa est nécessaire pour se rendre en Arabie Saoudite. Il peut être obtenu en ligne (visa touristique e-visa) ou via un visa Omra selon votre profil. Notre équipe vous guide dans les démarches.",
  },
  {
    q: 'Quels sont les niveaux proposés ?',
    a: "Le centre propose 12 niveaux pédagogiques, du débutant complet à un niveau avancé, selon la méthode égyptienne reconnue. Un test de positionnement est réalisé à l'arrivée.",
  },
  {
    q: 'Quels sont les horaires de cours ?',
    a: "Les cours se déroulent généralement le matin (4 à 5h par jour), du dimanche au jeudi, laissant les après-midis et soirées libres pour la prière, le repos et les activités.",
  },
  {
    q: 'Les enfants peuvent-ils participer ?',
    a: "Oui, des formules familiales existent avec un accompagnement adapté aux enfants. Contactez-nous pour discuter de l'âge et du programme adapté à votre famille.",
  },
  {
    q: 'La Omra est-elle incluse ?',
    a: "La Omra est incluse dans certaines formules (notamment le pack Famille). Pour les autres formules, nous pouvons organiser votre Omra en option, avec guide dédié.",
  },
  {
    q: 'Comment se passe l\'hébergement ?',
    a: "L'hébergement est situé à proximité du centre et de la mosquée du Prophète, dans des logements confortables et adaptés (chambres individuelles ou partagées selon la formule).",
  },
  {
    q: 'Y a-t-il des cours pour les femmes ?',
    a: "Oui, des groupes et créneaux dédiés aux femmes sont disponibles, encadrés par des enseignantes, dans le respect des convenances.",
  },
  {
    q: 'Quels moyens de paiement acceptez-vous ?',
    a: "Nous acceptons le PayPal, le virement bancaire (RIB transmis sur demande via WhatsApp) ainsi qu'un règlement organisé directement avec notre équipe.",
  },
  {
    q: "Quelle est la politique d'annulation ?",
    a: "Aucun remboursement ne pourra être effectué. Toutefois, dans certains cas et sous réserve de disponibilité, un avoir pourra être proposé afin de reporter le séjour sur une autre période.",
  },
  {
    q: "Le transport depuis l'aéroport est-il inclus ?",
    a: "Le transfert aéroport n'est pas systématiquement inclus mais peut être réservé facilement via notre service de transferts (voir section Transferts), avec guide francophone disponible.",
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto divide-y divide-white/5 border-t border-b border-white/5">
      {FAQS.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-4 text-left"
          >
            <span className="font-display text-base md:text-lg font-semibold text-ivory">{item.q}</span>
            <ChevronDown size={18} className={`text-gold flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && (
            <p className="font-body text-sm text-ivory/70 leading-relaxed pb-4 pr-8">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  )
}
