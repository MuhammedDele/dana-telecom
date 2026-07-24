import type { ReactNode } from "react";

/* Cinematic aurora background with animated blobs + grid overlay */
export function AuroraBg({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="animate-blob absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl sm:h-96 sm:w-96" />
      <div className="animate-blob absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-navy-light/50 blur-3xl [animation-delay:3s] sm:h-80 sm:w-80" />
      <div className="animate-blob absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-brand/15 blur-3xl [animation-delay:6s] sm:h-72 sm:w-72" />
    </div>
  );
}

/**
 * Infinite marquee.
 * Technique adapted from 21st.dev "Testimonials with Marquee":
 * duplicated track + hover-pause + gradient fade edges.
 */
export function Marquee({
  items,
  duration = "32s",
  reverse = false,
  fadeClass,
  gapClass = "gap-8",
}: {
  items: ReactNode[];
  duration?: string;
  reverse?: boolean;
  /** e.g. "from-white" — colour the edge fade to match the section background */
  fadeClass?: string;
  gapClass?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative flex w-full overflow-hidden">
      <div
        className={`animate-marquee flex shrink-0 items-stretch ${gapClass} pe-8 group-hover:[animation-play-state:paused]`}
        style={{
          animationDuration: duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((it, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {it}
          </div>
        ))}
      </div>

      {fadeClass && (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 start-0 hidden w-24 bg-gradient-to-l ${fadeClass} sm:block`}
            aria-hidden
          />
          <div
            className={`pointer-events-none absolute inset-y-0 end-0 hidden w-24 bg-gradient-to-r ${fadeClass} sm:block`}
            aria-hidden
          />
        </>
      )}
    </div>
  );
}
