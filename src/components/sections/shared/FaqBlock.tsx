import type { FaqItem } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FaqList } from "./FaqSection";

type FaqBlockProps = {
  items: FaqItem[];
  title?: string;
  description?: string;
};

/** Embedded FAQ section (Marina, neighborhoods). */
export function FaqBlock({
  items,
  title = "FAQs",
  description = "Have a question? We are here.",
}: FaqBlockProps) {
  return (
    <Section tone="stone" aria-labelledby="faq-title">
      <Container>
        <SectionHeading id="faq-title" align="center" title={title} description={description} />
        <div className="mt-12">
          <FaqList items={items} />
        </div>
      </Container>
    </Section>
  );
}
