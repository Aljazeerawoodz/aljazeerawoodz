"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Locale } from "@/i18n/locales";
import { materialStatement } from "@/data/company";

const strip = [
  { src: "/images/joinery-detail.jpg", alt: "Joinery workshop tools and timber" },
  { src: "/images/wardrobe-storage.jpg", alt: "Fitted wardrobe cabinetry" },
  { src: "/images/hero-main.jpg", alt: "Sculptural wood wall detailing" },
  { src: "/images/kitchen-alt.jpg", alt: "Wood-panelled kitchen detail" },
];

export default function MaterialSection({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion();
  const featureRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: featureRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-60, 60]);

  return (
    <section className="relative overflow-hidden bg-charcoal py-28 text-warm sm:py-36">
      {/* Full-bleed featured moment — the wood-carving detail gets real
          visual weight, with a subtle scroll parallax for depth. */}
      <div ref={featureRef} className="relative mb-16 h-[62vh] min-h-[420px] w-full overflow-hidden sm:mb-20">
        <motion.div style={{ y }} className="absolute inset-0 -top-16 -bottom-16">
          <Image
            src="/images/material-detail.jpg"
            alt="Hand-carved wood detail"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/50" />
        <div className="container-edit relative z-10 flex h-full items-end pb-12">
          <motion.h2
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            {materialStatement[locale]}
          </motion.h2>
        </div>
      </div>

      <div className="no-scrollbar flex gap-6 overflow-x-auto ps-6 pe-6 sm:ps-16">
        {strip.map((image, i) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: reduced ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className={`relative h-[300px] shrink-0 overflow-hidden rounded-sm sm:h-[380px] ${
              i % 2 === 0 ? "w-[240px] sm:w-[300px]" : "w-[190px] sm:w-[230px]"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="400px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
