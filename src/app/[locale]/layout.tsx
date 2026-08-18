import type { Metadata } from "next";
import { Playfair_Display, Inter, Cairo, Alex_Brush } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, isLocale, dir, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { brand } from "@/data/company";
import { siteUrl } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CustomCursor from "@/components/CustomCursor";
import HtmlAttributes from "@/components/HtmlAttributes";

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

/** Script accent font for tagline moments ("Any Wood, Any Design") — a
    flowing calligraphy script matching the cursive style on the client's
    carved wood sign closely (single-weight, connected letterforms). Used
    sparingly, not for body/heading text. */
const script = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
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
    <div
      lang={locale}
      dir={direction}
      className={`${display.variable} ${sans.variable} ${arabic.variable} ${script.variable} has-custom-cursor min-h-screen bg-warm font-sans text-charcoal`}
      style={locale === "ar" ? ({ "--font-display": "var(--font-arabic)", "--font-sans": "var(--font-arabic)" } as React.CSSProperties) : undefined}
    >
      <HtmlAttributes locale={locale} />
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
    </div>
  );
}
