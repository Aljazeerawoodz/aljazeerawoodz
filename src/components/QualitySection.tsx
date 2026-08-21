import Image from "next/image";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { quality } from "@/data/company";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function QualitySection({ locale }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <section className="border-t border-charcoal/10 bg-warm py-28 sm:py-36">
      <div className="container-edit grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={locale === "ar" ? "الجودة والحرفية" : "Quality & Craftsmanship"}
            title={locale === "ar" ? "الجودة ليست خطوة أخيرة." : "Quality isn't a final step."}
          />
          <Reveal delay={0.2} className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-sm lg:block">
            <video
              className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/video/Bulidstart-poster.jpg"
            >
              <source src="/video/Bulidstart-web.mp4" type="video/mp4" />
            </video>
            <Image
              src="/video/Bulidstart-poster.jpg"
              alt="Building shell under construction"
              fill
              sizes="35vw"
              className="hidden object-cover motion-reduce:block"
            />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
          {quality.map((point, i) => (
            <Reveal key={point.title.en} delay={i * 0.08}>
              <span className="font-display text-3xl text-teal">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl text-charcoal">{point.title[locale]}</h3>
              <p className="mt-3 text-charcoal/70">{point.body[locale]}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
