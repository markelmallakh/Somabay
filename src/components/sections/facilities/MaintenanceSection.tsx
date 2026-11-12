import { maintenance } from "@/content/facilities-page";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Chip } from "@/components/ui/Chip";

/** Heading row over a wide rounded photo with a floating rounded service card. */
export function MaintenanceSection() {
  return (
    <Section
      id="maintenance"
      tone="white"
      aria-labelledby="maintenance-title"
      className="scroll-mt-(--header-height) bg-sand-100"
    >
      <Container>
        <HeadingRow
          id="maintenance-title"
          eyebrow={maintenance.eyebrow}
          title={maintenance.title}
          description={maintenance.description}
        />
        <article className="relative mt-10 md:mt-12 lg:min-h-[38rem]">
          <ImageReveal className="relative aspect-[16/10] rounded-card lg:absolute lg:inset-0 lg:aspect-auto lg:rounded-media">
            <div className="absolute inset-0">
              <ResponsiveImage
                asset={maintenance.image}
                sizes="(min-width: 1512px) 1392px, 100vw"
                fill
              />
            </div>
          </ImageReveal>
          <Reveal className="relative z-10 mx-4 -mt-14 flex flex-col gap-3 rounded-card bg-white p-6 shadow-[0_12px_40px_rgb(18_58_70/0.12)] sm:mx-8 md:p-8 lg:absolute lg:right-8 lg:bottom-8 lg:mx-0 lg:mt-0 lg:w-[32rem]">
            <h3 className="font-serif text-h3">{maintenance.card.title}</h3>
            <p className="text-slate">{maintenance.card.description}</p>
            <p className="pt-2">
              <Chip>{maintenance.card.hours}</Chip>
            </p>
          </Reveal>
        </article>
      </Container>
    </Section>
  );
}
