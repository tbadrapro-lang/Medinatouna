import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

export async function GET() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

  const [{ count: totalLeads }, { count: newLeads }, { count: uncontacted }, { count: activeContents }, { data: recentLeads }] =
    await Promise.all([
      supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
      supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }).or('status.is.null,status.eq.nouveau'),
      supabaseAdmin.from('contents').select('*', { count: 'exact', head: true }).eq('actif', true),
      supabaseAdmin.from('leads').select('*').order('created_at', { ascending: false }).limit(10),
    ])

  return NextResponse.json({
    totalLeads: totalLeads || 0,
    newLeads: newLeads || 0,
    uncontacted: uncontacted || 0,
    activeContents: activeContents || 0,
    recentLeads: recentLeads || [],
  })
}
