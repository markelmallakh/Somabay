"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import type { Article } from "@/types/content";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/animations/easing";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Icon } from "@/components/ui/Icon";
import { filterChipClass } from "@/components/ui/filterChip";

const categories = [
  { value: "News", label: "News" },
  { value: "Blog", label: "Blog" },
];

/** The journal grid, filtered by category with the same chips as the events page. */
export function JournalGrid({ articles }: { articles: Article[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const visible = articles.filter(
    (article) => selected.length === 0 || selected.includes(article.category),
  );
  return (
    <>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={selected.length === 0}
          onClick={() => setSelected([])}
          className={filterChipClass(selected.length === 0)}
        >
          All
        </button>
        {categories.map((category) => {
          const on = selected.includes(category.value);
          return (
            <button
              key={category.value}
              type="button"
              aria-pressed={on}
              onClick={() =>
                setSelected((current) =>
                  on
                    ? current.filter((value) => value !== category.value)
                    : [...current, category.value],
                )
              }
              className={filterChipClass(on)}
            >
              <span
                aria-hidden
                className={cn(
                  "grid overflow-hidden transition-[width,margin,opacity] duration-500 ease-out-expo",
                  on ? "mr-1.5 w-3.5 opacity-100" : "w-0 opacity-0",
                )}
              >
                <Icon name="check" className="size-3.5" />
              </span>
              {category.label}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <m.ul
          key={selected.join("|") || "all"}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-10 lg:grid-cols-3"
        >
          {visible.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} showDate />
            </li>
          ))}
        </m.ul>
      </AnimatePresence>
    </>
  );
}
