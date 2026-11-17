import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { OfficesMap } from "./OfficesMap";

/** "Our Offices": a short heading, then the offices map edge to edge with their open cards. */
export function ContactOffices() {
  return (
    <section aria-labelledby="offices-title" className="bg-white pt-section text-ink">
      <Container className="pb-6 md:pb-8">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Visit us</Eyebrow>
          <h2 id="offices-title" className="text-heading-2">
            Our Offices
          </h2>
        </Reveal>
      </Container>
      <OfficesMap />
    </section>
  );
}
