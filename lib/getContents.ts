import { supabase } from './supabase'
import { ContentItem, FALLBACKS } from './data'

// Lecture côté serveur des contenus actifs par type, avec fallback
// sur les données codées en dur si la table est vide ou Supabase injoignable.
export async function getContents(type: string): Promise<ContentItem[]> {
  try {
    const { data, error } = await supabase
      .from('contents')
      .select('*')
      .eq('type', type)
      .eq('actif', true)
      .order('ordre', { ascending: true })

    if (error || !data || data.length === 0) {
      return FALLBACKS[type] || []
    }

    return data as ContentItem[]
  } catch {
    return FALLBACKS[type] || []
  }
}
