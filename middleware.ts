import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, verifyAdminToken } from '@/lib/adminAuth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (pathname.startsWith('/api/admin/login')) {
      return NextResponse.next()
    }

    const token = req.cookies.get(ADMIN_COOKIE)?.value
    const valid = await verifyAdminToken(token)

    if (!valid) {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
      }
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
