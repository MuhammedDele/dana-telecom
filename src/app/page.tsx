import Image from "next/image";
import Link from "next/link";
import { Button, Container, SectionHeading } from "@/components/ui";
import { AuroraBg, Marquee } from "@/components/decor";
import { Bento } from "@/components/Bento";
import { Testimonials } from "@/components/Testimonials";
import { Icon, type IconKey } from "@/components/icons";
import { Reveal, Stagger, StaggerItem, Counter, Magnetic, TiltCard } from "@/components/motion";
import { services, packageTypes, coverage, faqs, site } from "@/lib/site";

const stats = [
  { to: 2, suffix: "", label: "مناطق تغطية" },
  { to: 3, suffix: "", label: "خدمات أساسية" },
  { to: 100, suffix: "٪", label: "التزام بالجودة" },
  { text: "٢٤/٧", label: "دعم ومتابعة" },
];

const whyUs: { icon: IconKey; title: string; text: string }[] = [
  { icon: "speed", title: "سرعة وثبات", text: "اتصال مستقر وسرعات مناسبة تناسب المنازل والأعمال دون انقطاع." },
  { icon: "shield", title: "موثوقية عالية", text: "بنية شبكة مدروسة ونقاط تغطية منتشرة لضمان استمرار الخدمة." },
  { icon: "support", title: "دعم فني قريب", text: "فريق محلي في مدينة الدانا يتابع التركيب وأي مشكلة بسرعة." },
  { icon: "coverage", title: "تغطية بعيدة المدى", text: "حلول NanoBeam للوصول إلى المزارع والمنشآت البعيدة لاسلكيًا." },
];

const marqueeItems: { icon: IconKey; label: string }[] = [
  { icon: "wifi", label: "إنترنت لاسلكي مستقر" },
  { icon: "nanobeam", label: "ربط NanoBeam بعيد المدى" },
  { icon: "cameras", label: "كاميرات Hikvision" },
  { icon: "location", label: "الدانا وخان العسل" },
  { icon: "support", label: "دعم فني محلي" },
  { icon: "speed", label: "سرعات مناسبة" },
];

const heroTrust = ["تركيب احترافي", "دعم فني محلي", "تغطية بعيدة المدى"];

const serviceImages: Record<string, string> = {
  wifi: "/images/home.jpg",
  nanobeam: "/images/dish.jpg",
  cameras: "/images/cctv.jpg",
};

const steps: { icon: IconKey; n: string; title: string; text: string }[] = [
  { icon: "chat", n: "١", title: "تواصل معنا", text: "اتصل بنا أو راسلنا على واتساب وأخبرنا بموقعك واحتياجك." },
  { icon: "location", n: "٢", title: "معاينة وتحديد الحل", text: "نتحقق من التغطية في موقعك ونقترح الحل الأنسب لك." },
  { icon: "support", n: "٣", title: "التركيب والتشغيل", text: "فريقنا يركّب التجهيزات ويشغّل الخدمة، مع دعم مستمر بعدها." },
];

