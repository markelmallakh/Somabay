import Link from "next/link";
import type { Hotel } from "@/types/content";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { hotelPrice } from "@/lib/price";
import { PriceFrom } from "@/components/ui/PriceFrom";
import { StarChip } from "./StarChip";

type HotelCardProps = {
  hotel: Hotel;
  href: string;
  themeLabels: string[];
};

const ease = "duration-700 ease-out-expo";

/**
 * Photo-led hotel card. At rest the photo fills the card, with the rating and theme chips at the
 * top and the tagline and name over its shaded foot. On hover (or keyboard focus) the photo pulls
 * in to a framed thumbnail at the top and a light panel rises beneath it with the name,
 * description and the booking actions. The whole card links to the hotel page.
 */
export function HotelCard({ hotel, href, themeLabels }: HotelCardProps) {
  const cover = hotel.cover ?? hotel.images[0];

  return (
    <article className="group relative isolate aspect-[10/11] overflow-hidden rounded-xl bg-white">
      {/* The whole card opens the hotel page. */}
      <Link
        href={href}
        aria-label={`Explore ${hotel.name}`}
        className="absolute inset-0 z-0 rounded-xl outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-turquoise"
      />

      {/* Photo: full card at rest, framed thumbnail on hover. */}
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-[clip-path] [clip-path:inset(0_0_0_0_round_0.75rem)] ${ease} group-focus-within:[clip-path:inset(0.5rem_0.5rem_47%_0.5rem_round_0.5rem)] group-hover:[clip-path:inset(0.5rem_0.5rem_47%_0.5rem_round_0.5rem)]`}
      >
        <div
          className={`absolute inset-0 transition-transform ${ease} group-focus-within:-translate-y-[22%] group-hover:-translate-y-[22%]`}
        >
          <ResponsiveImage
            asset={cover}
            sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
            fill
          />
        </div>
        <div
          aria-hidden
          className={`absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.3)_0%,rgb(0_0_0/0)_28%,rgb(0_0_0/0)_55%,rgb(0_0_0/0.7)_100%)] transition-opacity ${ease} group-focus-within:opacity-0 group-hover:opacity-0`}
        />
      </div>

      {/* Rating and theme chips, top-left on the photo throughout. */}
      <ul className="pointer-events-none absolute top-5 left-5 z-10 flex flex-wrap gap-2 pr-5">
        {hotel.stars ? (
          <li>
            <StarChip count={hotel.stars} />
          </li>
        ) : null}
        {themeLabels.map((label) => (
          <li key={label}>
            <Chip>{label}</Chip>
          </li>
        ))}
      </ul>

      {/* At rest: tagline and name over the photo's foot, with a round arrow. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white transition-[opacity,translate] ${ease} group-focus-within:translate-y-4 group-focus-within:opacity-0 group-hover:translate-y-4 group-hover:opacity-0`}
      >
        <span className="flex flex-col gap-1">
          <span className="text-body-sm text-white/80">{hotel.tagline}</span>
          <span className="font-serif text-heading-4 leading-[1.1]">{hotel.name}</span>
          <PriceFrom amount={hotelPrice(hotel)} tone="dark" className="mt-1.5" />
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/85 text-ink backdrop-blur-sm">
          <Icon name="arrow-right" className="size-4" />
        </span>
      </div>

      {/* On hover: the details panel beneath the framed photo. */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-[53%] bottom-0 flex translate-y-6 flex-col gap-3 px-6 pt-5 pb-6 opacity-0 transition-[opacity,translate] ${ease} group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:px-7`}
      >
        <div className="flex flex-col gap-1">
          <span className="text-body-sm text-slate">{hotel.tagline}</span>
          <h3 className="font-serif text-heading-5 leading-[1.15]">{hotel.name}</h3>
        </div>
        <p className="line-clamp-2 text-body-sm text-slate">{hotel.description}</p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-ink/8 pt-4">
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
          ) : null}
        </div>
      </div>
    </article>
  );
}
