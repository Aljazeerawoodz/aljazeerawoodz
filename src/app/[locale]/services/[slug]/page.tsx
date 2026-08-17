import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { services, getService } from "@/data/services";
import { process } from "@/data/company";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import FinalCta from "@/components/FinalCta";

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    locale,
    path: `/services/${service.slug}`,
    title: service.title[locale],
    description: service.intro[locale].slice(0, 155),
    image: service.image,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const dictionary = getDictionary(locale);
  const service = getService(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero eyebrow={`${dictionary.nav.services} — ${service.number}`} title={service.title[locale]} description={service.intro[locale]} image={service.image} />

      <section className="container-edit py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading eyebrow={locale === "ar" ? "القدرات" : "Capabilities"} title={locale === "ar" ? "ما نقدمه." : "What we cover."} size="md" />
            <ul className="mt-8 space-y-4">
              {service.capabilities[locale].map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg text-charcoal/75">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={whatsappLink(whatsappMessages[locale].service(service.title[locale]))}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="mt-10 inline-flex rounded-full bg-charcoal px-7 py-3.5 text-sm font-medium text-warm transition-transform hover:scale-[1.03]"
            >
              {dictionary.common.sendEnquiry}
            </Link>
          </div>
          <Reveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image src={service.image} alt={service.imageAlt[locale]} fill sizes="45vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-charcoal/10 bg-warm-dim py-24 sm:py-32">
        <div className="container-edit">
          <SectionHeading eyebrow={locale === "ar" ? "طريقة العمل" : "Process"} title={locale === "ar" ? "كيف ننفذ هذا العمل." : "How this work gets done."} size="md" />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((step) => (
              <div key={step.number}>
                <span className="font-display text-2xl text-teal">{step.number}</span>
                <h3 className="mt-3 font-display text-lg text-charcoal">{step.title[locale]}</h3>
                <p className="mt-2 text-sm text-charcoal/65">{step.body[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-edit py-24 sm:py-32">
        <SectionHeading eyebrow={locale === "ar" ? "خدمات أخرى" : "Other Services"} title={locale === "ar" ? "استكشف المزيد." : "Explore more."} size="md" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {otherServices.map((s) => (
            <Link key={s.slug} href={`/${locale}/services/${s.slug}`} data-cursor-hover className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image src={s.image} alt={s.imageAlt[locale]} fill sizes="30vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <p className="mt-4 font-display text-xl text-charcoal group-hover:text-teal">{s.title[locale]}</p>
            </Link>
          ))}
        </div>
      </section>

      <FinalCta locale={locale} dictionary={dictionary} />
    </>
  );
}
