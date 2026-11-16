"use client";

import { AnimatePresence, m } from "framer-motion";
import { type ReactNode, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/animations/easing";
import { Icon } from "./Icon";

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
  /** `minimal`: hairlines and a small chevron that turns, for split FAQ layouts. */
  variant?: "default" | "minimal";
  /** `dark`: white type and faint white rules, for deep-teal sections. */
  tone?: "light" | "dark";
  className?: string;
};

/** Disclosure list following the WAI-ARIA accordion pattern. */
export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  variant = "default",
  tone = "light",
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
    <div
      className={cn(
        "divide-y border-y",
        tone === "dark" ? "divide-white/15 border-white/15" : "divide-line border-line",
        className,
      )}
    >
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
                className={cn(
                  "group flex w-full items-center justify-between gap-6 text-left font-serif text-heading-6 transition-colors",
                  tone === "dark" ? "hover:text-turquoise-40" : "hover:text-lagoon",
                  variant === "minimal" ? "py-5" : "py-6",
                )}
              >
                {item.title}
                {variant === "minimal" ? (
                  <Icon
                    name="chevron-down"
                    className={cn(
                      "size-4 shrink-0 transition-transform duration-500 ease-out-expo",
                      tone === "dark" ? "text-white/70" : "text-slate",
                      expanded && "rotate-180",
                    )}
                  />
                ) : (
                  <span
                    aria-hidden
                    className="relative grid size-9 shrink-0 place-items-center text-turquoise transition-colors duration-500 group-hover:text-turquoise-160"
                  >
                    <span className="absolute h-[1.5px] w-4 rounded-full bg-current" />
                    <span
                      className={cn(
                        "absolute h-4 w-[1.5px] rounded-full bg-current transition-transform duration-500 ease-out-expo",
                        expanded && "scale-y-0",
                      )}
                    />
                  </span>
                )}
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
                  <div
                    className={cn(
                      "max-w-3xl",
                      tone === "dark" ? "text-white/75" : "text-slate",
                      variant === "minimal" ? "pb-6 text-body-md" : "pb-8",
                    )}
                  >
                    {item.content}
                  </div>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
