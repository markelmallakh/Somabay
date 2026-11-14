"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { HeaderData, MenuItem } from "@/types/navigation";
import { getLenis } from "@/components/animations/SmoothScroll";
import { easeOutExpo } from "@/components/animations/easing";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  data: HeaderData;
  /** Viewport point the circle grows from (the centre of the menu button). */
  origin: { x: number; y: number };
};

/** Even in-out curve for the circle, so it neither lingers small nor snaps at the end. */
const easeCircle = [0.65, 0, 0.35, 1] as const;

/** Radius that covers the whole viewport from the origin point. */
const coverRadius = ({ x, y }: { x: number; y: number }) =>
  Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 24;

/** Each block settles upward a beat after the one before, once the circle has opened. */
const rise = (order: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: easeOutExpo, delay: 0.35 + order * 0.06 },
});

/**
 * Full-screen menu that opens as a circle growing from the menu button. Every section is laid out
 * at once, like a sitemap: on desktop a photo on the left, then ruled columns with each section's
 * title and all of its pages under it, so nothing hides behind a hover. The photo follows the
 * section under the pointer. Not a native `<dialog>`, so the header can sit above it: Esc closes,
 * the page behind is made inert and scroll is locked while open.
 */
export function MenuOverlay({ open, onClose, data, origin }: MenuOverlayProps) {
  const sections = data.menu.filter((item) => item.groups);
  const singles = data.menu.filter((item) => !item.groups);
  const [shown, setShown] = useState<MenuItem>(sections[0] ?? data.menu[0]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const behind = [...document.querySelectorAll<HTMLElement>("main, [data-site-footer]")];
    behind.forEach((element) => (element.inert = true));
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const focus = window.setTimeout(() => panelRef.current?.focus({ preventScroll: true }), 450);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      behind.forEach((element) => (element.inert = false));
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focus);
    };
  }, [open, onClose]);

  const at = `${origin.x}px ${origin.y}px`;
  // A group with its own sub-pages (Things To Do and its activities) becomes a column of its own,
  // right after the section it belongs to, which keeps its other pages.
  const expanded: MenuItem[] = sections.flatMap((item) => {
    const nested = item.groups?.filter((group) => group.children) ?? [];
    if (!nested.length) return [item];
    return [
      { ...item, groups: item.groups?.filter((group) => !group.children) },
      ...nested.map((group) => ({
        label: group.label,
        href: group.href,
        image: item.image,
        groups: group.children,
        footerLink: { label: "View all", href: group.href },
      })),
    ];
  });
  // Book Hotel on its own; Experience Somabay stacked over Things To Do; the rest share the last.
  const columns: MenuItem[][] = [expanded.slice(0, 1), expanded.slice(1, 3), expanded.slice(3)];
  let order = 0;

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          key="menu"
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-30 bg-turquoise-160 text-white"
          initial={{ clipPath: `circle(0px at ${at})` }}
          animate={{
            clipPath: `circle(${coverRadius(origin)}px at ${at})`,
            transition: { duration: 0.85, ease: easeCircle },
          }}
          exit={{
            clipPath: `circle(0px at ${at})`,
            transition: { duration: 0.6, ease: easeCircle },
          }}
        >
          <div
            ref={panelRef}
            tabIndex={-1}
            className="mx-auto flex h-full max-w-site flex-col overflow-y-auto px-gutter pt-(--header-bar) pb-8 outline-none"
          >
            {/* One hairline between the header and the menu. */}
            <div className="grid gap-x-10 gap-y-10 border-t border-white/15 pt-8 lg:grid-cols-4 lg:pt-10">
              {/* First column: the single pages, then the two calls to action. */}
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  {singles.map((item) => (
                    <m.div
                      key={item.label}
                      {...rise(order++)}
                      onPointerEnter={() => setShown(item)}
                      onFocus={() => setShown(item)}
                    >
                      <SectionTitle item={item} onNavigate={onClose} />
                    </m.div>
                  ))}
                </div>

                <m.div {...rise(order++)} className="grid gap-3">
                  <Button
                    href={data.actions.contact.href}
                    variant="light"
                    icon="chevron-right"
                    iconPosition="start"
                    onClick={onClose}
                  >
                    {data.actions.contact.label}
                  </Button>
                  <Button
                    href={data.actions.virtualTour.href}
                    external
                    variant="outline-light"
                    icon="cube"
                    iconPosition="start"
                  >
                    {data.actions.virtualTour.label}
                  </Button>
                </m.div>
              </div>

              <nav
                aria-label="Site sections"
                className="grid content-start gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3"
              >
                {columns.map((column, index) => (
                  // A hairline down the middle of the gap before each column.
                  <div
                    key={index}
                    className="relative flex flex-col gap-10 lg:before:absolute lg:before:inset-y-0 lg:before:-left-5 lg:before:w-px lg:before:bg-white/15"
                  >
                    {column.map((item) => (
                      <m.section
                        key={item.label}
                        {...rise(order++)}
                        onPointerEnter={() => setShown(item)}
                        onFocus={() => setShown(item)}
                      >
                        {/* A heading over its pages, not a link of its own. */}
                        <h2 className="font-serif text-heading-6 leading-[1.2]">{item.label}</h2>
                        <ul className="mt-5 flex flex-col gap-3">
                          {item.groups?.map((group) => (
                            <li key={group.href}>
                              <MenuLink href={group.href} onNavigate={onClose}>
                                {group.label}
                              </MenuLink>
                              {group.children ? (
                                <ul className="mt-3 ml-1 flex flex-col gap-2 border-l border-white/15 pl-4">
                                  {group.children.map((child) => (
                                    <li key={child.href}>
                                      <MenuLink href={child.href} onNavigate={onClose} small>
                                        {child.label}
                                      </MenuLink>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </li>
                          ))}
                          {/* FAQs and Careers close the last section (What's Up Soma). */}
                          {item === sections.at(-1)
                            ? data.utilityLinks.map((link) => (
                                <li key={link.href}>
                                  <MenuLink href={link.href} onNavigate={onClose}>
                                    {link.label}
                                  </MenuLink>
                                </li>
                              ))
                            : null}
                          {item.footerLink ? (
                            <li className="mt-2">
                              <Link
                                href={item.footerLink.href}
                                onClick={onClose}
                                className="group eyebrow inline-flex items-center gap-2 text-sun transition-colors hover:text-white"
                              >
                                {item.footerLink.label}
                                <Icon
                                  name="arrow-right"
                                  className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                                />
                              </Link>
                            </li>
                          ) : null}
                        </ul>
                      </m.section>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
            {/* A landscape band along the foot: the photo of the section under the pointer, wiping up
                over the last one. */}
            <m.div
              className="relative mt-10 hidden min-h-40 flex-1 overflow-hidden rounded-md bg-white/5 lg:block"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{
                clipPath: "inset(0% 0% 0% 0%)",
                transition: { duration: 1.2, ease: easeOutExpo, delay: 0.3 },
              }}
            >
              <AnimatePresence initial={false}>
                <m.div
                  key={shown.label}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.8 } }}
                  transition={{ duration: 0.9, ease: easeOutExpo }}
                >
                  <m.div
                    className="absolute inset-0"
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.6, ease: easeOutExpo }}
                  >
                    <ResponsiveImage
                      asset={shown.image}
                      alt=""
                      sizes="(min-width: 1024px) 100vw, 0px"
                      quality={85}
                      fill
                    />
                  </m.div>
                </m.div>
              </AnimatePresence>
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.5),transparent_60%)]"
              />
              <m.p
                key={`caption-${shown.label}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: easeOutExpo }}
                className="absolute inset-x-8 bottom-6 font-serif text-heading-4"
              >
                {shown.label}
              </m.p>
            </m.div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

/** A single page (Home, About, Facilities) as a title over a hairline, with its arrow. */
function SectionTitle({ item, onNavigate }: { item: MenuItem; onNavigate: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group flex items-center justify-between gap-4"
    >
      <span className="font-serif text-heading-6 leading-[1.2] transition-colors duration-500 group-hover:text-sun">
        {item.label}
      </span>
      <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/30 transition-[background-color,border-color,color] duration-500 group-hover:border-sun group-hover:bg-sun group-hover:text-ink">
        <Icon name="arrow-right" className="size-3.5" />
      </span>
    </Link>
  );
}

function MenuLink({
  href,
  onNavigate,
  small,
  children,
}: {
  href: string;
  onNavigate: () => void;
  small?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "link-underline inline-block tracking-[0.04em] uppercase transition-colors duration-500 hover:text-white",
        small ? "text-body-sm text-white/65" : "text-[1.0625rem] leading-[1.35] text-white/85",
      )}
    >
      {children}
    </Link>
  );
}
