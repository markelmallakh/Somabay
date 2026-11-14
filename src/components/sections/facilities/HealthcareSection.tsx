import { healthcareIntro, healthcareServices } from "@/content/facilities-page";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Chip } from "@/components/ui/Chip";

/** Heading row (title left, intro right) over three compact rounded service cards. */
export function HealthcareSection() {
  return (
    <Section
      id="healthcare"
      tone="white"
      aria-labelledby="healthcare-title"
      className="scroll-mt-(--header-height) bg-turquoise-5"
    >
      <Container>
        <HeadingRow
          id="healthcare-title"
          eyebrow={healthcareIntro.eyebrow}
          title={healthcareIntro.title}
          description={healthcareIntro.description}
        />
        <RevealGroup as="ul" className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {healthcareServices.map((service, index) => (
            <RevealItem
              as="li"
              key={service.title}
              className="group flex flex-col overflow-hidden rounded-md bg-white transition-shadow duration-700 ease-out-expo hover:shadow-card"
            >
              <ImageReveal
                from={index % 2 ? "top" : "bottom"}
                className="relative aspect-[4/3] md:aspect-[4/5]"
              >
                <div className="absolute inset-0">
                  <ResponsiveImage
                    asset={service.image}
                    sizes="(min-width: 768px) 30vw, 100vw"
                    fill
                  />
                </div>
              </ImageReveal>
              <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
                <h3 className="font-serif text-heading-5">{service.title}</h3>
                <p className="text-slate">{service.description}</p>
                <p className="mt-auto pt-3">
                  <Chip accent="warm-grey">{service.hours}</Chip>
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
