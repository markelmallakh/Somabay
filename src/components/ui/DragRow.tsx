"use client";

import { type ReactNode, useRef } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { CarouselArrows, useScroller } from "./CarouselArrows";

/**
 * Horizontally scrolling, mouse-draggable list aligned to the site container, with previous/next
 * arrows under it whenever the row overflows.
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
  const { canBack, canForward, page } = useScroller(ref);
  return (
    <div>
      <ul
        ref={ref}
        aria-label={label}
        className={cn(
          "scrollbar-none flex cursor-grab snap-x scroll-ps-site gap-4 overflow-x-auto ps-site pe-gutter data-[dragging=true]:cursor-grabbing",
          className,
        )}
      >
        {children}
      </ul>
      <Container>
        <CarouselArrows
          canBack={canBack}
          canForward={canForward}
          onPage={page}
          label={label.toLowerCase()}
          tone={tone}
          className="mt-8 justify-end"
        />
      </Container>
    </div>
  );
}
