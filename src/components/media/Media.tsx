import type { MediaAsset, VideoPlayback } from "@/types/media";
import { ResponsiveImage } from "./ResponsiveImage";
import { ScrollScrubVideo } from "./ScrollScrubVideo";
import { Video } from "./Video";

type MediaProps = {
  asset: MediaAsset;
  sizes: string;
  /** Video behaviour; ignored for images. */
  playback?: VideoPlayback;
  priority?: boolean;
  className?: string;
};

/**
 * One entry point for any media slot. Content decides whether a slot holds an image or a video
 * (and how that video plays) without the surrounding section changing.
 * Renders filling its positioned parent.
 */
export function Media({ asset, sizes, playback = "in-view", priority, className }: MediaProps) {
  if (asset.type === "image") {
    return (
      <ResponsiveImage asset={asset} sizes={sizes} fill priority={priority} className={className} />
    );
  }
  if (playback === "scroll-scrub") {
    return <ScrollScrubVideo asset={asset} sizes={sizes} className={className} />;
  }
  return (
    <Video
      asset={asset}
      playback={playback}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
