"use client";

import { type DependencyList, type RefObject, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { prefersReducedMotion } from "./useReducedMotion";

type GsapSetupContext<T extends HTMLElement> = {
  /** The scoped root element. */
  scope: T;
  reducedMotion: boolean;
};

type GsapSetup<T extends HTMLElement> = (context: GsapSetupContext<T>) => void | (() => void);

/**
 * Runs GSAP code inside a `gsap.context` scoped to `scope`, so selector strings only match
 * descendants of that element. Every tween, timeline and ScrollTrigger created inside is
 * reverted automatically when the component unmounts or the dependencies change.
 */
export function useGsap<T extends HTMLElement>(
  setup: GsapSetup<T>,
  dependencies: DependencyList = [],
): RefObject<T | null> {
  const scope = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const element = scope.current;
    if (!element) return;
    registerGsap();
    const reducedMotion = prefersReducedMotion();
    let cleanup: void | (() => void);
    const ctx = gsap.context(() => {
      cleanup = setup({ scope: element, reducedMotion });
    }, element);
    return () => {
      if (typeof cleanup === "function") cleanup();
      ctx.revert();
    };
  }, dependencies);

  return scope;
}
