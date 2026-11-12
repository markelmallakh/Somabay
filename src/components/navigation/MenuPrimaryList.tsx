"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types/navigation";
import { easeOutExpo } from "@/components/animations/easing";
import { Icon } from "@/components/ui/Icon";
import { MaskRoll } from "./MaskRoll";

type MenuPrimaryListProps = {
  items: MenuItem[];
  activeIndex: number;
  onActivate: (index: number) => void;
  onDrill: (index: number) => void;
  onNavigate: () => void;
};

const itemClass =
  "group relative flex w-full items-center justify-between gap-4 py-3 pr-1 text-left font-sans text-[1.1875rem] leading-[1.35] font-medium tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-500";

/** The FAQs / Careers hover: a hairline drawn in under the label, left to right. */
const underline =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-1 transition-[background-size] duration-600 ease-out-expo group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]";

/**
 * The main menu on deep turquoise: uppercase white tabs, the active one full white with a sun
 * chevron, the rest softened. Hovering a tab rolls its label up through a mask (`MaskRoll`).
 */
export function MenuPrimaryList({
  items,
  activeIndex,
  onActivate,
  onDrill,
  onNavigate,
}: MenuPrimaryListProps) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const tone = cn(
          isActive ? "text-white" : "text-white/80",
          "hover:text-deep-orange focus-visible:text-deep-orange",
        );
        const chevron = (
          <Icon
            name="chevron-right"
            className={cn(
              "size-4 transition-[transform,opacity] duration-500 ease-out-expo",
              isActive ? "translate-x-1 text-sun opacity-100" : "",
            )}
          />
        );
        return (
          <m.li
            key={item.label}
            className="relative isolate"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.25 + index * 0.05 }}
            onMouseEnter={() => onActivate(index)}
          >
            {item.groups ? (
              <button
                type="button"
                className={cn(itemClass, tone)}
                aria-expanded={isActive}
                onFocus={() => onActivate(index)}
                onClick={() => {
                  onActivate(index);
                  if (!window.matchMedia("(min-width: 1024px)").matches) onDrill(index);
                }}
              >
                <MaskRoll className={underline}>{item.label}</MaskRoll>
                {chevron}
              </button>
            ) : (
              <Link
                href={item.href}
                className={cn(itemClass, tone)}
                onFocus={() => onActivate(index)}
                onClick={onNavigate}
              >
                <MaskRoll className={underline}>{item.label}</MaskRoll>
              </Link>
            )}
          </m.li>
        );
      })}
    </ul>
  );
}
