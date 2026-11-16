"use client";

import { useState } from "react";
import { faqCategories } from "@/content/faqs";
import type { FaqCategory, FaqItem } from "@/types/content";
import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { filterChipClass } from "@/components/ui/filterChip";

type FaqListProps = {
  items: FaqItem[];
  /** Show the category switch (FAQ page) or a plain list (embedded blocks). */
  filterable?: boolean;
};

type CategoryId = FaqCategory | "all";

/** Accordion of questions, optionally filtered by category. */
export function FaqList({ items, filterable = false }: FaqListProps) {
  const [category, setCategory] = useState<CategoryId>("all");
  const visible = category === "all" ? items : items.filter((item) => item.category === category);

  return (
    <div className="mx-auto w-full max-w-4xl">
      {filterable ? (
        // The site's filter chips: "All", then one chip per category (one at a time).
        <div
          role="group"
          aria-label="Question category"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {faqCategories.map((option) => {
            const on = category === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={on}
                onClick={() => setCategory(option.id)}
                className={filterChipClass(on)}
              >
                {option.id === "all" ? null : (
                  <span
                    aria-hidden
                    className={cn(
                      "grid overflow-hidden transition-[width,margin,opacity] duration-500 ease-out-expo",
                      on ? "mr-1.5 w-3.5 opacity-100" : "w-0 opacity-0",
                    )}
                  >
                    <Icon name="check" className="size-3.5" />
                  </span>
                )}
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
      <div className="rounded-md border border-line bg-white px-6 md:px-10">
        <Accordion
          key={category}
          className="border-y-0"
          defaultOpen={visible[0] ? [visible[0].id] : []}
          items={visible.map((item) => ({
            id: item.id,
            title: item.question,
            content: item.answer,
          }))}
        />
      </div>
    </div>
  );
}
