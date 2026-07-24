"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "./icons";
import { Button } from "./ui";
import {
  packageTypes,
  speedPlans,
  usagePlan,
  cardBundles,
} from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function PackageTabs() {
  const [active, setActive] = useState<"speed" | "usage" | "cards">("speed");
  const current = packageTypes.find((t) => t.key === active)!;

  return (
    <div>
      {/* أزرار التبديل */}
      <div
        role="tablist"
        aria-label="أنواع الباقات"
        className="mx-auto grid max-w-3xl gap-2 sm:grid-cols-3"
      >
        {packageTypes.map((t) => {
          const on = t.key === active;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(t.key)}
              className={`relative flex items-center gap-3 rounded-2xl border p-4 text-start transition-all duration-300 ${
                on
                  ? "border-brand bg-navy text-white shadow-card"
                  : "border-line bg-white text-navy hover:border-navy/30 hover:-translate-y-0.5"
              }`}
            >
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${
                  on ? "bg-brand text-navy-dark" : "bg-navy-soft text-navy"
                }`}
              >
                <Icon name={t.icon} size={22} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-extrabold">
                  {t.title}
                </span>
                <span
                  className={`block truncate text-xs ${on ? "text-brand" : "text-muted"}`}
                >
                  {t.tagline}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* وصف النوع الحالي */}
      <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
        {current.description}
      </p>

      {/* المحتوى */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
          >
            {active === "speed" && <SpeedPlans />}
            {active === "usage" && <UsagePlan />}
            {active === "cards" && <CardBundles />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- (1) سرعة ثابتة ---------- */
function SpeedPlans() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {speedPlans.map((p) => (
        <div
          key={p.name}
          className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 shadow-soft transition-transform duration-300 hover:-translate-y-2 sm:p-8 ${
            p.featured
              ? "border-brand bg-navy text-white shadow-card"
              : "border-line bg-white"
          }`}
        >
          {p.featured && (
            <>
              <div
                className="absolute -end-16 -top-16 size-40 rounded-full bg-brand/20 blur-3xl"
                aria-hidden
              />
              <span className="absolute -top-3 end-8 rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-navy-dark shadow-glow">
                الأكثر طلبًا
              </span>
            </>
          )}

          <h3
            className={`relative text-lg font-extrabold ${p.featured ? "text-brand" : "text-navy"}`}
          >
            {p.name}
          </h3>
          <p
            className={`relative mt-1 text-sm ${p.featured ? "text-white/70" : "text-muted"}`}
          >
            {p.audience}
          </p>

          <div
            className={`relative mt-6 rounded-2xl p-4 ${p.featured ? "bg-white/10" : "bg-surface"}`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span
                className={`text-3xl font-black ${p.featured ? "text-white" : "text-navy"}`}
              >
                {p.priceUsd}
              </span>
              <span
                className={`text-xs ${p.featured ? "text-white/60" : "text-muted"}`}
              >
                / شهريًا
              </span>
            </div>
            <div
              className={`mt-3 flex items-center gap-2 border-t pt-3 text-sm font-bold ${
                p.featured ? "border-white/15 text-brand" : "border-line text-navy"
              }`}
            >
              <Icon name="speed" size={16} strokeWidth={2.2} />
              {p.speed}
            </div>
            <p
              className={`mt-1.5 text-xs ${p.featured ? "text-white/60" : "text-muted"}`}
            >
              بالليرة: {p.priceSyp}
            </p>
          </div>

          <ul
            className={`relative mt-6 flex-1 space-y-2.5 text-sm ${p.featured ? "text-white/80" : "text-muted"}`}
          >
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <Icon
                  name="check"
                  size={16}
                  strokeWidth={3}
                  className="shrink-0 text-brand-dark"
                />
                {f}
              </li>
            ))}
          </ul>

          <div className="relative mt-8">
            <Button
              href="/contact"
              variant={p.featured ? "primary" : "outline"}
              className="w-full"
            >
              اطلب الاشتراك
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- (2) حسب الاستهلاك ---------- */
function UsagePlan() {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-[1.1fr_1fr]">
      {/* اللوحة الرئيسية */}
      <div className="relative overflow-hidden rounded-3xl bg-navy-gradient p-7 text-white shadow-card sm:p-9">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
        <div
          className="absolute -bottom-16 -start-12 size-52 rounded-full bg-brand/25 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-1.5 text-xs font-extrabold text-navy-dark">
            <Icon name="wallet" size={15} strokeWidth={2.5} />
            الدفع آخر الشهر
          </span>
          <h3 className="mt-5 text-2xl font-extrabold sm:text-3xl">
            {usagePlan.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
            {usagePlan.headline}
          </p>

          <div className="mt-7 rounded-2xl bg-white/10 p-5">
            <p className="text-xs text-white/60">سعر الجيجابايت</p>
            <p className="mt-1 text-3xl font-black text-brand">
              {usagePlan.pricePerGb}
            </p>
            <p className="mt-3 border-t border-white/15 pt-3 text-xs leading-relaxed text-white/70">
              {usagePlan.billing}
            </p>
          </div>

          <div className="mt-7">
            <Button href="/contact">اطلب الاشتراك</Button>
          </div>
        </div>
      </div>

      {/* المزايا */}
      <div className="rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-8">
        <h4 className="text-lg font-extrabold text-navy">لماذا هذه الباقة؟</h4>
        <ul className="mt-5 space-y-3.5 text-sm text-muted">
          {usagePlan.points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft text-navy-dark">
                <Icon name="check" size={13} strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-7 rounded-2xl border border-dashed border-line bg-surface p-4 text-xs leading-relaxed text-muted">
          <Icon name="tip" size={16} className="mb-1.5 text-brand-dark" />
          مناسبة لمن يختلف استهلاكه من شهر لآخر ولا يرغب بالالتزام بسرعة ثابتة.
        </div>
      </div>
    </div>
  );
}

/* ---------- (3) البطاقات ---------- */
function CardBundles() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cardBundles.map((c, i) => (
        <div
          key={i}
          className={`group relative overflow-hidden rounded-3xl p-7 shadow-soft transition-transform duration-300 hover:-translate-y-2 ${
            c.featured
              ? "bg-brand text-navy-dark shadow-glow"
              : "border border-line bg-white"
          }`}
        >
          <div
            className={`absolute inset-0 ${c.featured ? "bg-stripes-dark opacity-50" : "bg-stripes-dark opacity-[0.07]"}`}
            aria-hidden
          />
          {c.featured && (
            <span className="absolute end-6 top-6 rounded-full bg-navy px-3 py-1 text-[11px] font-extrabold text-brand">
              الأكثر مبيعًا
            </span>
          )}

          <div className="relative">
            <span
              className={`grid size-12 place-items-center rounded-2xl ${
                c.featured ? "bg-navy text-brand" : "bg-navy-soft text-navy"
              }`}
            >
              <Icon name="card" size={24} />
            </span>

            <p
              className={`mt-5 text-3xl font-black ${c.featured ? "text-navy-dark" : "text-navy"}`}
            >
              {c.data}
            </p>

            <div
              className={`mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${
                c.featured ? "bg-navy/10 text-navy-dark" : "bg-surface text-navy"
              }`}
            >
              <Icon name="speed" size={16} strokeWidth={2.2} />
              السرعة: {c.speed}
            </div>

            <div
              className={`mt-4 flex items-baseline gap-2 border-t pt-4 ${
                c.featured ? "border-navy/15" : "border-line"
              }`}
            >
              <span
                className={`text-2xl font-black ${c.featured ? "text-navy-dark" : "text-navy"}`}
              >
                {c.priceUsd}
              </span>
              <span
                className={`text-xs ${c.featured ? "text-navy/60" : "text-muted"}`}
              >
                — بالليرة: {c.priceSyp}
              </span>
            </div>

            <div className="mt-6">
              <Button
                href="/contact"
                variant={c.featured ? "dark" : "outline"}
                className="w-full"
              >
                اطلب البطاقة
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
