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
wired in on request — re-encoded here for the web (audio stripped,
faststart flag added; originals kept alongside with matching non-`-web`
names). Their original source/license is unconfirmed as of this build.

The client's source files are natively 1280×720, which looks visibly soft
stretched full-width on a normal desktop hero (confirmed by measuring: at
a 1920px viewport the browser was upscaling ~1.5×). Re-encoded upscaled to
1920×1080 with Lanczos scaling + a mild unsharp mask, at a lower CRF
(20 vs. the original 25) for less compression softness — genuinely
sharper, but each file is now ~4-6MB instead of ~1MB. Still not "real 4K
detail" (that ceiling is set by the 720p source), just the sharpest this
source material can reasonably look.

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

## About page video — possibly real footage

`public/video/project08-web.mp4` (+ poster) — another client-supplied file,
used as the About page header background. Unlike the three videos above,
this one shows **no visible AI-tool watermark** and looks like genuine
phone-shot footage of a real curved wood cabinet/shelving unit with
built-in lighting — plausibly actual Al Jazeera Woodz work. Not confirmed
either way in chat, so still treated as illustrative rather than
explicitly claimed as a completed project. Source is portrait (592×1296);
cropped with `object-top` to favor the top of frame since a center crop
would lose the most detailed part of the piece.

## Services section — Interior Fitout preview video

`public/video/Bulidstart-web.mp4` (+ `Bulidstart-poster.jpg`) — client-
supplied file (`public/video/Bulidstart.mp4`, re-encoded here: audio
stripped, faststart flag added, capped to 1920px wide). Used as the
hover-preview background for the "Interior Fitout" service on the home
page's Services section (desktop hover panel + mobile accordion),
replacing the earlier `wooden.jpg` still image. Source/license
unconfirmed as of this addition — same caveat as the other client-
supplied videos above: treat as illustrative rather than a confirmed
completed-project claim unless the client confirms otherwise.

## Service detail page — Interior Fitout main image video

`public/video/cupboard-fitout-web.mp4` (+ `cupboard-fitout-poster.jpg`) —
client-supplied file (originally
`Cupboard_fit-out_construction_in…_202608211207.mp4`, re-encoded here:
audio stripped, faststart flag added, capped to 1920px wide). Used as the
main image on the Interior Fitout service detail page
(`/services/interior-fitout`), separate from the `Bulidstart` video used
in the home page's Services section preview for the same service — the
two spots intentionally show different footage. Source/license
unconfirmed as of this addition — same caveat as the other client-
supplied videos: illustrative, not a confirmed completed-project claim.
