"use client";

import { useEffect, useState } from "react";
import { getLenis } from "@/components/animations/SmoothScroll";
import { cn } from "@/lib/utils";

type SectionNavProps = {
  items: { id: string; label: string }[];
  label: string;
};

/** Floating pill of in-page anchors; highlights the section in view (scroll-spy). */
export function SectionNav({ items, label }: SectionNavProps) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [items]);

  const go = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { offset: -80 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label={label}
      className="pointer-events-none fixed inset-x-0 bottom-5 z-20 flex justify-center px-4"
    >
      <ul className="pointer-events-auto scrollbar-none flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/15 glass bg-abyss/70 p-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                go(item.id);
              }}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "flex min-h-9 items-center rounded-full px-4 text-label font-semibold tracking-label whitespace-nowrap uppercase transition-colors duration-500",
                active === item.id ? "bg-white text-ink" : "text-white/80 hover:text-white",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
