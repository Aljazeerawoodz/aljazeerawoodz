"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/locales";
import { dir } from "@/i18n/locales";

/**
 * The true <html> tag lives in the root layout (src/app/layout.tsx), which
 * has no access to the [locale] route param, so it can't set lang/dir
 * itself. This corrects it client-side right after mount. Tailwind's
 * `rtl:` variant and all layout direction still work correctly from the
 * very first paint regardless, because [locale]/layout.tsx also sets
 * dir/lang on its own wrapping element — this only fixes the outermost
 * <html> tag for full semantic/accessibility correctness.
 */
export default function HtmlAttributes({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir(locale);
  }, [locale]);

  return null;
}
