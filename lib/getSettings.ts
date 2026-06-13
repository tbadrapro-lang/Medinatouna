import { supabase } from './supabase'
import { CONFIG } from './config'

const SETTINGS_TO_CONFIG: Record<string, keyof typeof CONFIG> = {
  whatsapp_fr: 'WHATSAPP_FR',
  whatsapp_prestarabia: 'WHATSAPP_PRESTARABIA',
  email_contact: 'EMAIL_CONTACT',
  instagram_url: 'INSTAGRAM',
  tiktok_url: 'TIKTOK',
  paypal_url: 'PAYPAL',
}

export const DEFAULT_TEXTS: Record<string, string> = {
  hero_titre: "Vivez l'Arabie",
  hero_titre_accent: "de l'intérieur.",
  hero_tagline:
    "Institut de langue arabe agréé à Médine, camp bédouin dans le désert, e-books et adresses confidentielles. Omra incluse, professeurs natifs.",
  hero_arabic: 'الخطط الرائعة من الجزيرة العربية',
  hero_bg_image: '/hero-masjid-nabawi.jpg',
  institut_titre: 'Centre Medinatouna à Médine',
  institut_description:
    "Medinatouna vous propose un apprentissage de l'arabe selon la méthode égyptienne, reconnue pour son efficacité, structurée en 12 niveaux pédagogiques progressifs allant du débutant complet jusqu'à un niveau avancé de maîtrise.\n\nAu-delà des cours, notre mission est d'offrir un accompagnement humain complet : de la préparation de votre voyage jusqu'à votre quotidien à Médine, notre équipe est présente à chaque étape pour que vous puissiez vous concentrer sur l'essentiel — votre apprentissage et votre expérience spirituelle.\n\nInstallé au cœur de la ville du Prophète, notre centre vous offre un cadre serein, respectueux et propice à la concentration, dans une ambiance bienveillante entre étudiants venus du monde entier.",
  camp_titre: 'Le camp bédouin',
  camp_description:
    "À quelques encablures de Médine, notre partenaire PrestaArabia vous ouvre les portes d'un campement privé niché au cœur du désert d'Arabie. Loin de l'agitation de la ville, vous y découvrirez l'hospitalité authentique des Bédouins.",
  vision2030_titre: "Médine au cœur d'une Arabie qui se transforme",
  vision2030_texte:
    "L'Arabie Saoudite vit une transformation historique avec la Vision 2030 : ouverture au tourisme, infrastructures modernes, accueil renforcé des pèlerins et visiteurs. C'est le moment idéal pour vivre Médine de l'intérieur — entre tradition préservée et modernité accueillante.",
}

export const SECTION_KEYS = ['hero', 'institut', 'camp', 'ebooks', 'vision2030', 'transferts', 'mielscooter'] as const
export type SectionKey = (typeof SECTION_KEYS)[number]

export const DEFAULT_VISIBLE: Record<SectionKey, boolean> = SECTION_KEYS.reduce(
  (acc, key) => ({ ...acc, [key]: true }),
  {} as Record<SectionKey, boolean>
)

export type EffectiveConfig = typeof CONFIG & {
  texts: Record<string, string>
  visible: Record<SectionKey, boolean>
}

export const DEFAULT_CONFIG: EffectiveConfig = {
  ...CONFIG,
  texts: DEFAULT_TEXTS,
  visible: DEFAULT_VISIBLE,
}

// Lecture côté serveur des réglages, fusionnés avec les valeurs par défaut
// de lib/config.ts (utilisées si la table est vide ou Supabase injoignable).
export async function getEffectiveConfig(): Promise<EffectiveConfig> {
  const config = { ...CONFIG }
  const texts = { ...DEFAULT_TEXTS }
  const visible = { ...DEFAULT_VISIBLE }

  try {
    const { data, error } = await supabase.from('site_settings').select('key, value')
    if (error || !data) return { ...config, texts, visible }

    for (const row of data) {
      const target = SETTINGS_TO_CONFIG[row.key]
      if (target && row.value) {
        config[target] = row.value as never
      } else if (row.key in texts && row.value) {
        texts[row.key] = row.value
      } else if (row.key.startsWith('section_') && row.key.endsWith('_visible')) {
        const sec = row.key.slice('section_'.length, -'_visible'.length) as SectionKey
        if (sec in visible) visible[sec] = row.value !== 'false'
      }
    }
  } catch {
    // ignore, fallback to defaults
  }

  return { ...config, texts, visible }
}
