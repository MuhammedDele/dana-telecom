import Link from "next/link";
import { navLinks, services, site } from "@/lib/site";
import { Icon } from "./icons";
import { Logo } from "./ui";

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy-gradient text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* الهوية */}
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {site.description}
          </p>
        </div>

        {/* روابط سريعة */}
        <div>
          <h3 className="text-sm font-extrabold text-brand">روابط سريعة</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {navLinks.slice(0, 5).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* الخدمات */}
        <div>
          <h3 className="text-sm font-extrabold text-brand">خدماتنا</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href="/services" className="hover:text-brand">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* التواصل */}
        <div>
          <h3 className="text-sm font-extrabold text-brand">تواصل معنا</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2.5">
              <Icon name="location" size={18} className="mt-0.5 shrink-0 text-brand" />
              <span>{site.contact.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="phone" size={18} className="shrink-0 text-brand" />
              <a href={site.contact.phoneHref} className="hover:text-brand" dir="ltr">
                {site.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="mail" size={18} className="shrink-0 text-brand" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-brand" dir="ltr">
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="clock" size={18} className="shrink-0 text-brand" />
              <span>{site.contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. جميع الحقوق محفوظة.
          </p>
          <p>مزوّد خدمة إنترنت — مدينة الدانا وخان العسل</p>
        </div>
      </div>
    </footer>
  );
}
