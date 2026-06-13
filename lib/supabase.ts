import { createClient } from '@supabase/supabase-js'

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseUrl = envUrl.startsWith('http') ? envUrl : 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Lead = {
  id?: string
  nom: string
  email: string
  whatsapp?: string
  service: string
  formule?: string
  message?: string
  date_souhait?: string
  source?: string
  created_at?: string
  status?: string
  nb_personnes?: number
  date_arrivee?: string
  date_depart?: string
}

const HOT_SERVICES = ['institut', 'camp_bedouin']
const COLD_SERVICES = ['lead_magnet', 'waitlist_ebook_mecque', 'waitlist_pack']

export function computeTemperature(lead: Lead): 'chaud' | 'froid' {
  if (COLD_SERVICES.includes(lead.service)) return 'froid'
  if (!lead.whatsapp) return 'froid'
  if (HOT_SERVICES.includes(lead.service) || lead.formule) return 'chaud'
  return 'froid'
}

export async function saveLead(lead: Lead) {
  const temperature = computeTemperature(lead)
  const { data, error } = await supabase.from('leads').insert([{ ...lead, temperature }])
  return { data, error }
}
