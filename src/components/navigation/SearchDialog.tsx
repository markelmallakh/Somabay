"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { footerColumns, mainMenu, supportLinks } from "@/config/navigation";
import type { NavLink } from "@/types/navigation";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";

type SearchEntry = NavLink & { section: string };

/** Flattens every navigation destination into one de-duplicated, searchable list. */
function buildIndex(): SearchEntry[] {
  const entries = new Map<string, SearchEntry>();
  const add = (link: NavLink, section: string) => {
    if (!entries.has(link.href)) entries.set(link.href, { ...link, section });
  };
  for (const item of mainMenu) {
    add(item, "Somabay");
    for (const group of item.groups ?? []) {
      add(group, item.label);
      for (const child of group.children ?? []) add(child, group.label);
    }
  }
  for (const column of footerColumns) column.links.forEach((link) => add(link, column.title));
  supportLinks.forEach((link) => add(link, "Support"));
  return [...entries.values()];
}

const searchIndex = buildIndex();

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const normalized = query.trim().toLowerCase();
  const results = normalized
    ? searchIndex.filter((entry) =>
        `${entry.label} ${entry.section}`.toLowerCase().includes(normalized),
      )
    : searchIndex.slice(0, 8);

  const close = () => {
    setQuery("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      label="Search Somabay"
      variant="rise"
      className="bg-abyss/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-full max-w-3xl flex-col px-gutter pt-[12vh] pb-10">
        <div className="bg-sand-50 p-6 shadow-soft md:p-10">
          <div className="flex items-center justify-between gap-6">
            <label htmlFor={inputId} className="eyebrow text-lagoon">
              Search Somabay
            </label>
            <button
              type="button"
              onClick={close}
              className="grid size-10 place-items-center"
              aria-label="Close search"
            >
              <Icon name="close" className="size-6" />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-4 border-b border-ink/30 pb-3 focus-within:border-ink">
            <Icon name="search" className="size-6 text-slate" />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Hotels, golf, neighborhoods…"
              autoComplete="off"
              className="w-full bg-transparent font-serif text-h3 outline-none placeholder:text-mist"
              data-autofocus
            />
          </div>
          <p className="mt-6 text-caption text-slate" aria-live="polite">
            {normalized
              ? `${results.length} ${results.length === 1 ? "result" : "results"}`
              : "Popular destinations"}
          </p>
          <ul className="mt-3 max-h-[45vh] divide-y divide-line overflow-y-auto">
            {results.map((entry) => (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  onClick={close}
                  className="group flex items-center justify-between gap-6 py-4"
                >
                  <span>
                    <span className="block font-serif text-h4 group-hover:text-lagoon">
                      {entry.label}
                    </span>
                    <span className="text-caption text-slate">{entry.section}</span>
                  </span>
                  <Icon
                    name="arrow-right"
                    className="size-5 transition-transform duration-500 group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dialog>
  );
}
