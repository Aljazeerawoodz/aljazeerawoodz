import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { story } from "@/data/company";
import SectionHeading from "./SectionHeading";

export default function StoryTimeline({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <section id="story" className="bg-charcoal py-28 text-warm sm:py-36">
      <div className="container-edit">
        <SectionHeading
          eyebrow={locale === "ar" ? "قصتنا" : "Our Story"}
          title={locale === "ar" ? "من التأسيس إلى اليوم." : "From foundation to today."}
        />
      </div>

      {/* Desktop: full-width grid — every stage visible at once, no
          horizontal scrolling (previously a scroll strip with no visible
          scrollbar, so the last card looked cut off/hidden). */}
      <div className="container-edit mt-16 hidden grid-cols-2 gap-8 lg:grid xl:grid-cols-4">
        {story.map((stage) => (
          <article key={stage.number} className="border-t border-warm/20 pt-8">
            <span className="font-display text-6xl text-teal">{stage.number}</span>
            <h3 className="mt-6 font-display text-2xl">{stage.title[locale]}</h3>
            <p className="mt-4 text-warm/70">{stage.body[locale]}</p>
          </article>
        ))}
      </div>

      {/* Mobile / tablet: vertical timeline */}
      <div className="container-edit mt-12 flex flex-col gap-10 lg:hidden">
        {story.map((stage) => (
          <article key={stage.number} className="border-s border-warm/20 ps-6">
            <span className="font-display text-4xl text-teal">{stage.number}</span>
            <h3 className="mt-3 font-display text-xl">{stage.title[locale]}</h3>
            <p className="mt-3 text-warm/70">{stage.body[locale]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
