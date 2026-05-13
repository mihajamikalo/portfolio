import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "portfolio_admin_session";

function hasValidExpiration(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  const expirationRaw = token.split(".")[0];
  const expiration = Number(expirationRaw);
  return Number.isFinite(expiration) && expiration > Date.now();
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = hasValidExpiration(token);

  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
