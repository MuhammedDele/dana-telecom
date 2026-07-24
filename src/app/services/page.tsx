import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, PageHero } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";
import { Icon } from "@/components/icons";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "خدماتنا",
  description:
    "خدمات الإنترنت اللاسلكي، الربط عبر NanoBeam، وكاميرات المراقبة من دانا تيليكوم.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb="خدماتنا"
        title="خدماتنا"
        subtitle="حلول اتصال ومراقبة متكاملة مصمّمة لتناسب المنازل والشركات والمؤسسات."
      />

      <section className="py-20">
        <Stagger className="mx-auto max-w-6xl space-y-8 px-4">
          {services.map((s, i) => (
            <StaggerItem
              key={s.slug}
              id={s.slug}
              className="grid items-center gap-8 rounded-3xl border border-line bg-white p-7 shadow-soft transition-shadow hover:shadow-card md:grid-cols-[auto_1fr] md:p-10"
            >
              <div
                className={`grid h-24 w-24 place-items-center rounded-3xl text-navy ${
                  i % 2 === 0 ? "bg-navy-soft" : "bg-brand-soft"
                }`}
              >
                <Icon name={s.icon} size={44} strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-navy">{s.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{s.short}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-sm text-navy"
                    >
                      <Icon name="check" size={16} strokeWidth={3} className="mt-1 shrink-0 text-brand-dark" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/contact">اطلب الخدمة</Button>
                  {s.slug === "cameras" && (
                    <Button href="/cameras" variant="outline">
                      تفاصيل كاميرات المراقبة
                    </Button>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="relative overflow-hidden py-20">
        <Image
          src="/images/network.jpg"
          alt="فني يعمل على تجهيزات الشبكة"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-l from-navy-dark via-navy/95 to-navy/85"
          aria-hidden
        />
        <Container className="relative flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-start">
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              غير متأكد أي خدمة تناسبك؟
            </h2>
            <p className="mt-2 text-white/80">
              تواصل معنا وسنساعدك في اختيار الحل الأمثل لموقعك.
            </p>
          </div>
          <Button href="/contact">تواصل معنا</Button>
        </Container>
      </section>
    </>
  );
}
