"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { projects, type ProjectCategory, type ServiceSlug } from "@/data/projects";
import { services } from "@/data/services";

type Filter = "all" | ServiceSlug | ProjectCategory;

export default function ProjectsGrid({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [filter, setFilter] = useState<Filter>("all");

  const categoryLabels: Record<ProjectCategory, Record<Locale, string>> = {
    residential: { en: "Residential", ar: "سكني" },
    commercial: { en: "Commercial", ar: "تجاري" },
    retail: { en: "Retail", ar: "تجزئة" },
  };

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: dictionary.common.allProjects },
    ...services.map((s) => ({ key: s.slug as Filter, label: s.title[locale] })),
    ...(Object.keys(categoryLabels) as ProjectCategory[]).map((c) => ({ key: c as Filter, label: categoryLabels[c][locale] })),
  ];

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.service === filter || p.category === filter)),
    [filter]
  );

  return (
    <section className="container-edit py-20 sm:py-28">
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              filter === f.key ? "border-charcoal bg-charcoal text-warm" : "border-charcoal/15 text-charcoal/70 hover:border-charcoal/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-charcoal/20 py-28 text-center">
          <p className="font-display text-2xl text-charcoal sm:text-3xl">
            {locale === "ar" ? "المعرض قيد الإعداد." : "The portfolio is being prepared."}
          </p>
          <p className="mt-4 max-w-md text-charcoal/60">
            {locale === "ar"
              ? "سيتم نشر مشاريع الجزيرة وودز الحقيقية هنا فور توفر الصور والتفاصيل. تواصلوا معنا لمناقشة مشروعكم القادم."
              : "Real Al Jazeera Woodz project photography will appear here as it becomes available. Get in touch to discuss what we could build for your space."}
          </p>
          <Link href={`/${locale}/contact`} className="mt-8 rounded-full bg-charcoal px-7 py-3.5 text-sm font-medium text-warm">
            {dictionary.nav.cta}
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link key={project.slug} href={`/${locale}/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image src={project.coverImage} alt={project.title[locale]} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-4 font-display text-xl text-charcoal group-hover:text-teal">{project.title[locale]}</p>
              <p className="text-sm text-charcoal/60">{project.location[locale]}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
