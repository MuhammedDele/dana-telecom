"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import Link from "next/link";
import { Icon } from "./icons";
import { coverageCities, coverageLegend, coverageNote } from "@/lib/site";
import { checkCoverage, formatDistance, type CoverageResult } from "@/lib/geo";

/** نتيجة فحص موقع الزائر */
function LocationResult({ result }: { result: CoverageResult }) {
  if (result.status === "wifi") {
    return (
      <div className="max-w-md rounded-2xl border border-brand bg-brand-soft p-5 text-center">
        <span className="mx-auto grid size-11 place-items-center rounded-full bg-brand text-navy-dark">
          <Icon name="wifi" size={22} />
        </span>
        <p className="mt-3 font-extrabold text-navy">
          موقعك ضمن تغطية الواي فاي ✔
        </p>
        <p className="mt-1 text-sm text-muted">
          أنت في <span className="font-bold text-navy">{result.area}</span> —{" "}
          {result.city.name} (تغطية {result.areaPercent}٪).
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white"
        >
          اشترك الآن
        </Link>
      </div>
    );
  }

  if (result.status === "nanobeam") {
    return (
      <div className="max-w-md rounded-2xl border border-green-500/40 bg-green-50 p-5 text-center">
        <span className="mx-auto grid size-11 place-items-center rounded-full bg-green-600 text-white">
          <Icon name="nanobeam" size={22} />
        </span>
        <p className="mt-3 font-extrabold text-navy">
          موقعك ضمن نطاق NanoBeam ✔
        </p>
        <p className="mt-1 text-sm text-muted">
          أنت خارج أحياء الواي فاي المباشرة، لكن يمكن ربطك لاسلكيًا عبر NanoBeam.
          تبعد {formatDistance(result.distanceM)} عن مركز {result.city.name}.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white"
        >
          اطلب استشارة
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md rounded-2xl border border-line bg-surface p-5 text-center">
      <span className="mx-auto grid size-11 place-items-center rounded-full bg-navy-soft text-navy">
        <Icon name="location" size={22} />
      </span>
      <p className="mt-3 font-extrabold text-navy">
        موقعك خارج نطاق التغطية الحالي
      </p>
      <p className="mt-1 text-sm text-muted">
        تبعد {formatDistance(result.distanceM)} عن {result.city.name}. تواصل معنا
        — قد نتمكن من إيجاد حل لاسلكي مناسب لموقعك.
      </p>
      <Link
        href="/contact"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white"
      >
        تواصل معنا
      </Link>
    </div>
  );
}

// Leaflet لا يعمل على الخادم — نحمّله في المتصفح فقط
const CoverageMap = dynamic(() => import("./CoverageMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[400px] w-full place-items-center bg-navy-soft sm:h-[520px]">
      <span className="flex items-center gap-2 text-sm font-bold text-navy">
        <span className="size-2 animate-ping rounded-full bg-brand-dark" />
        جارٍ تحميل الخريطة…
      </span>
    </div>
  ),
});

type LocState =
  | { s: "idle" }
  | { s: "loading" }
  | { s: "error"; msg: string }
  | { s: "done"; result: CoverageResult };

