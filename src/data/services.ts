import type { Bi, BiList } from "./types";

export interface Service {
  slug: string;
  number: string;
  title: Bi;
  shortTitle: Bi;
  intro: Bi;
  capabilities: BiList;
  image: string;
  imageAlt: Bi;
  /** Optional background video for the home page's hover/accordion
      preview — takes precedence over `image` when present. `image` still
      doubles as the video's poster frame, so it's always required either
      way. */
  video?: string;
  /** Optional background video for the service detail page's main image
      (services/[slug]/page.tsx) — separate from `video` above since the
      two spots can reasonably show different footage. */
  detailVideo?: string;
  /** Poster frame for `detailVideo`. Only meaningful alongside it — a
      dedicated field rather than reusing `image`, since `image` is that
      video's own matching poster, not this one's. */
  detailImage?: string;
}

export const services: Service[] = [
  {
    slug: "interior-fitout",
    number: "01",
    title: { en: "Interior Fitout", ar: "التشطيبات الداخلية" },
    shortTitle: { en: "Interior\nFitout", ar: "التشطيبات\nالداخلية" },
    intro: {
      en: "Complete interior fitout solutions are delivered for both residential and commercial spaces. From initial layout planning to final execution, the focus remains on creating environments that are functional, well-organized, and visually balanced.",
      ar: "نقدم حلولاً متكاملة للتجهيزات الداخلية للمساحات السكنية والتجارية على حد سواء. بدءًا من التخطيط الأولي للمخطط وحتى التنفيذ النهائي، يظل التركيز منصبًا على خلق بيئات عملية ومنظمة جيدًا ومتوازنة بصريًا.",
    },
    capabilities: {
      en: ["Residential spaces", "Commercial interiors", "Turnkey fitout solutions", "Retail spaces", "Events & Exhibitions", "Kiosk works"],
      ar: ["المساحات السكنية", "التصاميم الداخلية التجارية", "حلول التجهيزات الجاهزة", "المساحات التجارية", "الفعاليات والمعارض", "أعمال الأكشاك"],
    },
    image: "/video/Bulidstart-poster.jpg",
    imageAlt: { en: "Sculptural wood wall detailing", ar: "تفاصيل جدارية خشبية منحوتة" },
    video: "/video/Bulidstart-web.mp4",
    detailVideo: "/video/cupboard-fitout-web.mp4",
    detailImage: "/video/cupboard-fitout-poster.jpg",
  },
  {
    slug: "joinery",
    number: "02",
    title: { en: "Joinery Works", ar: "أعمال النجارة" },
    shortTitle: { en: "Joinery", ar: "النجارة" },
    intro: {
      en: "Custom joinery is developed with precision to match the exact requirements of each project. Every element is crafted to ensure proper alignment, durability, and a clean finish that integrates seamlessly within the space.",
      ar: "يتم تنفيذ أعمال النجارة المصصمة بدقة لتلبية المتطلبات المحددة لكل مشروع. يُصنّع كل عنصر بعناية لضمان المحاذاة الصحيحة والمتانة والتشطيب الأنيق الذي ينسجم تمامًا مع المساحة المحيطة.",
    },
    capabilities: {
      en: ["Doors, panels and partitions", "Wall cladding and detailing", "Custom wood elements"],
      ar: ["الأبواب والألواح والفواصل", "تكسية الجدران والتفاصيل", "العناصر الخشبية المخصصة"],
    },
    image: "/images/joinery-install.jpg",
    imageAlt: { en: "Joiner fitting custom wood cabinetry on site", ar: "نجار يُركّب أعمال خشبية مخصصة في الموقع" },
  },
  {
    slug: "kitchens-cabinets",
    number: "03",
    title: { en: "Kitchens & Cabinets", ar: "المطابخ والخزائن" },
    shortTitle: { en: "Kitchens &\nCabinets", ar: "المطابخ\nوالخزائن" },
    intro: {
      en: "Kitchen and storage solutions are designed with a focus on usability and long-term performance. Layouts are planned to maximize space, while finishes are kept clean and consistent.",
      ar: "تُصمم حلول المطابخ والتخزين مع التركيز على سهولة الاستخدام والأداء على المدى الطويل. يتم تخطيط التصاميم للاستفادة القصوى من المساحة، مع الحفاظ على بساطة التشطيبات وتناسقها.",
    },
    capabilities: {
      en: ["Modular kitchens", "Storage and cabinetry systems", "Functional layout solutions"],
      ar: ["المطابخ المعيارية", "أنظمة التخزين والخزائن", "حلول التصميم الوظيفي"],
    },
    image: "/images/kitchen-cabinets.jpg",
    imageAlt: { en: "Custom kitchen cabinetry with island counter", ar: "خزائن مطبخ مخصصة مع جزيرة وسطية" },
  },
  {
    slug: "custom-furniture",
    number: "04",
    title: { en: "Custom Furniture", ar: "الأثاث المخصص" },
    shortTitle: { en: "Custom\nFurniture", ar: "الأثاث\nالمخصص" },
    intro: {
      en: "Furniture pieces are built to suit specific spaces, ensuring the right balance between design, comfort, and practicality. Each piece is tailored to meet both aesthetic and functional needs.",
      ar: "تُصنع قطع الأثاث لتناسب مساحات محددة، بما يضمن التوازن المثالي بين التصميم والراحة والجانب العملي. تُصمم كل قطعة خصيصًا لتلبية الاحتياجات الجمالية والوظيفية على حد سواء.",
    },
    capabilities: {
      en: ["Home furniture", "Office furniture", "Retail and display units"],
      ar: ["أثاث المنزل", "أثاث المكاتب", "وحدات العرض والتجزئة"],
    },
    image: "/images/custom-furniture.jpg",
    imageAlt: { en: "Custom built wood furniture seating arrangement", ar: "ترتيب أثاث خشبي مصمم حسب الطلب" },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
