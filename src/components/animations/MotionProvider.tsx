"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only the DOM animation feature set (smaller bundle) and makes every Framer Motion
 * animation honour the visitor's reduced-motion preference.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
