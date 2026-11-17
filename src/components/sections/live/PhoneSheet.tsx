"use client";

import { AnimatePresence, m } from "framer-motion";
import { type ReactNode, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { getLenis } from "@/components/animations/SmoothScroll";
import { easeOutExpo } from "@/components/animations/easing";
import { Icon } from "@/components/ui/Icon";

type PhoneSheetProps = {
  open: boolean;
  onClose: () => void;
  /** Accessible name of the sheet. */
  label: string;
  children: ReactNode;
};

const noopSubscribe = () => () => {};

/**
 * Phones only (below `md`): a bottom sheet for a map or plan pin's details. It slides up from the
 * foot of the screen over a soft shade, with a grab handle; tapping the shade, the close button,
 * Esc or dragging the sheet down closes it. Rendered into `<body>` so no transformed ancestor
 * (reveals, parallax) can trap its fixed position. Larger screens keep their own inline card.
 */
export function PhoneSheet({ open, onClose, label, children }: PhoneSheetProps) {
  // Only on the client (the portal needs `document`), without a setState-in-effect pass.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open || !window.matchMedia("(max-width: 767px)").matches) return;
    const lenis = getLenis();
    lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div key="sheet" className="fixed inset-0 z-[60] md:hidden">
          <m.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col rounded-t-md bg-white text-ink shadow-card"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%", transition: { duration: 0.3, ease: [0.65, 0, 0.35, 1] } }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 90 || info.velocity.y > 500) onClose();
            }}
          >
            {/* Grab handle. */}
            <div className="flex justify-center pt-2.5 pb-1">
              <span aria-hidden className="h-1 w-10 rounded-full bg-ink/15" />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="absolute top-2 right-2 grid size-11 place-items-center text-ink"
            >
              <Icon name="close" className="size-4" />
              <span className="sr-only">Close</span>
            </button>
            <div className="overflow-y-auto overscroll-contain px-gutter pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {children}
            </div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
