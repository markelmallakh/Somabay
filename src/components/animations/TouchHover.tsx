"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Cards and rows that animate or reveal something on hover. Named groups (`group/button`…) are
 * left out: buttons keep their own tap feedback.
 */
const CANDIDATES = ".group, [data-touch-hover-target]";

/** React has taken this element over (touching streamed markup before that breaks hydration). */
const hydrated = (element: Element) =>
  Object.keys(element).some((key) => key.startsWith("__reactFiber"));

/**
 * Hover for touch screens. Phones can't hover, so the card or row passing through the middle band
 * of the screen gets the hover state instead (`data-touch-hover`, which every `hover:` and
 * `group-hover:` utility also answers to — see the `hover` variant in globals.css): photos settle
 * into their zoom, hidden captions slide up and "Discover" bars fill as the visitor scrolls, then
 * ease back as the card moves on. Mounted once in the root layout; does nothing on devices that
 * can hover. Opt out with `data-no-touch-hover`.
 */
export function TouchHover() {
  const pathname = usePathname();

  useEffect(() => {
    const touch = window.matchMedia("(hover: none)");
    if (!touch.matches) return;

    // iOS only shows `:active` states (the wave on tap) when a touch listener exists.
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });

    const main = document.getElementById("main-content");
    if (!main) return () => document.removeEventListener("touchstart", noop);

    // A small window in the middle of the screen (12% tall, 36% wide): whatever crosses it is
    // "hovered".
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) element.setAttribute("data-touch-hover", "");
          else element.removeAttribute("data-touch-hover");
        }
      },
      // The middle of the screen both ways, so in a sideways row only the card being swiped
      // into the centre lights up (not the whole row at once).
      { rootMargin: "-44% -32% -44% -32%" },
    );

    const watched = new WeakSet<Element>();
    let retry = 0;
    const scan = () => {
      let pending = false;
      for (const element of main.querySelectorAll<HTMLElement>(CANDIDATES)) {
        if (watched.has(element)) continue;
        if (!hydrated(element)) {
          pending = true;
          continue;
        }
        if (element.closest("[data-no-touch-hover], [role='dialog'], dialog")) continue;
        // Whole sections marked `group` would light up everything inside them at once.
        if (element.offsetHeight > window.innerHeight * 1.1) continue;
        watched.add(element);
        observer.observe(element);
      }
      // Streamed sections hydrate a moment after the page: look again shortly.
      window.clearTimeout(retry);
      if (pending) retry = window.setTimeout(scan, 600);
    };
    scan();

    // Filters, tabs and sliders render new cards after load.
    let queued = 0;
    const mutations = new MutationObserver(() => {
      if (queued) return;
      queued = window.requestAnimationFrame(() => {
        queued = 0;
        scan();
      });
    });
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("touchstart", noop);
      observer.disconnect();
      mutations.disconnect();
      window.cancelAnimationFrame(queued);
      window.clearTimeout(retry);
      for (const element of main.querySelectorAll("[data-touch-hover]")) {
        element.removeAttribute("data-touch-hover");
      }
    };
  }, [pathname]);

  return null;
}
