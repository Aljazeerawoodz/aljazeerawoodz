import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { articles, featuredArticle } from "@/data/blog";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMetadata({
    locale,
    path: "/blog",
    title: locale === "ar" ? "المجلة" : "Journal",
    description:
      locale === "ar"
        ? "ملاحظات في الحرفية والمواد والتصميم من الجزيرة وودز."
        : "Notes on craftsmanship, materials, and design from Al Jazeera Woodz.",
  });
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const dictionary = getDictionary(locale);
  const featured = featuredArticle();
  const rest = articles.filter((a) => a.slug !== featured.slug);

  return (
    <>
      <PageHero
        eyebrow={locale === "ar" ? "المجلة" : "Journal"}
        title={locale === "ar" ? "داخل الحرفة." : "Inside the Craft."}
        description={
          locale === "ar"
            ? "ملاحظات حول النجارة والمواد والتصميم — من فريق الجزيرة وودز."
            : "Notes on joinery, materials and design — from the Al Jazeera Woodz team."
        }
        image={featured.image}
      />

      <section className="container-edit py-20">
        <Reveal>
          <Link href={`/${locale}/blog/${featured.slug}`} data-cursor-hover className="group grid grid-cols-1 gap-8 border-b border-charcoal/10 pb-16 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="relative aspect-[16/11] overflow-hidden rounded-sm">
              <Image src={featured.image} alt="" fill sizes="50vw" className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105" />
            </div>
            <div>
              <p className="eyebrow mb-3">{featured.category[locale]}</p>
              <h2 className="font-display text-3xl text-charcoal sm:text-5xl">{featured.title[locale]}</h2>
              <p className="mt-4 max-w-md text-charcoal/70">{featured.excerpt[locale]}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brass">
                {dictionary.common.readArticle}
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
              </span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.06}>
              <Link href={`/${locale}/blog/${article.slug}`} data-cursor-hover className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image src={article.image} alt="" fill sizes="33vw" className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105" />
                </div>
                <p className="eyebrow mt-5">{article.category[locale]}</p>
                <h3 className="mt-2 font-display text-xl leading-snug text-charcoal group-hover:text-brass sm:text-2xl">
                  {article.title[locale]}
                </h3>
                <p className="mt-2 text-sm text-charcoal/60">
                  {article.minutes} {dictionary.common.minRead}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
