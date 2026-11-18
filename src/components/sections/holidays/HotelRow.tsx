import Link from "next/link";
import type { Hotel } from "@/types/content";
import { Parallax } from "@/components/animations/Parallax";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { PriceFrom } from "@/components/ui/PriceFrom";
import { hotelPrice } from "@/lib/price";
import { StarChip } from "./StarChip";

type HotelRowProps = {
  hotel: Hotel;
  href: string;
  themeLabels: string[];
};

/**
 * One stay as a full-width row in the All Stays list: a large photo on the left, and on the
 * right its tagline, name with star rating, themes, description, and the price with both actions on a
 * ruled foot. Each hotel gets the whole width, so it reads as a feature rather than a tile. The
 * row links to the hotel page; the buttons sit above that link.
 */
export function HotelRow({ hotel, href, themeLabels }: HotelRowProps) {
  const cover = hotel.cover ?? hotel.images[0];

  return (
    <article className="group relative isolate grid overflow-hidden rounded-md bg-white transition-shadow duration-700 ease-out-expo hover:shadow-card md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* The whole row opens the hotel page. */}
      <Link
        href={href}
        aria-label={`Explore ${hotel.name}`}
        className="absolute inset-0 z-0 rounded-md focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-turquoise"
      />

      {/* A taller photo that drifts in a clear parallax as the row passes (and still eases in a
          little on hover). */}
      <div className="pointer-events-none relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[30rem]">
        <Parallax amount={12} className="absolute inset-0">
          <div className="absolute inset-0">
            <ResponsiveImage
              asset={cover}
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 55vw, 100vw"
              fill
              className="transition-transform duration-[1600ms] ease-out-expo group-focus-within:scale-[1.05] group-hover:scale-[1.05]"
            />
          </div>
        </Parallax>
      </div>

      <div className="pointer-events-none flex flex-col p-5 sm:p-6 md:p-8 lg:p-10">
        <p className="text-body-sm text-slate">{hotel.tagline}</p>
        {/* The name with its star rating beside it, then the themes under it. */}
        <h3 className="mt-1.5 font-serif text-heading-3 leading-[1.15] transition-colors duration-500 group-hover:text-turquoise-160">
          {hotel.name}
          {/* Set inline after the last word, so it follows the name when it wraps. */}
          {hotel.stars ? (
            <StarChip count={hotel.stars} className="relative -top-[0.2em] ml-3 align-middle" />
          ) : null}
        </h3>
        {themeLabels.length ? (
          <ul className="mt-3 flex flex-wrap gap-2 sm:mt-4">
            {themeLabels.map((label) => (
              <li key={label}>
                <Chip>{label}</Chip>
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-3 mb-6 line-clamp-3 max-w-xl text-body-md text-slate sm:mt-4 sm:mb-8">
          {hotel.description}
        </p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-line pt-5 sm:pt-6">
          <PriceFrom amount={hotelPrice(hotel)} />
          {/* Phones: the two actions share the row in equal halves. */}
          <div className="pointer-events-auto relative z-10 grid w-full grid-cols-2 gap-2 has-[>:only-child]:grid-cols-1 sm:flex sm:w-auto sm:flex-wrap sm:gap-3">
            <Button
              href={href}
              variant="outline"
              size="sm"
              aria-label={`Explore ${hotel.name}`}
              tabIndex={-1}
            >
              Explore hotel
            </Button>
            {hotel.website ? (
              <Button
                href={hotel.website}
                external
                variant="primary"
                size="sm"
                aria-label={`Book now at ${hotel.name}`}
              >
                Book now
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
