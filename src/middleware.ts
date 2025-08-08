import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  console.log('🔵 Middleware - Processing request:', pathname);
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname.includes('/static/') ||
    pathname.includes('/runtime/') ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    console.log('🔵 Middleware - Skipping static file:', pathname);
    return NextResponse.next();
  }

  console.log('✅ Middleware - Request processed successfully');
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
