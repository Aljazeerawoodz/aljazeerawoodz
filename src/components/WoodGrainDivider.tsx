/**
 * An original, hand-drawn SVG wood-grain motif — not a photo, so there's no
 * authenticity/licensing question. Used as a small signature accent between
 * sections to tie the "wood" identity together without leaning on imagery.
 */
export default function WoodGrainDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      className={`h-10 w-full text-teal/40 sm:h-14 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 40 C 150 10, 250 70, 400 38 S 650 8, 800 42 S 1050 68, 1200 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M0 52 C 180 30, 300 78, 460 50 S 700 24, 860 54 S 1080 76, 1200 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <path
        d="M0 26 C 120 46, 320 4, 480 28 S 760 52, 940 22 S 1120 4, 1200 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.35"
      />
    </svg>
  );
}
