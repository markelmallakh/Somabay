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
      <Container className="pt-14 pb-10 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-24">
        <StoryFan
          title={aboutStory.eyebrow}
          paragraph={aboutStory.paragraph}
          photos={aboutStory.photos}
        >
          <RevealGroup
            as="ul"
            className="mx-auto grid max-w-[61rem] divide-y divide-line border-y border-line sm:grid-cols-3 sm:gap-6 sm:divide-y-0 sm:border-y-0 sm:py-15 lg:gap-25"
          >
            {about.stats.map((stat) => (
              // Phones: one hairline row per figure, the number left and its label right.
              <RevealItem
                as="li"
                key={stat.value}
                className="flex items-center justify-between gap-6 py-4 sm:flex-col sm:items-start sm:justify-start sm:gap-3 sm:py-0"
              >
                <p className="font-serif text-heading-3 whitespace-nowrap text-turquoise sm:text-heading-2">
                  <CountUp value={stat.value} />
                </p>
                <p className="max-w-[11rem] text-right text-body-sm text-slate sm:max-w-none sm:text-left sm:text-body-md">
                  {stat.label}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </StoryFan>
      </Container>
    </section>
  );
}
