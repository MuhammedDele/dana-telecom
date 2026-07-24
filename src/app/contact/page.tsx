import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { Icon, type IconKey } from "@/components/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "تواصل مع دانا تيليكوم للاشتراك في خدمات الإنترنت أو كاميرات المراقبة، أو لأي استفسار.",
};

const cards: {
  icon: IconKey;
  title: string;
  value: string;
  href?: string;
  ltr?: boolean;
}[] = [
  {
    icon: "phone",
    title: "الهاتف",
    value: site.contact.phone,
    href: site.contact.phoneHref,
    ltr: true,
  },
  {
    icon: "chat",
    title: "واتساب",
    value: "راسلنا مباشرة",
    href: `https://wa.me/${site.contact.whatsapp}`,
  },
  {
    icon: "mail",
    title: "البريد الإلكتروني",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    ltr: true,
  },
  {
    icon: "location",
    title: "العنوان",
    value: site.contact.address,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb="تواصل معنا"
        title="تواصل معنا"
        subtitle="نحن هنا لمساعدتك. تواصل معنا للاشتراك أو الاستفسار وسنعاود التواصل معك في أقرب وقت."
      />

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          {/* معلومات التواصل */}
          <div>
            <h2 className="text-2xl font-extrabold text-navy">
              معلومات التواصل
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              يسعدنا استقبال طلباتك واستفساراتك عبر أي وسيلة تناسبك.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cards.map((c) => {
                const inner = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-soft text-navy">
                      <Icon name={c.icon} size={22} />
                    </span>
                    <span>
                      <span className="block text-xs font-bold text-muted">
                        {c.title}
                      </span>
                      <span
                        className="block font-bold text-navy"
                        dir={c.ltr ? "ltr" : undefined}
                      >
                        {c.value}
                      </span>
                    </span>
                  </>
                );
                return c.href ? (
                  <a
                    key={c.title}
                    href={c.href}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft transition-colors hover:border-navy"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={c.title}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft"
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl bg-surface p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-navy">
                <Icon name="clock" size={18} className="text-navy-light" />
                ساعات العمل
              </p>
              <p className="mt-1 text-sm text-muted">{site.contact.hours}</p>
              <p className="mt-4 flex items-center gap-2 text-sm font-bold text-navy">
                <Icon name="wallet" size={18} className="text-navy-light" />
                وسائل الدفع
              </p>
              <p className="mt-1 text-sm text-muted">
                {site.currencies.join(" — ")}
              </p>
              <Link
                href="/packages#payments"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-navy-light"
              >
                <Icon name="qr" size={16} />
                ادفع عبر شام كاش (رمز QR)
                <Icon name="arrow" size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* النموذج */}
          <div>
            <h2 className="text-2xl font-extrabold text-navy">أرسل طلبك</h2>
            <p className="mt-3 leading-relaxed text-muted">
              املأ النموذج التالي وسيصل طلبك إلينا مباشرة عبر واتساب.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
