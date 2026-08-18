/**
 * Global fallback for any URL that doesn't match a locale segment at all.
 * The real root layout (src/app/layout.tsx) now always provides <html>/
 * <body>, so this only needs to render its own content.
 */
export default function GlobalNotFound() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        background: "#f7f4ef",
        color: "#17181b",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <p style={{ letterSpacing: "0.28em", textTransform: "uppercase", fontSize: 12, color: "#2B7089", marginBottom: 16 }}>
        Al Jazeera Woodz
      </p>
      <h1 style={{ fontSize: 32, marginBottom: 12 }}>Page not found</h1>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/en" style={{ color: "#2B7089", textDecoration: "underline" }}>
        Return home
      </a>
    </div>
  );
}
