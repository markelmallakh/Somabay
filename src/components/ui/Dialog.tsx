"use client";

import { AnimatePresence, m } from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";
import { getLenis } from "@/components/animations/SmoothScroll";
import { easeInOutQuart } from "@/components/animations/easing";

import { cn } from "@/lib/utils";

/** Brand orange and turquoise layers that lead the drawer panel in (React Bits "staggered menu"). */
const DRAWER_LAYERS = ["#F58025", "#00B2BA"];
const easeInCubic = [0.55, 0, 1, 0.45] as const;
/** Small head start so the native dialog is open before the sweep begins. */
const LEAD = 0.05;
/** One width for every side drawer on the site. */
const DRAWER_WIDTH = "max-w-[42.5rem]";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: ReactNode;
  className?: string;
  /**
   * `fade` full-screen overlay, `rise` centred panel, `drawer` panel sliding in from the right
   * behind two staggered colour layers, over a dimmed backdrop (click outside to close). Mark
   * drawer content with `data-drawer-item` (and `--i` for its order) to stagger it in.
   */
  variant?: "fade" | "rise" | "drawer";
  /** Drawer only: a different width (a `max-w-*` class) than the site's standard drawer. */
  drawerWidth?: string;
  /**
   * Drawer only: controls placed just outside the panel, beside its left edge (e.g. previous /
   * next). Position them inside this box, which spans the panel's height.
   */
  outside?: ReactNode;
};

/**
 * Modal built on the native `<dialog>` element, which provides focus trapping, `Esc` handling
 * and an inert background for free. Framer Motion handles the enter/exit transition; the
 * element is only closed once the exit animation has finished. Mark the element that should
 * receive focus on open with `data-autofocus`.
 */
export function Dialog({
  open,
  onClose,
  label,
  children,
  className,
  variant = "fade",
  drawerWidth = DRAWER_WIDTH,
  outside,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    if (!dialog.open) dialog.showModal();
    // Native dialogs focus their first focusable element; honour an explicit target instead.
    // preventScroll: the drawer's close button starts off-screen mid-sweep, and focusing it
    // would otherwise scroll the whole dialog sideways.
    dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={cn(
        "m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-transparent",
        variant === "drawer" && "overflow-hidden",
      )}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <AnimatePresence onExitComplete={() => ref.current?.close()}>
        {open && variant === "drawer" ? (
          <m.div
            key="drawer"
            className="relative size-full overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <m.button
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={onClose}
              className="absolute inset-0 size-full cursor-default bg-abyss/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.1 } }}
              transition={{ duration: 0.5 }}
            />
            {/* Staggered colour layers sweep in ahead of the panel (brand orange, then turquoise). */}
            {DRAWER_LAYERS.map((color, index) => (
              <m.div
                key={color}
                aria-hidden
                className={cn("drawer-sweep absolute inset-y-0 right-0 w-full", drawerWidth)}
                style={{
                  backgroundColor: color,
                  animationDelay: `${LEAD + index * 0.07}s`,
                  animationDuration: "0.5s",
                }}
                exit={{ x: "100%", transition: { duration: 0.32, ease: easeInCubic } }}
              />
            ))}
            <m.div
              data-lenis-prevent
              className={cn(
                "drawer-sweep absolute inset-y-0 right-0 w-full overflow-y-auto bg-sand-50 shadow-soft",
                drawerWidth,
                className,
              )}
              style={{
                animationDelay: `${LEAD + (DRAWER_LAYERS.length - 1) * 0.07 + 0.08}s`,
                animationDuration: "0.65s",
              }}
              exit={{ x: "100%", transition: { duration: 0.32, ease: easeInCubic } }}
            >
              {children}
            </m.div>
            {outside ? (
              <m.div
                className={cn(
                  "pointer-events-none absolute inset-y-0 right-0 hidden w-full md:block",
                  drawerWidth,
                )}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.55 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <div className="pointer-events-auto absolute right-full bottom-6 mr-4">
                  {outside}
                </div>
              </m.div>
            ) : null}
          </m.div>
        ) : open ? (
          <m.div
            key="dialog"
            className={cn("size-full", className)}
            initial={variant === "fade" ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: variant === "fade" ? 0 : 12, transition: { duration: 0.45 } }}
            transition={{ duration: 0.75, ease: easeInOutQuart }}
          >
            {children}
          </m.div>
        ) : null}
      </AnimatePresence>
    </dialog>
  );
}
