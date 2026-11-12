import { leaders, leadershipIntro } from "@/content/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { LeadershipGrid } from "./LeadershipGrid";

export function LeadershipSection() {
  return (
    <Section tone="white" aria-labelledby="leadership-title" spacing="none" className="py-30">
      <Container>
        <SectionHeading
          id="leadership-title"
          className="max-w-[60rem]"
          align="center"
          eyebrow={leadershipIntro.eyebrow}
          title={leadershipIntro.title}
          description={leadershipIntro.description}
        />
      </Container>
      {/* Full width so the carousel runs off the edge; it aligns itself to the site grid. */}
      <div className="mt-14 md:mt-16">
        <LeadershipGrid leaders={leaders} />
      </div>
    </Section>
  );
}
