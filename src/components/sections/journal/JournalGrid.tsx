"use client";

import { useState } from "react";
import type { Article } from "@/types/content";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { FilterDropdown } from "@/components/ui/FilterDropdown";

const categories = [
  { value: "News", label: "News" },
  { value: "Blog", label: "Blog" },
];

export function JournalGrid({ articles }: { articles: Article[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const visible = articles.filter(
    (article) => selected.length === 0 || selected.includes(article.category),
  );
  return (
    <>
      <FilterDropdown options={categories} value={selected} onChange={setSelected} />
      <RevealGroup
        as="ul"
        className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-10 lg:grid-cols-3"
      >
        {visible.map((article) => (
          <RevealItem as="li" key={article.slug}>
            <ArticleCard article={article} showDate />
          </RevealItem>
        ))}
      </RevealGroup>
    </>
  );
}
