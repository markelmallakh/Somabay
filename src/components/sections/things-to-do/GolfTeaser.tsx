"use client";

import Link from "next/link";
import { useRef } from "react";
import { golfTeaser } from "@/content/things-to-do";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useGsap } from "@/hooks/useGsap";
import { ScrollTrigger, SplitText, gsap } from "@/lib/gsap";

const film = {
  src: "/videos/golf-swing.webm",
  poster: "/images/video/golf-swing-poster.webp",
};

/**
 * Golf teaser on a full-screen golf film tied to the scroll (forward down, backward up).
 * Heading and statement sit top-left; the four golf topics (each flooding white on hover) and a
 * turquoise "Explore Soma Golf" sit bottom-right. The intro rises in line by line on arrival; on
 * desktop the stage then pins and the topics appear one by one as you scroll.
 */
export function GolfTeaser() {
  const video = useRef<HTMLVideoElement>(null);

  const scope = useGsap<HTMLElement>(({ scope, reducedMotion }) => {
    const clip = video.current;
    if (!clip) return;

    // The film is tied to the scroll: scrolling down plays it forward, scrolling up plays it
    // backward, and it holds still whenever scrolling stops. Each frame eases toward the target
    // time and only seeks once the previous seek has landed, so it stays smooth both ways.
    clip.pause();
    let target = 0;
    let raf = 0;
    const step = () => {
      raf = requestAnimationFrame(step);
      if (!clip.duration || clip.seeking) return;
      const diff = target - clip.currentTime;
      if (Math.abs(diff) < 1 / 48) return;
      clip.currentTime += diff * 0.35;
    };
    raf = requestAnimationFrame(step);
    const scrubTo = (progress: number) => {
      if (clip.duration) target = progress * (clip.duration - 0.05);
    };

    const mm = gsap.matchMedia();
    const cleanups: (() => void)[] = [];
    if (!reducedMotion) {
      // Entrance, once on arrival: the film settles from a slight zoom while the heading,
      // subtitle and statement rise line by line out of their masks, then the CTA fades in.
      const entrance = gsap.timeline({
        paused: true,
        scrollTrigger: { trigger: scope, start: "top 70%", once: true },
      });
      const split = SplitText.create("[data-golf-intro] > *", {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
      });
      entrance
        .fromTo(clip, { scale: 1.12 }, { scale: 1, duration: 2.2, ease: "expo.out" }, 0)
        .from(split.lines, { yPercent: 110, duration: 1.4, stagger: 0.07, ease: "expo.out" }, 0.1)
        .from("[data-golf-cta]", { opacity: 0, duration: 1, ease: "power2.out" }, 0.6);

      // Pinned: the topics stay hidden until you scroll, then appear one by one: the white line
      // draws across, the title rises out of its mask, the description fades up and the arrow
      // turns in. The CTA stays put.
      mm.add("(min-width: 1024px)", () => {
        const topics = gsap.utils.toArray<HTMLElement>("[data-golf-topic]", scope);
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => scrubTo(self.progress),
          },
        });
        topics.forEach((topic, index) => {
          const at = 0.05 + index * 0.9;
          const q = gsap.utils.selector(topic);
          timeline
            .fromTo(topic, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, at)
            .fromTo(q("[data-golf-line]"), { scaleX: 0 }, { scaleX: 1, duration: 0.7 }, at)
            .fromTo(
              q("[data-golf-title]"),
              { yPercent: 110 },
              { yPercent: 0, duration: 0.6, ease: "power3.out" },
              at + 0.15,
            )
            .fromTo(
              q("[data-golf-text]"),
              { y: 18, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
              at + 0.3,
            )
            .fromTo(
              q("[data-golf-arrow]"),
              { rotation: -90, opacity: 0 },
              { rotation: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
              at + 0.3,
            );
        });
        timeline.to({}, { duration: 0.5 });
      });

      cleanups.push(() => split.revert());
    }

    mm.add("(max-width: 1023.98px)", () => {
      ScrollTrigger.create({
        trigger: scope,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => scrubTo(self.progress),
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      mm.revert();
      cleanups.forEach((cleanup) => cleanup());
    };
  });

  return (
    <section
      ref={scope}
      aria-labelledby="golf-title"
      data-theme-surface="dark"
      className="relative isolate flex min-h-svh overflow-hidden bg-abyss text-white"
    >
      <video
        ref={video}
        className="absolute inset-0 -z-20 size-full object-cover will-change-transform"
        src={film.src}
        poster={film.poster}
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom_right,rgb(0_0_0/0.7)_0%,rgb(0_0_0/0.3)_32%,rgb(0_0_0/0.05)_50%,rgb(0_0_0/0.4)_70%,rgb(0_0_0/0.75)_100%)]"
      />

      <Container className="flex w-full pt-[calc(var(--header-height)+3rem)] pb-12 lg:pb-14">
        <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:gap-10">
          {/* Heading and statement, top-left. */}
          <div data-golf-intro className="flex flex-col gap-4 lg:max-w-[34rem] lg:self-start">
            <h2 id="golf-title" className="text-heading-2">
              {golfTeaser.title}
            </h2>
            <p className="font-serif text-heading-6 text-white/90">{golfTeaser.subtitle}</p>
            <p className="text-body-md text-white/75">{golfTeaser.statement}</p>
          </div>

          {/* The golf topics and the CTA, bottom-right. */}
          <div className="flex flex-col gap-8 lg:w-[32rem] lg:shrink-0 lg:self-end">
            <ul>
              {golfTeaser.links.map((link) => (
                <li key={link.title} data-golf-topic className="relative">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/25" />
                  <span
                    aria-hidden
                    data-golf-line
                    className="absolute inset-x-0 top-0 h-px origin-left bg-white"
                  />
                  <Link
                    href={link.href}
                    className="group relative isolate -mx-4 flex items-start justify-between gap-6 overflow-hidden rounded-md px-4 py-4 transition-colors duration-700 ease-out-expo hover:text-ink focus-visible:text-ink"
                  >
                    {/* White panel that rises from the bottom on hover, reaching past the lines. */}
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 origin-bottom scale-y-0 rounded-md bg-white transition-transform duration-700 ease-out-expo group-hover:scale-y-100 group-focus-visible:scale-y-100"
                    />
                    <span className="flex flex-col gap-1.5">
                      <span className="block overflow-hidden">
                        <span data-golf-title className="block font-serif text-heading-6">
                          {link.title}
                        </span>
                      </span>
                      <span
                        data-golf-text
                        className="text-body-sm text-white/80 transition-colors duration-700 ease-out-expo group-hover:text-slate group-focus-visible:text-slate"
                      >
                        {link.description}
                      </span>
                    </span>
                    <span data-golf-arrow className="mt-1 block shrink-0">
                      <Icon
                        name="arrow-up-right"
                        className="size-5 transition-[transform,color] duration-700 ease-out-expo group-hover:rotate-45 group-hover:text-turquoise group-focus-visible:rotate-45 group-focus-visible:text-turquoise"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div data-golf-cta>
              <Button href={golfTeaser.cta.href} variant="primary" icon="arrow-up-right">
                {golfTeaser.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
