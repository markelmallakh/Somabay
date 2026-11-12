import { educationIntro, schools } from "@/content/facilities-page";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { TextLink } from "@/components/ui/TextLink";

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
        <div className="mt-10 grid gap-12 md:mt-12 md:grid-cols-2 md:gap-6">
          {schools.map((school, index) => (
            <article key={school.name} className="flex flex-col">
              <ImageReveal
                from={index % 2 ? "right" : "left"}
                className="relative aspect-[4/3] rounded-card lg:aspect-[16/11] lg:rounded-media"
              >
                <div className="absolute inset-0">
                  <ResponsiveImage
                    asset={school.image}
                    sizes="(min-width: 768px) 46vw, 100vw"
                    fill
                  />
                </div>
              </ImageReveal>
              <Reveal className="flex flex-1 flex-col pt-7 md:pr-8">
                <h3 className="text-heading-5">{school.name}</h3>
                <p className="mt-4 text-slate">{school.description}</p>
                <div className="mt-auto pt-6">
                  <TextLink href={school.website.href} external>
                    {school.website.label}
                  </TextLink>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
