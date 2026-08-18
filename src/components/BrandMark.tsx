import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { brand } from "@/data/company";

/**
 * The brand as one composed unit — logo mark + name on a single line, with
 * the script tagline beneath — echoing the layout of the client's carved
 * wood sign, built from real markup/fonts rather than a flattened image
 * so it stays crisp, translatable, and themeable.
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
    <Link href={`/${locale}`} className="inline-block" data-cursor-hover>
      <span className="flex items-center gap-3">
        <Image src="/brand/logo-mark.png" alt={brand.name.en} width={44} height={44} className="h-11 w-11 rounded-full" />
        <span className={`font-display text-2xl font-semibold tracking-tight ${textColor}`}>{brand.name[locale]}</span>
      </span>
      <span className={`font-script mt-2 block text-xl ${taglineColor}`}>{dictionary.footer.tagline}</span>
    </Link>
  );
}
