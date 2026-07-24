"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site";

type Msg = { role: "user" | "model"; text: string };

/* ---------- عرض تنسيق بسيط بأمان ----------
   النموذج قد يرد بماركداون (**عريض** أو قوائم بشرطة). نعرضها كعناصر React
   حقيقية بدل طباعة الرموز كما هي. لا نستخدم dangerouslySetInnerHTML إطلاقًا،
   فلا يمكن لأي نص قادم من النموذج أن يحقن HTML. */

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*\n]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.length > 4 && p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-extrabold text-navy">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function RichText({ text }: { text: string }) {
  const clean = text
    .replace(/```[\s\S]*?```/g, "") // كتل الكود
    .replace(/`([^`]+)`/g, "$1") // باك-تيك
    .replace(/^#{1,6}\s*/gm, "") // عناوين ماركداون
    .replace(/^\s*[-*_]{3,}\s*$/gm, ""); // خطوط فاصلة

  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flush = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`u${blocks.length}`} className="my-1.5 list-disc space-y-1 ps-5">
        {bullets.map((b, i) => (
          <li key={i}>
            <Inline text={b} />
          </li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  for (const raw of clean.split("\n")) {
    const line = raw.trimEnd();
    const m = line.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)$/);
    if (m) {
      bullets.push(m[1]);
      continue;
    }
    flush();
    if (!line.trim()) continue;
    blocks.push(
      <p key={`p${blocks.length}`} className="my-0.5">
        <Inline text={line} />
      </p>,
    );
  }
  flush();

  return <>{blocks}</>;
}

const SUGGESTIONS = [
  "ما هي الباقات المتوفرة؟",
  "هل منطقتي مغطّاة؟",
  "كيف أشترك؟",
  "كاميرات المراقبة",
];

const GREETING =
  "أهلًا بك، أنا مروان من دانا تيليكوم.\nكيف أقدر أساعدك؟ اسألني عن الباقات، التغطية، كاميرات المراقبة، أو طريقة الاشتراك.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "model", text: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // مرّر لأسفل عند وصول رسالة
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [msgs, busy, open]);

  // إغلاق بمفتاح Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setErr("");
    setInput("");
    const history = msgs.filter((m, i) => !(i === 0 && m.role === "model"));
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, history }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data?.error || "تعذّر الحصول على رد.");
        if (process.env.NODE_ENV !== "production" && data?.reason) {
          console.warn("[chat] سبب الخطأ:", data.reason);
        }
      } else {
        setMsgs((m) => [...m, { role: "model", text: data.reply }]);
      }
    } catch {
      setErr("تعذّر الاتصال. تحقّق من اتصالك بالإنترنت.");
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      {/* زر فتح المحادثة */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "إغلاق المحادثة" : "تحدّث مع مروان — مساعد آلي"}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-50 flex items-center rounded-full bg-navy text-white shadow-card transition-transform hover:-translate-y-1 focus-visible:outline-none ${
          open ? "size-14 justify-center" : "gap-2.5 p-1.5 pe-4 sm:pe-5"
        }`}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <>
            <span className="relative">
              <Image
                src="/marwan.jpg"
                alt=""
                width={256}
                height={256}
                className="size-11 rounded-full object-cover ring-2 ring-brand"
              />
              <span className="absolute -bottom-0.5 -end-0.5 flex size-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-3.5 rounded-full border-2 border-navy bg-green-400" />
              </span>
            </span>
            <span className="text-start leading-tight">
              <span className="block text-sm font-extrabold">تحدّث مع مروان</span>
              <span className="block text-[10px] text-white/60">مساعد آلي</span>
            </span>
          </>
        )}
      </button>

      {/* نافذة المحادثة */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="مساعد دانا تيليكوم"
            className="fixed inset-x-3 bottom-24 z-50 flex max-h-[70dvh] flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card sm:inset-x-auto sm:right-5 sm:max-h-[560px] sm:w-[380px]"
          >
            {/* الترويسة */}
            <div className="relative overflow-hidden bg-navy-gradient px-5 py-4 text-white">
              <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
              <div className="relative flex items-center gap-3">
                <span className="relative shrink-0">
                  <Image
                    src="/marwan.jpg"
                    alt="مروان"
                    width={256}
                    height={256}
                    className="size-11 rounded-full object-cover ring-2 ring-brand"
                  />
                  <span className="absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-navy bg-green-400" />
                </span>
                <div>
                  <p className="text-sm font-extrabold">مروان</p>
                  <p className="text-[11px] text-white/70">
                    مساعد آلي من دانا تيليكوم
                  </p>
                </div>
              </div>
            </div>

            {/* الرسائل */}
            <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto bg-surface p-4">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "whitespace-pre-wrap bg-navy text-white"
                        : "border border-line bg-white text-ink"
                    }`}
                  >
                    {m.role === "user" ? m.text : <RichText text={m.text} />}
                  </div>
                </div>
              ))}

              {busy && (
                <div className="flex justify-end">
                  <div className="flex items-center gap-1.5 rounded-2xl border border-line bg-white px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 animate-bounce rounded-full bg-navy/50"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {err && (
                <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-center text-xs font-bold text-red-700">
                  {err}
                </p>
              )}

              {/* اقتراحات سريعة */}
              {msgs.length === 1 && !busy && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-navy/20 bg-white px-3 py-1.5 text-xs font-bold text-navy transition-colors hover:bg-navy hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* الإدخال */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-line bg-white p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب سؤالك…"
                maxLength={600}
                disabled={busy}
                className="min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-navy disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="إرسال"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-navy-dark transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 12 4 4l3 8-3 8z" />
                </svg>
              </button>
            </form>

            <p className="border-t border-line bg-white px-4 pb-3 pt-2 text-center text-[10.5px] leading-relaxed text-muted">
              مروان مساعد آلي وليس موظفًا — للحالات الخاصة تواصل معنا على{" "}
              <a href={site.contact.phoneHref} className="font-bold text-navy" dir="ltr">
                {site.contact.phone}
              </a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
