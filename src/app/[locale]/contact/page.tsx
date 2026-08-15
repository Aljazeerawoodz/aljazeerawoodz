import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { contact } from "@/data/company";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMetadata({
    locale,
    path: "/contact",
    title: locale === "ar" ? "تواصل معنا" : "Contact",
    description:
      locale === "ar"
        ? "تواصلوا مع الجزيرة وودز لمناقشة مشروعكم القادم في التشطيبات الداخلية أو النجارة أو الأثاث المخصص."
        : "Get in touch with Al Jazeera Woodz to discuss your next interior fitout, joinery, or custom furniture project.",
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const dictionary = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={locale === "ar" ? "تواصل معنا" : "Get in Touch"}
        title={locale === "ar" ? "لنتحدث عن مشروعك." : "Let's talk about your project."}
        description={
          locale === "ar"
            ? "سواء كان الأمر يتعلق بتجهيزات داخلية كاملة، أو أعمال نجارة دقيقة، أو أثاث مصمم حسب الطلب، يمكن أن تبدأ المحادثة بمجرد طلب بسيط."
            : "Whether it's a complete interior fitout, detailed joinery, or custom furniture, the conversation can start with a simple requirement."
        }
        image="/images/about-atmosphere.jpg"
      />

      <section className="container-edit grid grid-cols-1 gap-16 py-24 sm:py-32 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="eyebrow mb-6">{dictionary.footer.contactHeading}</p>
          <ul className="space-y-6 text-charcoal/80">
            <li className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-brass" />
              <div dir="ltr" className="text-start">
                {contact.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="block hover:text-brass">
                    {phone}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-brass" />
              <a href={`mailto:${contact.email}`} dir="ltr" className="hover:text-brass">
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-brass" />
              <span>{contact.location[locale]}</span>
            </li>
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={whatsappLink(whatsappMessages[locale].general)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white"
            >
              {dictionary.common.whatsapp}
            </a>
            <a href={`tel:${contact.phones[0]!.replace(/\s/g, "")}`} className="rounded-full border border-charcoal/20 px-6 py-3 text-sm font-medium text-charcoal">
              {dictionary.common.call}
            </a>
            <a href={`mailto:${contact.email}`} className="rounded-full border border-charcoal/20 px-6 py-3 text-sm font-medium text-charcoal">
              {dictionary.common.email}
            </a>
          </div>

          <div className="mt-10 overflow-hidden rounded-sm border border-charcoal/10">
            <iframe
              title="Ras Al Khaimah, UAE"
              src="https://www.google.com/maps?q=Ras+Al+Khaimah,+UAE&output=embed"
              className="h-64 w-full grayscale"
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <ContactForm locale={locale} dictionary={dictionary} />
        </div>
      </section>
    </>
  );
}
