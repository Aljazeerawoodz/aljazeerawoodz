import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import Hero from "@/components/Hero";
import IntroStatement from "@/components/IntroStatement";
import ServicesShowcase from "@/components/ServicesShowcase";
import MaterialSection from "@/components/MaterialSection";
import StoryTimeline from "@/components/StoryTimeline";
import ProcessTimeline from "@/components/ProcessTimeline";
import QualitySection from "@/components/QualitySection";
import JournalSection from "@/components/JournalSection";
import WhyUsSection from "@/components/WhyUsSection";
import FinalCta from "@/components/FinalCta";
import WoodGrainDivider from "@/components/WoodGrainDivider";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMetadata({
    locale,
    path: "",
    title: locale === "ar" ? "الرئيسية" : "Home",
    description:
      locale === "ar"
        ? "الجزيرة للأعمال الخشبية — تشطيبات داخلية وأعمال نجارة وأثاث مخصص في الإمارات العربية المتحدة."
        : "Al Jazeera Wooden Works — interior fitout, joinery and custom furniture across the UAE.",
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const dictionary = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dictionary={dictionary} />
      <div className="container-edit pt-14">
        <WoodGrainDivider />
      </div>
      <IntroStatement locale={locale} />
      <ServicesShowcase locale={locale} dictionary={dictionary} />
      <MaterialSection locale={locale} />
      <StoryTimeline locale={locale} dictionary={dictionary} />
      <ProcessTimeline locale={locale} dictionary={dictionary} />
      <QualitySection locale={locale} dictionary={dictionary} />
      <JournalSection locale={locale} dictionary={dictionary} />
      <WhyUsSection locale={locale} />
      <FinalCta locale={locale} dictionary={dictionary} />
    </>
  );
}
