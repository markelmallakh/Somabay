"use client";

import { type RefObject, useEffect } from "react";

/**
 * Lets mouse users drag a horizontally scrollable element. Touch and trackpads keep native
 * scrolling; clicks are suppressed only when the pointer actually dragged.
 */
export function useDragScroll<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let startX = 0;
    let startScroll = 0;
    let dragging = false;
    let moved = false;

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startScroll = element.scrollLeft;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const delta = event.clientX - startX;
      if (!moved && Math.abs(delta) > 6) {
        moved = true;
        element.setPointerCapture(event.pointerId);
        element.dataset.dragging = "true";
      }
      if (moved) element.scrollLeft = startScroll - delta;
    };
    const end = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (element.hasPointerCapture(event.pointerId))
        element.releasePointerCapture(event.pointerId);
      delete element.dataset.dragging;
    };
    const onClick = (event: MouseEvent) => {
      if (moved) {
        event.preventDefault();
        event.stopPropagation();
        moved = false;
      }
    };
    const preventNativeDrag = (event: DragEvent) => event.preventDefault();

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", end);
    element.addEventListener("pointercancel", end);
    element.addEventListener("click", onClick, true);
    element.addEventListener("dragstart", preventNativeDrag);
    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", end);
      element.removeEventListener("pointercancel", end);
      element.removeEventListener("click", onClick, true);
      element.removeEventListener("dragstart", preventNativeDrag);
    };
  }, [ref]);
}
