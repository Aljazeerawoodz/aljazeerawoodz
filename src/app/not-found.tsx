/**
 * Global fallback for any URL that doesn't match a locale segment at all.
 * Next.js requires this root-level not-found file to define its own
 * <html>/<body> since there is no root app/layout.tsx (locale layout at
 * src/app/[locale]/layout.tsx is the effective root layout for real pages).
 */
import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#f7f4ef", color: "#17181b" }}>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
          <p style={{ letterSpacing: "0.28em", textTransform: "uppercase", fontSize: 12, color: "#ad8a52", marginBottom: 16 }}>
            Al Jazeera Woodz
          </p>
          <h1 style={{ fontSize: 32, marginBottom: 12 }}>Page not found</h1>
          <Link href="/en" style={{ color: "#ad8a52", textDecoration: "underline" }}>
            Return home
          </Link>
        </div>
      </body>
    </html>
  );
}
