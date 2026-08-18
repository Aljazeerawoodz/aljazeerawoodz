import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { brand } from "@/data/company";

/**
 * The brand as one composed unit, centered as a block — logo + name on
 * one row, the script tagline centered directly beneath — echoing the
 * layout of the client's carved wood sign, built from real markup/fonts
 * rather than a flattened image so it stays crisp, translatable, and
 * themeable.
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
    <Link href={`/${locale}`} className="flex flex-col items-center text-center" data-cursor-hover>
      <span className="flex items-center gap-3">
        <Image src="/brand/logo-mark.png" alt={brand.name.en} width={40} height={40} className="h-10 w-10 shrink-0 rounded-full" />
        <span className={`font-display text-xl font-semibold tracking-tight ${textColor}`}>{brand.name[locale]}</span>
      </span>
      <span className={`font-script mt-2 text-xl ${taglineColor}`}>{dictionary.footer.tagline}</span>
    </Link>
  );
}
