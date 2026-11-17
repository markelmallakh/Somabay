import Link from "next/link";
import type { Hotel } from "@/types/content";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { PriceFrom } from "@/components/ui/PriceFrom";
import { hotelPrice } from "@/lib/price";
import { StarChip } from "./StarChip";

type HotelCardProps = {
  hotel: Hotel;
  href: string;
  themeLabels: string[];
};

const ease = "duration-700 ease-out-expo";

/**
 * Photo-led hotel card (the holidays grid's former card), in the current hotel style: the star
 * pill beside the name and the theme badges under it. At rest the photo fills the card, with the
 * tagline, name, stars and themes over its shaded foot. On hover (or keyboard focus) the photo
 * pulls in to a framed thumbnail and a light panel rises beneath it with the name, stars, themes,
 * description and the booking actions. The whole card links to the hotel page.
 */
export function HotelCard({ hotel, href, themeLabels }: HotelCardProps) {
  const cover = hotel.cover ?? hotel.images[0];

  return (
    // Phones have no hover: everything shows over the photo at rest (and the in-view "hover" is
    // off for this card), with the price and Book now along its foot.
    <article
      data-no-touch-hover
      className="group relative isolate aspect-[10/12] overflow-hidden rounded-md bg-white"
    >
      {/* The whole card opens the hotel page. */}
      <Link
        href={href}
        aria-label={`Explore ${hotel.name}`}
        className="absolute inset-0 z-0 rounded-md outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-turquoise"
      />

      {/* Photo: full card at rest, framed thumbnail on hover. */}
      <div
        data-no-motion
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-[clip-path] [clip-path:inset(0_0_0_0_round_0.25rem)] ${ease} md:group-focus-within:[clip-path:inset(0.5rem_0.5rem_57%_0.5rem_round_0.25rem)] md:group-hover:[clip-path:inset(0.5rem_0.5rem_57%_0.5rem_round_0.25rem)]`}
      >
        <div
          className={`absolute inset-0 transition-transform ${ease} md:group-focus-within:-translate-y-[26%] md:group-hover:-translate-y-[26%]`}
        >
          <ResponsiveImage
            asset={cover}
            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
            fill
          />
        </div>
        <div
          aria-hidden
          className={`absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0)_30%,rgb(0_0_0/0.85)_100%)] transition-opacity md:bg-[linear-gradient(to_bottom,rgb(0_0_0/0)_40%,rgb(0_0_0/0.75)_100%)] ${ease} md:group-focus-within:opacity-0 md:group-hover:opacity-0`}
        />
      </div>

      {/* At rest: tagline, name with its stars, and the themes over the photo's foot. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-5 bottom-[4.75rem] flex flex-col gap-1.5 text-white transition-[opacity,translate] md:inset-x-6 md:bottom-6 ${ease} md:group-focus-within:translate-y-4 md:group-focus-within:opacity-0 md:group-hover:translate-y-4 md:group-hover:opacity-0`}
      >
        <span className="text-body-sm text-white/80">{hotel.tagline}</span>
        <span className="font-serif text-heading-5 leading-[1.15] md:text-heading-4">
          {hotel.name}
          {hotel.stars ? (
            <StarChip count={hotel.stars} className="relative -top-[0.2em] ml-3 align-middle" />
          ) : null}
        </span>
        {themeLabels.length ? (
          <span className="mt-1 flex flex-wrap gap-1.5 md:mt-2 md:gap-2">
            {themeLabels.map((label) => (
              <Chip key={label} tone="light">
                {label}
              </Chip>
            ))}
          </span>
        ) : null}
        <span className="mt-1 line-clamp-2 text-body-xs text-white/80 md:hidden">
          {hotel.description}
        </span>
      </div>

      {/* Phones: the price and Book now along the photo's foot. */}
      <div className="pointer-events-none absolute inset-x-5 bottom-4 flex items-center justify-between gap-3 border-t border-white/20 pt-3 md:hidden">
        <PriceFrom amount={hotelPrice(hotel)} size="compact" tone="dark" />
        {hotel.website ? (
          <Button
            href={hotel.website}
            external
            variant="light"
            size="sm"
            aria-label={`Book now at ${hotel.name}`}
            className="pointer-events-auto relative z-10 self-auto"
          >
            Book now
          </Button>
        ) : null}
      </div>

      {/* On hover: the details panel beneath the framed photo. */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-[43%] bottom-0 hidden translate-y-6 flex-col gap-2.5 px-6 pt-4 pb-6 opacity-0 transition-[opacity,translate] md:flex ${ease} group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:px-7`}
      >
        <h3 className="font-serif text-heading-5 leading-[1.15]">
          {hotel.name}
          {hotel.stars ? (
            <StarChip count={hotel.stars} className="relative -top-[0.15em] ml-2.5 align-middle" />
          ) : null}
        </h3>
        {themeLabels.length ? (
          <span className="flex shrink-0 flex-wrap gap-2">
            {themeLabels.map((label) => (
              <Chip key={label}>{label}</Chip>
            ))}
          </span>
        ) : null}
        <p className="line-clamp-2 min-h-0 shrink overflow-hidden text-body-sm text-slate">
          {hotel.description}
        </p>
        <div className="mt-auto flex shrink-0 items-center justify-between gap-4 border-t border-ink/8 pt-3.5">
          <PriceFrom amount={hotelPrice(hotel)} />
          {hotel.website ? (
            <Button
              href={hotel.website}
              external
              variant="primary"
              size="sm"
              aria-label={`Book now at ${hotel.name}`}
              className="pointer-events-auto relative z-10"
            >
              Book now
            </Button>
          ) : (
            <span className="grid size-10 place-items-center rounded-full bg-sand-100 text-ink">
              <Icon name="arrow-right" className="size-4" />
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
