const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "971569321000";

/** Builds a wa.me deep link with a pre-filled, context-aware message. */
export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export const whatsappMessages = {
  en: {
    general: "Hello Al Jazeera Woodz, I would like to enquire about a project.",
    service: (service: string) => `Hello Al Jazeera Woodz, I would like to enquire about ${service}.`,
  },
  ar: {
    general: "مرحبًا الجزيرة وودز، أرغب في الاستفسار عن مشروع.",
    service: (service: string) => `مرحبًا الجزيرة وودز، أرغب في الاستفسار عن ${service}.`,
  },
};
