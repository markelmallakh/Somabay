import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/media";
import { ResponsiveImage } from "./ResponsiveImage";

type ImageMarqueeProps = {
  rows: ImageAsset[][];
  className?: string;
};

/**
 * Endless rows of images drifting in alternating directions. Pure CSS (paused for reduced
 * motion by the global media query); each row is duplicated once for a seamless loop.
 */
export function ImageMarquee({ rows, className }: ImageMarqueeProps) {
  return (
    <div aria-hidden className={cn("flex flex-col gap-4 overflow-hidden", className)}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={cn(
            "flex w-max animate-marquee gap-4",
            rowIndex % 2 === 1 && "[animation-direction:reverse] [animation-duration:56s]",
          )}
        >
          {[...row, ...row].map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="relative aspect-[416/340] w-[clamp(15rem,29vw,26rem)] shrink-0 overflow-hidden"
            >
              <ResponsiveImage asset={image} alt="" sizes="(min-width: 768px) 29vw, 15rem" fill />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
