import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/media";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon, type IconName } from "@/components/ui/Icon";

export type FeatureInfo = { icon: IconName; text: string; href?: string };

type FeatureBannerProps = {
  image: ImageAsset;
  title: string;
  description?: string;
  /** Optional sub-heading + bullet list (e.g. Key Features). */
  list?: { title: string; items: string[] };
  info?: FeatureInfo[];
  /** Footer action inside the card. */
  action?: ReactNode;
  side?: "left" | "right";
  headingLevel?: "h2" | "h3";
  className?: string;
};

/** Wide image with a floating white card; cards alternate sides down the page. */
export function FeatureBanner({
  image,
  title,
  description,
  list,
  info,
  action,
  side = "left",
  headingLevel: Heading = "h3",
  className,
}: FeatureBannerProps) {
  return (
    <article className={cn("relative lg:min-h-[34rem]", className)}>
      <ImageReveal className="relative aspect-[16/10] rounded-card lg:absolute lg:inset-0 lg:aspect-auto lg:rounded-media">
        <div className="absolute inset-0">
          <ResponsiveImage asset={image} sizes="(min-width: 1440px) 1300px, 100vw" fill />
        </div>
      </ImageReveal>
      <Reveal
        className={cn(
          "relative z-10 mx-4 -mt-16 rounded-card bg-white p-6 shadow-soft sm:mx-8 md:p-8 lg:absolute lg:bottom-8 lg:mx-0 lg:mt-0 lg:w-[34rem]",
          side === "left" ? "lg:left-8" : "lg:right-8",
        )}
      >
        <Heading className="font-serif text-h3">{title}</Heading>
        {description ? <p className="mt-3 text-slate">{description}</p> : null}
        {list ? (
          <div className="mt-5">
            <p className="font-serif text-h4">{list.title}</p>
            <ul className="mt-3 flex flex-col gap-2 text-slate">
              {list.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-turquoise"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {info && info.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5 text-caption text-slate">
            {info.map((entry) => (
              <li key={entry.text} className="flex items-center gap-2">
                <Icon name={entry.icon} className="size-4.5 text-lagoon" />
                {entry.href ? (
                  <a href={entry.href} className="hover:text-ink">
                    {entry.text}
                  </a>
                ) : (
                  entry.text
                )}
              </li>
            ))}
          </ul>
        ) : null}
        {action ? <div className="mt-6 border-t border-line pt-5">{action}</div> : null}
      </Reveal>
    </article>
  );
}
