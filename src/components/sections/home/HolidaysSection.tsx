import { holidaysIntro } from "@/content/home";
import { hotelHref, hotels } from "@/content/hotels";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HotelsShowcase } from "./HotelsShowcase";

export function HolidaysSection() {
  return (
    <Section
      tone="abyss"
      spacing="none"
      aria-labelledby="holidays-title"
      className="overflow-hidden py-section lg:py-0"
    >
      <Container size="wide">
        <HotelsShowcase
          hotels={hotels}
          hrefs={hotels.map(hotelHref)}
          ctaLabel={holidaysIntro.cta.label}
          heading={
            <>
              <Eyebrow className="text-white/70">{holidaysIntro.eyebrow}</Eyebrow>
              <h2 id="holidays-title" className="mt-4 text-h2">
                {holidaysIntro.title}
              </h2>
            </>
          }
        />
      </Container>
    </Section>
  );
}
