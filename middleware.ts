// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('adminToken')?.value;

  const isProtected = request.nextUrl.pathname.startsWith('/motos') ||
                      request.nextUrl.pathname.startsWith('/clients') ||
                      request.nextUrl.pathname.startsWith('/reservations');

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
