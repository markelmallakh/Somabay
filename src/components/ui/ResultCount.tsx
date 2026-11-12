"use client";

import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/animations/easing";

type ResultCountProps = {
  count: number;
  /** The words after the number, already pluralised ("units available"). */
  label: string;
  className?: string;
};

/**
 * Editorial result count for finders: a two-digit serif numeral in turquoise that rolls when the
 * number changes, and a small-caps label.
 */
export function ResultCount({ count, label, className }: ResultCountProps) {
  const digits = String(count).padStart(2, "0");
  return (
    <p className={cn("flex items-center gap-4", className)} aria-live="polite">
      <span className="relative inline-flex overflow-hidden font-serif text-[2.5rem] leading-none text-turquoise tabular-nums">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={digits}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="block"
          >
            {digits}
          </m.span>
        </AnimatePresence>
        <span className="sr-only"> </span>
      </span>
      <span className="eyebrow text-[0.6875rem] whitespace-nowrap text-slate">{label}</span>
    </p>
  );
}
