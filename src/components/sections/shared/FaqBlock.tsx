import type { FaqItem } from "@/types/content";
import { routes } from "@/config/routes";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";

type FaqBlockProps = {
  /** `teal`: the deep-teal ground, white type (neighborhood pages, leading into the form). */
  tone?: "light" | "teal";
  items: FaqItem[];
  title?: string;
  description?: string;
};

/**
 * Embedded FAQ section (Marina, neighborhoods), in a split layout: a large serif title, a short
 * line and a link to all FAQs on the left; a minimal accordion on the right, ruled by hairlines
 * with a small chevron that turns as an answer opens.
 */
export function FaqBlock({
  items,
  title = "Frequently asked questions",
  description = "Have a question? We are here.",
  tone = "light",
}: FaqBlockProps) {
  const teal = tone === "teal";
  return (
    <Section
      tone={teal ? "abyss" : "white"}
      aria-labelledby="faq-title"
      className={teal ? "bg-turquoise-160" : undefined}
    >
      <Container className="grid gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col items-start gap-3 sm:gap-5 lg:col-span-4">
          <SplitHeading id="faq-title" className="text-heading-2 text-balance">
            {title}
          </SplitHeading>
          <Reveal delay={0.15} className="flex flex-col items-start gap-6">
            <p className={teal ? "text-body-md text-white/75" : "text-body-md text-slate"}>
              {description}
            </p>
            <Button
              href={routes.faqs}
              variant={teal ? "outline-light" : "outline"}
              size="sm"
              icon="arrow-right"
            >
              View all FAQs
            </Button>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion
            variant="minimal"
            tone={teal ? "dark" : "light"}
            defaultOpen={items[0] ? [items[0].id] : []}
            items={items.map((item) => ({
              id: item.id,
              title: item.question,
              content: item.answer,
            }))}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
