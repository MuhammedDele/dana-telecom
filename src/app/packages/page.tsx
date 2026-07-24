import type { Metadata } from "next";
import { Button, Container, PageHero, SectionHeading } from "@/components/ui";
import { PackageTabs } from "@/components/PackageTabs";
import { Payments } from "@/components/Payments";
import { Icon } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "الباقات والأسعار",
  description:
    "ثلاثة أنواع من الباقات: سرعة ثابتة تبدأ من 6$، أو الدفع حسب الاستهلاك آخر الشهر، أو بطاقات بحزم بيانات.",
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        breadcrumb="الباقات والأسعار"
        title="الباقات والأسعار"
        subtitle="ثلاثة أنواع من الباقات لتناسب كل احتياج — اختر ما يناسبك وتواصل معنا للاشتراك."
      />

      {/* أنواع الباقات */}
      <section className="py-16 sm:py-20">
        <Container>
          <PackageTabs />
        </Container>
      </section>

      {/* وسائل الدفع */}
      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <div id="payments" className="scroll-mt-24">
            <SectionHeading
              eyebrow="وسائل الدفع"
              title="ادفع بالطريقة الأسهل لك"
              subtitle="نقبل الدفع نقدًا بالليرة السورية أو الدولار الأمريكي، أو إلكترونيًا عبر شام كاش بمسح رمز QR."
            />
            <div className="mt-10">
              <Payments />
            </div>
          </div>
        </Container>
      </section>

      {/* ملاحظة + تواصل */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-3xl border border-dashed border-line bg-surface p-6 text-center sm:p-8">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-soft text-navy">
              <Icon name="tip" size={24} />
            </span>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              الأسعار النهائية تُحدّد حسب نوع الباقة والموقع ومتطلبات التركيب.
              للحصول على عرض دقيق يناسب حالتك، تواصل مع فريقنا مباشرة.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={site.contact.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <Icon name="phone" size={16} />
                {site.contact.phone}
              </a>
              <Button href="/contact" variant="outline">
                نموذج التواصل
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
