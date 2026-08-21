import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { articles, getArticle } from "@/data/blog";
import FinalCta from "@/components/FinalCta";

export function generateStaticParams() {
  return locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    locale,
    path: `/blog/${article.slug}`,
    title: article.title[locale],
    description: article.excerpt[locale],
    image: article.image,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const dictionary = getDictionary(locale);
  const article = getArticle(slug);
  if (!article) notFound();

  const BackIcon = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <>
      <article className="pt-32">
        <div className="container-edit max-w-3xl">
          <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-teal">
            <BackIcon className="h-4 w-4" />
            {dictionary.common.backTo} {dictionary.nav.journal}
          </Link>
          <p className="eyebrow mb-4 mt-8">{article.category[locale]}</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] text-charcoal sm:text-5xl">{article.title[locale]}</h1>
          <p className="mt-4 text-sm text-charcoal/50">
            {article.minutes} {dictionary.common.minRead}
          </p>
        </div>

        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden">
          <Image src={article.image} alt={article.title[locale]} fill sizes="100vw" className="object-cover" priority />
        </div>

        <div className="container-edit max-w-3xl py-16">
          {article.body[locale].map((paragraph, i) => (
            <p key={i} className="mb-6 text-lg leading-relaxed text-charcoal/80">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <FinalCta locale={locale} dictionary={dictionary} />
    </>
  );
}
