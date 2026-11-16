import Link from "next/link";
import type { Unit } from "@/content/resale";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Chip } from "@/components/ui/Chip";
import { Icon, type IconName } from "@/components/ui/Icon";

const ease = "duration-700 ease-out-expo";

/**
 * Resale listing card, in the hotel card's style. At rest the photo fills the card, with the type
 * and neighborhood chips at the top and the name and specs over its shaded foot. On hover (or
 * keyboard focus) the photo pulls in to a framed picture at the top and a white panel rises
 * beneath it with the name, the specs and an Explore link. The whole card opens the unit page.
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
  const specRow = (tone: "dark" | "light") => (
    <ul
      className={`flex flex-wrap items-center gap-x-5 gap-y-1.5 text-body-sm ${tone === "dark" ? "text-white/85" : "text-slate"}`}
    >
      {specs.map((spec) => (
        <li key={spec.icon} className="flex items-center gap-1.5">
          <Icon name={spec.icon} strokeWidth={1.5} className="size-5" />
          {spec.label}
        </li>
      ))}
    </ul>
  );

  return (
    <article className="group relative isolate aspect-[10/11] overflow-hidden rounded-md bg-white">
      {/* The whole card opens the unit page. */}
      <Link
        href={href}
        aria-label={`Explore ${unit.title} in ${unit.neighborhood}`}
        className="absolute inset-0 z-0 rounded-md outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-turquoise"
      />

      {/* Photo: the whole card at rest, a framed picture at the top on hover. */}
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-[clip-path] [clip-path:inset(0_0_0_0_round_0.25rem)] ${ease} group-focus-within:[clip-path:inset(0.5rem_0.5rem_42%_0.5rem_round_0.25rem)] group-hover:[clip-path:inset(0.5rem_0.5rem_42%_0.5rem_round_0.25rem)]`}
      >
        <div
          className={`absolute inset-0 transition-transform ${ease} group-focus-within:-translate-y-[18%] group-hover:-translate-y-[18%]`}
        >
          <ResponsiveImage
            asset={unit.images[0]}
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
            fill
          />
        </div>
        <div
          aria-hidden
          className={`absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.3)_0%,rgb(0_0_0/0)_28%,rgb(0_0_0/0)_50%,rgb(0_0_0/0.75)_100%)] transition-opacity ${ease} group-focus-within:opacity-0 group-hover:opacity-0`}
        />
      </div>

      {/* Type and neighborhood, top-left on the photo throughout. */}
      <ul className="pointer-events-none absolute top-5 left-5 z-10 flex flex-wrap gap-2 pr-5">
        <li>
          <Chip tone="light">{unit.type}</Chip>
        </li>
        <li>
          <Chip tone="light">{unit.neighborhood}</Chip>
        </li>
      </ul>

      {/* At rest: the name and specs over the photo's foot. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white transition-[opacity,translate] ${ease} group-focus-within:translate-y-4 group-focus-within:opacity-0 group-hover:translate-y-4 group-hover:opacity-0`}
      >
        <span className="flex flex-col gap-3">
          <span className="font-serif text-heading-4 leading-[1.1]">{unit.title}</span>
          {specRow("dark")}
        </span>
      </div>

      {/* On hover: the details panel beneath the framed photo. */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-[58%] bottom-0 flex translate-y-6 flex-col gap-3 px-6 pt-5 pb-6 opacity-0 transition-[opacity,translate] ${ease} group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 md:px-7`}
      >
        <h3 className="font-serif text-heading-5 leading-[1.15]">{unit.title}</h3>
        {specRow("light")}
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-ink/8 pt-3 text-body-xs font-semibold tracking-label text-ink uppercase">
          Explore
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-turquoise text-white">
            <Icon name="arrow-right" className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
