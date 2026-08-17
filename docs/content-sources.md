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

## The hero background video

`public/video/hero-interior.mp4` (+ `hero-interior-poster.jpg`) is
**licensed stock footage from Pexels** — a styled, wood-panelled interior
with warm candlelight — selected and approved in this build's chat by the
client, not generated. Pexels License: free for commercial use, no
attribution required. Source:
`pexels.com/video/modern-wooden-house-interior-7749087`. Downloaded once
(~43MB, 3840×2160, ~20s), then trimmed to 10s, downscaled to 1080p,
stripped of audio, and re-encoded with ffmpeg to <1MB for web delivery.

An earlier version used a different clip (a craftsman measuring timber,
`measuring-wood-for-cutting-20184480` by Everett Bumstead) — swapped out on
request for something that reads as a finished interior rather than a
workshop process shot. That original file has been removed from the repo;
the same Pexels License terms applied to it.

**Either way, this is illustrative b-roll, not footage of Al Jazeera
Woodz's actual work.**

## One more licensed stock photo

`public/images/wood-shingle-detail.jpg` — a traditional carved wood shingle
facade (Gura Văii, Romania), real photography (not AI/rendered), added to
the Material section's scroll strip on request. Pexels License, free
commercial use, no attribution required. Source:
`pexels.com/photo/wooden-architectural-panel-with-unique-design-34936774`
(Maria M.). Same rule as everything else non-PDF: it's mood/texture
imagery, not a claim about Al Jazeera Woodz's own work. Swap it for real footage the moment the company has any —
`src/components/Hero.tsx` already falls back to the photo carousel (which
*is* built entirely from the company's own PDF imagery) automatically on
reduced-motion preference, data-saver connections, or if the video file
ever fails to load, so replacing/removing the video is a one-line change
with no risk of a broken hero in the meantime.
