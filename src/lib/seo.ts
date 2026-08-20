import type { Metadata } from "next";
import type { Locale } from "@/i18n/locales";
import { brand } from "@/data/company";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aljazeerawoodz.com";

interface PageSeoInput {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function pageMetadata({ locale, title, description, path, image }: PageSeoInput): Metadata {
  const url = `${siteUrl}/${locale}${path}`;
  const ogImage = image || "/images/hero-main.jpg";

  return {
    title: `${title} · ${brand.name.en}`,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en${path}`,
        ar: `${siteUrl}/ar${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: brand.name.en,
      images: [{ url: ogImage }],
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
