import { cacheLife } from "next/cache";
import { footerColumns, legalLinks, supportLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { SmartLink } from "@/components/ui/SmartLink";
import { Container } from "./Container";
import { NewsletterForm } from "./NewsletterForm";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const columnTitle = "font-serif text-[1.25rem] text-white";
const linkClass =
  "link-underline text-[0.9375rem] text-white/70 transition-colors hover:text-white";

function StoreBadge({
  href,
  icon,
  overline,
  label,
}: {
  href: string;
  icon: IconName;
  overline: string;
  label: string;
}) {
  return (
    <SmartLink
      href={href}
      className="flex items-center gap-3 border border-white/30 px-4 py-2.5 transition-colors duration-500 hover:border-white hover:bg-white hover:text-ink"
    >
      <Icon name={icon} className="size-6" />
      <span className="leading-tight">
        <span className="block text-[0.625rem] tracking-[0.14em] uppercase opacity-75">
          {overline}
        </span>
        <span className="block text-[0.9375rem] font-semibold">{label}</span>
      </span>
    </SmartLink>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-abyss text-white" data-theme-surface="dark">
      <Container className="pt-24 pb-10">
        <div className="flex justify-center">
          <Logo tone="light" className="w-56 md:w-72" />
        </div>

        <nav
          aria-label="Footer"
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-6"
        >
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className={columnTitle}>{column.title}</h2>
              <ul className="mt-6 flex flex-col gap-3.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <SmartLink href={link.href} external={link.external} className={linkClass}>
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <h2 className={columnTitle}>Support</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <SmartLink href={link.href} className={linkClass}>
                    {link.label}
                  </SmartLink>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.contact.hotlineHref}
                  className={`${linkClass} inline-flex gap-2`}
                >
                  <Icon name="phone" className="size-4.5" />
                  {siteConfig.contact.hotline}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className={`${linkClass} inline-flex gap-2`}
                >
                  <Icon name="mail" className="size-4.5" />
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex gap-4" aria-label="Somabay on social media">
              {siteConfig.social.map((item) => (
                <li key={item.href}>
                  <SmartLink
                    href={item.href}
                    className="grid size-9 place-items-center rounded-full border border-white/25 text-white/80 transition-colors duration-500 hover:border-white hover:bg-white hover:text-ink"
                    aria-label={item.label}
                  >
                    <Icon name={item.icon} className="size-4" />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="mt-20 grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-8 bg-abyss-soft p-8 md:p-10">
            <h2 className="font-serif text-h3">
              Download Now
              <br />
              Somabay App
            </h2>
            <div className="flex flex-wrap gap-3">
              <StoreBadge
                href={siteConfig.apps.android}
                icon="google-play"
                overline="Get it on"
                label="Google Play"
              />
              <StoreBadge
                href={siteConfig.apps.ios}
                icon="apple"
                overline="Download on the"
                label="App Store"
              />
            </div>
          </div>
          <div className="bg-abyss-soft p-8 md:p-10">
            <h2 className="font-serif text-h3">Join our newsletter</h2>
            <p className="mt-2 text-white/70">Exclusive offers, news &amp; events</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 text-caption text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <p>
              © <CurrentYear /> {siteConfig.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    className="underline-offset-4 hover:text-white hover:underline"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
          <p className="tracking-[0.14em] uppercase">
            Website design &amp; development by {siteConfig.credit}
          </p>
        </div>
      </Container>
    </footer>
  );
}
