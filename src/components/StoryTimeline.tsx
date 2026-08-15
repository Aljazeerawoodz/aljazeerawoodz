"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { story } from "@/data/company";
import SectionHeading from "./SectionHeading";

export default function StoryTimeline({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const barScale = useTransform(scrollXProgress, [0, 1], [0, 1]);

  return (
    <section id="story" className="bg-charcoal py-28 text-warm sm:py-36">
      <div className="container-edit">
        <SectionHeading
          eyebrow={locale === "ar" ? "قصتنا" : "Our Story"}
          title={locale === "ar" ? "من التأسيس إلى اليوم." : "From foundation to today."}
        />
      </div>

      {/* Desktop: horizontal scroll strip */}
      <div ref={ref} className="no-scrollbar mt-16 hidden gap-8 overflow-x-auto px-16 pb-4 lg:flex">
        {story.map((stage) => (
          <article key={stage.number} className="w-[360px] shrink-0 border-t border-warm/20 pt-8">
            <span className="font-display text-6xl text-brass">{stage.number}</span>
            <h3 className="mt-6 font-display text-2xl">{stage.title[locale]}</h3>
            <p className="mt-4 text-warm/70">{stage.body[locale]}</p>
          </article>
        ))}
      </div>
      <div className="container-edit mt-8 hidden h-px bg-warm/10 lg:block">
        <motion.div style={{ scaleX: barScale }} className="h-px w-full origin-left bg-brass" />
      </div>

      {/* Mobile / tablet: vertical timeline */}
      <div className="container-edit mt-12 flex flex-col gap-10 lg:hidden">
        {story.map((stage) => (
          <article key={stage.number} className="border-s border-warm/20 ps-6">
            <span className="font-display text-4xl text-brass">{stage.number}</span>
            <h3 className="mt-3 font-display text-xl">{stage.title[locale]}</h3>
            <p className="mt-3 text-warm/70">{stage.body[locale]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
