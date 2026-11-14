import Link from "next/link";
import { CardActionBar } from "@/components/ui/PhotoCard";
import type { Unit } from "@/content/resale";
import { MediaSlider } from "@/components/media/MediaSlider";
import { Chip } from "@/components/ui/Chip";
import { Icon, type IconName } from "@/components/ui/Icon";

/**
 * Rounded listing card: a full-bleed photo slider across the top that steps through the unit as the page scrolls,
 * chips for type and neighborhood, a specs row (bedrooms, bathrooms, size), and the turquoise action bar that floods up on hover.
 */
export function UnitCard({ unit, href }: { unit: Unit; href: string }) {
  const specs: { icon: IconName; label: string }[] = [
    {
      icon: "bed-min",
      label: `${unit.bedrooms} ${unit.bedrooms === 1 ? "Bedroom" : "Bedrooms"}`,
    },
    {
      icon: "bath-min",
      label: `${unit.bathrooms} ${unit.bathrooms === 1 ? "Bathroom" : "Bathrooms"}`,
    },
    ...(unit.size ? [{ icon: "area-min" as const, label: `${unit.size} sqm` }] : []),
  ];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md bg-white transition-shadow duration-700 ease-out-expo hover:shadow-card">
      <div>
        <MediaSlider
          images={unit.images.slice(0, 5)}
          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
          label={`${unit.title} in ${unit.neighborhood} photos`}
          controls="sm"
          scrollAdvance
          className="aspect-[4/3]"
        />
      </div>
      <div className="flex flex-col gap-4 px-5 pt-5 pb-6 md:px-6">
        <div className="flex flex-wrap gap-2">
          <Chip accent="turquoise">{unit.type}</Chip>
          <Chip accent="twilight">{unit.neighborhood}</Chip>
        </div>
        <h3 className="font-serif text-heading-6">
          <Link href={href} className="transition-colors duration-500 hover:text-lagoon">
            {unit.title}
          </Link>
        </h3>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-body-sm text-slate">
          {specs.map((spec) => (
            <li key={spec.icon} className="flex items-center gap-1.5">
              <Icon name={spec.icon} strokeWidth={1.5} className="size-5" />
              {spec.label}
            </li>
          ))}
        </ul>
      </div>
      <Link href={href} tabIndex={-1} aria-hidden className="mt-auto block">
        <CardActionBar label="Explore" tone="light" />
      </Link>
    </article>
  );
}
