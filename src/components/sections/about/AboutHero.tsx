import { aboutHero } from "@/content/about";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Figma About "Heading" (493:18668): the full-bleed peninsula aerial under a soft dark wash, with
 * the eyebrow and title anchored bottom-left.
 */
export function AboutHero() {
  return (
    <section
      aria-labelledby="page-title"
      data-theme-surface="dark"
      data-sticky-hero=""
      className="relative isolate flex min-h-[max(36rem,min(100svh,61.4vw))] items-end overflow-hidden bg-abyss text-white"
    >
      <ResponsiveImage
        asset={aboutHero.image}
        sizes="100vw"
        quality={85}
        priority
        fill
        className="-z-10 animate-[hero-settle_2.4s_var(--ease-out-expo)_both]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.35),rgb(0_0_0/0)_22%,rgb(0_0_0/0)_55%,rgb(0_0_0/0.5))]"
      />
      <Container className="pt-(--header-height) pb-15">
        <Reveal distance={12}>
          <Eyebrow>{aboutHero.eyebrow}</Eyebrow>
        </Reveal>
        <SplitHeading
          as="h1"
          id="page-title"
          trigger="load"
          delay={0.25}
          className="mt-3 max-w-[38.75rem] text-heading-1 leading-[1.06]"
        >
          {aboutHero.title}
        </SplitHeading>
      </Container>
    </section>
  );
}
