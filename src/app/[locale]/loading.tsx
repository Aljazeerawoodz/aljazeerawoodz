/**
 * Shown instantly by Next.js while a route segment is being fetched/compiled
 * (in dev mode, this covers the "cold compile" delay on a page's first
 * visit; in production it covers any genuine data-fetch delay). Without
 * this, a slow navigation simply looks frozen.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-warm">
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex h-12 w-12 items-center justify-center">
          <span className="absolute h-full w-full animate-ping rounded-full bg-teal/40" />
          <span className="relative h-8 w-8 animate-pulse rounded-full bg-teal" />
        </span>
        <span className="eyebrow text-charcoal/60">Al Jazeera Woodz</span>
      </div>
    </div>
  );
}
