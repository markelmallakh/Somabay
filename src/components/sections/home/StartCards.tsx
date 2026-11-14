import Link from "next/link";
import type { StartOption } from "@/types/content";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { MaskRoll } from "@/components/navigation/MaskRoll";
import { Icon } from "@/components/ui/Icon";

type StartCardsProps = {
  label: string;
  options: StartOption[];
};

/**
 * The hero's "Where do you want to start?" choices as three portrait photo cards side by side,
 * pinned to the hero's bottom-right opposite the Day/Night toggle. Each card carries its title on
 * a shaded foot with an arrow in the corner; on hover the card lifts, the photo zooms, the title
 * letters roll and the one-line hint opens beneath it. Touch screens show the hint from the start.
 */
export function StartCards({ label, options }: StartCardsProps) {
  return (
    <nav aria-labelledby="start-label" className="w-full lg:w-auto">
      <RevealGroup>
        <RevealItem>
          <p
            id="start-label"
            className="mb-2.5 text-label font-semibold tracking-label text-white/80 uppercase"
          >
            {label}
          </p>
        </RevealItem>
        <ul className="grid grid-cols-3 gap-1.5 lg:flex">
          {options.map((option) => (
            <RevealItem as="li" key={option.href}>
              <Link
                href={option.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-md bg-black/30 text-white shadow-[0_12px_40px_rgb(0_0_0/0.25)] transition-transform duration-700 ease-out-expo hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:w-28 xl:w-32"
              >
                <ResponsiveImage
                  asset={option.image}
                  sizes="(min-width: 1280px) 128px, (min-width: 1024px) 112px, 33vw"
                  fill
                  className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.15)_0%,rgb(0_0_0/0)_35%,rgb(0_0_0/0.75)_100%)]"
                />
                {/* The arrow slips out to the top-right and returns from the bottom-left. */}
                <span
                  aria-hidden
                  className="absolute top-2 right-2 size-3.5 overflow-hidden text-white"
                >
                  <Icon
                    name="arrow-up-right"
                    className="absolute inset-0 size-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-full group-hover:-translate-y-full"
                  />
                  <Icon
                    name="arrow-up-right"
                    className="absolute inset-0 size-3.5 -translate-x-full translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0"
                  />
                </span>
                <span className="absolute inset-x-2.5 bottom-2.5">
                  <MaskRoll className="font-serif text-[0.9375rem] leading-[1.2]">
                    {option.title}
                  </MaskRoll>
                  {/* The hint opens under the title on hover (always open on touch screens). */}
                  <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out-expo group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                    <span className="overflow-hidden">
                      <span className="block pt-0.5 text-body-2xs leading-[1.35] text-white/80">
                        {option.description}
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </ul>
      </RevealGroup>
    </nav>
  );
}
