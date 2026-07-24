"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { Logo, Button } from "./ui";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Solid look when scrolled or mobile menu open; transparent over the dark hero otherwise.
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "glass-light border-b border-line shadow-soft"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label={site.name} onClick={() => setOpen(false)}>
          <Logo light={!solid} />
        </Link>

        {/* روابط سطح المكتب — أسماء مختصرة لتجنّب تجاوز العرض */}
        <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-bold transition-colors xl:px-3 xl:text-sm ${
                    active
                      ? solid
                        ? "bg-navy-soft text-navy"
                        : "bg-white/15 text-brand"
                      : solid
                        ? "text-muted hover:text-navy"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.short}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden shrink-0 lg:block">
          <Button href="/contact" className="!px-5 !py-2.5 text-[13px] xl:!px-6 xl:!py-3 xl:text-sm">
            اشترك الآن
          </Button>
        </div>

        {/* زر القائمة للجوال */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`grid h-11 w-11 place-items-center rounded-xl border lg:hidden ${
            solid ? "border-line text-navy" : "border-white/30 text-white"
          }`}
          aria-label="القائمة"
          aria-expanded={open}
        >
          <span className="sr-only">فتح القائمة</span>
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {/* قائمة الجوال */}
      {open && (
        <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-bold ${
                      active ? "bg-navy-soft text-navy" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Button href="/contact" className="w-full">
                اشترك الآن
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
