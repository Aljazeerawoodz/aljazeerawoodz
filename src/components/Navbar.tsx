"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import { otherLocale } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/dictionaries";
import { brand } from "@/data/company";

export default function Navbar({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const pathname = usePathname() || `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("mobile-menu-open", open);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [open]);

  const other = otherLocale(locale);
  const otherHref = pathname.replace(`/${locale}`, `/${other}`) || `/${other}`;

  const links = [
    { href: `/${locale}/about`, label: dictionary.nav.about },
    { href: `/${locale}/services`, label: dictionary.nav.services },
    { href: `/${locale}/projects`, label: dictionary.nav.projects },
    { href: `/${locale}#process`, label: dictionary.nav.process },
    { href: `/${locale}/blog`, label: dictionary.nav.journal },
    { href: `/${locale}/contact`, label: dictionary.nav.contact },
  ];

  const isHome = pathname === `/${locale}`;
  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial ${
        transparent ? "bg-transparent" : "bg-warm/90 backdrop-blur-md shadow-sm shadow-charcoal/5"
      }`}
    >
      <div className="container-edit flex h-20 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3" data-cursor-hover>
          <Image src="/brand/logo-mark.png" alt={brand.name.en} width={36} height={36} className="h-9 w-9 rounded-full" priority />
          <span className={`font-display text-lg font-semibold tracking-tight ${transparent ? "text-warm" : "text-charcoal"}`}>
            {brand.name[locale]}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor-hover
              className={`text-sm font-medium tracking-wide transition-colors hover:text-brass ${
                transparent ? "text-warm/90" : "text-charcoal/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href={otherHref}
            data-cursor-hover
            className={`text-sm font-medium underline-offset-4 hover:underline ${transparent ? "text-warm/90" : "text-charcoal/80"}`}
          >
            {dictionary.common.languageSwitch}
          </Link>
          <Link
            href={`/${locale}/contact`}
            data-cursor-hover
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
              transparent
                ? "border-warm/50 text-warm hover:bg-warm hover:text-charcoal"
                : "border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-warm"
            }`}
          >
            {dictionary.nav.cta}
          </Link>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <Link
            href={otherHref}
            data-cursor-hover
            className={`text-sm font-medium underline-offset-4 hover:underline ${transparent ? "text-warm/90" : "text-charcoal/80"}`}
          >
            {dictionary.common.languageSwitch}
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center ${transparent ? "text-warm" : "text-charcoal"}`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 right-0 top-20 z-40 flex h-[calc(100dvh-5rem)] flex-col overflow-y-auto bg-charcoal px-6 py-10 lg:hidden"
          >
            <nav className="flex flex-1 flex-col justify-center gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link href={link.href} onClick={() => setOpen(false)} className="font-display text-3xl text-warm">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-6 flex shrink-0 items-center justify-between border-t border-warm/15 pt-6">
              <Link href={otherHref} onClick={() => setOpen(false)} className="text-warm/80">
                {dictionary.common.languageSwitch}
              </Link>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setOpen(false)}
                className="rounded-full bg-brass px-5 py-2.5 text-sm font-medium text-charcoal"
              >
                {dictionary.nav.cta}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
