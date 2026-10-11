"use client";

import { type Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useGsap } from "@/hooks/useGsap";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { VideoAsset } from "@/types/media";
import { ResponsiveImage } from "./ResponsiveImage";

export type ScrubController = {
  /** Moves playback to `progress` (0–1) of the clip. */
  seek: (progress: number) => void;
};

type ScrollScrubVideoProps = {
  asset: VideoAsset;
  sizes?: string;
  className?: string;
  /**
   * `self`: scrubs while the element travels through the viewport.
   * `external`: a parent drives playback through `controllerRef` (e.g. inside a pinned timeline).
   */
  mode?: "self" | "external";
  controllerRef?: Ref<ScrubController>;
};

/**
 * Ties a muted clip's playback position to the scroll position. The clip should be encoded with
 * a short keyframe interval (see README) so seeking stays smooth. Under reduced motion only the
 * poster is shown.
 */
export function ScrollScrubVideo({
  asset,
  sizes = "100vw",
  className,
  mode = "self",
  controllerRef,
}: ScrollScrubVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const pending = useRef(0);

  const seekTo = useCallback((progress: number) => {
    pending.current = progress;
    const element = videoRef.current;
    if (!element || !Number.isFinite(element.duration) || element.readyState < 1) return;
    const target = Math.min(element.duration - 0.05, Math.max(0, progress * element.duration));
    if (Math.abs(element.currentTime - target) > 0.01) element.currentTime = target;
  }, []);

  const wrapperRef = useGsap<HTMLDivElement>(
    ({ scope, reducedMotion: reduced }) => {
      if (mode !== "self" || reduced) return;
      ScrollTrigger.create({
        trigger: scope,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => seekTo(self.progress),
      });
    },
    [mode, seekTo],
  );

  const near = useInView(wrapperRef, { rootMargin: "800px", once: true });

  useImperativeHandle(controllerRef, () => ({ seek: seekTo }), [seekTo]);

  useEffect(() => {
    if (ready) seekTo(pending.current);
  }, [ready, seekTo]);

  const showVideo = near && !reducedMotion;

  return (
    <div ref={wrapperRef} className={cn("relative overflow-hidden", className)}>
      <ResponsiveImage asset={asset.poster} alt="" sizes={sizes} fill />
      {showVideo ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-700",
            !ready && "opacity-0",
          )}
          muted
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
          disablePictureInPicture
          onLoadedData={(event) => {
            const element = event.currentTarget;
            // Some mobile browsers only paint seeked frames after playback has started once.
            element
              .play()
              .then(() => element.pause())
              .catch(() => undefined)
              .finally(() => setReady(true));
          }}
        >
          {asset.sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} media={source.media} />
          ))}
        </video>
      ) : null}
    </div>
  );
}
