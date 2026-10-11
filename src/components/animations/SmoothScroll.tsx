"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

let lenisInstance: Lenis | null = null;

/** Returns the active smooth-scroll instance (null when disabled, e.g. reduced motion). */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Inertial smooth scrolling driven by GSAP's ticker so ScrollTrigger and Lenis stay in sync.
 * Disabled entirely for visitors who prefer reduced motion and on touch devices, where native
 * momentum scrolling is already smooth.
 */
export function SmoothScroll() {
  useEffect(() => {
    registerGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
