import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { finalCta, contact } from "@/data/company";
import Reveal from "./Reveal";
import WoodGrainDivider from "./WoodGrainDivider";

export default function FinalCta({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <section className="bg-charcoal py-28 text-warm sm:py-36">
      <div className="container-edit text-center">
        <WoodGrainDivider className="mx-auto mb-10 max-w-xs opacity-70" />
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
            {finalCta[locale]}
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}/contact`}
            data-cursor-hover
            className="rounded-full bg-brass px-8 py-4 text-sm font-medium text-charcoal transition-transform hover:scale-[1.03]"
          >
            {dictionary.common.startProject}
          </Link>
          <a
            href={`tel:${contact.phones[0]!.replace(/\s/g, "")}`}
            data-cursor-hover
            className="rounded-full border border-warm/30 px-8 py-4 text-sm font-medium text-warm transition-colors hover:bg-warm/10"
          >
            {dictionary.common.call}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
