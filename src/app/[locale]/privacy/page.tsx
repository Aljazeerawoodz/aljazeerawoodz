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
    path: "/privacy",
    title: locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy",
    description:
      locale === "ar"
        ? "كيف تجمع الجزيرة وودز بياناتكم وتستخدمها وتحميها."
        : "How Al Jazeera Woodz collects, uses, and protects your information.",
  });
}

const sections: { heading: { en: string; ar: string }; body: { en: string[]; ar: string[] } }[] = [
  {
    heading: { en: "Introduction", ar: "مقدمة" },
    body: {
      en: [
        `This Privacy Policy explains how ${brand.name.en} ("we", "us", "our") collects, uses, and protects information when you visit ${brand.domain}, contact us through the enquiry form, or message us on WhatsApp. By using this website, you agree to the practices described here.`,
      ],
      ar: [
        `توضح سياسة الخصوصية هذه كيفية جمع "الجزيرة وودز" ("نحن") للمعلومات واستخدامها وحمايتها عند زيارتكم للموقع ${brand.domain}، أو تواصلكم معنا عبر نموذج الاستفسار، أو مراسلتنا عبر واتساب. باستخدامكم لهذا الموقع، فإنكم توافقون على الممارسات الموضحة هنا.`,
      ],
    },
  },
  {
    heading: { en: "Information We Collect", ar: "المعلومات التي نجمعها" },
    body: {
      en: [
        "When you submit the contact/enquiry form, we collect the information you provide directly: your name, company (optional), email address, phone number, project type, project location (optional), requirement details, your message, and an optional file attachment.",
        "When you message us on WhatsApp, that conversation is handled through WhatsApp's own platform (operated by Meta) and is subject to WhatsApp's Privacy Policy in addition to this one.",
        "We do not use analytics cookies, advertising trackers, or third-party marketing pixels on this website as of this policy's publication date.",
      ],
      ar: [
        "عند إرسال نموذج التواصل/الاستفسار، نقوم بجمع المعلومات التي تقدمونها مباشرة: الاسم، الشركة (اختياري)، البريد الإلكتروني، رقم الهاتف، نوع المشروع، موقع المشروع (اختياري)، تفاصيل المتطلبات، رسالتكم، ومرفق اختياري.",
        "عند مراسلتنا عبر واتساب، تتم معالجة تلك المحادثة عبر منصة واتساب الخاصة (التي تديرها شركة Meta) وتخضع لسياسة خصوصية واتساب بالإضافة إلى هذه السياسة.",
        "نحن لا نستخدم ملفات تعريف ارتباط تحليلية أو أدوات تتبع إعلانية أو بكسلات تسويقية من أطراف ثالثة على هذا الموقع حتى تاريخ نشر هذه السياسة.",
      ],
    },
  },
  {
    heading: { en: "How We Use Your Information", ar: "كيفية استخدام معلوماتكم" },
    body: {
      en: [
        "We use the information you submit solely to respond to your enquiry, discuss your project, provide quotations, and — where you've agreed to proceed — deliver our services. We do not sell, rent, or trade your personal information to third parties for marketing purposes.",
      ],
      ar: [
        "نستخدم المعلومات التي ترسلونها فقط للرد على استفساركم، ومناقشة مشروعكم، وتقديم عروض الأسعار، وتقديم خدماتنا في حال موافقتكم على المضي قدمًا. نحن لا نبيع أو نؤجر أو نتاجر بمعلوماتكم الشخصية مع أطراف ثالثة لأغراض تسويقية.",
      ],
    },
  },
  {
    heading: { en: "How We Share Information", ar: "كيفية مشاركة المعلومات" },
    body: {
      en: [
        "Enquiry form submissions are delivered to our email inbox via a standard SMTP email service (hosted on Microsoft 365). The website itself is hosted on Vercel's infrastructure. These providers process data on our behalf as part of running the website and do not use your information for their own purposes.",
        "We do not share your information with any other third party except where required by UAE law or a valid legal request from a competent authority.",
      ],
      ar: [
        "يتم إرسال بيانات نموذج الاستفسار إلى بريدنا الإلكتروني عبر خدمة بريد إلكتروني قياسية (Microsoft 365). ويتم استضافة الموقع نفسه على بنية Vercel التحتية. تقوم هذه الجهات بمعالجة البيانات نيابة عنا كجزء من تشغيل الموقع ولا تستخدم معلوماتكم لأغراضها الخاصة.",
        "نحن لا نشارك معلوماتكم مع أي طرف ثالث آخر إلا إذا تطلب ذلك القانون الإماراتي أو طلب قانوني صادر عن جهة مختصة.",
      ],
    },
  },
  {
    heading: { en: "Data Retention", ar: "الاحتفاظ بالبيانات" },
    body: {
      en: [
        "We retain enquiry information for as long as reasonably necessary to respond to you and, if a project proceeds, for the duration of that business relationship plus a reasonable period afterward for record-keeping. You may request deletion of your information at any time — see \"Your Rights\" below.",
      ],
      ar: [
        "نحتفظ بمعلومات الاستفسار للمدة اللازمة بشكل معقول للرد عليكم، وفي حال المضي قدمًا بالمشروع، طوال مدة تلك العلاقة التجارية بالإضافة إلى فترة معقولة بعد ذلك لأغراض حفظ السجلات. يمكنكم طلب حذف معلوماتكم في أي وقت — راجعوا \"حقوقكم\" أدناه.",
      ],
    },
  },
  {
    heading: { en: "Your Rights", ar: "حقوقكم" },
    body: {
      en: [
        "You may ask us at any time to confirm what information we hold about you, correct inaccurate information, or delete your information from our records (subject to any legal obligation we may have to retain it). To exercise any of these rights, contact us using the details below.",
      ],
      ar: [
        "يمكنكم في أي وقت أن تطلبوا منا تأكيد المعلومات التي نحتفظ بها عنكم، أو تصحيح أي معلومات غير دقيقة، أو حذف معلوماتكم من سجلاتنا (مع مراعاة أي التزام قانوني قد يتطلب منا الاحتفاظ بها). لممارسة أي من هذه الحقوق، تواصلوا معنا عبر البيانات أدناه.",
      ],
    },
  },
  {
    heading: { en: "Children's Privacy", ar: "خصوصية الأطفال" },
    body: {
      en: [
        "This website is intended for businesses and adult consumers seeking interior fitout, joinery, or furniture services. We do not knowingly collect information from children.",
      ],
      ar: [
        "هذا الموقع موجه للشركات والمستهلكين البالغين الراغبين في خدمات التشطيبات الداخلية أو النجارة أو الأثاث. نحن لا نجمع معلومات من الأطفال عن علم.",
      ],
    },
  },
  {
    heading: { en: "Changes to This Policy", ar: "التغييرات على هذه السياسة" },
    body: {
      en: [
        "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. The date of the most recent version will be reflected on this page.",
      ],
      ar: [
        "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب قانونية. سيتم توضيح تاريخ أحدث نسخة على هذه الصفحة.",
      ],
    },
  },
];

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  return (
    <>
      <PageHero
        eyebrow={locale === "ar" ? "قانوني" : "Legal"}
        title={locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
        description={
          locale === "ar"
            ? `آخر تحديث: مرتبط بتجديد الرخصة بتاريخ ${license.renewalDate}`
            : `Last reviewed alongside our licence renewal on ${license.renewalDate}`
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
            {locale === "ar"
              ? "لأي أسئلة حول هذه السياسة أو لممارسة حقوقكم المتعلقة بالبيانات:"
              : "For any questions about this policy, or to exercise your data rights:"}
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
