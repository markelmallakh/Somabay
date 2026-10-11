import Link from "next/link";
import type { StartOption } from "@/types/content";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";

type StartPanelProps = {
  label: string;
  options: StartOption[];
};

export function StartPanel({ label, options }: StartPanelProps) {
  return (
    <nav aria-labelledby="start-label">
      <RevealGroup>
        <RevealItem>
          <p id="start-label" className="mb-3 text-[0.9375rem] text-white/90">
            {label}
          </p>
        </RevealItem>
        <RevealItem as="div" className="border border-white/15 glass">
          <ul className="divide-y divide-white/15">
            {options.map((option) => (
              <li key={option.href}>
                <Link
                  href={option.href}
                  className="group flex items-center gap-4 px-5 py-4 transition-colors duration-500 hover:bg-white/10 focus-visible:bg-white/10"
                >
                  <Icon
                    name="chevron-right"
                    className="size-4 text-white/70 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                  />
                  <span className="flex-1">
                    <span className="block font-serif text-[1.375rem] leading-tight">
                      {option.title}
                    </span>
                    <span className="mt-1 block text-caption text-white/70">
                      {option.description}
                    </span>
                  </span>
                  <span className="relative size-14 shrink-0 overflow-hidden">
                    <ResponsiveImage
                      asset={option.image}
                      sizes="56px"
                      fill
                      className="transition-transform duration-1000 ease-out-expo group-hover:scale-110"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </RevealItem>
      </RevealGroup>
    </nav>
  );
}
