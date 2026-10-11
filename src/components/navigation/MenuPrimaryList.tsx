"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { mainMenu } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/animations/easing";
import { Icon } from "@/components/ui/Icon";

type MenuPrimaryListProps = {
  activeIndex: number;
  onActivate: (index: number) => void;
  onDrill: (index: number) => void;
  onNavigate: () => void;
};

const itemClass =
  "group flex w-full items-center gap-4 py-2 text-left font-serif text-[clamp(1.625rem,1.2rem+1vw,2.125rem)] whitespace-nowrap leading-tight transition-colors duration-500";

export function MenuPrimaryList({
  activeIndex,
  onActivate,
  onDrill,
  onNavigate,
}: MenuPrimaryListProps) {
  return (
    <ul className="flex flex-col gap-1">
      {mainMenu.map((item, index) => {
        const isActive = index === activeIndex;
        const tone = isActive ? "text-ink" : "text-ink/45 hover:text-ink";
        return (
          <m.li
            key={item.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.15 + index * 0.05 }}
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
                {item.label}
                <Icon
                  name="chevron-right"
                  className={cn(
                    "size-5 transition-transform duration-500 ease-out-expo",
                    isActive && "lg:translate-x-1.5",
                  )}
                />
              </button>
            ) : (
              <Link
                href={item.href}
                className={cn(itemClass, tone)}
                onFocus={() => onActivate(index)}
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            )}
          </m.li>
        );
      })}
    </ul>
  );
}
