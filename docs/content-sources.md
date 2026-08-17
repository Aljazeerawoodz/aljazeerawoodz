# Content sources

Everything in `src/data/company.ts`, `src/data/services.ts` and the contact
details in the footer/contact page is copied — in both English and Arabic —
directly from the **Al Jazeera Woodz company profile PDF** supplied for this
build. Nothing there has been invented.

Specifically, from the PDF:

- Who We Are, Our Story (4 stages), Mission, Vision, Our Expertise (4
  services + capability bullet lists), Our Process (6 steps), Quality &
  Craftsmanship (4 points), Why Choose Al Jazeera Woodz (4 points) — English
  and Arabic text lifted as-is.
- Contact details — phones, email, Ras Al Khaima location, Instagram/
  Facebook/LinkedIn handles, and the logo mark — came from the PDF's final
  "Get in Touch" page, which is an **image with no text layer** (easy to
  miss if the PDF is only skimmed page-by-page for text).
- Trade name on the PDF's contact page is **Al Jazeera Wooden Works**
  (الجزيرة للأعمال الخشبية) vs. the brand name **Al Jazeera Woodz** used
  everywhere else — both are kept (`brand.name` vs `brand.legalName` in
  `src/data/company.ts`); confirm with the client which should lead on the
  homepage/footer if this matters legally.

## What was intentionally left out

- **No projects/case studies.** `src/data/projects.ts` ships empty on
  purpose — the PDF contains no completed-project photography with names,
  locations or dates attached to real jobs. The `/projects` page renders an
  honest "portfolio is being prepared" state instead of invented work. Add
  real entries (with real photography in `public/projects/<slug>/`) when
  available.
- **No stats, years-in-business, headcount, awards, or client names** — none
  appear in the PDF, so none appear on the site.
- **Blog / Journal articles are original editorial writing**, not case
  studies — they discuss the company's real disciplines (joinery, materials,
  fitout, kitchens, furniture) in general terms and don't claim specific
  projects, clients or numbers.

## A note on the PDF's imagery

Several images embedded in the profile PDF look like **stock or
AI-generated photography** rather than photos of actual Al Jazeera Woodz
work (most obviously: a generative "parametric wood wall" render used as
the PDF's cover image, and an unrelated macro photo of a human eye next to
the Vision text). These are currently reused on the site purely as
**atmospheric/mood imagery** — never captioned as a specific project — but
before this goes live:

1. Confirm the company has the right to use these images publicly (a
   marketing PDF's internal use may not cover unlimited web hosting,
   depending on how the PDF/template was produced).
2. Replace them with real jobsite photography as soon as it's available —
   it will make the site far more credible than any stock image, and lets
   the `/projects` grid finally have real entries.

Extracted originals (all pages, unfiltered) are kept in `public/brand/` for
reference; the curated subset actually used by the site lives in
`public/images/`.

## Hero, Material section, and Services page background videos

Three **client-supplied files**, dropped directly into `public/video/` and
wired in on request — re-encoded here only for the web (audio stripped,
faststart flag added; originals kept alongside with matching non-`-web`
names). Their original source/license is unconfirmed as of this build.

- `middle-banner-web.mp4` → homepage hero (top banner) — an empty room
  with base cabinetry mid-install
- `hero-banner-web.mp4` → Material section ("Every surface tells a
  story") — a concrete-and-wood kitchen counter with a drawer sliding open
- `modern-arch-web.mp4` → `/services` page header — a wood-panelled living
  room / hallway

(Note the filenames are the reverse of where each one is actually used —
that's the client's own naming from before assignment, kept as-is so the
file names still match what's physically on disk.)

**Flagged directly to the client in chat:** all three clips have the
visual signature of AI-generated video — a small sparkle/star mark, fixed
bottom-right, consistent across every frame — rather than real photographed
spaces (unrealistic plumbing rough-ins with no sink, furniture with no
visible seams/hardware consistency, and other tells typical of generative
video). If that's confirmed, these need replacing (or at minimum cropping
the corner mark) before the site is genuinely live — using unlicensed or
misrepresentative footage on a commercial site is a real risk, not just a
style note.

Earlier builds used two different clips instead — licensed Pexels stock
(a craftsman measuring timber, then a styled wood-panelled interior) —
swapped out on request for the client's own files. Removed from the repo;
Pexels License terms (free commercial use, no attribution required)
applied to both while they were in use.

Either way — stock or client-supplied — none of this is footage of Al
Jazeera Woodz's actual work. `src/components/Hero.tsx` and
`src/components/MaterialSection.tsx` both fall back automatically to a
still image (the photo carousel, for the hero) on reduced-motion
preference, data-saver connections, or if the video file fails to load.
`src/components/PageHero.tsx`'s optional `video` prop (used on
`/services`) falls back to its poster image on reduced-motion only, via
Tailwind's `motion-reduce:` variant — no data-saver check there since it's
a much smaller file and not the largest-contentful-paint element.

## One more licensed stock photo

`public/images/wood-shingle-detail.jpg` — a traditional carved wood shingle
facade (Gura Văii, Romania), real photography (not AI/rendered), added to
the Material section's scroll strip on request. Pexels License, free
commercial use, no attribution required. Source:
`pexels.com/photo/wooden-architectural-panel-with-unique-design-34936774`
(Maria M.). Same rule as everything else non-PDF: it's mood/texture
imagery, not a claim about Al Jazeera Woodz's own work.
