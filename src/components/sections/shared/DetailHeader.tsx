import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/types/media";
import { Container } from "@/components/layout/Container";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";
import { ShareButtons } from "@/components/ui/ShareButtons";

type DetailHeaderProps = {
  back: { label: string; href: string };
  title: string;
  /** Tag, location, date… */
  meta: ReactNode;
  image: ImageAsset;
  path: string;
};

/** Header for event and article pages: back link, title, meta, share and the lead image. */
export function DetailHeader({ back, title, meta, image, path }: DetailHeaderProps) {
  return (
    <header className="pt-[calc(var(--header-height)+3.5rem)]">
      <Container className="max-w-[78rem]">
        <Link
          href={back.href}
          className="eyebrow inline-flex items-center gap-2 text-lagoon hover:text-ink"
        >
          <Icon name="chevron-left" className="size-4" />
          {back.label}
        </Link>
        <Reveal className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 id="page-title" className="text-heading-1">
              {title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-body-sm text-slate">
              {meta}
            </div>
          </div>
          <ShareButtons path={path} title={title} className="shrink-0" />
        </Reveal>
        <ImageReveal className="relative mt-12 aspect-[1184/555] rounded-md">
          <div className="absolute inset-0">
            <ResponsiveImage
              asset={image}
              sizes="(min-width: 1280px) 1184px, 100vw"
              fill
              priority
            />
          </div>
        </ImageReveal>
      </Container>
    </header>
  );
}
