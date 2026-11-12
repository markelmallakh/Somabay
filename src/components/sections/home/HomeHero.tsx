import { hero } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { Reveal } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroScenes } from "./HeroScenes";
import { StartPanel } from "./StartPanel";

export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-theme-surface="dark"
      className="sticky top-0 isolate flex h-svh min-h-[44rem] flex-col overflow-hidden bg-black text-white"
    >
      <HeroScenes scenes={hero.scenes} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/75 via-black/30 via-45% to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 via-black/25 to-transparent"
      />

      <Container className="pointer-events-none relative flex flex-1 flex-col justify-between gap-10 pt-[calc(var(--header-height)+clamp(3rem,12vh,8.75rem))] pb-28 lg:flex-row lg:items-end lg:pb-8">
        <div className="pointer-events-auto max-w-[38.75rem] lg:self-start">
          <Reveal delay={0.2} distance={16}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeading
            as="h1"
            id="hero-title"
            trigger="load"
            delay={0.35}
            className="mt-2 text-heading-1"
          >
            {hero.title}
          </SplitHeading>
        </div>
        <div className="pointer-events-auto w-full lg:max-w-[26rem]">
          <StartPanel label={hero.startLabel} options={hero.startOptions} />
        </div>
      </Container>
    </section>
  );
}
