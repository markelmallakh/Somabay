import { resale } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";

export function ResaleSection() {
  const [primary, secondary, accent] = resale.images;
  return (
    <Section tone="white" aria-labelledby="resale-title">
      <Container>
        <Grid className="grid-cols-2 gap-y-10">
          <div className="col-span-2 md:col-span-6 lg:col-span-5">
            <SectionHeading
              id="resale-title"
              eyebrow={resale.eyebrow}
              title={resale.title}
              description={resale.description}
            >
              <div className="mt-3">
                <Button href={resale.cta.href} variant="outline">
                  {resale.cta.label}
                </Button>
              </div>
            </SectionHeading>
          </div>

          <ImageReveal
            from="right"
            className="relative col-span-2 aspect-[4/3] md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9"
          >
            <div className="absolute inset-0">
              <ResponsiveImage
                asset={accent}
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw"
                fill
              />
            </div>
          </ImageReveal>

          <ImageReveal
            parallax={6}
            className="relative col-span-1 aspect-[4/5] md:col-span-5 lg:col-span-4"
          >
            <div className="absolute inset-x-0 -inset-y-[8%]">
              <ResponsiveImage asset={primary} sizes="(min-width: 1024px) 30vw, 50vw" fill />
            </div>
          </ImageReveal>

          <ImageReveal
            parallax={6}
            delay={0.15}
            className="relative col-span-1 aspect-[4/5] md:col-span-5 md:mt-24 lg:col-span-4 lg:mt-32"
          >
            <div className="absolute inset-x-0 -inset-y-[8%]">
              <ResponsiveImage asset={secondary} sizes="(min-width: 1024px) 30vw, 50vw" fill />
            </div>
          </ImageReveal>
        </Grid>
      </Container>
    </Section>
  );
}
