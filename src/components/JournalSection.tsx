import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { articles, featuredArticle } from "@/data/blog";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function JournalSection({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const featured = featuredArticle();
  const rest = articles.filter((a) => a.slug !== featured.slug).slice(0, 2);

  return (
    <section className="border-t border-charcoal/10 bg-warm py-28 sm:py-36">
      <div className="container-edit">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow={locale === "ar" ? "المجلة" : "Journal"} title={locale === "ar" ? "داخل الحرفة." : "Inside the Craft."} />
          <Link
            href={`/${locale}/blog`}
            data-cursor-hover
            className="hidden shrink-0 items-center gap-2 text-sm font-medium text-charcoal/70 hover:text-teal sm:flex"
          >
            {dictionary.common.viewAll}
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <Link href={`/${locale}/blog/${featured.slug}`} data-cursor-hover className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="60vw"
                  className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-6">{featured.category[locale]}</p>
              <h3 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">{featured.title[locale]}</h3>
              <p className="mt-3 max-w-lg text-charcoal/70">{featured.excerpt[locale]}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal">
                {dictionary.common.readArticle}
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </span>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-10">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={0.1 + i * 0.1}>
                <Link href={`/${locale}/blog/${article.slug}`} data-cursor-hover className="group flex gap-5">
                  <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-sm sm:h-28 sm:w-32">
                    <Image src={article.image} alt="" fill sizes="140px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div>
                    <p className="eyebrow">{article.category[locale]}</p>
                    <h4 className="mt-1 font-display text-lg leading-snug text-charcoal group-hover:text-teal sm:text-xl">
                      {article.title[locale]}
                    </h4>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Link href={`/${locale}/blog`} className="mt-12 flex items-center gap-2 text-sm font-medium text-charcoal/70 sm:hidden">
          {dictionary.common.viewAll}
          <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
        </Link>
      </div>
    </section>
  );
}
