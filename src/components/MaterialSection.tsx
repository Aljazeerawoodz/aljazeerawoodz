"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/i18n/locales";
import { materialStatement } from "@/data/company";

const images = [
  "/images/material-detail.jpg",
  "/images/joinery-detail.jpg",
  "/images/wardrobe-storage.jpg",
  "/images/kitchen-alt.jpg",
];

export default function MaterialSection({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-charcoal py-28 text-warm sm:py-36">
      <div className="container-edit mb-14">
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

      <div className="no-scrollbar flex gap-6 overflow-x-auto ps-6 pe-6 sm:ps-16">
        {images.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: reduced ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className={`relative h-[360px] shrink-0 overflow-hidden rounded-sm sm:h-[460px] ${
              i % 2 === 0 ? "w-[280px] sm:w-[340px]" : "w-[220px] sm:w-[260px]"
            }`}
          >
            <Image src={src} alt="" fill sizes="400px" className="object-cover transition-transform duration-700 hover:scale-105" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
