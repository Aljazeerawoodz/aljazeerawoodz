"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Locale } from "@/i18n/locales";
import { materialStatement } from "@/data/company";

/**
 * Client-supplied file (public/video/hero-banner.mp4, re-encoded here
 * as hero-banner-web.mp4: audio stripped, faststart added). Same
 * provenance note as the hero video — see docs/content-sources.md.
 */
const FEATURE_VIDEO_SRC = "/video/hero-banner-web.mp4";
const FEATURE_VIDEO_POSTER = "/video/hero-banner-poster.jpg";

const strip = [
  { src: "/images/joinery-detail.jpg", alt: "Joinery workshop tools and timber" },
  { src: "/images/wood-shingle-detail.jpg", alt: "Traditional carved wood shingle facade detail" },
  { src: "/images/wardrobe-storage.jpg", alt: "Fitted wardrobe cabinetry" },
  { src: "/images/hero-main.jpg", alt: "Sculptural wood wall detailing" },
  { src: "/images/kitchen-alt.jpg", alt: "Wood-panelled kitchen detail" },
];

export default function MaterialSection({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion();
  const featureRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: featureRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-60, 60]);
  const [videoFailed, setVideoFailed] = useState(false);
  const useVideo = !reduced && !videoFailed;

  return (
    <section className="relative overflow-hidden bg-charcoal py-28 text-warm sm:py-36">
      {/* Full-bleed featured moment — a scroll parallax for depth either way. */}
      <div ref={featureRef} className="relative mb-16 h-[62vh] min-h-[420px] w-full overflow-hidden sm:mb-20">
        <motion.div style={{ y }} className="absolute inset-0 -top-16 -bottom-16">
          {useVideo ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={FEATURE_VIDEO_POSTER}
              onError={() => setVideoFailed(true)}
            >
              <source src={FEATURE_VIDEO_SRC} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={reduced ? "/images/material-detail.jpg" : FEATURE_VIDEO_POSTER}
              alt="Hand-carved wood detail"
              fill
              sizes="100vw"
              className="object-cover"
            />
          )}
        </motion.div>
        {/* Darkens only the bottom where the heading sits and leaves the
            top of the image clear — the previous version also washed the
            top out in dark grey for no reason. */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" />
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

      {/* Same padding scale as .container-edit so the strip's left edge
          lines up with the heading above it instead of looking offset. */}
      <div className="no-scrollbar flex gap-6 overflow-x-auto px-6 sm:px-10 lg:px-16">
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
