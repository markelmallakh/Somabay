import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { ImageAsset } from "@/types/media";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: ImageAsset;
};

/** Consistent per-page metadata: title template, canonical URL and social cards. */
export function pageMetadata({ title, description, path, image }: PageMetadataInput): Metadata {
  const images = [image?.src ?? siteConfig.ogImage.src];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: `${title} | ${siteConfig.name}`,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
