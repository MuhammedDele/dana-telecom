"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "./icons";
import { site } from "@/lib/site";

type Msg = { role: "user" | "model"; text: string };

const SUGGESTIONS = [
  "ما هي الباقات المتوفرة؟",
  "هل منطقتي مغطّاة؟",
  "كيف أشترك؟",
  "كاميرات المراقبة",
];

const GREETING =
  "أهلًا بك في دانا تيليكوم 👋\nكيف أقدر أساعدك؟ اسألني عن الباقات، التغطية، كاميرات المراقبة، أو طريقة الاشتراك.";

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
        aria-label={open ? "إغلاق المساعد" : "افتح مساعد دانا تيليكوم"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-navy text-brand shadow-card transition-transform hover:-translate-y-1 focus-visible:outline-none"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <>
            <Icon name="bot" size={27} strokeWidth={1.9} />
            <span className="absolute -top-0.5 -end-0.5 flex size-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex size-3.5 rounded-full bg-brand" />
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
                <span className="grid size-10 place-items-center rounded-xl bg-brand text-navy-dark">
                  <Icon name="bot" size={21} strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-extrabold">مساعد دانا تيليكوم</p>
                  <p className="flex items-center gap-1.5 text-[11px] text-white/70">
                    <span className="size-1.5 rounded-full bg-green-400" />
                    يجيب عن أسئلة خدماتنا
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
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-navy text-white"
                        : "border border-line bg-white text-ink"
                    }`}
                  >
                    {m.text}
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
              مساعد آلي — للحالات الخاصة تواصل معنا على{" "}
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
