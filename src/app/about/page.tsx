import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, PageHero, SectionHeading } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Icon, type IconKey } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "من نحن",
  description: `تعرّف على ${site.name}، مزوّد خدمة الإنترنت في مدينة الدانا وخان العسل.`,
};

const values = [
  { icon: "target" as IconKey, title: "رسالتنا", text: "توصيل إنترنت مستقر وموثوق لكل منزل وشركة في نطاق خدمتنا، وتقريب التقنية من الناس." },
  { icon: "vision" as IconKey, title: "رؤيتنا", text: "أن نكون المزوّد الأول والأكثر ثقة للاتصال وحلول المراقبة في مدينة الدانا وما حولها." },
  { icon: "values" as IconKey, title: "قيمنا", text: "الصدق مع العميل، جودة التركيب، والدعم المستمر بعد البيع." },
];

const highlights = [
  "شبكة نقاط تغطية منتشرة في مدينة الدانا وخان العسل",
  "حلول ربط لاسلكية بعيدة المدى عبر NanoBeam",
  "بيع وتركيب كاميرات مراقبة Hikvision",
  "فريق فني محلي ودعم مستمر",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="من نحن"
        title="من نحن"
        subtitle="مزوّد خدمة إنترنت محلي يخدم مجتمعه بحلول اتصال ومراقبة موثوقة."
      />

      <section className="py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="نبذة عنا"
              title="دانا تيليكوم"
              align="start"
            />
            <div className="mt-6 space-y-4 text-base leading-loose text-muted">
              <p>{site.description}</p>
              <p>
                نوفّر خدمات الإنترنت اللاسلكي (Wi-Fi) من خلال نقاطنا المنتشرة في
                مدينة الدانا وخان العسل، بالإضافة إلى خدمات الربط باستخدام صحون
                ونواشر <span className="font-bold text-navy">NanoBeam</span>{" "}
                للمناطق التي تتطلب تغطية لاسلكية بعيدة المدى. كما نقدّم حلول تركيب
                وتشغيل كاميرات المراقبة من{" "}
                <span className="font-bold text-navy">Hikvision</span>.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/services">استعرض خدماتنا</Button>
            </div>
          </div>

          <div className="space-y-6">
            <Reveal className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-card">
              <Image
                src="/images/technician.jpg"
                alt="فني شبكات يعمل على توصيل كابلات لوحة التوزيع"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"
                aria-hidden
              />
            </Reveal>

            <Stagger className="space-y-4">
              {highlights.map((h) => (
              <StaggerItem
                key={h}
                className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all hover:border-navy/30 hover:shadow-card"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-navy-dark">
                  <Icon name="check" size={18} strokeWidth={3} />
                </span>
                  <span className="font-bold text-navy">{h}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.title} className="rounded-3xl bg-white p-8 shadow-soft transition-transform hover:-translate-y-2">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-soft text-navy">
                  <Icon name={v.icon} size={26} />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-navy">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {v.text}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
