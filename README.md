# Al Jazeera Woodz — aljazeerawoodz.com

Bilingual (EN/AR) marketing site for Al Jazeera Woodz — interior fitout,
joinery, kitchens & cabinets, and custom furniture across the UAE. Brand,
portfolio, journal, and enquiry site — no e-commerce, no database.

Built with Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.
All company facts, service descriptions, process, and contact details are
sourced directly from the client-supplied company profile PDF — see
[`docs/content-sources.md`](docs/content-sources.md) for exactly what came
from where, and what was deliberately left as a placeholder.

## Getting started

Requires Node.js 18.18+. Verified against Node 24 / npm 11 — `npm install`,
`npm run typecheck` (clean) and `npm run build` (all 40 static pages across
both locales generate successfully) all pass as of this build.

```bash
npm install
cp .env.example .env.local   # then fill in SMTP_* for the contact form
npm run dev
```

Open http://localhost:3000 — it redirects to `/en` (try `/ar` for Arabic /
RTL).

Other scripts:

```bash
npm run typecheck   # tsc --noEmit
npm run lint         # next lint
npm run build        # production build
```

### A note on dependency versions / `npm audit`

This uses **Next.js 15.5.23** (current at time of writing) rather than the
very-latest 16.x line. `npm audit` will still show a handful of Next.js
advisories that are only fully closed at 16.3.1+ — nearly all of them are
about features this site doesn't use (custom Middleware, Server Actions,
`rewrites()`, remote `next/image` patterns). Worth periodically re-running
`npm audit` and upgrading once you (or a future Claude session with
up-to-date knowledge of the 16.x API) have verified the migration —
Next 15→16 is a larger jump than usual since `params`/`searchParams`
already became async Promises in the 14→15 move this codebase already
handles.

## Structure

```
src/
  app/
    [locale]/            # /en and /ar — every real page lives under here
      about/ services/ projects/ blog/ contact/
    api/contact/route.ts # contact form → email (server-only)
    not-found.tsx         # global 404 fallback (needs its own <html>, see comment)
  components/             # Navbar, Footer, Hero, section blocks, etc.
  data/                   # company.ts, services.ts, projects.ts, blog.ts — all content
  i18n/                   # locales.ts, dictionaries.ts (UI chrome strings)
  lib/                    # email.ts (nodemailer), whatsapp.ts, seo.ts
public/
  brand/                  # logo + every image extracted from the source PDF
  images/                 # curated subset actually used on the site
docs/
  content-sources.md      # what's real, what's placeholder, and why
  hosting-and-email.md    # manual DNS / hosting / Microsoft 365 setup guide
```

## i18n / RTL

No i18n library — a small hand-rolled setup:

- `src/i18n/locales.ts` — `en`/`ar`, `dir()` helper.
- `src/i18n/dictionaries.ts` — UI chrome strings (nav, buttons, form labels).
- `src/data/*.ts` — long-form content stored as `{ en, ar }` pairs
  (`Bi`/`BiList` types in `src/data/types.ts`), authentic PDF text where
  available.
- RTL is handled by setting `dir="rtl"` on `<html>` (in
  `src/app/[locale]/layout.tsx`) and using Tailwind's **logical property**
  utilities throughout (`ps-`/`pe-`, `ms-`/`me-`, `start-`/`end-`,
  `text-start`/`text-end`, `border-s`/`border-e`) plus the `rtl:` variant
  — not hardcoded `left`/`right`. Flex row order mirrors automatically
  under `dir="rtl"` per the CSS spec, no extra classes needed.
- Arabic type uses the **Cairo** font (via `next/font/google`); English/
  editorial headings use **Playfair Display** + **Inter**.

## Contact form

`/contact` posts a `multipart/form-data` request (supports a file
attachment) to `POST /api/contact`, which validates it with `zod`, applies
a honeypot + time-trap spam check, and emails it via SMTP
(`src/lib/email.ts`) using Microsoft 365 credentials from environment
variables — never hardcoded, never sent to the browser. See
[`docs/hosting-and-email.md`](docs/hosting-and-email.md) for the Microsoft
365 SMTP AUTH setup steps.

For stronger spam protection later, wire up Cloudflare Turnstile: the env
vars are stubbed (commented out) in `.env.example`.

## Projects (portfolio)

`src/data/projects.ts` ships **empty on purpose** — no real, named Al
Jazeera Woodz projects were supplied. `/projects` renders an honest "being
prepared" state instead of inventing case studies. Add real entries (with
photography under `public/projects/<slug>/`) and the grid + filters pick
them up automatically — see the `Project` type in that file.

## Deploying

See [`docs/hosting-and-email.md`](docs/hosting-and-email.md) for the full
walkthrough: pointing `aljazeerawoodz.com` (registered at Tasjeel) at a
budget host (Vercel recommended — free tier easily covers this site) without
disturbing the domain's Microsoft 365 mail records.
