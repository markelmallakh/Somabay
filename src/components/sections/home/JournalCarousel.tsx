"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

type JournalCarouselProps = {
  children: ReactNode;
  label: string;
};

/** Native scroll-snap row with previous/next controls that disable at either end. */
export function JournalCarousel({ children, label }: JournalCarouselProps) {
  const scroller = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const element = scroller.current;
    if (!element) return;
    const start = element.scrollLeft <= 4;
    const end = element.scrollLeft + element.clientWidth >= element.scrollWidth - 4;
    setEdges((previous) =>
      previous.start === start && previous.end === end ? previous : { start, end },
    );
  }, []);

  useEffect(() => {
    const element = scroller.current;
    if (!element) return;
    update();
    element.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      element.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const page = (direction: 1 | -1) => {
    const element = scroller.current;
    const card = element?.firstElementChild;
    if (!element || !(card instanceof HTMLElement)) return;
    element.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: "smooth" });
  };

  const control =
    "grid size-12 place-items-center border border-ink/25 transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-sand-50 disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <ul
        ref={scroller}
        aria-label={label}
        className="scrollbar-none flex snap-x snap-mandatory scroll-ps-site gap-4 overflow-x-auto ps-site pe-gutter"
      >
        {children}
      </ul>
      <div className="mx-auto mt-8 flex max-w-site justify-end gap-2 px-gutter">
        <button
          type="button"
          className={cn(control)}
          onClick={() => page(-1)}
          disabled={edges.start}
          aria-label="Previous stories"
        >
          <Icon name="chevron-left" className="size-5" />
        </button>
        <button
          type="button"
          className={cn(control)}
          onClick={() => page(1)}
          disabled={edges.end}
          aria-label="Next stories"
        >
          <Icon name="chevron-right" className="size-5" />
        </button>
      </div>
    </div>
  );
}
