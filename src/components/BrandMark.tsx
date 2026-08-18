import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { brand } from "@/data/company";

/**
 * The brand as one composed unit — logo, name, and the script tagline all
 * on one row (tagline to the right of the name) — echoing the layout of
 * the client's carved wood sign, built from real markup/fonts rather than
 * a flattened image so it stays crisp, translatable, and themeable.
 */
export default function BrandMark({
  locale,
  dictionary,
  tone = "dark",
}: {
  locale: Locale;
  dictionary: Dictionary;
  tone?: "dark" | "light";
}) {
  const textColor = tone === "dark" ? "text-charcoal" : "text-warm";
  const taglineColor = tone === "dark" ? "text-charcoal/70" : "text-warm/70";

  return (
    <Link href={`/${locale}`} className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1" data-cursor-hover>
      <span className="flex items-center gap-2">
        <Image src="/brand/logo-mark.png" alt={brand.name.en} width={32} height={32} className="h-8 w-8 shrink-0 rounded-full" />
        <span className={`font-display text-lg font-semibold tracking-tight ${textColor}`}>{brand.name[locale]}</span>
      </span>
      <span className={`font-script text-lg ${taglineColor}`}>{dictionary.footer.tagline}</span>
    </Link>
  );
}
