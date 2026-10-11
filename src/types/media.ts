export type ImageAsset = {
  type: "image";
  src: string;
  /** Meaningful description, or an empty string when the image is purely decorative. */
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  /** CSS object-position used when the image is cropped by `fill`. */
  position?: string;
};

export type VideoSource = {
  src: string;
  type?: "video/webm" | "video/mp4";
  /** Media query for responsive sources, e.g. "(max-width: 767px)". */
  media?: string;
};

export type VideoAsset = {
  type: "video";
  sources: VideoSource[];
  /** Shown before playback, when autoplay is not allowed and under reduced motion. */
  poster: ImageAsset;
  width: number;
  height: number;
  /** Accessible description of what the video shows. */
  label: string;
  hasAudio?: boolean;
};

export type MediaAsset = ImageAsset | VideoAsset;

/**
 * How a video behaves on the page:
 * - `autoplay`     muted loop that starts immediately (above-the-fold heroes)
 * - `in-view`      muted loop that only plays while visible
 * - `scroll-scrub` playback position follows the scroll position
 * - `manual`       user-controlled with native controls (films with sound)
 */
export type VideoPlayback = "autoplay" | "in-view" | "scroll-scrub" | "manual";
