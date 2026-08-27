import { NextResponse, type NextRequest } from 'next/server';

/**
 * Redirect the site root to /ar (default locale). Anything under /en or /ar
 * passes through untouched. Static assets are excluded via the matcher below.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === '/' || pathname === '') {
    const url = req.nextUrl.clone();
    url.pathname = '/ar';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals + all files with an extension
    '/((?!api|_next|.*\\.[^/]+$).*)',
  ],
};
