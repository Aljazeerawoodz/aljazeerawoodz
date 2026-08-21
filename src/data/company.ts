import type { Bi, BiList } from "./types";

/**
 * Every fact below is sourced directly from the Al Jazeera Woodz company
 * profile PDF (English + Arabic text as supplied by the company). Do not
 * add statistics, years of experience, staff counts, awards or client
 * names here unless they come from the company itself — see CLAUDE-style
 * rule in docs/content-sources.md.
 */

export const brand = {
  name: { en: "Al Jazeera Woodz", ar: "الجزيرة وودز" } satisfies Bi,
  legalName: { en: "Al Jazeera Wooden Works", ar: "الجزيرة للأعمال الخشبية" } satisfies Bi,
  tagline: { en: "Any Wood, Any Design", ar: "أي خشب، أي تصميم" } satisfies Bi,
  domain: "aljazeerawoodz.com",
};

export const contact = {
  phones: ["+971 56 932 1000", "+971 50 774 5518", "+971 50 522 0817"],
  whatsappNumber: "971569321000",
  email: "aljazeerawoodz@gmail.com",
  location: { en: "Ras Al Khaima, UAE", ar: "رأس الخيمة، الإمارات العربية المتحدة" } satisfies Bi,
  address: {
    en: "Units 1–4, Aljawis Street, Aljawis, Ras Al Khaimah, United Arab Emirates",
    ar: "الوحدات 1-4، شارع الجويس، الجويس، رأس الخيمة، الإمارات العربية المتحدة",
  } satisfies Bi,
  social: {
    instagram: "https://instagram.com/al_jazeera_woodz",
    facebook: "https://www.facebook.com/share/19ezjhn4MF/",
    linkedin: "https://linkedin.com/company/al-jazeera-woodz",
  },
};

/**
 * Official trade license — Ras Al Khaimah Department of Economic
 * Development (RAK DED). Sourced from the license document provided in
 * chat; used on the Terms & Conditions page and available for the footer.
 * Renewal/expiry dates are point-in-time facts as of that document — keep
 * these in sync whenever the license is renewed.
 */
export const license = {
  number: "34469",
  legalForm: { en: "Civil Works Company", ar: "شركة أعمال مدنية" } satisfies Bi,
  authority: { en: "Ras Al Khaimah Department of Economic Development (RAK DED)", ar: "دائرة التنمية الاقتصادية برأس الخيمة" } satisfies Bi,
  establishedDate: "2011-03-06",
  renewalDate: "2026-04-06",
  expiryDate: "2027-03-22",
  localRegistryNo: "40423",
  cblsNo: "4010000000000034469",
  cocMembershipNo: "H-38539-2011",
  businessActivities: {
    en: ["Tinging and Painting Works", "Carpenter shop", "Decor Works"],
    ar: ["أعمال الطلاء والدهانات للمباني", "منجرة - ورش النجارة", "أعمال تنفيذ التصميم الداخلي - الديكور"],
  } satisfies BiList,
};

export const whoWeAre: Bi = {
  en: "Al Jazeera Woodz operates at the intersection of interior fitout, joinery, and custom furniture, delivering solutions across the UAE that are shaped around how spaces are actually used. The focus is not just on how things look, but on how well they perform over time. From detailed joinery to complete interior execution, every project is handled with a practical mindset and a strong sense of finishing. The approach remains consistent — clear planning, careful material selection, and work that feels complete in both function and appearance.",
  ar: "تعمل الجزيرة وودز عند تقاطع التشطيبات الداخلية والنجارة والأثاث المصصم حسب الطلب، لتقديم حلول في جميع أنحاء الإمارات العربية المتحدة مصممة وفق الطريقة التي تُستخدم بها المساحات فعليًا. لا يقتصر تركيزنا على المظهر فحسب، بل يمتد إلى مدى الأداء والكفاءة على المدى البعيد. من أعمال النجارة الدقيقة إلى التنفيذ الداخلي الكامل، يُدار كل مشروع بعقلية عملية وإحساس راسخ بالإتقان. يبقى النهج ثابتًا دائمًا — تخطيط واضح، واختيار دقيق للمواد، وأعمال تبدو مكتملة في الوظيفة والمظهر معًا.",
};

