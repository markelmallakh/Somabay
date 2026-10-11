"use client";

import { AnimatePresence, m } from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";
import { getLenis } from "@/components/animations/SmoothScroll";
import { easeInOutQuart } from "@/components/animations/easing";
import { cn } from "@/lib/utils";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  children: ReactNode;
  className?: string;
  /** Visual entrance: `fade` for full-screen overlays, `rise` for centred panels. */
  variant?: "fade" | "rise";
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
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    if (!dialog.open) dialog.showModal();
    // Native dialogs focus their first focusable element; honour an explicit target instead.
    dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
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
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-transparent"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <AnimatePresence onExitComplete={() => ref.current?.close()}>
        {open ? (
          <m.div
            key="dialog"
            className={cn("size-full", className)}
            initial={variant === "fade" ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: variant === "fade" ? 0 : 16 }}
            transition={{ duration: 0.6, ease: easeInOutQuart }}
          >
            {children}
          </m.div>
        ) : null}
      </AnimatePresence>
    </dialog>
  );
}
