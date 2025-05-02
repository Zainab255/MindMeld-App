import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) { // <<<<< async likhna zaroori hai
  const token = await getToken({ req: request })
  const url = request.nextUrl

  if (token) {
    if (
      url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/'
    ) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  } else {
    if (
      url.pathname.startsWith('/dashboard') ||
      url.pathname.startsWith('/verify')
    ) {
      return NextResponse.redirect(new URL('/home', request.url))
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/',
    '/dashboard/:path*',
    '/verify/:path*'
  ]
}
