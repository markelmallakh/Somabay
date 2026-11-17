import { leaders, leadershipIntro } from "@/content/about";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { LeadershipGrid } from "./LeadershipGrid";

export function LeadershipSection() {
  return (
    <Section tone="white" aria-labelledby="leadership-title">
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
      <div className="mt-6 sm:mt-10 lg:mt-12">
        <LeadershipGrid leaders={leaders} />
      </div>
    </Section>
  );
}
