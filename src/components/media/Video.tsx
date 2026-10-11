"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { VideoAsset } from "@/types/media";
import { Icon } from "@/components/ui/Icon";
import { ResponsiveImage } from "./ResponsiveImage";

export type VideoProps = {
  asset: VideoAsset;
  /** `autoplay` and `in-view` are muted loops; `manual` shows native controls. */
  playback?: "autoplay" | "in-view" | "manual";
  /** Responsive sizes for the poster image. */
  sizes?: string;
  /** Marks the poster as the LCP candidate (hero only). */
  priority?: boolean;
  /** Allows a parent to pause the video while it is hidden (e.g. inactive slide). */
  active?: boolean;
  /** Renders a pause/play toggle — required for looping video longer than 5s (WCAG 2.2.2). */
  showToggle?: boolean;
  toggleClassName?: string;
  className?: string;
};

/**
 * Native HTML5 video with a poster-first loading strategy: the poster renders through
 * `next/image`, and the video sources are only attached once the element is near the viewport.
 * Muted loops respect `prefers-reduced-motion` (poster only until the visitor presses play).
 */
export function Video({
  asset,
  playback = "in-view",
  sizes = "100vw",
  priority = false,
  active = true,
  showToggle = false,
  toggleClassName,
  className,
}: VideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const near = useInView(wrapperRef, { rootMargin: playback === "autoplay" ? "0px" : "300px" });
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const isLoop = playback !== "manual";
  const paused = userPaused ?? reducedMotion;
  const wantsPlayback = isLoop && active && near && !paused;
  const attachSources = !isLoop || hasLoaded || wantsPlayback;

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !isLoop) return;
    if (wantsPlayback) {
      element.play().catch(() => {
        // Autoplay can be refused (low-power mode, data saver); the poster stays visible.
      });
    } else {
      element.pause();
    }
  }, [wantsPlayback, isLoop, attachSources]);

  return (
    <div ref={wrapperRef} className={cn("relative overflow-hidden", className)}>
      <ResponsiveImage asset={asset.poster} alt="" sizes={sizes} fill priority={priority} />
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-out-quart",
          isLoop && !hasLoaded && "opacity-0",
        )}
        poster={isLoop ? undefined : asset.poster.src}
        muted={isLoop || undefined}
        loop={isLoop}
        playsInline
        controls={!isLoop}
        preload={isLoop ? (playback === "autoplay" ? "auto" : "metadata") : "none"}
        aria-label={isLoop ? undefined : asset.label}
        aria-hidden={isLoop ? true : undefined}
        tabIndex={isLoop ? -1 : undefined}
        disablePictureInPicture={isLoop}
        onLoadedData={() => setHasLoaded(true)}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {attachSources
          ? asset.sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} media={source.media} />
            ))
          : null}
      </video>
      {isLoop && showToggle ? (
        <button
          type="button"
          onClick={() => setUserPaused(isPlaying || wantsPlayback)}
          className={cn(
            "absolute z-10 grid size-10 place-items-center rounded-full glass text-white transition-colors duration-300 hover:bg-white hover:text-ink",
            toggleClassName,
          )}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
        >
          <Icon name={isPlaying ? "pause" : "play"} className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
