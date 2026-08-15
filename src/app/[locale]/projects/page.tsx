import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import FinalCta from "@/components/FinalCta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMetadata({
    locale,
    path: "/projects",
    title: locale === "ar" ? "المشاريع" : "Projects",
    description:
      locale === "ar"
        ? "معرض مشاريع الجزيرة وودز في التشطيبات الداخلية والنجارة والأثاث المخصص."
        : "A portfolio of Al Jazeera Woodz work across interior fitout, joinery and custom furniture.",
  });
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={locale === "ar" ? "المشاريع" : "Projects"}
        title={locale === "ar" ? "أعمالنا." : "Our Work."}
        image="/images/kitchen-cabinets.jpg"
      />
      <ProjectsGrid locale={locale} dictionary={dictionary} />
      <FinalCta locale={locale} dictionary={dictionary} />
    </>
  );
}
