import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { MediaAsset, VideoPlayback } from "@/types/media";
import type { NavLink } from "@/types/navigation";
import { Container } from "@/components/layout/Container";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { Media } from "@/components/media/Media";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Eyebrow";

type BaseProps = {
  eyebrow?: string;
  /** One string, or several lines that each start on a new line. */
  title: string | readonly string[];
  description?: ReactNode;
  /** Extra content under the description (usually a button). */
  actions?: ReactNode;
  breadcrumbs?: NavLink[];
  id?: string;
};

type MediaHeroProps = BaseProps & {
  /**
   * Both variants share one layout: title bottom-left, copy bottom-right (site-wide left
   * alignment). `centered` is kept as an alias so existing pages don't change.
   */
  variant: "split" | "centered";
  media: MediaAsset;
  playback?: VideoPlayback;
  /** `screen` fills the viewport; `band` is a shorter banner. */
  height?: "screen" | "band";
};

type TitleHeroProps = BaseProps & {
  /** No media: left-aligned title block on the page background (listings, FAQ). */
  variant: "title";
};

export type PageHeroProps = MediaHeroProps | TitleHeroProps;

function Heading({
  title,
  id,
  className,
}: {
  title: string | readonly string[];
  id: string;
  className?: string;
}) {
  return (
    <SplitHeading as="h1" id={id} trigger="load" delay={0.3} className={className}>
      {typeof title === "string"
        ? title
        : title.map((line, index) => (
            <span key={line} className="block lg:whitespace-nowrap">
              {index > 0 ? " " : null}
              {line}
            </span>
          ))}
    </SplitHeading>
  );
}

export function PageHero(props: PageHeroProps) {
  const { eyebrow, title, description, actions, breadcrumbs, id = "page-title" } = props;

  if (props.variant === "title") {
    return (
      <section
        aria-labelledby={id}
        className="bg-sand-50 pt-[calc(var(--header-height)+4rem)] pb-14 md:pb-20"
      >
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-10" /> : null}
            {eyebrow ? (
              <Reveal distance={12}>
                <Eyebrow>{eyebrow}</Eyebrow>
              </Reveal>
            ) : null}
            <Heading title={title} id={id} className="mt-5 text-heading-1" />
          </div>
          {description || actions ? (
            <Reveal delay={0.25} className="max-w-md lg:pb-2">
              {description ? <p className="text-lead text-slate">{description}</p> : null}
              {actions ? <div className="mt-7">{actions}</div> : null}
            </Reveal>
          ) : null}
        </Container>
      </section>
    );
  }

  const { media, playback = "autoplay", height = "screen" } = props;

  return (
    <section
      aria-labelledby={id}
      data-theme-surface="dark"
      className={cn(
        "relative isolate flex overflow-hidden bg-abyss text-white",
        height === "screen" ? "h-svh min-h-[40rem]" : "h-[60svh] max-h-[42rem] min-h-[30rem]",
      )}
    >
      <Parallax mode="hero" amount={10} className="absolute inset-0 -z-20">
        <Media
          asset={media}
          playback={playback}
          sizes="100vw"
          priority
          className="absolute inset-0"
        />
      </Parallax>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.55)_0%,rgb(0_0_0/0.18)_16%,rgb(0_0_0/0)_32%,rgb(0_0_0/0)_48%,rgb(0_0_0/0.35)_68%,rgb(0_0_0/0.82)_100%)]"
      />

      <Container className="flex flex-col justify-end gap-8 pt-(--header-height) pb-14 md:pb-20 lg:flex-row lg:items-end lg:justify-between">
        <div className={typeof title === "string" ? "max-w-3xl" : "max-w-5xl"}>
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} tone="light" className="mb-8" /> : null}
          {eyebrow ? (
            <Reveal distance={12} delay={0.15}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          ) : null}
          <Heading title={title} id={id} className="mt-5 text-heading-1" />
        </div>
        {description || actions ? (
          <Reveal delay={0.45} className="max-w-md lg:pb-3">
            {description ? <p className="text-lead text-white/80">{description}</p> : null}
            {actions ? <div className="mt-7">{actions}</div> : null}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
