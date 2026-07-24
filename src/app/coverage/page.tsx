import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, PageHero, SectionHeading } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { CoverageExplorer } from "@/components/CoverageExplorer";
import { Icon } from "@/components/icons";
import { coverage } from "@/lib/site";

export const metadata: Metadata = {
  title: "مناطق التغطية",
  description:
    "خريطة تفاعلية لتغطية دانا تيليكوم: واي فاي 80٪ في مدينة الدانا و50٪ في خان العسل، وتغطية NanoBeam كاملة.",
};

export default function CoveragePage() {
  return (
    <>
      <PageHero
        breadcrumb="مناطق التغطية"
        title="مناطق التغطية"
        subtitle="تصفّح الخريطة التفاعلية لمعرفة تغطيتنا في مدينة الدانا وخان العسل."
      />

      {/* الخريطة التفاعلية */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="خريطة تفاعلية"
            title="أين تصل شبكتنا؟"
            subtitle="اختر المدينة، وتنقّل داخل الخريطة لمشاهدة نقاط تغطية الواي فاي ونطاق NanoBeam."
          />
          <div className="mt-10">
            <CoverageExplorer />
          </div>
        </Container>
      </section>

      {/* بطاقات المناطق */}
      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="نطاق الخدمة"
            title="المناطق التي نخدمها"
          />
          <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
            {coverage.map((c) => (
              <StaggerItem
                key={c.name}
                className="group rounded-3xl border border-line bg-white p-8 shadow-soft transition-all hover:-translate-y-2 hover:shadow-card"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-navy text-brand transition-transform group-hover:scale-110">
                    <Icon name="location" size={26} />
                  </span>
                  {c.percent !== null ? (
                    <span className="rounded-full bg-brand-soft px-3 py-1 text-sm font-black text-navy-dark">
                      {c.percent}٪
                    </span>
                  ) : (
                    <span className="rounded-full bg-navy-soft px-3 py-1 text-xs font-bold text-navy">
                      NanoBeam
                    </span>
                  )}
                </div>
                <h2 className="mt-5 text-xl font-extrabold text-navy">{c.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {c.detail}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* لافتة الصورة */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="relative aspect-21/9 overflow-hidden rounded-3xl shadow-card">
            <Image
              src="/images/tower.jpg"
              alt="برج بث لاسلكي يوفّر التغطية لمنطقة الخدمة"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/70 to-transparent"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <h2 className="text-xl font-extrabold sm:text-3xl">
                شبكة نقاط منتشرة تصل إليك
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/80 sm:text-base">
                نقاط بث موزّعة في مدينة الدانا وخان العسل، مدعومة بحلول ربط
                لاسلكية بعيدة المدى للمناطق النائية.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* دعوة */}
      <section className="bg-surface py-16 sm:py-20">
        <Container className="text-center">
          <SectionHeading
            title="لم تجد منطقتك؟"
            subtitle="حتى لو كنت خارج نقاط التغطية المباشرة، قد نتمكن من ربطك لاسلكيًا عبر NanoBeam. تواصل معنا للتأكد."
          />
          <div className="mt-8">
            <Button href="/contact">تحقّق من توفّر الخدمة</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