export const introStatement: Bi = {
  en: "Built around how spaces are used.",
  ar: "مصممة وفق طريقة استخدام المساحات.",
};

export const introBody: Bi = {
  en: "Al Jazeera Woodz combines practical design thinking, careful material selection, and hands-on craftsmanship across interior fitout, joinery, and custom furniture — with structured execution from first sketch to final handover.",
  ar: "تجمع الجزيرة وودز بين التفكير التصميمي العملي، والاختيار الدقيق للمواد، والحرفية اليدوية عبر التشطيبات الداخلية والنجارة والأثاث المصمم حسب الطلب — مع تنفيذ منظم من أول رسم حتى التسليم النهائي.",
};

export interface StoryStage {
  number: string;
  title: Bi;
  body: Bi;
}

export const story: StoryStage[] = [
  {
    number: "01",
    title: { en: "Foundation", ar: "التأسيس" },
    body: {
      en: "The company was established with a clear focus on woodwork and joinery, building its early work around craftsmanship and hands-on execution.",
      ar: "تأسست الشركة بتركيز واضح على الأعمال الخشبية والنجارة، حيث استندت أعمالها المبكرة إلى الحرفية والتنفيذ اليدوي.",
    },
  },
  {
    number: "02",
    title: { en: "Growth", ar: "النمو" },
    body: {
      en: "With time, the scope expanded into full interior fitout projects, allowing the company to take on more comprehensive roles across residential and commercial spaces.",
      ar: "مع مرور الوقت، اتسع نطاق عمل الشركة ليشمل مشاريع التجهيز الداخلي الكاملة، مما مكّنها من القيام بأدوار أكثر شمولية في المساحات السكنية والتجارية.",
    },
  },
  {
    number: "03",
    title: { en: "Experience", ar: "الخبرة" },
    body: {
      en: "Working across different project types has strengthened the ability to handle varied requirements — from simple installations to fully customized interiors.",
      ar: "عزز العمل في أنواع مختلفة من المشاريع قدرتنا على تلبية متطلبات متنوعة — بدءًا من التركيبات البسيطة وصولاً إلى التصاميم الداخلية المخصصة بالكامل.",
    },
  },
  {
    number: "04",
    title: { en: "Today", ar: "اليوم" },
    body: {
      en: "Al Jazeera Woodz continues to operate with a balanced approach, combining traditional craftsmanship with structured project execution.",
      ar: "تواصل الجزيرة وودز العمل بنهج متوازن، يجمع بين الحرفية التقليدية والتنفيذ المنظم للمشاريع.",
    },
  },
];

export const mission: Bi = {
  en: "Delivering well-planned and carefully executed solutions through skilled craftsmanship, practical design thinking, and a commitment to consistent project outcomes.",
  ar: "تقديم حلول مدروسة بعناية ومنفذة بدقة من خلال الحرفية الماهرة والتفكير التصميمي العملي والالتزام بتحقيق نتائج متسقة للمشاريع.",
};

export const vision: Bi = {
  en: "To establish a strong presence in interior fitout and joinery by consistently delivering work that reflects quality, precision, and long-term reliability.",
  ar: "تحقيق حضور قوي في مجال التصميم الداخلي والنجارة من خلال تقديم أعمال تتميز بالجودة والدقة والموثوقية على المدى الطويل.",
};

export interface ProcessStep {
  number: string;
  title: Bi;
  body: Bi;
}

