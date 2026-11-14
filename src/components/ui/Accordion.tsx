"use client";

import { AnimatePresence, m } from "framer-motion";
import { type ReactNode, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/animations/easing";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Allow several panels open at once. */
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
};

/** Disclosure list following the WAI-ARIA accordion pattern. */
export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const baseId = useId();

  const toggle = (id: string) =>
    setOpen((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : multiple
          ? [...current, id]
          : [id],
    );

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => {
        const expanded = open.includes(item.id);
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-heading-6 transition-colors hover:text-lagoon"
              >
                {item.title}
                <span
                  aria-hidden
                  className="relative grid size-9 shrink-0 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-ink"
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span
                    className={cn(
                      "absolute h-3.5 w-px bg-current transition-transform duration-500 ease-out-expo",
                      expanded && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded ? (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                  className="overflow-hidden"
                >
                  <div className="max-w-3xl pb-8 text-slate">{item.content}</div>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
