import { contactCta } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";

export function ContactCta() {
  return (
    <Section spacing="compact" aria-labelledby="cta-title">
      <Container>
        <div className="grid items-center gap-10 bg-sand-200 p-6 md:grid-cols-12 md:gap-6 md:p-12 lg:p-16">
          <div className="md:col-span-7">
            <SectionHeading
              id="cta-title"
              title={contactCta.title}
              description={contactCta.description}
            >
              <div className="mt-3">
                <Button href={contactCta.cta.href} variant="solid">
                  {contactCta.cta.label}
                </Button>
              </div>
            </SectionHeading>
          </div>
          <ImageReveal from="right" className="relative aspect-[4/3] md:col-span-5">
            <div className="absolute inset-0">
              <ResponsiveImage
                asset={contactCta.image}
                sizes="(min-width: 768px) 40vw, 100vw"
                fill
              />
            </div>
          </ImageReveal>
        </div>
      </Container>
    </Section>
  );
}
