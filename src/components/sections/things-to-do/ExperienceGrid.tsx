import { neighborhoodsIntro } from "@/content/home";
import { Reveal } from "@/components/animations/Reveal";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { routes } from "@/config/routes";
import { activityDetails, experienceGrid } from "@/content/things-to-do";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

/**
 * The activities as a 3-column grid of photo cards (the overview sits in the hero above):
 * title and summary over a deep shade, with the turquoise action bar flooding up on hover.
 */
export function ExperienceGrid() {
  const items = experienceGrid.flatMap((slug) =>
    activityDetails.filter((item) => item.slug === slug),
  );
  return (
    <Section tone="white" aria-label="Things to do">
      <Container>
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {items.map((item, index) => (
            <li key={item.slug}>
              <Reveal delay={(index % 3) * 0.1} className="h-full">
                <PhotoCard
                  href={routes.activity(item.slug)}
                  image={item.card}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  title={item.title}
                  summary={item.summary}
                  action={neighborhoodsIntro.cardCta}
                  className="aspect-square h-full sm:aspect-[4/5]"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
