"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { HeaderData } from "@/types/navigation";
import { getLenis } from "@/components/animations/SmoothScroll";
import { easeOutExpo } from "@/components/animations/easing";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";
import { MenuFooter } from "./MenuFooter";
import { MenuPrimaryList } from "./MenuPrimaryList";
import { MenuSecondaryPanel } from "./MenuSecondaryPanel";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  temperature: number | null;
  data: HeaderData;
  /** Viewport point the circle grows from (the centre of the menu button). */
  origin: { x: number; y: number };
};

/** Even in-out curve for the circle, so it neither lingers small nor snaps at the end. */
const easeCircle = [0.65, 0, 0.35, 1] as const;

/** Radius that covers the whole viewport from the origin point. */
const coverRadius = ({ x, y }: { x: number; y: number }) =>
  Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 24;

/**
 * Full-screen menu that opens as a circle growing from the menu button and unveiling the panels
 * already in place (they only settle upward, staggered), under the header (which
 * stays on top and morphs its menu icon into a close icon). Not a native `<dialog>`, so the header
 * can sit above it: Esc closes, the page behind is made inert and scroll is locked while open.
 */
export function MenuOverlay({ open, onClose, temperature, data, origin }: MenuOverlayProps) {
  const mainMenu = data.menu;
  const [activeIndex, setActiveIndex] = useState(0);
  /** Mobile drill-down: index of the item whose sub-panel is open. */
  const [drilledIndex, setDrilledIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = mainMenu[activeIndex];
  const drilled = drilledIndex === null ? null : mainMenu[drilledIndex];

  const close = () => {
    setDrilledIndex(null);
    onClose();
  };

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

  return (
    <AnimatePresence onExitComplete={() => setDrilledIndex(null)}>
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
            className="mx-auto flex h-full max-w-site flex-col px-gutter pt-(--header-height) pb-6 outline-none"
          >
            <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-12">
              <m.div
                className="relative flex min-h-0 flex-col overflow-y-auto bg-turquoise-160 py-6 pr-6 text-white md:py-10 md:pr-10 lg:col-span-4"
                initial={{ y: 40 }}
                animate={{ y: 0, transition: { duration: 1.1, ease: easeOutExpo } }}
              >
                <div className="relative flex-1">
                  <AnimatePresence mode="wait" initial={false}>
                    {drilled ? (
                      <m.div
                        key="drill"
                        className="lg:hidden"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 24 }}
                        transition={{ duration: 0.5, ease: easeOutExpo }}
                      >
                        <button
                          type="button"
                          onClick={() => setDrilledIndex(null)}
                          className="eyebrow mb-6 flex items-center gap-2 text-white/85"
                        >
                          <Icon name="chevron-left" className="size-4" />
                          Back
                        </button>
                        <p className="mb-5 font-sans text-[1.25rem] font-medium">{drilled.label}</p>
                        <MenuSecondaryPanel item={drilled} onNavigate={close} tone="dark" />
                      </m.div>
                    ) : (
                      <m.div
                        key="primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <MenuPrimaryList
                          items={mainMenu}
                          activeIndex={activeIndex}
                          onActivate={setActiveIndex}
                          onDrill={setDrilledIndex}
                          onNavigate={close}
                        />
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
                <MenuFooter
                  temperature={temperature}
                  onNavigate={close}
                  utilityLinks={data.utilityLinks}
                  actions={data.actions}
                />
              </m.div>

              <m.div
                // Remounts when the panel appears (a tab with sub-links), so the wipe replays.
                key={active.groups ? "panel" : "none"}
                className={cn(
                  "hidden bg-white p-10 text-navy lg:col-span-3 lg:block",
                  !active.groups && "lg:hidden",
                )}
                // Wipes in from left to right as the menu opens.
                initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                animate={{
                  clipPath: "inset(0% 0% 0% 0%)",
                  transition: { duration: 1.1, ease: easeOutExpo, delay: 0.15 },
                }}
              >
                <AnimatePresence mode="wait">
                  {active.groups ? (
                    <m.div
                      key={active.label}
                      className="h-full"
                      exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                    >
                      <MenuSecondaryPanel item={active} onNavigate={close} />
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </m.div>

              <m.div
                className={cn(
                  "relative hidden overflow-hidden bg-turquoise-10 lg:block",
                  active.groups ? "lg:col-span-5" : "lg:col-span-8",
                )}
                initial={{ y: 72 }}
                animate={{ y: 0, transition: { duration: 1.1, ease: easeOutExpo } }}
              >
                {/* Each new image wipes up over the last while settling from a gentle zoom. */}
                <AnimatePresence initial={false}>
                  <m.div
                    key={active.label}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.9 } }}
                    transition={{ duration: 1, ease: easeOutExpo }}
                  >
                    <m.div
                      className="absolute inset-0"
                      initial={{ scale: 1.18 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.6, ease: easeOutExpo }}
                    >
                      <ResponsiveImage
                        asset={active.image}
                        sizes="(min-width: 1024px) 66vw, 0px"
                        quality={85}
                        fill
                      />
                    </m.div>
                  </m.div>
                </AnimatePresence>
              </m.div>
            </div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
