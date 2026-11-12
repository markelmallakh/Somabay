import type { Neighborhood } from "@/types/content";
import type { ImageAsset } from "@/types/media";

/** The sharper hero still when a neighborhood has one, otherwise its card photo. */
export function neighborhoodImage(item: Neighborhood): ImageAsset {
  return item.heroMedia?.type === "image" ? item.heroMedia : item.image;
}
