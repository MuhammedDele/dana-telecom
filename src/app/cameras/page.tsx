import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, PageHero, SectionHeading } from "@/components/ui";
import { Stagger, StaggerItem } from "@/components/motion";
import { Icon, type IconKey } from "@/components/icons";

export const metadata: Metadata = {
  title: "كاميرات المراقبة",
  description:
    "بيع وتركيب كاميرات المراقبة من Hikvision للمنازل والمحلات والشركات مع المتابعة عن بُعد.",
};

const features = [
  { icon: "home" as IconKey, title: "للمنازل", text: "حماية منزلك ومراقبته من أي مكان عبر هاتفك." },
  { icon: "store" as IconKey, title: "للمحلات", text: "تأمين محلك التجاري ومتابعة العاملين والمخزون." },
  { icon: "business" as IconKey, title: "للشركات", text: "أنظمة مراقبة موسّعة للمنشآت والمكاتب والمستودعات." },
];

const steps = [
  { n: "١", title: "استشارة ومعاينة", text: "نحدد احتياجك وأفضل توزيع للكاميرات في موقعك." },
  { n: "٢", title: "التركيب والإعداد", text: "تركيب احترافي لكاميرات Hikvision وإعداد النظام بالكامل." },
  { n: "٣", title: "المتابعة عن بُعد", text: "ربط النظام بهاتفك لمشاهدة البث المباشر في أي وقت." },
];

export default function CamerasPage() {
  return (
    <>
      <PageHero
        breadcrumb="كاميرات المراقبة"
        title="كاميرات المراقبة"
        subtitle="حلول مراقبة احترافية من Hikvision — بيع، تركيب، وإعداد كامل مع المتابعة عن بُعد."
      />

      <section className="py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Hikvision"
              title="راقب ما يهمّك من أي مكان"
              align="start"
              subtitle="نوفّر كاميرات مراقبة عالية الجودة من Hikvision مع تركيب وإعداد كامل، وإمكانية المتابعة المباشرة عبر هاتفك."
            />
            <ul className="mt-6 space-y-3">
              {[
                "كاميرات داخلية وخارجية بجودة عالية",
                "رؤية ليلية وتسجيل مستمر",
                "تخزين ومراجعة اللقطات",
                "متابعة مباشرة عبر تطبيق الهاتف",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-navy">
                  <Icon name="check" size={16} strokeWidth={3} className="shrink-0 text-brand-dark" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contact">اطلب عرض سعر</Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-card">
              <Image
                src="/images/cctv.jpg"
                alt="مجموعة كاميرات مراقبة مثبّتة على عمود"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <Stagger className="grid gap-4 sm:grid-cols-3">
              {features.map((f) => (
              <StaggerItem
                key={f.title}
                className="rounded-3xl border border-line bg-white p-6 text-center shadow-soft transition-transform hover:-translate-y-2"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-navy">
                  <Icon name={f.icon} size={26} />
                </div>
                  <h3 className="mt-4 font-extrabold text-navy">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted">{f.text}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container>
          <SectionHeading
            eyebrow="كيف نعمل"
            title="خطوات بسيطة نحو الأمان"
          />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <StaggerItem key={s.n} className="rounded-3xl bg-white p-8 shadow-soft transition-transform hover:-translate-y-2">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-xl font-extrabold text-brand">
                  {s.n}
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-navy">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.text}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
