import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { projects, getProject } from "@/data/projects";
import FinalCta from "@/components/FinalCta";

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: project.title[locale],
    description: project.summary[locale].slice(0, 155),
    image: project.coverImage,
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const dictionary = getDictionary(locale);
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <section className="pt-32">
        <div className="container-edit">
          <p className="eyebrow mb-4">{project.location[locale]} · {project.year}</p>
          <h1 className="font-display text-4xl font-semibold text-charcoal sm:text-6xl">{project.title[locale]}</h1>
          <p className="mt-6 max-w-xl text-charcoal/70">{project.summary[locale]}</p>
        </div>
        <div className="relative mt-14 aspect-[16/9] w-full overflow-hidden">
          <Image src={project.coverImage} alt={project.title[locale]} fill sizes="100vw" className="object-cover" />
        </div>
      </section>

      {project.gallery.length ? (
        <section className="container-edit grid grid-cols-1 gap-6 py-20 sm:grid-cols-2">
          {project.gallery.map((src, i) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image src={src} alt={`${project.title[locale]} — ${i + 1}`} fill sizes="50vw" className="object-cover" />
            </div>
          ))}
        </section>
      ) : null}

      <FinalCta locale={locale} dictionary={dictionary} />
    </>
  );
}
