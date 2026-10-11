import { mediaManifest, type ImagePath } from "@/content/media-manifest";
import type { ImageAsset, VideoAsset, VideoSource } from "@/types/media";

type ImageOptions = {
  position?: string;
};

/** Builds a typed image asset from the generated manifest (size + blur placeholder). */
export function image(src: ImagePath, alt: string, options: ImageOptions = {}): ImageAsset {
  const { width, height, blurDataURL } = mediaManifest[src];
  return { type: "image", src, alt, width, height, blurDataURL, ...options };
}

type VideoOptions = {
  sources: VideoSource[];
  poster: ImageAsset;
  label: string;
  hasAudio?: boolean;
};

export function video({ sources, poster, label, hasAudio = false }: VideoOptions): VideoAsset {
  return {
    type: "video",
    sources,
    poster,
    label,
    hasAudio,
    width: poster.width,
    height: poster.height,
  };
}
