import type { ArticleBlock } from "@/types/content";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";

const isText = (block: ArticleBlock) =>
  block.type === "heading" || block.type === "paragraph" || block.type === "list";

/**
 * Consecutive text blocks (a heading and the paragraphs or list under it) as one run, so they
 * arrive together; photos stand on their own with their own reveal.
 */
function groupBlocks(blocks: ArticleBlock[]) {
  const groups: { text: boolean; blocks: ArticleBlock[] }[] = [];
  for (const block of blocks) {
    const text = isText(block);
    const last = groups[groups.length - 1];
    // A new heading starts a new run.
    if (last && last.text && text && block.type !== "heading") last.blocks.push(block);
    else groups.push({ text, blocks: [block] });
  }
  return groups;
}

/** Renders structured long-form content (events, journal articles). */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose-somabay mx-auto">
      {groupBlocks(blocks).map((group, groupIndex) =>
        group.text ? (
          // Heading and its text rise in together (the heading is not split on its own).
          <Reveal key={groupIndex} className="[&>*+*]:mt-[1.25em]">
            {group.blocks.map((block, index) => renderBlock(block, index))}
          </Reveal>
        ) : (
          group.blocks.map((block) => renderBlock(block, groupIndex))
        ),
      )}
    </div>
  );
}

function renderBlock(block: ArticleBlock, index: number) {
  switch (block.type) {
    case "heading":
      return (
        <h2 key={index} data-split="">
          {block.text}
        </h2>
      );
    case "paragraph":
      return <p key={index}>{block.text}</p>;
    case "image":
      return (
        <ImageReveal key={index} className="relative aspect-[768/420] rounded-md">
          <div className="absolute inset-0">
            <ResponsiveImage asset={block.image} sizes="(min-width: 768px) 48rem, 100vw" fill />
          </div>
        </ImageReveal>
      );
    case "imagePair":
      return (
        <div key={index} className="grid grid-cols-2 gap-4 md:gap-6">
          {block.images.map((image) => (
            <ImageReveal key={image.src} className="relative aspect-[372/254] rounded-md">
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
}
