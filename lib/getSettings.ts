import { supabase } from './supabase'
import { CONFIG } from './config'

export type EffectiveConfig = typeof CONFIG

const SETTINGS_TO_CONFIG: Record<string, keyof EffectiveConfig> = {
  whatsapp_fr: 'WHATSAPP_FR',
  whatsapp_prestarabia: 'WHATSAPP_PRESTARABIA',
  email_contact: 'EMAIL_CONTACT',
  instagram_url: 'INSTAGRAM',
  tiktok_url: 'TIKTOK',
  paypal_url: 'PAYPAL',
}

// Lecture côté serveur des réglages, fusionnés avec les valeurs par défaut
// de lib/config.ts (utilisées si la table est vide ou Supabase injoignable).
export async function getEffectiveConfig(): Promise<EffectiveConfig> {
  const config = { ...CONFIG }

  try {
    const { data, error } = await supabase.from('site_settings').select('key, value')
    if (error || !data) return config

    for (const row of data) {
      const target = SETTINGS_TO_CONFIG[row.key]
      if (target && row.value) {
        config[target] = row.value as never
      }
    }
  } catch {
    // ignore, fallback to defaults
  }

  return config
}
