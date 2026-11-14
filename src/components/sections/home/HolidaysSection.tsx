import { holidaysIntro } from "@/content/home";
import { hotelHref, hotelPrice, hotels, hotelThemes } from "@/content/hotels";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import { HotelsShowcase } from "./HotelsShowcase";

const themeLabel = new Map(hotelThemes.map((theme) => [theme.value, theme.label]));

/** The homepage switcher shows the hotels only; Stayr (home rentals) stays on the holidays page. */
const showcased = hotels.filter((hotel) => hotel.slug !== "stayr");

/** Figma "Section / Hotels": intro, then the hotel switcher that steps through on scroll. */
export function HolidaysSection() {
  return (
    <section
      aria-labelledby="holidays-title"
      data-theme-surface="light"
      className="relative bg-white text-ink"
    >
      <HotelsShowcase
        hotels={showcased.map((hotel) => ({
          slug: hotel.slug,
          name: hotel.name,
          tagline: hotel.tagline,
          stars: hotel.stars,
          description: hotel.description,
          image: hotel.cover ?? hotel.images[0],
          gallery: [hotel.cover ?? hotel.images[0], ...hotel.gallery].slice(0, 6),
          href: hotelHref(hotel),
          price: hotelPrice(hotel),
          tags: [hotel.tagline, ...hotel.themes.map((theme) => themeLabel.get(theme) ?? theme)]
            .filter((tag, index, all) => all.indexOf(tag) === index)
            .slice(0, 2),
        }))}
        ctaLabel={holidaysIntro.itemCtaLabel}
        intro={
          <Container>
            <Reveal className="flex max-w-[52.25rem] flex-col gap-6">
              <div className="flex flex-col gap-4">
                <Eyebrow>{holidaysIntro.eyebrow}</Eyebrow>
                <h2 id="holidays-title" className="text-heading-2">
                  {holidaysIntro.title}
                </h2>
              </div>
              <p className="text-body-md text-slate">{holidaysIntro.description}</p>
              <SmartLink
                href={holidaysIntro.cta.href}
                className="group inline-flex w-fit items-center gap-2.5 text-body-md font-semibold"
              >
                {holidaysIntro.cta.label}
                <Icon
                  name="arrow-right"
                  className="size-5 transition-transform duration-700 ease-out-expo group-hover:translate-x-1"
                />
              </SmartLink>
            </Reveal>
          </Container>
        }
      />
    </section>
  );
}
