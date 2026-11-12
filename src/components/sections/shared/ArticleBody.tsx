import type { ArticleBlock } from "@/types/content";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";

/** Renders structured long-form content (events, journal articles). */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose-somabay mx-auto">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <Reveal key={index}>
                <h2>{block.text}</h2>
              </Reveal>
            );
          case "paragraph":
            return <p key={index}>{block.text}</p>;
          case "image":
            return (
              <ImageReveal
                key={index}
                className="relative aspect-[768/420] rounded-card lg:rounded-media"
              >
                <div className="absolute inset-0">
                  <ResponsiveImage
                    asset={block.image}
                    sizes="(min-width: 768px) 48rem, 100vw"
                    fill
                  />
                </div>
              </ImageReveal>
            );
          case "imagePair":
            return (
              <div key={index} className="grid grid-cols-2 gap-4 md:gap-6">
                {block.images.map((image) => (
                  <ImageReveal key={image.src} className="relative aspect-[372/254] rounded-card">
                    <div className="absolute inset-0">
                      <ResponsiveImage asset={image} sizes="(min-width: 768px) 24rem, 50vw" fill />
                    </div>
                  </ImageReveal>
                ))}
              </div>
            );
          case "list":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}
