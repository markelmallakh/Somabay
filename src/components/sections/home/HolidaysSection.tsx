import { holidaysIntro } from "@/content/home";
import { hotelHref, hotelPrice, hotels, hotelThemes } from "@/content/hotels";
import { Container } from "@/components/layout/Container";
import { HeadingRow } from "@/components/layout/HeadingRow";
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
          // The hotel page's facilities, as short names.
          amenities: (hotel.facilities ?? []).map((item) => item.title).slice(0, 6),
          tags: [hotel.tagline, ...hotel.themes.map((theme) => themeLabel.get(theme) ?? theme)]
            .filter((tag, index, all) => all.indexOf(tag) === index)
            .slice(0, 2),
        }))}
        ctaLabel={holidaysIntro.itemCtaLabel}
        intro={
          <Container>
            {/* Title on the left; the line and a turquoise "View all hotels" link on the right. */}
            <HeadingRow
              id="holidays-title"
              eyebrow={holidaysIntro.eyebrow}
              title={holidaysIntro.title}
              description={holidaysIntro.description}
              aside={
                <SmartLink
                  href={holidaysIntro.cta.href}
                  className="group inline-flex w-fit items-center gap-2.5 text-body-xs font-semibold tracking-label text-turquoise uppercase transition-colors duration-500 hover:text-turquoise-160"
                >
                  {holidaysIntro.cta.label}
                  <Icon
                    name="arrow-right"
                    className="size-4 transition-transform duration-700 ease-out-expo group-hover:translate-x-1"
                  />
                </SmartLink>
              }
            />
          </Container>
        }
      />
    </section>
  );
}
