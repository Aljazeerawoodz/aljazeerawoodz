import "./globals.css";

/**
 * True root layout — required by Next.js for every route, including the
 * global not-found.tsx. It can't know the active locale (that's one level
 * down, in src/app/[locale]/layout.tsx), so lang/dir here are a static
 * fallback; [locale]/layout.tsx corrects both immediately (see
 * src/components/HtmlAttributes.tsx) and sets dir on its own wrapper too,
 * so RTL styling is correct from first paint either way.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
