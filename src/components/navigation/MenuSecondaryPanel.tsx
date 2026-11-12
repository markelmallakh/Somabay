"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types/navigation";
import { easeOutExpo } from "@/components/animations/easing";
import { Icon } from "@/components/ui/Icon";
import { MaskRoll } from "./MaskRoll";

type MenuSecondaryPanelProps = {
  item: MenuItem;
  onNavigate: () => void;
  /** `light`: the white desktop panel; `dark`: inside the turquoise column (phones). */
  tone?: "light" | "dark";
};

/** Each row rises in after the one before it whenever the panel's item changes. */
const rise = (order: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: easeOutExpo, delay: 0.06 + order * 0.045 },
});

export function MenuSecondaryPanel({ item, onNavigate, tone = "light" }: MenuSecondaryPanelProps) {
  const dark = tone === "dark";
  const title = dark
    ? "text-white"
    : "text-turquoise hover:text-turquoise-160 focus-visible:text-turquoise-160";
  const link = dark
    ? "text-white hover:text-deep-orange focus-visible:text-deep-orange"
    : "text-navy hover:text-turquoise-160 focus-visible:text-turquoise-160";
  let order = 0;
  return (
    <div className="flex h-full flex-col">
      {/* The panel title; when the item has an overview page ("All Hotels") the title is that
          link, right at the top where the eye already is. */}
      <m.div {...rise(order++)} className="mb-5">
        {item.footerLink ? (
          <Link
            href={item.footerLink.href}
            onClick={onNavigate}
            className={cn("group eyebrow inline-flex items-center gap-2 transition-colors", title)}
          >
            {item.footerLink.label}
            <Icon
              name="arrow-right"
              className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
            />
          </Link>
        ) : (
          <p className={cn("eyebrow", dark ? "text-white" : "text-turquoise")}>{item.label}</p>
        )}
      </m.div>
      <ul className="flex flex-col gap-5">
        {item.groups?.map((group) => (
          <li key={group.href}>
            <m.div {...rise(order++)}>
              <Link
                href={group.href}
                onClick={onNavigate}
                className={cn(
                  "group inline-block font-sans text-[1.5rem] leading-[1.25] font-medium transition-colors",
                  link,
                )}
              >
                <MaskRoll>{group.label}</MaskRoll>
              </Link>
            </m.div>
            {group.children ? (
              <ul className="mt-3.5 mb-1 flex flex-col gap-2.5">
                {group.children.map((child) => (
                  <m.li key={child.href} {...rise(order++)}>
                    <Link
                      href={child.href}
                      onClick={onNavigate}
                      className={cn(
                        "group inline-block text-[1.0625rem] leading-[1.35] transition-colors",
                        link,
                      )}
                    >
                      <MaskRoll>{child.label}</MaskRoll>
                    </Link>
                  </m.li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
