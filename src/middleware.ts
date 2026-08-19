import { NextRequest, NextResponse } from "next/server";

/**
 * Gates /admin behind HTTP Basic Auth. Unlike the rest of this site's
 * "no-op when unset" env-driven features, this one fails CLOSED if
 * ADMIN_USER/ADMIN_PASSWORD aren't set — /admin shows real customer PII
 * (names, emails, phone numbers), so an accidentally-unconfigured deploy
 * should never leave it wide open.
 */
export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (!user || !password) {
    return new NextResponse("Admin dashboard is not configured (set ADMIN_USER / ADMIN_PASSWORD).", { status: 503 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf-8");
      const separatorIndex = decoded.indexOf(":");
      const suppliedUser = decoded.slice(0, separatorIndex);
      const suppliedPassword = decoded.slice(separatorIndex + 1);
      if (suppliedUser === user && suppliedPassword === password) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Al Jazeera Woodz Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
