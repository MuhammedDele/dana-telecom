"use client";

import { useState } from "react";
import { site, services } from "@/lib/site";
import { Icon } from "./icons";

const field =
  "mt-1 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy outline-none transition-colors focus:border-navy";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const area = String(data.get("area") || "");
    const service = String(data.get("service") || "");
    const message = String(data.get("message") || "");

    // نرسل الطلب عبر واتساب (لا يحتاج خادمًا خلفيًا)
    const text = encodeURIComponent(
      `طلب جديد عبر الموقع:\n` +
        `الاسم: ${name}\n` +
        `الهاتف: ${phone}\n` +
        `المنطقة: ${area}\n` +
        `الخدمة: ${service}\n` +
        `الرسالة: ${message}`,
    );
    window.open(`https://wa.me/${site.contact.whatsapp}?text=${text}`, "_blank");
    setSent(true);
    form.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-white p-7 shadow-soft"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-bold text-navy">
          الاسم الكامل
          <input name="name" required className={field} placeholder="اسمك" />
        </label>
        <label className="block text-sm font-bold text-navy">
          رقم الهاتف
          <input
            name="phone"
            required
            inputMode="tel"
            className={field}
            placeholder="09xxxxxxxx"
            dir="ltr"
          />
        </label>
        <label className="block text-sm font-bold text-navy">
          المنطقة
          <select name="area" className={field} defaultValue="">
            <option value="" disabled>
              اختر المنطقة
            </option>
            {site.areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
            <option value="منطقة أخرى">منطقة أخرى</option>
          </select>
        </label>
        <label className="block text-sm font-bold text-navy">
          الخدمة المطلوبة
          <select name="service" className={field} defaultValue="">
            <option value="" disabled>
              اختر الخدمة
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="استفسار عام">استفسار عام</option>
          </select>
        </label>
      </div>

      <label className="mt-4 block text-sm font-bold text-navy">
        رسالتك
        <textarea
          name="message"
          rows={4}
          className={field}
          placeholder="اكتب تفاصيل طلبك أو استفسارك..."
        />
      </label>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-extrabold text-navy-dark transition-all hover:bg-brand-dark hover:-translate-y-0.5"
      >
        إرسال الطلب عبر واتساب
      </button>

      {sent && (
        <p
          role="alert"
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-center text-sm font-bold text-green-700"
        >
          <Icon name="check" size={18} strokeWidth={3} className="shrink-0" />
          تم تجهيز طلبك، أكمل الإرسال من نافذة واتساب. سنعاود التواصل معك قريبًا.
        </p>
      )}
    </form>
  );
}
