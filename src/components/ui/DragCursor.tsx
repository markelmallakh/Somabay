"use client";

import { AnimatePresence, m, useMotionValue, useSpring } from "framer-motion";
import { type RefObject, useEffect, useState } from "react";

type DragCursorProps = {
  /** Area over which the badge follows the pointer. */
  targetRef: RefObject<HTMLElement | null>;
  label?: string;
};

/** A small "Drag" badge that trails the mouse over a draggable area (fine pointers only). */
export function DragCursor({ targetRef, label = "Drag" }: DragCursorProps) {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.6 });

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const enter = (event: PointerEvent) => {
      x.jump(event.clientX);
      y.jump(event.clientY);
      springX.jump(event.clientX);
      springY.jump(event.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerenter", enter);
    target.addEventListener("pointerleave", leave);
    return () => {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerenter", enter);
      target.removeEventListener("pointerleave", leave);
    };
  }, [targetRef, x, y, springX, springY]);

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-30 -mt-11 -ml-11 grid size-22 place-items-center rounded-full bg-ink/80 text-[0.6875rem] font-semibold tracking-label text-white uppercase backdrop-blur-sm"
          style={{ x: springX, y: springY }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {label}
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
