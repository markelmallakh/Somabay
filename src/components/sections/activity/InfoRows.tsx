import type { ReactNode } from "react";
import type { ImageAsset } from "@/types/media";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

type InfoRowsProps = {
  id: string;
  eyebrow: string;
  title: string;
  items: { title: string; description: string; image: ImageAsset }[];
  /** Beside the heading on the right (e.g. a brochure button). */
  aside?: ReactNode;
};

/**
 * Information rows on a white panel (first built for the Spa treatments): the heading, then one
 * row per item with a small photo, its number, and the name with a short description. The rows
 * are information only, not links.
 */
export function InfoRows({ id, eyebrow, title, items, aside }: InfoRowsProps) {
  return (
    <Section tone="white" aria-labelledby={id} className="bg-sand-100">
      <Container>
        <div className="rounded-md bg-white px-6 py-10 md:px-10 lg:px-12 lg:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal className="flex flex-col gap-4">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 id={id} className="text-heading-2">
                {title}
              </h2>
            </Reveal>
            {aside ? <Reveal delay={0.1}>{aside}</Reveal> : null}
          </div>

          <RevealGroup as="ul" className="mt-10 border-t border-line lg:mt-14">
            {items.map((item, index) => (
              <RevealItem as="li" key={item.title} className="border-b border-line">
                <div className="grid items-start gap-5 py-6 sm:grid-cols-[13rem_1fr] md:py-8 lg:grid-cols-12 lg:gap-6">
                  <span className="relative block h-24 w-52 overflow-hidden rounded-md bg-sand-200 lg:col-span-4">
                    <ResponsiveImage asset={item.image} sizes="13rem" fill />
                  </span>
                  <span className="flex gap-6 sm:col-start-2 lg:col-span-7 lg:col-start-6 lg:gap-10">
                    <span className="w-8 shrink-0 pt-1 text-heading-6 text-slate tabular-nums lg:w-12">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-col gap-2">
                      <span className="font-serif text-heading-5 leading-[1.2]">{item.title}</span>
                      <span className="max-w-md text-body-sm text-slate">{item.description}</span>
                    </span>
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
