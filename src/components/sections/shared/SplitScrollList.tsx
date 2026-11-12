import type { ReactNode } from "react";
import type { SectionIntro } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { Section, type SectionTone } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";

type SplitScrollListProps = {
  id: string;
  intro: SectionIntro;
  /** The list (rendered by the caller so rows can open drawers or links). */
  children: ReactNode;
  tone?: SectionTone;
};

/**
 * Intro on the left, a list on the right. On large screens the intro stays pinned while the
 * list scrolls past it (Marina retail, neighborhood amenities).
 */
export function SplitScrollList({ id, intro, children, tone = "white" }: SplitScrollListProps) {
  return (
    <Section tone={tone} aria-labelledby={id}>
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+3rem)]">
            <SectionHeading
              id={id}
              eyebrow={intro.eyebrow}
              title={intro.title}
              description={intro.description}
            />
          </div>
        </div>
        <div className="lg:col-span-7">{children}</div>
      </Container>
    </Section>
  );
}
