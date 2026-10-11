import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/media";

export type ResponsiveImageProps = {
  asset: ImageAsset;
  /** Responsive `sizes` hint — always describe the rendered width to avoid oversized downloads. */
  sizes: string;
  /** Fill the nearest positioned parent (cover) instead of using intrinsic dimensions. */
  fill?: boolean;
  /** Above-the-fold critical image: loads eagerly with high fetch priority. */
  priority?: boolean;
  quality?: 60 | 75 | 85;
  className?: string;
  alt?: string;
};

export function ResponsiveImage({
  asset,
  sizes,
  fill = false,
  priority = false,
  quality = 75,
  className,
  alt,
}: ResponsiveImageProps) {
  const altText = alt ?? asset.alt;
  const shared = {
    src: asset.src,
    sizes,
    quality,
    placeholder: asset.blurDataURL ? ("blur" as const) : ("empty" as const),
    blurDataURL: asset.blurDataURL,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : undefined,
    style: asset.position ? { objectPosition: asset.position } : undefined,
  };

  if (fill) {
    return <Image {...shared} alt={altText} fill className={cn("object-cover", className)} />;
  }
  return (
    <Image
      {...shared}
      alt={altText}
      width={asset.width}
      height={asset.height}
      className={cn("h-auto w-full", className)}
    />
  );
}
