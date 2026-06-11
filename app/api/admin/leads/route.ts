import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ leads: data || [] })
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { id, status } = body

  if (!id || !status) {
    return NextResponse.json({ error: 'id et status requis' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('leads').update({ status }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
