import type { Bi } from "./types";

export interface Article {
  slug: string;
  title: Bi;
  excerpt: Bi;
  category: Bi;
  minutes: number;
  featured?: boolean;
  image: string;
  body: { en: string[]; ar: string[] };
}

/**
 * Editorial "Journal" pieces on the company's actual areas of work
 * (joinery, fitout, kitchens, furniture, materials). These are original
 * craft-perspective writing, not case studies — no client names, projects,
 * or figures are claimed. See CLAUDE guidance in the root prompt: do not
 * present these as completed Al Jazeera Woodz projects.
 */
export const articles: Article[] = [
  {
    slug: "the-art-of-joinery",
    title: { en: "The Art of Joinery", ar: "فن النجارة" },
    excerpt: {
      en: "Exploring precision, material and detail in the craft that holds every fitout together.",
      ar: "استكشاف الدقة والمواد والتفاصيل في الحرفة التي تُمسك بكل تجهيز داخلي.",
    },
    category: { en: "Craft", ar: "الحرفة" },
    minutes: 4,
    featured: true,
    image: "/images/joinery-detail.jpg",
    body: {
      en: [
        "Joinery is the part of a project most people never think about — until it's wrong. A door that doesn't sit flush, a panel with a visible gap, a drawer that sticks. Good joinery is felt more than it's seen: in how quietly a cabinet closes, how evenly a partition catches the light.",
        "Every piece starts with measurement, not material. The space dictates the joint — a run of wall cladding needs a different approach than a fitted wardrobe or a display partition. Getting the alignment right on paper is what makes the on-site installation fast and clean rather than a series of corrections.",
        "Precision here isn't about looking impressive. It's about durability — a joint that's cut correctly will still be tight in ten years. That's the standard every piece is measured against, from a single custom door to a full run of panelling.",
        "It's also where craftsmanship and structure meet: the technical accuracy of a joint, and the calm, clean finish that makes it disappear into the space around it.",
      ],
      ar: [
        "أعمال النجارة هي الجزء الذي نادرًا ما يفكر فيه أحد في أي مشروع — إلى أن تُنفذ بشكل خاطئ. باب لا يستقر بشكل مستوٍ، لوح فيه فجوة ظاهرة، درج يعلق عند الفتح. النجارة الجيدة تُشعَر أكثر مما تُرى: في مدى هدوء إغلاق الخزانة، وفي استواء الفاصل مع سقوط الضوء عليه.",
        "كل قطعة تبدأ بالقياس، لا بالمادة. المساحة هي التي تحدد نوع الوصلة — فتكسية جدار طويلة تحتاج نهجًا مختلفًا عن خزانة ملابس مُركبة أو فاصل عرض. الدقة في المحاذاة على الورق هي ما يجعل التركيب في الموقع سريعًا ونظيفًا بدلاً من سلسلة تصحيحات.",
        "الدقة هنا ليست من أجل المظهر. بل من أجل المتانة — فالوصلة المقطوعة بشكل صحيح تبقى محكمة بعد عشر سنوات. هذا هو المعيار الذي تُقاس به كل قطعة، من باب مخصص واحد إلى سلسلة كاملة من الألواح.",
        "وهنا تلتقي الحرفية بالبنية: الدقة الفنية للوصلة، والتشطيب الهادئ والنظيف الذي يجعلها تندمج تمامًا مع المساحة المحيطة بها.",
      ],
    },
  },
  {
    slug: "material-selection",
    title: { en: "Material Selection", ar: "اختيار المواد" },
    excerpt: {
      en: "Why the choice of material — long before the design is finalized — decides how a space performs for years.",
      ar: "لماذا يُحدد اختيار المادة — قبل وقت طويل من إنهاء التصميم — أداء المساحة لسنوات قادمة.",
    },
    category: { en: "Materials", ar: "المواد" },
    minutes: 3,
    image: "/images/material-detail.jpg",
    body: {
      en: [
        "Material selection happens earlier than most people expect — before finishes are picked, before colours are discussed. It starts with a simple question: what will this surface actually go through? A kitchen counter, a wardrobe front, and an exhibition panel each face a completely different life.",
        "Durability, finish, and suitability are weighed together. A material that looks right in a showroom sample can behave very differently once it's cut, joined, and living under daily use — humidity, direct sunlight, foot traffic, or simply years of hands opening the same door.",
        "This is also where budgets and ambitions meet reality. Part of the job is steering a client toward the material that will still look right in five years, not just on handover day — and being honest when a more affordable option performs just as well.",
        "Get the material right, and everything downstream — the joinery, the finish, the maintenance — gets easier.",
      ],
      ar: [
        "يبدأ اختيار المواد في مرحلة أبكر مما يتوقعه معظم الناس — قبل اختيار التشطيبات، وقبل مناقشة الألوان. يبدأ بسؤال بسيط: ما الذي سيتعرض له هذا السطح فعليًا؟ فسطح مطبخ، وواجهة خزانة، ولوحة معرض، لكل منها حياة مختلفة تمامًا.",
        "تُوزن المتانة والتشطيب والملاءمة معًا. المادة التي تبدو مناسبة في عينة صالة العرض قد تتصرف بشكل مختلف تمامًا بعد قصها وتركيبها وخضوعها للاستخدام اليومي — الرطوبة، وأشعة الشمس المباشرة، وحركة المرور، أو ببساطة سنوات من فتح نفس الباب.",
        "هنا أيضًا تلتقي الميزانيات بالطموحات مع الواقع. جزء من العمل هو توجيه العميل نحو المادة التي ستظل مناسبة بعد خمس سنوات، لا في يوم التسليم فقط — والصراحة عندما يكون الخيار الأكثر اقتصادًا فعالاً بنفس القدر.",
        "عندما يكون اختيار المادة صحيحًا، يصبح كل ما يليها — النجارة، التشطيب، الصيانة — أسهل بكثير.",
      ],
    },
  },
  {
    slug: "why-detail-matters-in-interior-fitout",
    title: { en: "Why Detail Matters in Interior Fitout", ar: "لماذا تهم التفاصيل في التشطيبات الداخلية" },
    excerpt: {
      en: "The difference between a space that looks finished and one that feels finished usually comes down to the last few millimetres.",
      ar: "الفرق بين مساحة تبدو منتهية وأخرى تُشعرك بأنها منتهية عادة ما يكمن في آخر بضعة مليمترات.",
    },
    category: { en: "Fitout", ar: "التشطيبات" },
    minutes: 3,
    image: "/images/interior-fitout.jpg",
    body: {
      en: [
        "A fitout can hit every major milestone — layout approved, materials delivered, walls up — and still fall short at the finish line. That's usually a question of detail: the reveal between a panel and a ceiling line, the way a skirting meets a doorframe, the consistency of a handle line across twenty cabinet fronts.",
        "None of this shows up in a floor plan. It shows up when someone actually stands in the room, and it's the difference between a space that photographs well and one that holds up to being lived in.",
        "That's why attention to detail is treated as a stage of the process, not an afterthought — from joints to finishes, each element is checked against the same standard before a project is called complete.",
        "It's slower work. It's also the part clients remember longest.",
      ],
      ar: [
        "قد يمر مشروع تشطيب داخلي بكل مراحله الرئيسية بنجاح — اعتماد المخطط، توريد المواد، إقامة الجدران — ومع ذلك يقصّر عند خط النهاية. غالبًا ما يكون السبب هو التفاصيل: الفاصل بين لوح وخط السقف، طريقة التقاء الإزار بإطار الباب، تناسق خط المقابض عبر عشرين واجهة خزانة.",
        "لا شيء من هذا يظهر في المخطط. يظهر فقط عندما يقف شخص فعليًا داخل الغرفة، وهذا هو الفرق بين مساحة تبدو جيدة في الصور ومساحة تصمد أمام الاستخدام اليومي.",
        "لهذا يُعامل الاهتمام بالتفاصيل كمرحلة من مراحل العمل، لا كخطوة إضافية — من الوصلات إلى التشطيبات، يُراجع كل عنصر وفق نفس المعيار قبل اعتبار المشروع مكتملاً.",
        "إنه عمل أبطأ. وهو أيضًا الجزء الذي يتذكره العملاء لأطول فترة.",
      ],
    },
  },
  {
    slug: "from-design-to-installation",
    title: { en: "From Design to Installation", ar: "من التصميم إلى التركيب" },
    excerpt: {
      en: "A structured process, in six stages, for moving a project from a brief to a handover without surprises.",
      ar: "عملية منظمة من ست مراحل، لنقل المشروع من الفكرة الأولى إلى التسليم دون مفاجآت.",
    },
    category: { en: "Process", ar: "طريقة العمل" },
    minutes: 4,
    image: "/images/joinery-install.jpg",
    body: {
      en: [
        "Every project — regardless of size — moves through the same structure: requirement understanding, design and planning, material selection, production, installation, and handover. It's a deliberately simple sequence, because complexity in process tends to show up as delay on site.",
        "The early stages carry more weight than they get credit for. A clearly understood requirement and a properly planned layout prevent the two most common causes of rework: a design that didn't account for how the space is actually used, and a detail that wasn't resolved before fabrication started.",
        "Production and installation are where the plan becomes physical — joinery cut with precision, then fitted on site with attention to alignment and finish. Nothing here should be an improvisation; anything that needs deciding on the spot was usually a gap earlier in the process.",
        "Handover is the final check, not the finish line for quality — everything should already be in place and ready for use well before that walkthrough happens.",
      ],
      ar: [
        "يمر كل مشروع — بغض النظر عن حجمه — بنفس البنية: فهم المتطلبات، التصميم والتخطيط، اختيار المواد، الإنتاج، التركيب، والتسليم. إنه تسلسل بسيط عن قصد، لأن التعقيد في طريقة العمل غالبًا ما يظهر كتأخير في الموقع.",
        "المراحل الأولى تحمل وزنًا أكبر مما يُنسب إليها عادة. فهم واضح للمتطلبات وتخطيط سليم للمخطط يمنعان أكثر سببين شيوعًا لإعادة العمل: تصميم لم يأخذ بعين الاعتبار طريقة الاستخدام الفعلية للمساحة، وتفصيلة لم تُحسم قبل بدء التصنيع.",
        "الإنتاج والتركيب هما المرحلة التي تتحول فيها الخطة إلى واقع مادي — أعمال نجارة مُنفذة بدقة، ثم مُركبة في الموقع مع الاهتمام بالمحاذاة والتشطيب. لا ينبغي أن يكون أي شيء هنا ارتجاليًا؛ فأي قرار يُتخذ في اللحظة الأخيرة يعني عادة أن هناك فجوة حدثت في مرحلة سابقة.",
        "التسليم هو الفحص الأخير، لا خط نهاية الجودة — فكل شيء يجب أن يكون في مكانه وجاهزًا للاستخدام قبل وقت طويل من تلك الجولة الأخيرة.",
      ],
    },
  },
  {
    slug: "custom-furniture-for-modern-spaces",
    title: { en: "Custom Furniture for Modern Spaces", ar: "الأثاث المخصص للمساحات العصرية" },
    excerpt: {
      en: "Off-the-shelf furniture is designed for an average room. Custom pieces are designed for yours.",
      ar: "الأثاث الجاهز مصمم لغرفة متوسطة. الأثاث المخصص مصمم لمساحتك أنت.",
    },
    category: { en: "Furniture", ar: "الأثاث" },
    minutes: 3,
    image: "/images/custom-furniture.jpg",
    body: {
      en: [
        "Ready-made furniture solves a general problem for a general room. Custom furniture starts from the opposite direction — the exact dimensions of the wall, the exact angle of the light, the exact way a family or a team actually uses that corner of the space.",
        "That specificity is what makes the balance between design, comfort, and practicality possible. A piece that's built for a particular space can afford proportions and details that a mass-produced equivalent simply can't.",
        "It applies as much to a home as it does to an office or a retail counter — the brief changes, but the discipline doesn't: understand how the piece will actually be used, then design and build around that.",
        "The result isn't furniture that fills a room. It's furniture that belongs to it.",
      ],
      ar: [
        "الأثاث الجاهز يحل مشكلة عامة لغرفة عامة. الأثاث المخصص يبدأ من الاتجاه المعاكس — الأبعاد الدقيقة للجدار، الزاوية الدقيقة للضوء، الطريقة الدقيقة التي تستخدم بها عائلة أو فريق عمل تلك الزاوية من المساحة فعليًا.",
        "هذه الخصوصية هي ما يجعل التوازن بين التصميم والراحة والجانب العملي ممكنًا. القطعة المصنوعة لمساحة محددة يمكن أن تحمل نسبًا وتفاصيل لا يستطيع نظيرها المُصنّع بكميات كبيرة تحمّلها.",
        "ينطبق هذا على المنزل بقدر ما ينطبق على المكتب أو منضدة العرض التجزئي — يتغير الطلب، لكن الانضباط لا يتغير: فهم الطريقة الفعلية لاستخدام القطعة، ثم التصميم والبناء وفقًا لذلك.",
        "النتيجة ليست أثاثًا يملأ الغرفة، بل أثاثًا ينتمي إليها.",
      ],
    },
  },
  {
    slug: "kitchens-designed-around-function",
    title: { en: "Kitchens Designed Around Function", ar: "مطابخ مصممة حول الوظيفة" },
    excerpt: {
      en: "A kitchen is judged by how it works at seven in the morning, not by how it photographs at noon.",
      ar: "يُحكم على المطبخ بأدائه في السابعة صباحًا، لا بمظهره في الصور عند الظهيرة.",
    },
    category: { en: "Kitchens", ar: "المطابخ" },
    minutes: 3,
    image: "/images/kitchen-cabinets.jpg",
    body: {
      en: [
        "A kitchen has more competing demands per square metre than almost any other room — storage, workflow, appliances, ventilation, and finish, all in constant use. Designing one starts with usability, not aesthetics, though the two are rarely in conflict when the layout is right.",
        "Layout planning is about maximizing what the space actually offers: where the working triangle sits, how storage is distributed between daily use and long-term items, how much counter run is left once appliances are accounted for.",
        "Finishes matter, but they come second — chosen to stay clean and consistent under daily use rather than simply to look striking in a rendering. A cabinet front that shows every fingerprint isn't a good choice for a family kitchen, no matter how it looks in a photo.",
        "Get the function right first. The kitchen that looks good and works well is the same kitchen — it's just designed in the right order.",
      ],
      ar: [
        "يحمل المطبخ متطلبات متنافسة في كل متر مربع أكثر من أي غرفة أخرى تقريبًا — التخزين، سير العمل، الأجهزة، التهوية، والتشطيب، وكلها قيد الاستخدام المستمر. يبدأ تصميمه بسهولة الاستخدام، لا بالجمالية، رغم أن الاثنين نادرًا ما يتعارضان عندما يكون التخطيط صحيحًا.",
        "تخطيط التصميم يتعلق بالاستفادة القصوى مما تقدمه المساحة فعليًا: أين يقع مثلث العمل، كيف يُوزع التخزين بين الاستخدام اليومي والعناصر طويلة الأمد، وكم تبقى من مساحة الكاونتر بعد حساب الأجهزة.",
        "التشطيبات مهمة، لكنها تأتي في المرتبة الثانية — تُختار لتبقى نظيفة ومتسقة تحت الاستخدام اليومي، لا فقط لتبدو لافتة في تصور ثلاثي الأبعاد. واجهة خزانة تُظهر كل بصمة إصبع ليست خيارًا جيدًا لمطبخ عائلي، مهما بدت جميلة في الصورة.",
        "اجعل الوظيفة صحيحة أولاً. المطبخ الذي يبدو جميلاً ويعمل بكفاءة هو نفس المطبخ — فقط مُصمم بالترتيب الصحيح.",
      ],
    },
  },
  {
    slug: "the-role-of-wood-in-contemporary-interiors",
    title: { en: "The Role of Wood in Contemporary Interiors", ar: "دور الخشب في التصاميم الداخلية المعاصرة" },
    excerpt: {
      en: "In a market full of glass, stone, and metal, wood remains the material that makes a space feel inhabited.",
      ar: "في سوق مليء بالزجاج والحجر والمعدن، يبقى الخشب المادة التي تجعل المساحة تشعر وكأنها مأهولة.",
    },
    category: { en: "Materials", ar: "المواد" },
    minutes: 3,
    image: "/video/project08-poster.jpg",
    body: {
      en: [
        "Contemporary interiors lean heavily on hard, cool surfaces — polished stone, glass, brushed metal. Wood plays a different role in that mix: it's warm to the touch, it ages visibly, and no two grain patterns are identical. That's exactly what makes it valuable in a space that's meant to be lived in, not just looked at.",
        "It's also unusually flexible. The same material can sit behind a sharp, minimal cabinet front or a heavily detailed panel — the character comes from how it's cut, joined, and finished, not from the wood alone.",
        "In fitout and furniture work, wood is rarely the whole story — it's paired with stone counters, metal hardware, glass partitions. Its job is to soften everything around it and give a room a sense of scale and warmth that harder materials can't provide on their own.",
        "That balance — practical, tactile, and quietly premium — is why wood keeps a place in interiors that otherwise look nothing like the interiors of ten years ago.",
      ],
      ar: [
        "تعتمد التصاميم الداخلية المعاصرة بشكل كبير على الأسطح الصلبة والباردة — الحجر المصقول، الزجاج، المعدن المصقول. يلعب الخشب دورًا مختلفًا في هذا المزيج: فهو دافئ عند اللمس، ويتقادم بشكل مرئي، ولا يوجد نمطان متطابقان لتحبيبه. وهذا بالضبط ما يجعله ذا قيمة في مساحة يُقصد بها أن تُعاش، لا أن تُشاهد فقط.",
        "كما أنه مرن بشكل غير معتاد. يمكن للمادة نفسها أن تكون خلف واجهة خزانة حادة وبسيطة أو لوح غني بالتفاصيل — يأتي الطابع من طريقة قصه ووصله وتشطيبه، لا من الخشب وحده.",
        "في أعمال التشطيبات والأثاث، نادرًا ما يكون الخشب هو القصة الكاملة — بل يُقرن بأسطح حجرية، وتجهيزات معدنية، وفواصل زجاجية. مهمته هي تلطيف كل ما حوله ومنح الغرفة إحساسًا بالحجم والدفء لا توفره المواد الأكثر صلابة بمفردها.",
        "هذا التوازن — العملي، الملموس، والفاخر بهدوء — هو ما يُبقي للخشب مكانًا في تصاميم داخلية لا تشبه في شيء تصاميم قبل عشر سنوات.",
      ],
    },
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function featuredArticle() {
  return articles.find((a) => a.featured) ?? articles[0]!;
}
