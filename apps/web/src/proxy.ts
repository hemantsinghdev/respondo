import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "@repo/auth/server";

export default function authProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);
  console.log("Proxy has Run Here, and session cookie is", !!sessionCookie);

  const hasToken = !!sessionCookie;

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isLandingPage = pathname === "/";
  const isPublicRoute = isAuthPage || isLandingPage;

  if (hasToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!hasToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api/auth (Better-auth internal routes)
     * - _next/static, _next/image (Next.js assets)
     * - favicon.ico, logo.svg (Static branding)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|logo.svg).*)",
  ],
};
