"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";

const lines = {
  en: ["ANY WOOD.", "ANY DESIGN."],
  ar: ["أي خشب،", "أي تصميم."],
};

const SLIDE_SECONDS = 6.5;

const slides = [
  {
    src: "/images/hero-main.jpg",
    alt: { en: "Sculptural wood wall detailing", ar: "تفاصيل جدارية خشبية منحوتة" },
    caption: { en: "Wood, Reimagined", ar: "الخشب بروح جديدة" },
  },
  {
    src: "/images/joinery-install.jpg",
    alt: { en: "Joiner fitting custom wood cabinetry on site", ar: "نجار يُركّب أعمال خشبية مخصصة في الموقع" },
    caption: { en: "Precision Joinery", ar: "نجارة دقيقة" },
  },
  {
    src: "/images/material-detail.jpg",
    alt: { en: "Hand-carved wood detail", ar: "تفاصيل خشبية منحوتة يدويًا" },
    caption: { en: "Handcrafted Detail", ar: "تفاصيل حرفية يدوية" },
  },
  {
    src: "/images/joinery-detail.jpg",
    alt: { en: "Joinery workshop tools and timber", ar: "أدوات ورشة النجارة والأخشاب" },
    caption: { en: "Workshop Craftsmanship", ar: "حرفية الورشة" },
  },
  {
    src: "/images/wardrobe-storage.jpg",
    alt: { en: "Fitted wardrobe cabinetry", ar: "خزائن ملابس مُجهزة" },
    caption: { en: "Custom Cabinetry", ar: "خزائن مخصصة" },
  },
];

export default function Hero({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setActive((v) => (v + 1) % slides.length), SLIDE_SECONDS * 1000);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-charcoal">
      {/* All slides stay mounted — only opacity + a slow Ken Burns zoom change.
          Avoids re-fetching images on every crossfade. */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: active === i ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={reduced ? { scale: 1 } : { scale: active === i ? 1.1 : 1 }}
              transition={{ duration: active === i ? SLIDE_SECONDS + 1.2 : 0, ease: "linear" }}
            >
              <Image
                src={slide.src}
                alt={slide.alt[locale]}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover opacity-70"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
      {/* Cinematic vignette — darkens the edges so the crossfade reads as
          "film" rather than a slideshow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />

      <div className="container-edit relative z-10 pb-20 pt-40 sm:pb-28">
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="eyebrow mb-6 text-warm/80"
        >
          {locale === "ar" ? "تشطيبات داخلية · نجارة · أثاث مخصص" : "Interior Fitout · Joinery · Custom Furniture"}
        </motion.p>

        <h1 className="font-display font-semibold leading-[0.95] text-warm">
          {lines[locale].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: reduced ? 0 : "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[13vw] sm:text-[9vw] lg:text-[7vw]"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-end justify-between gap-8"
        >
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/projects`}
              data-cursor-hover
              className="rounded-full bg-warm px-7 py-3.5 text-sm font-medium text-charcoal transition-transform hover:scale-[1.03]"
            >
              {dictionary.common.exploreWork}
            </Link>
            <Link
              href={`/${locale}/contact`}
              data-cursor-hover
              className="rounded-full border border-warm/40 px-7 py-3.5 text-sm font-medium text-warm transition-colors hover:bg-warm/10"
            >
              {dictionary.common.startProject}
            </Link>
          </div>

          {/* Slide captions / indicators — desktop only, keeps the mobile hero uncluttered */}
          <div className="hidden items-center gap-4 sm:flex">
            <AnimatePresence mode="wait">
              <motion.span
                key={slides[active]!.caption.en}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="text-sm text-warm/70"
              >
                {slides[active]!.caption[locale]}
              </motion.span>
            </AnimatePresence>
            <div className="flex items-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  data-cursor-hover
                  onClick={() => setActive(i)}
                  className="relative h-1 w-8 overflow-hidden rounded-full bg-warm/25"
                >
                  {i === active ? (
                    <motion.span
                      key={active}
                      className="absolute inset-y-0 start-0 rounded-full bg-brass"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: reduced ? 0.01 : SLIDE_SECONDS, ease: "linear" }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute inset-x-0 bottom-6 z-10 hidden justify-center sm:flex"
      >
        <div className="flex flex-col items-center gap-2 text-warm/70">
          <span className="text-[11px] uppercase tracking-widest2">{dictionary.common.scroll}</span>
          <motion.span
            animate={reduced ? {} : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-8 w-px bg-warm/50"
          />
        </div>
      </motion.div>
    </section>
  );
}
