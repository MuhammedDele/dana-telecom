import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icons";
import { Stagger, StaggerItem } from "./motion";

/**
 * Bento feature grid.
 * Layout/structure adapted from 21st.dev "Feature Bento" (uilayout.contact),
 * restyled to the Dana Telecom brand (navy #282369 / yellow #FFF200), Arabic RTL,
 * and made mobile-first (single column → 3 columns from md).
 */
export function Bento() {
  return (
    <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[260px]">
      {/* البطاقة الكبيرة */}
      <StaggerItem className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl p-7 text-white md:col-span-2 md:row-span-2 md:min-h-0 md:p-10">
        <Image
          src="/images/dish.jpg"
          alt="صحن لاسلكي كبير يوفّر ربطًا بعيد المدى"
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/80 to-navy/30" aria-hidden />
        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold backdrop-blur-sm">
            <span className="size-2 animate-pulse rounded-full bg-brand" />
            الشبكة تعمل الآن
          </span>
          <h3 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            تغطية تصل إلى
            <br />
            أبعد نقطة
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
            صحون ونواشر NanoBeam تربط المزارع والمنشآت البعيدة لاسلكيًا، حتى خارج
            نطاق نقاط التغطية المباشرة.
          </p>
        </div>
      </StaggerItem>

      {/* إحصائية */}
      <StaggerItem className="relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy-light p-7 text-white md:min-h-0">
        <div className="absolute -end-8 -top-8 size-32 rounded-full bg-brand/20 blur-2xl" aria-hidden />
        <div className="relative z-10">
          <div className="mb-4 grid size-12 place-items-center rounded-2xl bg-brand text-navy-dark">
            <Icon name="tower" size={24} strokeWidth={2} />
          </div>
          <h4 className="text-3xl font-black sm:text-4xl">منطقتان</h4>
          <p className="mt-1 font-medium text-white/75">الدانا وخان العسل</p>
        </div>
      </StaggerItem>

      {/* ميزة */}
      <StaggerItem className="flex min-h-[200px] flex-col justify-between rounded-3xl border border-line bg-white p-7 md:min-h-0">
        <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-navy to-navy-light text-white">
          <Icon name="support" size={24} />
        </div>
        <div className="mt-5 space-y-2">
          <h4 className="text-xl font-extrabold text-navy sm:text-2xl">
            تركيب ودعم محلي
          </h4>
          <p className="text-sm text-muted">
            فريق فني من داخل المدينة ينفّذ التركيب ويتابع أي مشكلة بسرعة.
          </p>
        </div>
      </StaggerItem>

      {/* دعوة لاتخاذ إجراء — بنقوش وأشرطة إشارة */}
      <Link
        href="/contact"
        className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-navy-light p-7 text-white transition-shadow duration-500 hover:shadow-card md:min-h-0"
      >
        <div className="absolute inset-0 bg-stripes opacity-40" aria-hidden />
        <div
          className="absolute -bottom-14 -start-10 size-44 rounded-full bg-brand/25 blur-3xl transition-all duration-700 group-hover:bg-brand/40"
          aria-hidden
        />

        {/* أشرطة إشارة متحركة */}
        <div className="absolute bottom-6 end-7 flex items-end gap-1.5" aria-hidden>
          {[10, 18, 26, 34].map((h, i) => (
            <span
              key={h}
              className="animate-bar w-2 rounded-full bg-brand/80"
              style={{ height: `${h}px`, animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>

        <div className="relative flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-extrabold text-navy-dark shadow-glow">
            <Icon name="sparkle" size={13} strokeWidth={2.5} />
            اشترك الآن
          </span>
          <span className="grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:-rotate-45 group-hover:bg-brand group-hover:text-navy-dark">
            <Icon name="arrow" size={18} strokeWidth={2.5} />
          </span>
        </div>

        <div className="relative mt-5">
          <h4 className="text-xl font-extrabold leading-tight sm:text-2xl">
            احصل على خط
            <br />
            <span className="text-brand">إنترنت اليوم</span>
          </h4>
          <p className="mt-2 text-xs text-white/65">تركيب سريع خلال أيام</p>
        </div>
      </Link>

      {/* ٢٤/٧ — حلقات نابضة */}
      <StaggerItem className="group relative flex min-h-[210px] items-center justify-center overflow-hidden rounded-3xl bg-navy-dark p-7 text-white md:min-h-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden
        />
        {/* حلقات تتمدد */}
        <div className="absolute inset-0 grid place-items-center" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="animate-ring absolute size-40 rounded-full border border-brand/40"
              style={{ animationDelay: `${i * 1.05}s` }}
            />
          ))}
          <span className="animate-spin-slow absolute size-32 rounded-full border-2 border-dashed border-white/15" />
        </div>

        <div className="relative z-10 text-center">
          <span className="mx-auto grid size-11 place-items-center rounded-full bg-brand text-navy-dark shadow-glow">
            <Icon name="clock3" size={22} strokeWidth={2.2} />
          </span>
          <span className="mt-3 block text-4xl font-black text-gradient sm:text-5xl">
            ٢٤/٧
          </span>
          <p className="mt-1.5 text-xs font-semibold tracking-widest text-white/60">
            دعم ومتابعة
          </p>
        </div>
      </StaggerItem>

      {/* ٣ خدمات — بأيقونات الخدمات */}
      <StaggerItem className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-3xl bg-brand p-7 text-navy-dark md:min-h-0">
        <div className="absolute inset-0 bg-stripes-dark opacity-60" aria-hidden />
        <div
          className="absolute -bottom-12 -end-12 size-44 rounded-full bg-white/40 blur-3xl"
          aria-hidden
        />

        <div className="relative flex items-start justify-between">
          <div>
            <span className="text-4xl font-black leading-none sm:text-5xl">٣</span>
            <p className="mt-1.5 text-xs font-bold tracking-widest text-navy/70">
              خدمات أساسية
            </p>
          </div>
          <Icon name="verified" size={22} className="text-navy/50" />
        </div>

        {/* أيقونات الخدمات الثلاث */}
        <div className="relative mt-5 flex items-center gap-2">
          {(["wifi", "nanobeam", "cameras"] as const).map((k, i) => (
            <span
              key={k}
              className="grid size-11 place-items-center rounded-xl bg-navy text-brand shadow-soft transition-transform duration-300 group-hover:-translate-y-1"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <Icon name={k} size={20} />
            </span>
          ))}
        </div>
      </StaggerItem>
    </Stagger>
  );
}
