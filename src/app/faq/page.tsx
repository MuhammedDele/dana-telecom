"use client";

import { useState } from "react";
import { Container, PageHero, Button } from "@/components/ui";
import { Icon } from "@/components/icons";
import { faqs } from "@/lib/site";

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHero
        breadcrumb="الأسئلة الشائعة"
        title="الأسئلة الشائعة"
        subtitle="أجوبة سريعة لأكثر ما يسألنا عنه عملاؤنا. لم تجد إجابتك؟ تواصل معنا مباشرة."
      />

      <section className="py-20">
        <Container className="max-w-3xl">
          <div className="space-y-4">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-start"
                  >
                    <span className="font-extrabold text-navy">{f.q}</span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-soft text-navy transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-brand" : ""
                      }`}
                      aria-hidden
                    >
                      <Icon name="plus" size={18} strokeWidth={2.5} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 rounded-3xl bg-navy-gradient p-8 text-center text-white">
            <h2 className="text-xl font-extrabold">لديك سؤال آخر؟</h2>
            <p className="mt-2 text-white/80">
              فريقنا جاهز للإجابة عن كل استفساراتك ومساعدتك في الاشتراك.
            </p>
            <div className="mt-6">
              <Button href="/contact">تواصل معنا</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
