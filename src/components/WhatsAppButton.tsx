"use client";

import { MessageCircle } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

export default function WhatsAppButton({ locale, service }: { locale: Locale; service?: string }) {
  const message = service ? whatsappMessages[locale].service(service) : whatsappMessages[locale].general;

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      aria-label={locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
      className="group fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-charcoal/20 transition-transform duration-300 ease-editorial hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} />
    </a>
  );
}
