"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { CarouselArrows } from "./CarouselArrows";

/**
 * Horizontally scrolling, mouse-draggable list kept inside the page padding. Under it, the
 * homepage carousel's turquoise progress rail (the lit segment is the part of the row on screen)
 * and previous / next arrows that loop: past the last card they glide back to the first, and back
 * from the first to the end.
 */
export function DragRow({
  children,
  label,
  className,
  tone = "light",
}: {
  children: ReactNode;
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLUListElement>(null);
  useDragScroll(ref);
  const [view, setView] = useState({ start: 0, size: 1 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => {
      const total = element.scrollWidth || 1;
      setView({ start: element.scrollLeft / total, size: element.clientWidth / total });
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const page = (direction: 1 | -1) => {
    const element = ref.current;
    if (!element) return;
    const max = element.scrollWidth - element.clientWidth;
    const atEnd = element.scrollLeft >= max - 4;
    const atStart = element.scrollLeft <= 4;
    if (direction === 1 && atEnd) element.scrollTo({ left: 0, behavior: "smooth" });
    else if (direction === -1 && atStart) element.scrollTo({ left: max, behavior: "smooth" });
    else element.scrollBy({ left: direction * element.clientWidth * 0.8, behavior: "smooth" });
  };

  const overflows = view.size < 0.999;

  return (
    <div>
      {/* The row sits inside the page padding, so the cards line up with the headings. */}
      <div className="mx-auto max-w-site px-gutter">
        <ul
          ref={ref}
          aria-label={label}
          className={cn(
            "scrollbar-none flex cursor-grab snap-x gap-4 overflow-x-auto data-[dragging=true]:cursor-grabbing",
            className,
          )}
        >
          {children}
        </ul>
      </div>
      {overflows ? (
        <Container className="mt-8 flex items-center gap-8">
          <div
            aria-hidden
            className={cn("relative h-0.5 flex-1", tone === "dark" ? "bg-white/20" : "bg-line")}
          >
            <span
              className="absolute inset-y-0 bg-turquoise transition-[left,width] duration-500 ease-out-expo"
              style={{ left: `${view.start * 100}%`, width: `${view.size * 100}%` }}
            />
          </div>
          <CarouselArrows
            canBack
            canForward
            onPage={page}
            label={label.toLowerCase()}
            tone={tone}
          />
        </Container>
      ) : null}
    </div>
  );
}
