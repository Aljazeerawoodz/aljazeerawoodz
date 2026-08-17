import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/locales";
import { pageMetadata } from "@/lib/seo";
import { brand, contact, license } from "@/data/company";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  return pageMetadata({
    locale,
    path: "/terms",
    title: locale === "ar" ? "الشروط والأحكام" : "Terms & Conditions",
    description:
      locale === "ar"
        ? "الشروط والأحكام الخاصة باستخدام موقع الجزيرة للأعمال الخشبية."
        : "The terms and conditions for using the Al Jazeera Wooden Works website.",
  });
}

const sections: { heading: { en: string; ar: string }; body: { en: string[]; ar: string[] } }[] = [
  {
    heading: { en: "About This Company", ar: "عن الشركة" },
    body: {
      en: [
        `${brand.legalName.en} is a registered ${license.legalForm.en} operating under trade licence number ${license.number}, issued by the ${license.authority.en}, established ${license.establishedDate}. Registered address: ${contact.address.en}.`,
      ],
      ar: [
        `"${brand.legalName.ar}" هي ${license.legalForm.ar} مسجّلة بموجب الرخصة التجارية رقم ${license.number}، الصادرة عن ${license.authority.ar}، وتأسست بتاريخ ${license.establishedDate}. العنوان المسجّل: ${contact.address.ar}.`,
      ],
    },
  },
  {
    heading: { en: "Acceptance of Terms", ar: "قبول الشروط" },
    body: {
      en: [
        `By accessing or using ${brand.domain} (the "Website"), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use this Website.`,
      ],
      ar: [
        `باستخدامكم أو دخولكم إلى الموقع ${brand.domain} ("الموقع")، فإنكم توافقون على الالتزام بهذه الشروط والأحكام. في حال عدم موافقتكم، يرجى عدم استخدام هذا الموقع.`,
      ],
    },
  },
  {
    heading: { en: "Purpose of This Website", ar: "الغرض من هذا الموقع" },
    body: {
      en: [
        "This Website is a brand, portfolio, and enquiry platform for our interior fitout, joinery, kitchens & cabinets, and custom furniture services. It is not an e-commerce platform — there is no online shop, product checkout, or online payment facility. All pricing, quotations, and project agreements are handled directly between you and our team, offline or by direct communication.",
      ],
      ar: [
        "هذا الموقع هو منصة للعلامة التجارية والأعمال والاستفسارات الخاصة بخدماتنا في التشطيبات الداخلية، النجارة، المطابخ والخزائن، والأثاث المخصص. وهو ليس منصة تجارة إلكترونية — لا يوجد متجر إلكتروني أو نظام دفع أو شراء عبر الإنترنت. تتم كافة عمليات التسعير وعروض الأسعار واتفاقيات المشاريع مباشرة بينكم وبين فريقنا.",
      ],
    },
  },
  {
    heading: { en: "Enquiries & Quotations", ar: "الاستفسارات وعروض الأسعار" },
    body: {
      en: [
        "Submitting the enquiry form or messaging us on WhatsApp does not create a binding contract. Any quotation, timeline, or scope of work we provide is an estimate based on the information available at that time and becomes binding only once confirmed in a separate written agreement between you and our company.",
      ],
      ar: [
        "إرسال نموذج الاستفسار أو مراسلتنا عبر واتساب لا ينشئ عقدًا ملزمًا. أي عرض سعر أو جدول زمني أو نطاق عمل نقدمه هو تقدير مبني على المعلومات المتوفرة في ذلك الوقت، ولا يصبح ملزمًا إلا بعد تأكيده في اتفاقية مكتوبة منفصلة بينكم وبين شركتنا.",
      ],
    },
  },
  {
    heading: { en: "Website Content & Intellectual Property", ar: "محتوى الموقع والملكية الفكرية" },
    body: {
      en: [
        "The text, layout, and design of this Website belong to us unless otherwise noted. Some photography and video used for illustrative/atmospheric purposes on this Website is licensed stock content or supplied by third parties and is not a representation of a specific completed project unless explicitly stated. You may not reproduce, republish, or use our website content for commercial purposes without our written permission.",
      ],
      ar: [
        "يعود النص والتصميم الخاص بهذا الموقع لنا ما لم يُذكر خلاف ذلك. بعض الصور ومقاطع الفيديو المستخدمة لأغراض توضيحية/جوّية على هذا الموقع هي محتوى مرخّص أو مُقدَّم من أطراف ثالثة، ولا تمثل مشروعًا محددًا منجزًا ما لم يُذكر ذلك صراحة. لا يجوز لكم نسخ أو إعادة نشر أو استخدام محتوى موقعنا لأغراض تجارية دون إذن كتابي منا.",
      ],
    },
  },
  {
    heading: { en: "Accuracy of Information", ar: "دقة المعلومات" },
    body: {
      en: [
        "We take reasonable care to keep information on this Website accurate and up to date, but we do not guarantee that all content is free of errors or omissions at all times. Material finishes, colours, and dimensions shown may vary from the finished product.",
      ],
      ar: [
        "نبذل عناية معقولة للحفاظ على دقة المعلومات وتحديثها على هذا الموقع، إلا أننا لا نضمن خلو كافة المحتويات من الأخطاء أو السهو في جميع الأوقات. قد تختلف تشطيبات المواد والألوان والأبعاد المعروضة عن المنتج النهائي.",
      ],
    },
  },
  {
    heading: { en: "Third-Party Links & Services", ar: "روابط وخدمات الأطراف الثالثة" },
    body: {
      en: [
        "This Website links to third-party platforms including WhatsApp, Instagram, Facebook, and LinkedIn. We are not responsible for the content, policies, or practices of these third-party platforms.",
      ],
      ar: [
        "يتضمن هذا الموقع روابط لمنصات أطراف ثالثة تشمل واتساب وإنستغرام وفيسبوك ولينكد إن. نحن غير مسؤولين عن محتوى أو سياسات أو ممارسات هذه المنصات الخارجية.",
      ],
    },
  },
  {
    heading: { en: "Limitation of Liability", ar: "حدود المسؤولية" },
    body: {
      en: [
        "To the fullest extent permitted by UAE law, we are not liable for any indirect, incidental, or consequential loss arising from your use of this Website. This does not limit any liability that cannot be excluded under UAE law.",
      ],
      ar: [
        "إلى أقصى حد يسمح به القانون الإماراتي، لا نتحمل المسؤولية عن أي خسارة غير مباشرة أو عرضية أو تبعية ناتجة عن استخدامكم لهذا الموقع. لا يحد هذا من أي مسؤولية لا يمكن استبعادها بموجب القانون الإماراتي.",
      ],
    },
  },
  {
    heading: { en: "Governing Law & Jurisdiction", ar: "القانون الحاكم والاختصاص القضائي" },
    body: {
      en: [
        "These Terms & Conditions are governed by the laws of the United Arab Emirates and the Emirate of Ras Al Khaimah. Any dispute arising from your use of this Website or our services is subject to the exclusive jurisdiction of the competent courts of Ras Al Khaimah.",
      ],
      ar: [
        "تخضع هذه الشروط والأحكام لقوانين دولة الإمارات العربية المتحدة وإمارة رأس الخيمة. يخضع أي نزاع ينشأ عن استخدامكم لهذا الموقع أو خدماتنا للاختصاص القضائي الحصري للمحاكم المختصة في رأس الخيمة.",
      ],
    },
  },
  {
    heading: { en: "Changes to These Terms", ar: "التغييرات على هذه الشروط" },
    body: {
      en: [
        "We may revise these Terms & Conditions at any time. Continued use of the Website after changes are posted means you accept the revised terms.",
      ],
      ar: [
        "يجوز لنا تعديل هذه الشروط والأحكام في أي وقت. استمراركم في استخدام الموقع بعد نشر التعديلات يعني موافقتكم على الشروط المعدّلة.",
      ],
    },
  },
];

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  return (
    <>
      <PageHero
        eyebrow={locale === "ar" ? "قانوني" : "Legal"}
        title={locale === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
        description={
          locale === "ar"
            ? `رخصة تجارية رقم ${license.number} — دائرة التنمية الاقتصادية برأس الخيمة`
            : `Trade licence No. ${license.number} — Ras Al Khaimah Department of Economic Development`
        }
      />
      <section className="container-edit max-w-3xl py-20 sm:py-28">
        {sections.map((s) => (
          <Reveal key={s.heading.en} className="mb-12">
            <h2 className="font-display text-2xl text-charcoal sm:text-3xl">{s.heading[locale]}</h2>
            {s.body[locale].map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed text-charcoal/75">
                {p}
              </p>
            ))}
          </Reveal>
        ))}

        <Reveal className="mb-12">
          <h2 className="font-display text-2xl text-charcoal sm:text-3xl">{locale === "ar" ? "تواصلوا معنا" : "Contact Us"}</h2>
          <p className="mt-4 leading-relaxed text-charcoal/75">
            {locale === "ar" ? "لأي أسئلة حول هذه الشروط:" : "For any questions about these Terms:"}
          </p>
          <p className="mt-4 text-charcoal/75">
            {brand.name[locale]}
            <br />
            {contact.address[locale]}
            <br />
            <span dir="ltr">{contact.email}</span> · <span dir="ltr">{contact.phones[0]}</span>
          </p>
        </Reveal>
      </section>
    </>
  );
}
