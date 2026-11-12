import { aboutStory } from "@/content/about";
import { about } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { CountUp } from "@/components/animations/CountUp";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { StoryFan } from "./StoryFan";

/**
 * About story: the "Somabay Story" headline, three photos fanning out under it, the statement
 * set large and centred, then the three destination figures (Figma 498:18870) centred.
 */
export function StorySection() {
  return (
    <section aria-labelledby="story-title" className="bg-white text-ink">
      <Container className="pt-28 pb-16 lg:pt-32 lg:pb-24">
        <StoryFan
          title={aboutStory.eyebrow}
          paragraph={aboutStory.paragraph}
          photos={aboutStory.photos}
        >
          <RevealGroup
            as="ul"
            className="mx-auto grid max-w-[61rem] gap-10 py-15 sm:grid-cols-3 sm:gap-6 lg:gap-25"
          >
            {about.stats.map((stat) => (
              <RevealItem as="li" key={stat.value} className="flex flex-col gap-3">
                <p className="font-serif text-heading-2 leading-[1.2] whitespace-nowrap text-turquoise">
                  <CountUp value={stat.value} />
                </p>
                <p className="text-body-md text-slate">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </StoryFan>
      </Container>
    </section>
  );
}