export function CoverageExplorer() {
  const [active, setActive] = useState(coverageCities[0].key);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [loc, setLoc] = useState<LocState>({ s: "idle" });
  const city = coverageCities.find((c) => c.key === active)!;

  function locate() {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setLoc({ s: "error", msg: "متصفحك لا يدعم تحديد الموقع." });
      return;
    }
    if (!window.isSecureContext) {
      setLoc({
        s: "error",
        msg: "تحديد الموقع يتطلب اتصالًا آمنًا (https). جرّب فتح الموقع عبر رابط https.",
      });
      return;
    }
    setLoc({ s: "loading" });
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const pos: [number, number] = [p.coords.latitude, p.coords.longitude];
        setUserPos(pos);
        const result = checkCoverage(pos);
        setActive(result.city.key); // انتقل لخريطة أقرب مدينة
        setLoc({ s: "done", result });
      },
      (err) => {
        const msg =
          err.code === err.PERMISSION_DENIED
            ? "تم رفض إذن الوصول للموقع. فعّله من إعدادات المتصفح ثم أعد المحاولة."
            : err.code === err.TIMEOUT
              ? "انتهت مهلة تحديد الموقع. حاول مرة أخرى."
              : "تعذّر تحديد موقعك الحالي.";
        setLoc({ s: "error", msg });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }

  return (
    <div>
      {/* تبويبات المدن */}
      <div
        role="tablist"
        aria-label="مناطق التغطية"
        className="mx-auto grid max-w-xl gap-2 sm:grid-cols-2"
      >
        {coverageCities.map((c) => {
          const on = c.key === active;
          return (
            <button
              key={c.key}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(c.key)}
              className={`flex items-center justify-between gap-3 rounded-2xl border p-4 text-start transition-all duration-300 ${
                on
                  ? "border-brand bg-navy text-white shadow-card"
                  : "border-line bg-white text-navy hover:-translate-y-0.5 hover:border-navy/30"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                    on ? "bg-brand text-navy-dark" : "bg-navy-soft text-navy"
                  }`}
                >
                  <Icon name="location" size={20} />
                </span>
                <span className="text-sm font-extrabold">{c.name}</span>
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-black ${
                  on ? "bg-white/15 text-brand" : "bg-brand-soft text-navy-dark"
                }`}
              >
                {c.wifiPercent}٪
              </span>
            </button>
          );
        })}
      </div>

      {/* زر تحديد الموقع */}
      <div className="mt-5 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={locate}
          disabled={loc.s === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-navy-dark disabled:cursor-wait disabled:opacity-70"
        >
          <Icon name="location" size={18} />
          {loc.s === "loading" ? "جارٍ تحديد موقعك…" : "هل موقعي ضمن التغطية؟"}
        </button>

        {loc.s === "error" && (
          <p
            role="alert"
            className="max-w-md rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-700"
          >
            {loc.msg}
          </p>
        )}

        {loc.s === "done" && <LocationResult result={loc.result} />}
      </div>

      {/* الخريطة */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-line shadow-card">
        <CoverageMap city={city} userPos={userPos} />

        {/* مفتاح الخريطة */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-line bg-white px-4 py-4 text-xs font-bold text-navy sm:text-sm">
          <span className="flex items-center gap-2">
            <span
              className="inline-block size-4 rounded-full border-2 border-dashed"
              style={{
                borderColor: coverageLegend.nanobeam.color,
                background: `${coverageLegend.nanobeam.color}22`,
              }}
            />
            {coverageLegend.nanobeam.label}
          </span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block size-4 rounded-full border-2 border-navy"
              style={{ background: coverageLegend.wifi.color }}
            />
            {coverageLegend.wifi.label}
          </span>
        </div>
      </div>

      {/* نسب التغطية */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {/* واي فاي */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-extrabold text-navy">
              <Icon name="wifi" size={20} className="text-brand-dark" />
              تغطية الواي فاي
            </span>
            <span className="text-2xl font-black text-navy">
              {city.wifiPercent}٪
            </span>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-navy-soft">
            <motion.div
              key={city.key}
              initial={{ width: 0 }}
              animate={{ width: `${city.wifiPercent}%` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full border border-navy/30 bg-brand"
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            نقاط بث موزّعة في أحياء {city.name} — تظهر بالأصفر على الخريطة.
          </p>
        </div>

        {/* NanoBeam */}
        <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-extrabold text-navy">
              <Icon name="nanobeam" size={20} style={{ color: coverageLegend.nanobeam.color }} />
              تغطية NanoBeam
            </span>
            <span
              className="text-lg font-black"
              style={{ color: coverageLegend.nanobeam.color }}
            >
              كاملة
            </span>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-navy-soft">
            <motion.div
              key={`${city.key}-nb`}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full"
              style={{ background: coverageLegend.nanobeam.color }}
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            تغطي كامل {city.name} وما حولها — تظهر بالأخضر على الخريطة.
          </p>
        </div>
      </div>

      {/* تفصيل الأحياء */}
      <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-soft">
        <h3 className="flex items-center gap-2 font-extrabold text-navy">
          <Icon name="location" size={20} className="text-brand-dark" />
          تغطية الواي فاي حسب الحي — {city.name}
        </h3>
        <div className="mt-5 space-y-4">
          {city.wifiSpots.map((s, i) => (
            <div key={s.name}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-navy">{s.name}</span>
                <span className="font-black text-navy">{s.percent}٪</span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-navy-soft">
                <motion.div
                  key={`${city.key}-${s.name}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${s.percent}%` }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full rounded-full border border-navy/25 bg-brand"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* العمل مستمر */}
      <div className="mt-6 flex items-start gap-4 rounded-2xl border border-brand/40 bg-brand-soft p-6">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand text-navy-dark">
          <Icon name="tower" size={22} />
        </span>
        <div>
          <h3 className="font-extrabold text-navy">{coverageNote.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            {coverageNote.text}
          </p>
        </div>
      </div>
    </div>
  );
}
