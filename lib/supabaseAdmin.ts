import { createClient } from '@supabase/supabase-js'

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseUrl = envUrl.startsWith('http') ? envUrl : 'https://placeholder.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

// Client à utiliser UNIQUEMENT côté serveur (API routes), jamais exposé au client.
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
})
