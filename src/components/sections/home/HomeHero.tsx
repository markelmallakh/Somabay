import { hero } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { Reveal } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroScenes } from "./HeroScenes";
import { StartCards } from "./StartCards";

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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.5)_0%,rgb(0_0_0/0.2)_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 via-black/25 to-transparent"
      />

      <Container className="pointer-events-none relative flex flex-1 flex-col justify-between gap-10 pt-[calc(var(--header-height)+clamp(3rem,12vh,8.75rem))] pb-28 lg:flex-row lg:items-end lg:justify-end lg:pb-8">
        {/* The headline sits centred in the hero; the start cards hold the bottom-right corner. */}
        <div className="pointer-events-auto text-center lg:absolute lg:inset-x-0 lg:top-1/2 lg:-translate-y-1/2">
          <Reveal delay={0.2} distance={16} className="flex justify-center">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </Reveal>
          <SplitHeading
            as="h1"
            id="hero-title"
            trigger="load"
            delay={0.35}
            className="mx-auto mt-3 max-w-[9em] text-[clamp(3.25rem,7.7vw,9.25rem)] leading-[1] text-balance"
          >
            {hero.title}
          </SplitHeading>
        </div>
        {/* The start choices: three portrait cards, bottom-right, opposite the Day/Night toggle. */}
        <div className="pointer-events-auto w-full lg:w-auto">
          <StartCards label={hero.startLabel} options={hero.startOptions} />
        </div>
      </Container>
    </section>
  );
}
