import Link from "next/link";
import type { StartOption } from "@/types/content";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { ArrowChip } from "@/components/ui/ArrowChip";

type StartPanelProps = {
  label: string;
  options: StartOption[];
};

export function StartPanel({ label, options }: StartPanelProps) {
  return (
    <nav aria-labelledby="start-label">
      <RevealGroup>
        <RevealItem>
          <p id="start-label" className="mb-3 text-body-md font-semibold text-white">
            {label}
          </p>
        </RevealItem>
        <RevealItem
          as="div"
          className="rounded-2xl border border-white/20 bg-black/25 p-2 backdrop-blur-xl"
        >
          <ul className="flex flex-col gap-1">
            {options.map((option) => (
              <li key={option.href}>
                <Link
                  href={option.href}
                  className="group flex items-center gap-3 rounded-xl p-2 transition-colors duration-500 hover:bg-white/10 focus-visible:bg-white/10"
                >
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                    <ResponsiveImage
                      asset={option.image}
                      sizes="64px"
                      fill
                      className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-110"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-body-lg text-white">{option.title}</span>
                    <span className="mt-1 block text-body-xs text-white/85">
                      {option.description}
                    </span>
                  </span>
                  <ArrowChip />
                </Link>
              </li>
            ))}
          </ul>
        </RevealItem>
      </RevealGroup>
    </nav>
  );
}
