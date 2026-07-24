import { Marquee } from "./decor";
import { Icon } from "./icons";
import { testimonials } from "@/lib/site";

/**
 * Testimonials marquee.
 * Animation technique adapted from 21st.dev "Testimonials with Marquee"
 * (serafimcloud): duplicated track, pause-on-hover, gradient fade edges.
 * Restyled to the Dana Telecom brand, Arabic RTL, mobile-first.
 */
function Card({
  name,
  role,
  text,
}: {
  name: string;
  role: string;
  text: string;
}) {
  return (
    <figure className="flex h-full w-[280px] flex-col rounded-2xl border border-line bg-white p-6 shadow-soft transition-colors duration-300 hover:border-navy/25 sm:w-[340px]">
      <Icon name="check" size={18} strokeWidth={3} className="text-brand-dark" />
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted">
        {text}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-navy-soft font-extrabold text-navy">
          {name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-extrabold text-navy">{name}</span>
          <span className="block text-xs text-muted">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <Marquee
      duration="45s"
      fadeClass="from-surface"
      gapClass="gap-5"
      items={testimonials.map((t) => (
        <Card key={t.role} {...t} />
      ))}
    />
  );
}
