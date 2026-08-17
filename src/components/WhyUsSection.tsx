import type { Locale } from "@/i18n/locales";
import { whyUs } from "@/data/company";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function WhyUsSection({ locale }: { locale: Locale }) {
  return (
    <section className="border-t border-charcoal/10 bg-charcoal py-28 text-warm sm:py-36">
      <div className="container-edit">
        <SectionHeading
          eyebrow={locale === "ar" ? "لماذا الجزيرة للأعمال الخشبية" : "Why Al Jazeera Wooden Works"}
          title={locale === "ar" ? "أربعة أسباب تدفعنا للاستمرار." : "Four things we hold ourselves to."}
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2">
          {whyUs.map((point, i) => (
            <Reveal
              key={point.title.en}
              delay={i * 0.06}
              className={`border-warm/15 py-10 pe-8 ${i < whyUs.length - 1 ? "border-b" : "border-b sm:border-b-0"} ${
                i % 2 === 0 ? "sm:border-e" : "sm:ps-10"
              } ${i === whyUs.length - 2 ? "sm:border-b-0" : ""}`}
            >
              <span className="font-display text-2xl text-teal">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl">{point.title[locale]}</h3>
              <p className="mt-3 max-w-sm text-warm/70">{point.body[locale]}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
