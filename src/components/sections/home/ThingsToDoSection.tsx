import { routes } from "@/config/routes";
import { activities } from "@/content/experiences";
import { thingsToDoIntro } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ActivityStack } from "./ActivityStack";

export function ThingsToDoSection() {
  return (
    <Section aria-labelledby="things-title" tone="white">
      <Container>
        <SectionHeading
          id="things-title"
          align="center"
          title={thingsToDoIntro.title}
          description={thingsToDoIntro.description}
        />
        <div className="mt-14 md:mt-20">
          <ActivityStack>
            {activities.map((activity, index) => (
              <li
                key={activity.slug}
                data-stack-card
                className="md:sticky md:top-[calc(var(--header-height)+2rem)] md:pb-8"
              >
                <article
                  data-stack-inner
                  className="relative isolate flex min-h-[34rem] origin-top flex-col justify-between overflow-hidden bg-abyss p-6 text-white md:h-[calc(100svh-var(--header-height)-6rem)] md:max-h-[46rem] md:p-12"
                >
                  <ResponsiveImage
                    asset={activity.image}
                    sizes="(min-width: 1440px) 1300px, 100vw"
                    fill
                    className="-z-10"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-linear-to-r from-abyss/75 via-abyss/30 to-transparent"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-abyss/60 to-transparent"
                  />
                  <div className="flex items-center justify-between">
                    <Eyebrow className="text-white/85">{activity.eyebrow}</Eyebrow>
                    <span aria-hidden className="font-serif text-white/60">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(activities.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="max-w-lg">
                    <h3 className="text-h2">{activity.title}</h3>
                    <p className="mt-4 text-white/85">{activity.description}</p>
                    <Button
                      href={routes.activity(activity.slug)}
                      variant="outline-light"
                      className="mt-8"
                      aria-label={`${thingsToDoIntro.itemCtaLabel} ${activity.title}`}
                    >
                      {thingsToDoIntro.itemCtaLabel}
                    </Button>
                  </div>
                </article>
              </li>
            ))}
          </ActivityStack>
        </div>
        <Reveal className="mt-14 flex justify-center">
          <Button href={thingsToDoIntro.cta.href} variant="solid">
            {thingsToDoIntro.cta.label}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
