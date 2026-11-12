import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { FaqList } from "@/components/sections/shared/FaqSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/routes";
import { faqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description: "Answers about staying, buying, living and visiting Somabay.",
  path: routes.faqs,
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageHero
        variant="title"
        eyebrow="Get answers for your inquiries"
        title="Frequently Asked Questions"
        description="Find answers about staying, buying, living, and visiting Somabay. Filter by category to get what you need."
      />
      <Section tone="white" className="bg-turquoise-5" aria-label="Questions">
        <Container>
          <FaqList items={faqs} filterable />
        </Container>
      </Section>
      <ContactCta />
    </>
  );
}
