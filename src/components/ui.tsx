import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { AuroraBg } from "./decor";
import { Reveal } from "./motion";

/* ---------- الشعار ---------- */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 text-lg font-extrabold tracking-tight xl:text-xl">
      <Image
        src={light ? "/logo-mark-white.png" : "/logo-mark.png"}
        alt="شعار دانا تيليكوم"
        width={512}
        height={512}
        priority
        className="h-9 w-9 object-contain sm:h-10 sm:w-10"
      />
      <span className={`whitespace-nowrap ${light ? "text-white" : "text-navy"}`}>
        دانا <span className={light ? "text-brand" : "text-brand-dark"}>تيليكوم</span>
      </span>
    </span>
  );
}

/* ---------- الأزرار ---------- */
type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "dark";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: BtnProps) {
  const base =
    "shine group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none";
  const styles = {
    primary:
      "bg-brand text-navy-dark hover:-translate-y-0.5 shadow-[0_10px_30px_-8px_rgba(255,242,0,0.6)] hover:shadow-[0_16px_40px_-8px_rgba(255,242,0,0.75)]",
    outline:
      "border-2 border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white",
    ghost:
      "glass text-white hover:bg-white hover:text-navy border-white/30",
    dark: "bg-navy text-white hover:bg-navy-dark hover:-translate-y-0.5 shadow-soft",
  }[variant];

  const isExternal =
    href.startsWith("http") || href.startsWith("tel") || href.startsWith("mailto");
  const content = (
    <>
      {children}
      <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>
        ←
      </span>
    </>
  );
  if (isExternal) {
    return (
      <a href={href} className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {content}
    </Link>
  );
}

/* ---------- ترويسة القسم ---------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  light?: boolean;
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-start"}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-extrabold text-navy">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-dark" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-4 text-3xl font-extrabold leading-tight sm:text-4xl ${light ? "text-white" : "text-navy"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${light ? "text-white/80" : "text-muted"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* ---------- غلاف الصفحة الداخلية (Aurora) ---------- */
export function PageHero({
  title,
  subtitle,
  breadcrumb,
}: {
  title: string;
  subtitle?: string;
  breadcrumb: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <AuroraBg />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-28 text-center sm:pb-20 sm:pt-32">
        <Reveal>
          <p className="text-sm font-bold text-brand">
            <Link href="/" className="hover:underline">
              الرئيسية
            </Link>{" "}
            <span className="mx-1 opacity-60">/</span> {breadcrumb}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}

/* ---------- حاوية ---------- */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>;
}
