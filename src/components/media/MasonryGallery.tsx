import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/media";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ResponsiveImage } from "./ResponsiveImage";

type MasonryGalleryProps = {
  /** Seven images: two squares, two wide + one square, two squares. */
  images: ImageAsset[];
};

const columns = [
  { offset: true, tiles: ["aspect-square", "aspect-square"] },
  { offset: false, tiles: ["aspect-[16/9]", "aspect-[16/9]", "aspect-square"] },
  { offset: true, tiles: ["aspect-square", "aspect-square"] },
];

/** Three staggered columns of images (Marina gallery). */
export function MasonryGallery({ images }: MasonryGalleryProps) {
  let cursor = 0;
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={cn(
            "flex flex-col gap-4 md:gap-8",
            column.offset && "md:pt-10",
            columnIndex === 1 && "max-md:hidden",
          )}
        >
          {column.tiles.map((aspect) => {
            const image = images[cursor++ % images.length];
            return (
              <ImageReveal
                key={`${columnIndex}-${cursor}`}
                delay={columnIndex * 0.1}
                className={cn("relative rounded-card", aspect)}
              >
                <div className="absolute inset-0">
                  <ResponsiveImage asset={image} sizes="(min-width: 768px) 30vw, 50vw" fill />
                </div>
              </ImageReveal>
            );
          })}
        </div>
      ))}
    </div>
  );
}
