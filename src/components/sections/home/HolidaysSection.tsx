import { holidaysIntro } from "@/content/home";
import { hotelHref, hotelPrice, hotels, hotelThemes } from "@/content/hotels";
import { Container } from "@/components/layout/Container";
import { HeadingRow, PhoneEndCta } from "@/components/layout/HeadingRow";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import { HotelsShowcase } from "./HotelsShowcase";

const themeLabel = new Map(hotelThemes.map((theme) => [theme.value, theme.label]));

/** The homepage switcher shows the hotels only; Stayr (home rentals) stays on the holidays page. */
const showcased = hotels.filter((hotel) => hotel.slug !== "stayr");

/** Figma "Section / Hotels": intro, then the hotel switcher that steps through on scroll. */
export function HolidaysSection() {
  const allHotels = (
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
  );
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
          // The official photos exported from each hotel's own website (hotel-details.ts).
          image: hotel.gallery[0] ?? hotel.images[0],
          gallery: hotel.gallery.slice(0, 6),
          href: hotelHref(hotel),
          // "Starting from": the hotel's rate, or the placeholder until live rates are connected.
          price: hotelPrice(hotel),
          // The hotel's own amenities, as listed on its website.
          amenities: (hotel.amenities ?? []).slice(0, 6),
          tags: [hotel.tagline, ...hotel.themes.map((theme) => themeLabel.get(theme) ?? theme)]
            .filter((tag, index, all) => all.indexOf(tag) === index)
            .slice(0, 2),
        }))}
        ctaLabel={holidaysIntro.itemCtaLabel}
        outro={<PhoneEndCta className="mt-0">{allHotels}</PhoneEndCta>}
        intro={
          <Container>
            {/* Title on the left; the line and a turquoise "View all stays" link on the right. */}
            <HeadingRow
              id="holidays-title"
              eyebrow={holidaysIntro.eyebrow}
              title={holidaysIntro.title}
              description={holidaysIntro.description}
              aside={allHotels}
            />
          </Container>
        }
      />
    </section>
  );
}
