import type { Metadata } from "next";
import { Playfair_Display, Inter, Cairo } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, isLocale, dir, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { brand } from "@/data/company";
import { siteUrl } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CustomCursor from "@/components/CustomCursor";
import "../globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const arabic = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: brand.name.en, template: `%s · ${brand.name.en}` },
  description: `${brand.name.en} — ${brand.tagline.en}. Interior fitout, joinery and custom furniture across the UAE.`,
  icons: { icon: "/brand/logo-mark.png", shortcut: "/brand/logo-mark.png" },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);
  const direction = dir(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${display.variable} ${sans.variable} ${arabic.variable}`}
      style={locale === "ar" ? ({ "--font-display": "var(--font-arabic)", "--font-sans": "var(--font-arabic)" } as React.CSSProperties) : undefined}
    >
      <body className="has-custom-cursor min-h-screen bg-warm font-sans text-charcoal">
        <CustomCursor />
        <a
          href="#main"
          className="fixed start-4 top-4 z-[100] -translate-y-24 rounded bg-charcoal px-4 py-2 text-sm text-warm transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar locale={locale} dictionary={dictionary} />
        <main id="main">{children}</main>
        <Footer locale={locale} dictionary={dictionary} />
        <WhatsAppButton locale={locale} />
      </body>
    </html>
  );
}
