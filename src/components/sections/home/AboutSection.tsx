import { about } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AboutStats } from "./AboutStats";
import { AboutStory } from "./AboutStory";

export function AboutSection() {
  return (
    <Section aria-labelledby="about-title" spacing="none" className="pt-section">
      <Container className="grid gap-10 pb-16 lg:grid-cols-12 lg:gap-6 lg:pb-24">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow className="text-lagoon">{about.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeading id="about-title" className="mt-6 max-w-xl text-h1">
            {about.title}
          </SplitHeading>
        </div>
        <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-lead text-slate">{about.description}</p>
        </Reveal>
      </Container>
      <AboutStory
        story={about.story}
        film={about.film}
        aside={<AboutStats stats={about.stats} cta={about.cta} />}
      />
    </Section>
  );
}
