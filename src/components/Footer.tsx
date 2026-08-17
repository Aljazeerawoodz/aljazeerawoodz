import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { brand, contact } from "@/data/company";
import { services } from "@/data/services";

export default function Footer({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-charcoal/10 bg-warm-dim">
      <div className="container-edit py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <Image src="/brand/logo-mark.png" alt={brand.name.en} width={40} height={40} className="h-10 w-10 rounded-full" />
              <span className="font-brand text-xl font-bold text-charcoal">{brand.name[locale]}</span>
            </Link>
            <p className="mt-4 max-w-xs text-charcoal/70">{dictionary.footer.tagline}</p>
            <div className="mt-6 flex items-center gap-4">
              <a href={contact.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-charcoal/60 hover:text-teal">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={contact.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-charcoal/60 hover:text-teal">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-charcoal/60 hover:text-teal">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-5">{dictionary.footer.navigation}</p>
            <ul className="space-y-3 text-charcoal/75">
              <li><Link href={`/${locale}/about`} className="hover:text-teal">{dictionary.nav.about}</Link></li>
              <li><Link href={`/${locale}/projects`} className="hover:text-teal">{dictionary.nav.projects}</Link></li>
              <li><Link href={`/${locale}/blog`} className="hover:text-teal">{dictionary.nav.journal}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-teal">{dictionary.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">{dictionary.nav.services}</p>
            <ul className="space-y-3 text-charcoal/75">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${locale}/services/${s.slug}`} className="hover:text-teal">
                    {s.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">{dictionary.footer.contactHeading}</p>
            <ul className="space-y-3 text-charcoal/75">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <span dir="ltr">{contact.phones[0]}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-teal" dir="ltr">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{contact.location[locale]}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-charcoal/10 pt-8 text-sm text-charcoal/60 sm:flex-row">
          <p>
            © {year} {brand.name[locale]}. {dictionary.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-teal">{dictionary.footer.privacy}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-teal">{dictionary.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
