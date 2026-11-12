import { cacheLife } from "next/cache";
import Image from "next/image";
import { footerColumns, legalLinks, supportLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { image } from "@/lib/media";
import { getWeatherForecast } from "@/lib/weather";
import { FooterWeather } from "@/components/navigation/FooterWeather";
import { LanguageMenu } from "@/components/navigation/LanguageMenu";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
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

const banner = image(
  "/images/footer/footer-swing-sunset.webp",
  "The Somabay swing standing in the sea at sunset",
);

const columnTitle =
  "font-eyebrow text-body-2xs font-semibold tracking-[0.12em] text-slate uppercase";
const linkClass =
  "link-underline w-fit text-body-sm text-ink/80 transition-colors duration-500 hover:text-turquoise";

/* Somabay folds Real Estate into its column; Book Hotel reads Stay. */
const [somabay, experience, hotels, realEstate, whatsUp] = footerColumns;
const columns = [
  { ...somabay, links: [...somabay.links, ...realEstate.links] },
  experience,
  { ...hotels, title: "Stay" },
  { ...whatsUp, links: [...whatsUp.links, ...supportLinks] },
];

/**
 * Store badge. On desktop it is a plain label beside the QR code (scan to install); on smaller
 * screens, where the QR code can't be scanned from the same device, it links to the store.
 */
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
  const base =
    "h-8 w-full items-center gap-2 rounded-md bg-ink px-1.5 py-1 whitespace-nowrap text-white";
  const content = (
    <>
      <Icon name={icon} className="size-[1.1875rem]" />
      <span className="leading-none">
        <span className="block text-[0.4375rem] uppercase opacity-75">{overline}</span>
        <span className="block text-body-xs font-semibold">{label}</span>
      </span>
    </>
  );
  return (
    <>
      <span className={`hidden lg:flex ${base}`}>{content}</span>
      <SmartLink
        href={href}
        className={`flex lg:hidden ${base} transition-colors duration-500 hover:bg-turquoise`}
      >
        {content}
      </SmartLink>
    </>
  );
}

/**
 * Site footer: brand and newsletter, the swing banner, link columns beside a contact block and a
 * compact app card, then a quiet bottom bar carrying the live weather and language (the header,
 * which normally shows them, slides away while the footer is on screen).
 */
export async function SiteFooter() {
  const forecast = await getWeatherForecast();

  return (
    <footer data-site-footer className="bg-white text-ink" data-theme-surface="light">
      <Container className="flex flex-col gap-14 pt-20 pb-8">
        {/* Brand + newsletter */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <Logo tone="brand" className="w-44 md:w-52" />
            <p className="max-w-[22rem] text-body-md text-slate">
              {siteConfig.location.name.split(",")[0]} — life at the edge of the Red Sea.
            </p>
          </div>
          <div className="w-full lg:max-w-[28rem]">
            <h2 className="font-serif text-heading-6">Join our newsletter</h2>
            <p className="mt-1 text-body-sm text-slate">
              Offers, news and events from the bay, straight to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="relative aspect-[1392/260] min-h-40 overflow-hidden rounded-[2rem]">
          <ResponsiveImage asset={banner} sizes="(min-width: 1512px) 1392px, 100vw" fill />
        </div>

        {/* Links, contact, app */}
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-5">
                <h2 className={columnTitle}>{column.title}</h2>
                <ul className="flex flex-col gap-3">
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
          </nav>

          <div className="flex flex-col gap-8 sm:flex-row lg:flex-col lg:border-l lg:border-gray-200 lg:pl-12">
            <div className="flex flex-col gap-4">
              <h2 className={columnTitle}>Get in touch</h2>
              <a
                href={siteConfig.contact.hotlineHref}
                className="flex items-center gap-2 font-serif text-heading-5 transition-colors duration-500 hover:text-turquoise"
              >
                <Icon name="phone" className="size-5 text-turquoise" />
                {siteConfig.contact.hotline}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="link-underline w-fit text-body-sm text-ink/80 hover:text-turquoise"
              >
                {siteConfig.contact.email}
              </a>
              <ul className="flex gap-2" aria-label="Somabay on social media">
                {siteConfig.social.map((item) => (
                  <li key={item.href}>
                    <SmartLink
                      href={item.href}
                      className="wave grid size-9 place-items-center rounded-md border border-gray-200 text-ink transition-colors duration-500 hover:border-turquoise hover:text-white"
                      aria-label={item.label}
                    >
                      <Icon name={item.icon} className="size-4" />
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Figma "App card" (485:10427). */}
            <div className="flex w-fit items-center gap-4 rounded-lg border border-gray-200 py-3 pr-2 pl-2.5">
              <Image
                src="/images/footer/app-qr.png"
                alt="QR code to download the Somabay app"
                width={144}
                height={145}
                className="size-22 shrink-0 rounded-lg"
              />
              <div className="flex w-[7.9375rem] flex-col gap-2">
                <p className="text-body-xs font-semibold">Get the Somabay app</p>
                <StoreBadge
                  href={siteConfig.apps.ios}
                  icon="apple"
                  overline="Download on the"
                  label="App Store"
                />
                <StoreBadge
                  href={siteConfig.apps.android}
                  icon="google-play"
                  overline="Get it on"
                  label="Google Play"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 border-t border-gray-200 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 text-body-xs text-slate md:flex-row md:items-center md:gap-6">
            <p>
              © <CurrentYear /> {siteConfig.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    className="link-underline transition-colors hover:text-turquoise"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {forecast ? <FooterWeather forecast={forecast} /> : null}
            <LanguageMenu variant="pill" placement="above" />
            <p className="text-body-2xs tracking-wide text-slate uppercase lg:ml-3">
              Web design &amp; development by {siteConfig.credit}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
