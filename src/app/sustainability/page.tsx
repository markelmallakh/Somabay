import { Container } from "@/components/layout/Container";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { Section } from "@/components/layout/Section";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ScrollRevealText } from "@/components/animations/ScrollRevealText";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { ScrollExpandVideo } from "@/components/media/ScrollExpandVideo";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Chip } from "@/components/ui/Chip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { routes } from "@/config/routes";
import {
  approach,
  developmentIntro,
  developmentTiles,
  sustainabilityFilm,
  sustainabilityHero,
  sustainabilityOverview,
} from "@/content/sustainability";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Community & Sustainability",
  description:
    "How Somabay balances thoughtful development with protecting the Red Sea, its coastline and desert landscapes for generations to come.",
  path: routes.sustainability,
});

export default function SustainabilityPage() {
  const [first, second, third, fourth, fifth, sixth] = developmentTiles;
  const nature = approach.pillars.find((pillar) => pillar.title === "Natural Environment");

  const tile = (item: (typeof developmentTiles)[number]) => (
    <RevealItem
      key={item.label}
      className={cn(
        "group relative overflow-hidden rounded-md",
        item.size === "wide" ? "col-span-2 aspect-[632/300]" : "aspect-square",
      )}
    >
      <ResponsiveImage
        asset={item.image}
        sizes={
          item.size === "wide"
            ? "(min-width: 1024px) 44vw, 100vw"
            : "(min-width: 1024px) 22vw, 50vw"
        }
        fill
        className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
      />
      <Chip
        tone="light"
        className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] leading-tight whitespace-normal sm:bottom-4 sm:left-4"
      >
        {item.label}
      </Chip>
    </RevealItem>
  );

  return (
    <>
      <PageHero
        variant="centered"
        height="band"
        eyebrow={sustainabilityHero.eyebrow}
        title={sustainabilityHero.title}
        media={sustainabilityHero.image}
      />

      <Section tone="white" spacing="compact" aria-labelledby="overview-title">
        <Container>
          <Eyebrow as="h2">
            <span id="overview-title">Overview</span>
          </Eyebrow>
          <ScrollRevealText
            text={sustainabilityOverview}
            leadWords={15}
            className="mt-6 max-w-4xl"
          />
        </Container>
      </Section>

      {nature ? (
        <ScrollExpandVideo
          id="nature-title"
          video={sustainabilityFilm}
          eyebrow={sustainabilityHero.eyebrow}
          title={nature.title}
          description={nature.description}
        />
      ) : null}

      <section aria-labelledby="approach-title" className="bg-turquoise-5 py-section text-ink">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-height)+3rem)]">
              <Reveal className="flex flex-col gap-5">
                <h2 id="approach-title" className="text-heading-2">
                  {approach.title}
                </h2>
                <p className="max-w-md text-lead text-slate">{approach.intro}</p>
              </Reveal>
              <ImageReveal className="relative mt-8 aspect-[4/3] rounded-md">
                <div className="absolute inset-0">
                  <ResponsiveImage
                    asset={approach.image}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    fill
                  />
                </div>
              </ImageReveal>
            </div>
          </div>
          <RevealGroup as="ol" className="flex flex-col gap-3 lg:col-span-6 lg:col-start-7">
            {approach.pillars.map((pillar, index) => (
              <RevealItem
                as="li"
                key={pillar.title}
                className="flex gap-5 rounded-md bg-white p-6 md:gap-8 md:p-8"
              >
                <span
                  aria-hidden
                  className="font-serif text-heading-6 leading-none text-turquoise tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-heading-6">{pillar.title}</h3>
                  <p className="mt-2 text-slate">{pillar.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <Section tone="white" aria-labelledby="development-title">
        <Container>
          <HeadingRow
            id="development-title"
            eyebrow={developmentIntro.eyebrow}
            title={developmentIntro.title}
            description={developmentIntro.description}
          />
          <div className="mt-10 grid gap-3 md:mt-14 lg:grid-cols-2 lg:gap-4">
            <RevealGroup className="grid grid-cols-2 gap-3 lg:gap-4">
              {tile(first)}
              {tile(second)}
              {tile(third)}
            </RevealGroup>
            <RevealGroup className="grid grid-cols-2 gap-3 lg:gap-4">
              {tile(fourth)}
              {tile(fifth)}
              {tile(sixth)}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
