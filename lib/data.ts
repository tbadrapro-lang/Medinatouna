// Données de secours (fallback) — utilisées si la table `contents` est vide
// ou si Supabase est injoignable. Le site ne doit JAMAIS être vide.

export type ContentItem = {
  id: string
  type: string
  titre: string
  sous_titre?: string
  description?: string
  prix?: string
  ancien_prix?: string
  badge?: string
  items: string[]
  image_url?: string
  ordre: number
  actif: boolean
  featured: boolean
  extra?: Record<string, unknown>
}

export const FALLBACK_PACKS_INSTITUT: ContentItem[] = [
  {
    id: 'fallback-institut-ete',
    type: 'pack_institut',
    titre: 'Pack Été',
    prix: '995€',
    items: ['2 semaines intensives', 'Hébergement inclus', 'Cours en petit groupe', 'Activités culturelles'],
    ordre: 0,
    actif: true,
    featured: false,
  },
  {
    id: 'fallback-institut-intensif',
    type: 'pack_institut',
    titre: 'Intensif',
    prix: '795€',
    items: ['1 semaine intensive', 'Professeurs natifs', 'Suivi personnalisé', 'Certificat de niveau'],
    ordre: 1,
    actif: true,
    featured: true,
  },
  {
    id: 'fallback-institut-famille',
    type: 'pack_institut',
    titre: 'Famille',
    prix: '1990€',
    items: ['2 semaines pour 2 personnes', 'Hébergement familial', 'Programme enfants', 'Omra incluse'],
    ordre: 2,
    actif: true,
    featured: false,
  },
]

export const FALLBACK_PACKS_CAMP: ContentItem[] = [
  {
    id: 'fallback-camp-cavalier',
    type: 'pack_camp',
    titre: 'Cavalier',
    prix: '50€',
    items: ['Balade à cheval', 'Goûter bédouin', '2h sur place'],
    ordre: 0,
    actif: true,
    featured: false,
  },
  {
    id: 'fallback-camp-soiree',
    type: 'pack_camp',
    titre: 'Soirée',
    prix: '50€',
    items: ['Dîner traditionnel', 'Spectacle musical', 'Veillée sous les étoiles'],
    ordre: 1,
    actif: true,
    featured: false,
  },
  {
    id: 'fallback-camp-premium',
    type: 'pack_camp',
    titre: 'Premium',
    prix: '85€',
    items: ['Journée complète', 'Toutes activités incluses', 'Transport aller-retour'],
    ordre: 2,
    actif: true,
    featured: true,
  },
]

export const FALLBACK_EBOOKS: ContentItem[] = [
  {
    id: 'fallback-ebook-medine',
    type: 'ebook',
    titre: 'Bons Plans à Médine',
    sous_titre: 'Guide PDF · Édition 2026',
    description:
      "Évite les erreurs coûteuses sur place. Gagne un temps précieux durant ton séjour et découvre les meilleures adresses avant même d'arriver.",
    prix: '29,90 €',
    ancien_prix: '49,90 €',
    badge: 'Disponible',
    items: [
      'Prépare ton séjour : appartements, hôtels, guide Omra, visa en 30 min',
      'Découvre Médine : restaurants, visites, shopping, loisirs',
      'E-commerce : fournisseurs Abaya, Qamis, Musc',
      'Un pas vers la science : halaqat Coran, assises des savants, musées',
      'Laisse une œuvre : sadaqa Coran, eau, nourriture, parrainage orphelin',
    ],
    ordre: 0,
    actif: true,
    featured: false,
    extra: { id: 'medine', tagline: '+ de 50 bons plans', badgeStyle: 'disponible', available: true },
  },
  {
    id: 'fallback-ebook-mecque',
    type: 'ebook',
    titre: 'Bons Plans à la Mecque',
    sous_titre: 'Guide PDF · Édition 2026',
    description:
      'Toutes les adresses et astuces pour vivre ta Omra à la Mecque sereinement : hébergement, restaurants, transports, lieux historiques.',
    prix: '29,90 €',
    ancien_prix: '49,90 €',
    badge: 'Bientôt disponible',
    items: [],
    ordre: 1,
    actif: true,
    featured: false,
    extra: { id: 'mecque', tagline: 'Le complément indispensable', badgeStyle: 'bientot', available: false, waitlistService: 'waitlist_ebook_mecque' },
  },
  {
    id: 'fallback-ebook-pack',
    type: 'ebook',
    titre: 'Pack Complet — Médine + Mecque',
    sous_titre: '2 Guides PDF · Édition 2026',
    description:
      "Les deux guides réunis : tout ce qu'il faut savoir pour ton séjour complet en Arabie. Rentabilisé dès les premiers jours sur place.",
    prix: '49,90 €',
    ancien_prix: '99,80 €',
    badge: '🔥 Meilleure offre',
    items: [],
    ordre: 2,
    actif: true,
    featured: true,
    extra: { id: 'pack', tagline: 'Économise 50%', badgeStyle: 'meilleure', available: false, waitlistService: 'waitlist_pack' },
  },
]

export const FALLBACK_BONS_PLANS: ContentItem[] = []

export const FALLBACK_TRANSFERTS: ContentItem[] = []

export const FALLBACKS: Record<string, ContentItem[]> = {
  pack_institut: FALLBACK_PACKS_INSTITUT,
  pack_camp: FALLBACK_PACKS_CAMP,
  ebook: FALLBACK_EBOOKS,
  bon_plan: FALLBACK_BONS_PLANS,
  transfert: FALLBACK_TRANSFERTS,
}
