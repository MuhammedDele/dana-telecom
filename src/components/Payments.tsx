import Image from "next/image";
import { Icon } from "./icons";
import { Reveal, Stagger, StaggerItem } from "./motion";
import { payments } from "@/lib/site";

/** شبكة وسائل الدفع + لوحة شام كاش مع رمز QR */
export function Payments() {
  const { methods, shamCash } = payments;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-stretch">
      {/* وسائل الدفع */}
      <Stagger className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {methods.map((m) => (
          <StaggerItem
            key={m.title}
            className={`flex items-center gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-1 ${
              m.featured
                ? "border-brand bg-brand-soft shadow-soft"
                : "border-line bg-white shadow-soft"
            }`}
          >
            <span
              className={`grid size-12 shrink-0 place-items-center rounded-xl ${
                m.featured ? "bg-brand text-navy-dark" : "bg-navy-soft text-navy"
              }`}
            >
              <Icon name={m.icon} size={24} />
            </span>
            <span>
              <span className="block font-extrabold text-navy">{m.title}</span>
              <span className="block text-xs leading-relaxed text-muted">
                {m.subtitle}
              </span>
            </span>
          </StaggerItem>
        ))}
      </Stagger>

      {/* لوحة شام كاش */}
      <Reveal delay={0.15}>
        <div className="relative h-full overflow-hidden rounded-3xl bg-navy-gradient p-6 text-center text-white shadow-card sm:p-8">
          <div
            className="absolute inset-0 bg-grid opacity-20"
            aria-hidden
          />
          <div
            className="absolute -end-16 -top-16 size-40 rounded-full bg-brand/25 blur-3xl"
            aria-hidden
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-1.5 text-xs font-extrabold text-navy-dark">
              <Icon name="qr" size={16} strokeWidth={2.5} />
              الدفع عبر {shamCash.label}
            </span>

            <div className="mx-auto mt-5 w-fit rounded-3xl bg-white p-3 shadow-glow">
              <Image
                src={shamCash.qr}
                alt={`رمز QR لحساب ${shamCash.label} الخاص بـ ${shamCash.accountName}`}
                width={220}
                height={220}
                className="h-44 w-44 rounded-2xl sm:h-52 sm:w-52"
              />
            </div>

            <p className="mt-5 text-sm text-white/80">{shamCash.hint}</p>

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-2.5">
                <dt className="text-white/70">اسم الحساب</dt>
                <dd className="font-bold">{shamCash.accountName}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-2.5">
                <dt className="text-white/70">رقم الحساب</dt>
                <dd className="font-bold" dir="ltr">
                  {shamCash.accountNumber}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
