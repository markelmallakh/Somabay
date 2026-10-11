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
      className="relative isolate flex h-svh min-h-[44rem] flex-col overflow-hidden bg-abyss text-white"
    >
      <HeroScenes scenes={hero.scenes} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-abyss/70 via-abyss/25 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-abyss/85 via-abyss/30 to-transparent"
      />

      <Container className="pointer-events-none relative flex flex-1 flex-col justify-between gap-10 pt-[calc(var(--header-height)+12vh)] pb-28 lg:flex-row lg:items-end lg:pb-24">
        <div className="pointer-events-auto max-w-3xl">
          <Reveal delay={0.2} distance={16}>
            <Eyebrow className="text-white/85">{hero.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeading
            as="h1"
            id="hero-title"
            trigger="load"
            delay={0.35}
            className="mt-6 text-display"
          >
            {hero.title}
          </SplitHeading>
        </div>
        <div className="pointer-events-auto w-full lg:max-w-md">
          <StartPanel label={hero.startLabel} options={hero.startOptions} />
        </div>
      </Container>
    </section>
  );
}
