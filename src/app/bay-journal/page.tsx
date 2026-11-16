import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { JournalGrid } from "@/components/sections/journal/JournalGrid";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { routes } from "@/config/routes";
import { articles } from "@/content/journal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Somabay Journal",
  description: "Stories, insights, and the latest from life by the Red Sea.",
  path: routes.journal,
});

export default function JournalPage() {
  return (
    <>
      <PageHero variant="title" align="center" eyebrow="What’s Up Soma" title="Somabay Journal" />
      <Section spacing="none" className="pb-section" aria-label="Articles">
        <h2 className="sr-only">Articles</h2>
        <Container>
          <JournalGrid articles={articles} />
        </Container>
      </Section>
      <ContactCta />
    </>
  );
}