export default function Home() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <AuroraBg />
        <Container className="relative grid items-center gap-10 pb-16 pt-28 sm:pb-24 sm:pt-32 lg:grid-cols-2 lg:gap-12">
          {/* نص */}
          <div className="text-center lg:text-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-brand backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                مزوّد خدمة إنترنت في مدينة الدانا
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-5 text-3xl font-extrabold leading-[1.2] text-white sm:mt-6 sm:text-5xl lg:text-6xl">
                إنترنت <span className="text-shimmer">لا ينقطع</span>
                <br />
                وخدمات <span className="text-gradient">مراقبة موثوقة</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:mt-6 sm:text-lg lg:mx-0">
                {site.description}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                <Magnetic>
                  <Button href="/contact" className="w-full sm:w-auto">
                    اشترك الآن
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button href="/services" variant="ghost" className="w-full sm:w-auto">
                    تعرّف على خدماتنا
                  </Button>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-white/70 lg:justify-start">
                {heroTrust.map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <Icon name="check" size={16} strokeWidth={3} className="text-brand" />
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* الصورة الرئيسية — تظهر على الجوال أيضًا */}
          <Reveal delay={0.2}>
            <TiltCard className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] shadow-card sm:aspect-4/3 lg:aspect-4/5">
                <Image
                  src="/images/tower.jpg"
                  alt="برج اتصالات لاسلكي من تجهيزات دانا تيليكوم"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/30 to-transparent" aria-hidden />

                {/* بطاقة زجاجية فوق الصورة */}
                <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 rounded-2xl glass p-3 sm:inset-x-5 sm:bottom-5 sm:gap-3 sm:p-4">
                  {services.map((s) => (
                    <div key={s.slug} className="rounded-xl bg-white/95 p-2.5 text-center sm:p-3">
                      <span className="mx-auto grid size-8 place-items-center rounded-lg bg-navy-soft text-navy sm:size-10">
                        <Icon name={s.icon} size={18} />
                      </span>
                      <p className="mt-1.5 text-[10px] font-bold leading-tight text-navy sm:text-xs">
                        {s.title.split("(")[0].trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-floaty absolute -start-3 -top-3 grid size-14 place-items-center rounded-2xl bg-brand text-navy-dark shadow-glow sm:-start-5 sm:-top-5 sm:size-16">
                <Icon name="tower" size={28} strokeWidth={2} />
              </div>
            </TiltCard>
          </Reveal>
        </Container>

        {/* Marquee */}
        <div className="relative border-y border-white/10 bg-navy-dark/40 py-4 text-sm font-bold text-white/80 backdrop-blur">
          <Marquee
            gapClass="gap-8"
            items={marqueeItems.map((m) => (
              <span key={m.label} className="flex items-center gap-2 whitespace-nowrap">
                <Icon name={m.icon} size={18} className="text-brand" />
                {m.label}
              </span>
            ))}
          />
        </div>
      </section>

      {/* ===== الإحصائيات ===== */}
      <section className="bg-navy-gradient py-12 sm:py-14">
        <Container>
          <Stagger className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {stats.map((s) => (
              <StaggerItem key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-brand sm:text-5xl">
                  {"text" in s ? s.text : <Counter to={s.to!} suffix={s.suffix} />}
                </div>
                <p className="mt-2 text-xs text-white/70 sm:text-sm">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ===== Bento ===== */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="لماذا دانا تيليكوم"
            title="شبكة مبنية لتصمد"
            subtitle="من قلب مدينة الدانا إلى أبعد مزرعة — بنية اتصال تعتمد عليها كل يوم."
          />
          <div className="mt-10 sm:mt-14">
            <Bento />
          </div>
        </Container>
      </section>

      {/* ===== الخدمات ===== */}
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="خدماتنا"
            title="حلول اتصال ومراقبة متكاملة"
            subtitle="كل ما تحتاجه من إنترنت مستقر وربط لاسلكي وأنظمة مراقبة، من مزوّد واحد تثق به."
          />
          <Stagger className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.slug}>
                <article className="group h-full overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-card">
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={serviceImages[s.slug]}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" aria-hidden />
                    <span className="absolute bottom-4 start-4 grid size-12 place-items-center rounded-2xl bg-brand text-navy-dark shadow-glow">
                      <Icon name={s.icon} size={24} strokeWidth={2} />
                    </span>
                  </div>
                  <div className="p-6 sm:p-7">
                    <h3 className="text-lg font-extrabold text-navy">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{s.short}</p>
                    <Link
                      href={s.slug === "cameras" ? "/cameras" : "/services"}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy transition-colors hover:text-navy-light"
                    >
                      اكتشف المزيد
                      <Icon name="arrow" size={16} strokeWidth={2.5} />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ===== كيف نعمل ===== */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="كيف نبدأ"
            title="ثلاث خطوات ويصلك الإنترنت"
            subtitle="عملية بسيطة وواضحة من أول اتصال حتى تشغيل الخدمة."
          />
          <Stagger className="relative mt-10 grid gap-6 sm:mt-14 md:grid-cols-3">
            {steps.map((s) => (
              <StaggerItem key={s.n}>
                <div className="group relative h-full rounded-3xl border border-line bg-white p-7 shadow-soft transition-all hover:-translate-y-2 hover:shadow-card">
                  <span className="absolute -top-4 end-7 grid size-9 place-items-center rounded-full bg-brand text-sm font-black text-navy-dark shadow-glow">
                    {s.n}
                  </span>
                  <span className="grid size-14 place-items-center rounded-2xl bg-navy-soft text-navy transition-colors group-hover:bg-navy group-hover:text-brand">
                    <Icon name={s.icon} size={26} />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ===== لماذا نحن ===== */}
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="مزايانا"
            title="ثقة، استقرار، وسرعة"
            subtitle="نبني علاقتنا مع عملائنا على جودة الخدمة والدعم المستمر."
          />
          <Stagger className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w) => (
              <StaggerItem key={w.title}>
                <div className="group h-full rounded-3xl bg-white p-7 text-center shadow-soft transition-transform duration-300 hover:-translate-y-2">
                  <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-soft text-navy transition-colors duration-300 group-hover:bg-brand">
                    <Icon name={w.icon} size={28} />
                  </div>
                  <h3 className="mt-5 text-base font-extrabold text-navy">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{w.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ===== مناطق التغطية ===== */}
      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="أين نخدمكم"
              title="مناطق التغطية"
              subtitle="نصل إليك أينما كنت داخل نطاق خدمتنا، وللمناطق البعيدة لدينا حلول لاسلكية خاصة."
              align="start"
            />
            <Stagger className="mt-8 space-y-4">
              {coverage.map((c) => (
                <StaggerItem key={c.name}>
                  <div className="group flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all hover:border-navy/30 hover:shadow-card">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy text-brand transition-transform group-hover:scale-110">
                      <Icon name="location" size={22} />
                    </span>
                    <div>
                      <h3 className="font-extrabold text-navy">{c.name}</h3>
                      <p className="mt-1 text-sm text-muted">{c.detail}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-8">
              <Button href="/coverage" variant="outline">
                تفاصيل التغطية
              </Button>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] p-7 text-white shadow-card sm:p-8">
              <Image
                src="/images/dish.jpg"
                alt="صحن لاسلكي للربط بعيد المدى"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/90 to-navy/70" aria-hidden />
              <div className="relative">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand text-navy-dark">
                  <Icon name="nanobeam" size={28} strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-xl font-extrabold sm:text-2xl">
                  منطقتك بعيدة عن نقاط التغطية؟
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                  عبر تركيب صحون ونواشر{" "}
                  <span className="font-bold text-brand">NanoBeam</span>، نربط
                  المنازل والمزارع والمنشآت البعيدة لاسلكيًا، حتى في الأماكن التي
                  لا تصلها التغطية المباشرة.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    "تركيب احترافي للصحون والنواشر",
                    "ربط بعيد المدى للمناطق النائية",
                    "استشارة مجانية لتحديد الحل الأنسب",
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2.5">
                      <Icon name="check" size={16} strokeWidth={3} className="shrink-0 text-brand" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href="/contact">اطلب استشارة</Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== الباقات ===== */}
      <section className="bg-surface py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="الباقات والأسعار"
            title="ثلاثة أنواع من الباقات"
            subtitle="سرعة ثابتة، أو دفع حسب الاستهلاك آخر الشهر، أو بطاقات بحزم بيانات — اختر ما يناسبك."
          />
          <Stagger className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-3">
            {packageTypes.map((t, i) => (
              <StaggerItem key={t.key}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 shadow-soft transition-transform duration-300 hover:-translate-y-2 sm:p-8 ${
                    i === 1
                      ? "border-brand bg-navy text-white shadow-card"
                      : "border-line bg-white"
                  }`}
                >
                  {i === 1 && (
                    <div
                      className="absolute -end-16 -top-16 size-40 rounded-full bg-brand/20 blur-3xl"
                      aria-hidden
                    />
                  )}
                  <span
                    className={`relative grid size-14 place-items-center rounded-2xl transition-colors ${
                      i === 1
                        ? "bg-brand text-navy-dark"
                        : "bg-navy-soft text-navy group-hover:bg-navy group-hover:text-brand"
                    }`}
                  >
                    <Icon name={t.icon} size={26} />
                  </span>

                  <h3
                    className={`relative mt-5 text-lg font-extrabold ${i === 1 ? "text-brand" : "text-navy"}`}
                  >
                    {t.title}
                  </h3>
                  <span
                    className={`relative mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${
                      i === 1
                        ? "bg-white/10 text-white"
                        : "bg-brand-soft text-navy-dark"
                    }`}
                  >
                    <Icon name="sparkle" size={12} strokeWidth={2.5} />
                    {t.tagline}
                  </span>

                  <p
                    className={`relative mt-4 flex-1 text-sm leading-relaxed ${i === 1 ? "text-white/75" : "text-muted"}`}
                  >
                    {t.description}
                  </p>

                  <div className="relative mt-7">
                    <Button
                      href="/packages"
                      variant={i === 1 ? "primary" : "outline"}
                      className="w-full"
                    >
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 text-center text-sm text-muted">
            الدفع بالليرة السورية (SYP) أو الدولار الأمريكي (USD) أو عبر شام كاش.
          </p>
        </Container>
      </section>

      {/* ===== آراء العملاء ===== */}
      <section className="overflow-hidden bg-surface pb-16 sm:pb-24">
        <Container>
          <SectionHeading
            eyebrow="آراء العملاء"
            title="ماذا يقول عملاؤنا"
            subtitle="ثقة أهل مدينة الدانا وخان العسل هي أهم ما نبنيه."
          />
        </Container>
        <div className="mt-10 sm:mt-14">
          <Testimonials />
        </div>
      </section>

      {/* ===== الأسئلة الشائعة ===== */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="الأسئلة الشائعة"
            title="إجابات سريعة"
            subtitle="أكثر ما يسألنا عنه عملاؤنا قبل الاشتراك."
          />
          <Stagger className="mx-auto mt-10 grid max-w-4xl gap-4 sm:mt-14 sm:grid-cols-2">
            {faqs.slice(0, 4).map((f) => (
              <StaggerItem
                key={f.q}
                className="rounded-2xl border border-line bg-white p-6 shadow-soft"
              >
                <h3 className="flex items-start gap-2.5 font-extrabold text-navy">
                  <Icon name="plus" size={18} strokeWidth={2.5} className="mt-0.5 shrink-0 text-brand-dark" />
                  {f.q}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 text-center">
            <Button href="/faq" variant="outline">
              كل الأسئلة الشائعة
            </Button>
          </div>
        </Container>
      </section>

      {/* ===== CTA ===== */}
      <section className="pb-16 sm:pb-24">
        <Container>
          <Reveal>
            <div className="shine relative overflow-hidden rounded-[2rem] bg-brand px-6 py-12 text-center shadow-glow sm:rounded-[2.5rem] sm:py-16">
              <div className="absolute inset-0 bg-grid opacity-[0.15]" aria-hidden />
              <h2 className="relative text-2xl font-extrabold text-navy-dark sm:text-4xl">
                جاهز للاتصال بإنترنت لا ينقطع؟
              </h2>
              <p className="relative mx-auto mt-3 max-w-xl text-sm text-navy/80 sm:text-base">
                تواصل مع فريق دانا تيليكوم اليوم، وسنساعدك في اختيار الحل الأنسب
                لموقعك واحتياجك.
              </p>
              <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Magnetic>
                  <a
                    href={site.contact.phoneHref}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 sm:w-auto"
                  >
                    <Icon name="phone" size={18} />
                    اتصل بنا
                  </a>
                </Magnetic>
                <Magnetic>
                  <Button href="/contact" variant="outline" className="w-full sm:w-auto">
                    نموذج التواصل
                  </Button>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
