"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { services } from "@/data/services";
import Reveal from "./Reveal";

export default function ServicesShowcase({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  return (
    <section className="border-t border-charcoal/10 bg-warm py-28 sm:py-36">
      <div className="container-edit">
        <Reveal>
          <p className="eyebrow">{dictionary.nav.services}</p>
        </Reveal>
      </div>

      {/* Desktop editorial list with hover preview */}
      <div className="container-edit mt-16 hidden lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <ul onMouseLeave={() => setActive(0)}>
          {services.map((service, i) => (
            <li key={service.slug} className="border-t border-charcoal/10 last:border-b">
              <Link
                href={`/${locale}/services/${service.slug}`}
                data-cursor-hover
                onMouseEnter={() => setActive(i)}
                className="group flex items-center justify-between gap-6 py-8"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-display text-lg text-teal">{service.number}</span>
                  <span
                    className={`whitespace-pre-line font-display text-3xl transition-colors xl:text-4xl ${
                      active === i ? "text-charcoal" : "text-charcoal/40"
                    }`}
                  >
                    {service.title[locale]}
                  </span>
                </div>
                <ArrowUpRight
                  className={`h-7 w-7 shrink-0 transition-all duration-300 ease-editorial ${
                    active === i ? "translate-x-1 -translate-y-1 text-teal opacity-100" : "opacity-0"
                  } rtl:-scale-x-100`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative h-[480px] overflow-hidden rounded-sm bg-charcoal/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={services[active]!.slug}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {services[active]!.video ? (
                <video
                  key={services[active]!.video}
                  src={services[active]!.video}
                  poster={services[active]!.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={services[active]!.image}
                  alt={services[active]!.imageAlt[locale]}
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-8">
                <p className="max-w-sm text-warm/90">{services[active]!.intro[locale]}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: accordion */}
      <div className="container-edit mt-12 flex flex-col lg:hidden">
        {services.map((service, i) => {
          const isOpen = openMobile === i;
          return (
            <div key={service.slug} className="border-t border-charcoal/10 last:border-b">
              <button
                type="button"
                onClick={() => setOpenMobile(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-6 text-start"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-teal">{service.number}</span>
                  <span className="font-display text-2xl">{service.shortTitle[locale].replace("\n", " ")}</span>
                </span>
                <Plus className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="relative mb-6 h-56 overflow-hidden rounded-sm">
                      {service.video ? (
                        <video
                          src={service.video}
                          poster={service.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <Image src={service.image} alt={service.imageAlt[locale]} fill className="object-cover" />
                      )}
                    </div>
                    <p className="mb-6 text-charcoal/70">{service.intro[locale]}</p>
                    <Link href={`/${locale}/services/${service.slug}`} className="text-sm font-medium text-teal underline underline-offset-4">
                      {dictionary.common.viewAll}
                    </Link>
                    <div className="h-6" />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
