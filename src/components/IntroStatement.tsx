import type { Locale } from "@/i18n/locales";
import { introStatement, introBody } from "@/data/company";
import Reveal from "./Reveal";

export default function IntroStatement({ locale }: { locale: Locale }) {
  return (
    <section className="container-edit py-28 sm:py-36">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <h2 className="text-balance font-display text-4xl font-semibold leading-[1.08] text-charcoal sm:text-5xl lg:text-6xl">
            {introStatement[locale]}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-md text-lg leading-relaxed text-charcoal/70 lg:mt-2">{introBody[locale]}</p>
        </Reveal>
      </div>
    </section>
  );
}
