"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types/navigation";
import { easeOutExpo } from "@/components/animations/easing";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";
import { MaskRoll } from "./MaskRoll";

/** Menu entries shown as header tabs, each opening its mega menu. */
export const HEADER_TAB_LABELS = ["Book Hotel", "Experience Somabay", "Live At Somabay"];

/** Pause before a hover opens a panel (a pointer passing over the bar shouldn't open one). */
const OPEN_DELAY = 90;
/** Grace period after the pointer leaves before the panel closes. */
const CLOSE_DELAY = 220;

const rise = (order: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: easeOutExpo, delay: 0.08 + order * 0.035 },
});

type HeaderTabsProps = {
  items: MenuItem[];
  /** Tells the header a panel is open, so it turns into one white sheet with the panel. */
  onOpenChange: (open: boolean) => void;
  /** Header text tone at rest (white over a dark hero). */
  onDark: boolean;
};

/**
 * Header tabs centred in a row under the logo bar (Book Hotel, Experience Somabay, Live At Somabay). Hovering or
 * clicking a tab drops a white mega menu under the header with that section's feature photo and
 * its subcategories, so visitors reach them without opening the full menu. Closes on leave,
 * Escape, an outside click or navigation.
 */
export function HeaderTabs({ items, onOpenChange, onDark }: HeaderTabsProps) {
  const pathname = usePathname();
  const [active, setActive] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const root = useRef<HTMLDivElement>(null);

  const schedule = (next: number | null, delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(next), delay);
  };
  const close = () => {
    clearTimeout(timer.current);
    setActive(null);
  };

  useEffect(() => onOpenChange(active !== null), [active, onOpenChange]);
  useEffect(() => () => clearTimeout(timer.current), []);
  // Leaving the page (any link inside, or browser navigation) closes the panel.
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setActive(null);
  }

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        root.current?.querySelector<HTMLButtonElement>(`[data-tab="${active}"]`)?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const item = active === null ? null : items[active];

  return (
    // Hover-intent and focus-out tracking for the tabs and their panel; the tabs themselves are
    // buttons, so keyboard and touch use them directly.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={root}
      className="h-full"
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") schedule(null, CLOSE_DELAY);
      }}
      onPointerEnter={() => clearTimeout(timer.current)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
      }}
    >
      <nav aria-label="Main sections" className="hidden h-full justify-center lg:flex">
        <ul className="flex items-stretch gap-9">
          {items.map((tab, index) => {
            const open = active === index;
            return (
              <li key={tab.href} className="flex">
                <button
                  type="button"
                  data-tab={index}
                  aria-expanded={open}
                  aria-controls="mega-menu"
                  onClick={() => (open ? close() : setActive(index))}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse")
                      schedule(index, active === null ? OPEN_DELAY : 0);
                  }}
                  className={cn(
                    "group relative flex items-center gap-1.5 text-body-xs font-semibold tracking-[0.12em] uppercase transition-colors duration-500",
                    open
                      ? "text-turquoise"
                      : onDark
                        ? "text-white/90 hover:text-white"
                        : "text-ink hover:text-turquoise",
                  )}
                >
                  <MaskRoll>{tab.label}</MaskRoll>
                  <Icon
                    name="chevron-down"
                    className={cn(
                      "size-3.5 transition-transform duration-500 ease-out-expo",
                      open && "rotate-180",
                    )}
                  />
                  {/* Underline that draws across under the open tab. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-turquoise transition-transform duration-500 ease-out-expo",
                      open ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* The page dims under an open panel; a click there closes it. */}
      <AnimatePresence>
        {item ? (
          <m.div
            key="scrim"
            aria-hidden
            onClick={close}
            // The dimmed page counts as "outside": resting the pointer there closes the panel.
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") schedule(null, CLOSE_DELAY);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-x-0 top-full hidden h-svh bg-black/35 lg:block"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {item ? (
          <m.div
            key="panel"
            id="mega-menu"
            onPointerEnter={() => clearTimeout(timer.current)}
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="absolute inset-x-0 top-full hidden border-t border-line bg-white text-ink shadow-[0_24px_60px_rgb(18_58_70/0.14)] lg:block"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={item.href}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="mx-auto grid max-w-site grid-cols-12 gap-10 px-gutter py-10"
              >
                <m.div {...rise(0)} className="col-span-3">
                  <Link
                    href={item.href}
                    onClick={close}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-md text-white"
                  >
                    <ResponsiveImage
                      asset={item.image}
                      alt=""
                      sizes="22rem"
                      fill
                      className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0)_40%,rgb(0_0_0/0.7)_100%)]"
                    />
                    <span className="absolute inset-x-5 bottom-4 flex items-end justify-between gap-3">
                      <span className="font-serif text-heading-6 leading-[1.15]">{item.label}</span>
                      <Icon
                        name="arrow-right"
                        className="mb-1 size-4 shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </m.div>

                <MegaGroups item={item} onNavigate={close} />
              </m.div>
            </AnimatePresence>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** The section's subcategories in columns; a group with children spreads them over two columns. */
function MegaGroups({ item, onNavigate }: { item: MenuItem; onNavigate: () => void }) {
  const link =
    "group inline-block text-navy transition-colors hover:text-turquoise-160 focus-visible:text-turquoise-160";
  let order = 1;
  const groups = item.groups ?? [];
  const flat = groups.every((group) => !group.children);

  return (
    <div className="col-span-9 flex flex-col">
      {flat ? (
        <ul className="grid grid-cols-3 gap-x-10 gap-y-4">
          {groups.map((group) => (
            <m.li key={group.href} {...rise(order++)}>
              <Link
                href={group.href}
                onClick={onNavigate}
                className={cn(link, "font-serif text-heading-6 leading-[1.25]")}
              >
                <MaskRoll>{group.label}</MaskRoll>
              </Link>
            </m.li>
          ))}
        </ul>
      ) : (
        // Groups with children spread over two columns; the single links stack in the third.
        <div className="grid grid-cols-3 gap-x-10 gap-y-6">
          {groups
            .filter((group) => group.children)
            .map((group) => (
              <div key={group.href} className="col-span-2">
                <m.div {...rise(order++)}>
                  <Link
                    href={group.href}
                    onClick={onNavigate}
                    className={cn(link, "font-serif text-heading-6 leading-[1.25]")}
                  >
                    <MaskRoll>{group.label}</MaskRoll>
                  </Link>
                </m.div>
                <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5">
                  {group.children?.map((child) => (
                    <m.li key={child.href} {...rise(order++)}>
                      <Link
                        href={child.href}
                        onClick={onNavigate}
                        className={cn(link, "text-body-md")}
                      >
                        <MaskRoll>{child.label}</MaskRoll>
                      </Link>
                    </m.li>
                  ))}
                </ul>
              </div>
            ))}
          <ul className="flex flex-col gap-4">
            {groups
              .filter((group) => !group.children)
              .map((group) => (
                <m.li key={group.href} {...rise(order++)}>
                  <Link
                    href={group.href}
                    onClick={onNavigate}
                    className={cn(link, "font-serif text-heading-6 leading-[1.25]")}
                  >
                    <MaskRoll>{group.label}</MaskRoll>
                  </Link>
                </m.li>
              ))}
          </ul>
        </div>
      )}
      {item.footerLink ? (
        <m.div {...rise(order++)} className="mt-auto pt-8">
          <Link
            href={item.footerLink.href}
            onClick={onNavigate}
            className="group eyebrow inline-flex items-center gap-2 text-turquoise transition-colors hover:text-turquoise-160"
          >
            {item.footerLink.label}
            <Icon
              name="arrow-right"
              className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
            />
          </Link>
        </m.div>
      ) : null}
    </div>
  );
}
