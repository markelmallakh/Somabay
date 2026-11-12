"use client";

import { m } from "framer-motion";
import type { Highlight, SectionIntro } from "@/types/content";
import { neighborhoodsIntro } from "@/content/home";
import { easeOutExpo } from "@/components/animations/easing";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";

type MoreToExperienceProps = {
  intro: SectionIntro;
  items: Highlight[];
};

/**
 * "More To Experience" on white: a centred heading over two photo cards that wipe up into view
 * one after the other, each photo settling from a gentle zoom.
 */
export function MoreToExperience({ intro, items }: MoreToExperienceProps) {
  return (
    <Section tone="white" aria-labelledby="more-title">
      <Container>
        <SectionHeading
          id="more-title"
          align="center"
          title={intro.title}
          description={intro.description}
        />
        <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-6">
          {items.map((item, index) => (
            // The list item (never clipped) watches the viewport; the clipped card can't, as a
            // fully clipped element never counts as in view.
            <m.li
              key={item.href}
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.35 }}
            >
              <m.div
                variants={{
                  hidden: { clipPath: "inset(100% 0% 0% 0% round 0.75rem)", y: 40 },
                  shown: { clipPath: "inset(0% 0% 0% 0% round 0.75rem)", y: 0 },
                }}
                transition={{ duration: 1.2, ease: easeOutExpo, delay: index * 0.15 }}
              >
                <m.div
                  variants={{ hidden: { scale: 1.15 }, shown: { scale: 1 } }}
                  transition={{ duration: 1.8, ease: easeOutExpo, delay: index * 0.15 }}
                >
                  <PhotoCard
                    href={item.href}
                    image={item.image}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    title={item.title}
                    action={neighborhoodsIntro.cardCta}
                    className="aspect-[3/2]"
                  />
                </m.div>
              </m.div>
            </m.li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
