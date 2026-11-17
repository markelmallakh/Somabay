import { educationIntro } from "@/content/facilities-page";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SchoolsStack } from "./SchoolsStack";

export function EducationSection() {
  return (
    <Section
      id="education"
      tone="white"
      aria-labelledby="education-title"
      className="scroll-mt-(--header-height)"
    >
      <Container>
        <HeadingRow
          id="education-title"
          eyebrow={educationIntro.eyebrow}
          title={educationIntro.title}
          description={educationIntro.description}
        />
        <SchoolsStack />
      </Container>
    </Section>
  );
}
