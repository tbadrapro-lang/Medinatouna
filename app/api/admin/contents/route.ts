import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

// Protégé par middleware.ts (toutes les routes /api/admin/*)

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type')

  let query = supabaseAdmin.from('contents').select('*').order('ordre', { ascending: true })
  if (type) query = query.eq('type', type)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ contents: data || [] })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { error, data } = await supabaseAdmin.from('contents').insert([body]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ content: data })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, ...rest } = body
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 })

  const { error, data } = await supabaseAdmin
    .from('contents')
    .update({ ...rest, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ content: data })
}

// Alias pour compatibilité avec les appels existants
export const PATCH = PUT

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 })

  // Soft delete : on désactive, on ne supprime jamais vraiment
  const { error } = await supabaseAdmin
    .from('contents')
    .update({ actif: false, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
