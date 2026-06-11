import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET(req: NextRequest) {
  const service = req.nextUrl.searchParams.get('service')
  const statut = req.nextUrl.searchParams.get('statut')
  const search = req.nextUrl.searchParams.get('search')

  let query = supabaseAdmin.from('leads').select('*').order('created_at', { ascending: false })

  if (service && service !== 'tous') query = query.eq('service', service)
  if (statut && statut !== 'tous') query = query.eq('status', statut)
  if (search) query = query.or(`nom.ilike.%${search}%,email.ilike.%${search}%`)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ leads: data || [] })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, status, notes } = body

  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 })

  const update: Record<string, unknown> = {}
  if (status !== undefined) update.status = status
  if (notes !== undefined) update.notes = notes

  const { error } = await supabaseAdmin.from('leads').update(update).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

// Alias pour compatibilité
export const PATCH = PUT