export const process: ProcessStep[] = [
  {
    number: "01",
    title: { en: "Requirements Understanding", ar: "فهم المتطلبات" },
    body: {
      en: "Project needs and expectations are defined clearly.",
      ar: "يتم تحديد احتياجات المشروع وتوقعاته بوضوح.",
    },
  },
  {
    number: "02",
    title: { en: "Design & Planning", ar: "التصميم والتخطيط" },
    body: {
      en: "Layouts and technical details are prepared before execution begins.",
      ar: "يتم إعداد المخططات والتفاصيل الفنية قبل بدء التنفيذ.",
    },
  },
  {
    number: "03",
    title: { en: "Material Selection", ar: "اختيار المواد" },
    body: {
      en: "Materials are selected based on durability, finish, and suitability.",
      ar: "يتم اختيار المواد بناءً على متانتها وتشطيبها ومدى ملاءمتها.",
    },
  },
  {
    number: "04",
    title: { en: "Production", ar: "الإنتاج" },
    body: {
      en: "Joinery and fabrication are carried out with precision.",
      ar: "يتم تنفيذ أعمال النجارة والتصنيع بدقة.",
    },
  },
  {
    number: "05",
    title: { en: "Installation", ar: "التركيب" },
    body: {
      en: "On-site work is completed with attention to alignment and finishing.",
      ar: "يتم إنجاز الأعمال في الموقع مع الاهتمام بالمحاذاة والتشطيب.",
    },
  },
  {
    number: "06",
    title: { en: "Handover", ar: "التسليم" },
    body: {
      en: "Final delivery ensures everything is in place and ready for use.",
      ar: "يضمن التسليم النهائي أن كل شيء في مكانه وجاهز للاستخدام.",
    },
  },
];

export interface QualityPoint {
  title: Bi;
  body: Bi;
}

export const quality: QualityPoint[] = [
  {
    title: { en: "Material Selection", ar: "اختيار المواد" },
    body: {
      en: "Only suitable and durable materials are considered to ensure long-term performance.",
      ar: "لا يتم اختيار سوى المواد المناسبة والمتينة لضمان الأداء على المدى الطويل.",
    },
  },
  {
    title: { en: "Attention to Detail", ar: "الاهتمام بالتفاصيل" },
    body: {
      en: "Each element, from joints to finishes, is handled with precision.",
      ar: "يتم التعامل مع كل عنصر، من الوصلات إلى التشطيبات، بدقة متناهية.",
    },
  },
  {
    title: { en: "Skilled Execution", ar: "التنفيذ الماهر" },
    body: {
      en: "Work is carried out by experienced professionals with a focus on accuracy.",
      ar: "يتم تنفيذ الأعمال على يد محترفين ذوي خبرة مع التركيز على الدقة.",
    },
  },
  {
    title: { en: "Consistent Finishing", ar: "تشطيبات متسقة" },
    body: {
      en: "A uniform and clean finish is maintained across all project elements.",
      ar: "يتم الحفاظ على تشطيبات متجانسة وأنيقة في جميع عناصر المشروع.",
    },
  },
];

export interface WhyPoint {
  title: Bi;
  body: Bi;
}

export const whyUs: WhyPoint[] = [
  {
    title: { en: "Practical Approach", ar: "نهج عملي" },
    body: {
      en: "Solutions are designed based on real usage, not just appearance.",
      ar: "تُصمم الحلول بناءً على الاستخدام الفعلي، وليس المظهر فقط.",
    },
  },
  {
    title: { en: "Reliable Delivery", ar: "تنفيذ موثوق" },
    body: {
      en: "Projects are handled with a focus on timelines and consistency.",
      ar: "تتم إدارة المشاريع مع التركيز على الالتزام بالمواعيد والاتساق.",
    },
  },
  {
    title: { en: "Customization Capability", ar: "قدرة على التخصيص" },
    body: {
      en: "Work is adapted to match specific space and client requirements.",
      ar: "يتم تكييف العمل ليتناسب مع المساحة المحددة ومتطلبات العميل.",
    },
  },
  {
    title: { en: "End-to-End Execution", ar: "تنفيذ شامل" },
    body: {
      en: "From planning to installation, every stage is managed with clarity.",
      ar: "من التخطيط إلى التركيب، تُدار كل مرحلة بوضوح.",
    },
  },
];

export const materialStatement: Bi = {
  en: "Every surface tells a story.",
  ar: "كل سطح يحكي قصة.",
};

export const finalCta: Bi = {
  en: "Let us start building.",
  ar: "لنبدأ البناء.",
};

export const projectTypes: BiList = {
  en: ["Interior Fitout", "Joinery", "Kitchens & Cabinets", "Custom Furniture", "Other"],
  ar: ["تشطيبات داخلية", "نجارة", "مطابخ وخزائن", "أثاث مخصص", "أخرى"],
};
