import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limit store (resets on cold start)
// For production, use Redis or Vercel KV
const attempts = new Map<string, { count: number; resetAt: number }>()

function getIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    req.headers.get('x-real-ip') ||
    '0.0.0.0'
  )
}

export function middleware(req: NextRequest) {
  // Only rate-limit booking API route
  if (!req.nextUrl.pathname.startsWith('/api/book')) {
    return NextResponse.next()
  }

  const ip = getIP(req)
  const now = Date.now()
  const hourMs = 60 * 60 * 1000

  const entry = attempts.get(ip)

  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + hourMs })
    return NextResponse.next()
  }

  if (entry.count >= 3) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again later.' },
      { status: 429 }
    )
  }

  entry.count++
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/book/:path*'],
}
