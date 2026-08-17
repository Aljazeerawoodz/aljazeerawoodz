"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { process } from "@/data/company";
import SectionHeading from "./SectionHeading";

export default function ProcessTimeline({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="scroll-mt-24 border-t border-charcoal/10 bg-warm py-28 sm:py-36">
      <div className="container-edit">
        <SectionHeading eyebrow={dictionary.nav.process} title={locale === "ar" ? "نهج منظم من البداية للتسليم." : "A structured path from brief to handover."} />

        {/* Desktop horizontal */}
        <div className="mt-16 hidden lg:block">
          <div className="grid grid-cols-6 gap-4">
            {process.map((step, i) => (
              <button
                key={step.number}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group text-start"
              >
                <div className="h-1 w-full rounded-full bg-charcoal/10">
                  <div
                    className={`h-1 rounded-full bg-teal transition-all duration-500 ease-editorial ${
                      active >= i ? "w-full" : "w-0"
                    }`}
                  />
                </div>
                <span className={`mt-4 block font-display text-2xl ${active === i ? "text-charcoal" : "text-charcoal/35"}`}>
                  {step.number}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-10 max-w-xl">
            <h3 className="font-display text-2xl text-charcoal">{process[active]!.title[locale]}</h3>
            <p className="mt-3 text-charcoal/70">{process[active]!.body[locale]}</p>
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="mt-12 flex flex-col gap-8 lg:hidden">
          {process.map((step) => (
            <div key={step.number} className="border-s-2 border-teal ps-6">
              <span className="font-display text-3xl text-teal">{step.number}</span>
              <h3 className="mt-2 font-display text-xl text-charcoal">{step.title[locale]}</h3>
              <p className="mt-2 text-charcoal/70">{step.body[locale]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
