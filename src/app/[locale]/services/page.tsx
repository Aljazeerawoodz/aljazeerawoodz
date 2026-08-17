import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/locales";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/data/services";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FinalCta from "@/components/FinalCta";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMetadata({
    locale,
    path: "/services",
    title: locale === "ar" ? "الخدمات" : "Services",
    description:
      locale === "ar"
        ? "تشطيبات داخلية، نجارة، مطابخ وخزائن، وأثاث مخصص — مجموعة كاملة من الخدمات."
        : "Interior fitout, joinery, kitchens & cabinets, and custom furniture — a complete range of services.",
  });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={locale === "ar" ? "خدماتنا" : "Our Expertise"}
        title={locale === "ar" ? "خدماتنا." : "Our Services."}
        description={
          locale === "ar"
            ? "مجموعة كاملة من الخدمات المصممة لتغطية كل من التنفيذ الإنشائي والتشطيبات التفصيلية داخل المساحة."
            : "A complete range of services designed to cover both structural execution and detailed finishing within a space."
        }
        image="/video/modern-arch-poster.jpg"
        video="/video/modern-arch-web.mp4"
      />

      <section className="container-edit py-24 sm:py-32">
        <div className="flex flex-col">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.05}>
              <Link
                href={`/${locale}/services/${service.slug}`}
                data-cursor-hover
                className="group grid grid-cols-1 items-center gap-8 border-t border-charcoal/10 py-12 last:border-b sm:grid-cols-[auto_1fr_auto] sm:gap-12"
              >
                <span className="font-display text-2xl text-teal">{service.number}</span>
                <div className="flex items-center gap-8">
                  <div className="relative hidden h-24 w-32 shrink-0 overflow-hidden rounded-sm sm:block">
                    <Image src={service.image} alt={service.imageAlt[locale]} fill sizes="140px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl text-charcoal sm:text-4xl">{service.title[locale]}</h2>
                    <p className="mt-2 max-w-lg text-charcoal/65">{service.intro[locale]}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-7 w-7 shrink-0 justify-self-end text-charcoal/40 transition-all duration-300 ease-editorial group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal rtl:-scale-x-100" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta locale={locale} dictionary={dictionary} />
    </>
  );
}
