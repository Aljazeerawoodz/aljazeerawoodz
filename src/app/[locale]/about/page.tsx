import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { whoWeAre, mission, vision } from "@/data/company";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import StoryTimeline from "@/components/StoryTimeline";
import QualitySection from "@/components/QualitySection";
import WhyUsSection from "@/components/WhyUsSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import FinalCta from "@/components/FinalCta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMetadata({
    locale,
    path: "/about",
    title: locale === "ar" ? "من نحن" : "About",
    description: whoWeAre[locale].slice(0, 155),
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={locale === "ar" ? "من نحن" : "About"}
        title={locale === "ar" ? "من نحن." : "Who We Are."}
        image="/video/project08-poster.jpg"
        video="/video/project08-web.mp4"
      />

      <section className="container-edit py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow={locale === "ar" ? "نبذة عنا" : "Who We Are"} title={locale === "ar" ? "جاهزون للمشاريع الأكثر تحديًا." : "Ready for the harder brief."} />
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-charcoal/75">{whoWeAre[locale]}</p>
          </Reveal>
        </div>
      </section>

      {/* Client note relayed directly in chat: openness to bigger/more
          unusual briefs, including stage and set builds for film/event
          productions — not in the original PDF, added on request. */}
      <section className="border-y border-charcoal/10 bg-warm-dim py-16">
        <div className="container-edit">
          <Reveal>
            <p className="max-w-3xl font-display text-2xl leading-snug text-charcoal sm:text-3xl">
              {locale === "ar"
                ? "نحن منفتحون على المشاريع الأكثر تحديًا — من التشطيبات الداخلية المعقدة إلى بناء المسارح والأعمال الفنية لمواقع تصوير الأفلام والفعاليات."
                : "We're open for more challenging projects — from complex interior builds to stages and art-piece builds for film shoots and events."}
            </p>
          </Reveal>
        </div>
      </section>

      <StoryTimeline locale={locale} dictionary={dictionary} />

      <section className="container-edit py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-4">{locale === "ar" ? "بيان مهمتنا" : "Our Mission Statement"}</p>
            <p className="font-display text-2xl leading-snug text-charcoal sm:text-3xl">{mission[locale]}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow mb-4">{locale === "ar" ? "رؤيتنا على المدى الطويل" : "Our Long-Term Vision"}</p>
            <p className="font-display text-2xl leading-snug text-charcoal sm:text-3xl">{vision[locale]}</p>
          </Reveal>
        </div>
      </section>

      <ServicesShowcase locale={locale} dictionary={dictionary} />
      <QualitySection locale={locale} dictionary={dictionary} />
      <WhyUsSection locale={locale} />
      <FinalCta locale={locale} dictionary={dictionary} />
    </>
  );
}
