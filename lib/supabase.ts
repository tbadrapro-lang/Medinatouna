import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

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
}

export async function saveLead(lead: Lead) {
  const { data, error } = await supabase.from('leads').insert([lead])
  return { data, error }
}
