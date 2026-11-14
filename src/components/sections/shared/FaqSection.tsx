"use client";

import { useState } from "react";
import { faqCategories } from "@/content/faqs";
import type { FaqCategory, FaqItem } from "@/types/content";
import { Accordion } from "@/components/ui/Accordion";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

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
        <div className="mb-10 flex justify-center">
          <SegmentedControl
            label="Question category"
            options={faqCategories}
            value={category}
            onChange={setCategory}
          />
        </div>
      ) : null}
      <div className="rounded-md bg-white px-6 md:px-10">
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
