import { CtaBlock } from "@/components/content/cta-block";
import { EmbedBlock } from "@/components/content/embed-block";
import { GalleryBlock } from "@/components/content/gallery-block";
import { ImageBlock } from "@/components/content/image-block";
import { LyricsBlock } from "@/components/content/lyrics-block";
import { QuoteBlock } from "@/components/content/quote-block";
import { RichTextBlock } from "@/components/content/rich-text-block";
import type { FrontendDictionary } from "@/lib/i18n/dictionaries";
import type { ContentBlock } from "@/types/content-blocks";

type ContentRendererProps = {
  blocks: ContentBlock[];
  dictionary: FrontendDictionary["content"];
};

const warnedComponentTypes = new Set<string>();

const warnUnsupportedBlock = (componentName: string): void => {
  if (
    process.env.NODE_ENV === "production" ||
    warnedComponentTypes.has(componentName)
  )
    return;

  warnedComponentTypes.add(componentName);
  console.warn(`Unsupported Strapi content block: ${componentName}`);
};

export const ContentRenderer = ({
  blocks,
  dictionary,
}: ContentRendererProps): React.ReactElement => (
  <>
    {blocks.map((block, index) => {
      const key = block.id ?? `${block.__component}-${index}`;
      switch (block.__component) {
        case "content.rich-text":
          return <RichTextBlock key={key} body={block.body} />;
        case "content.image":
          return (
            <ImageBlock
              key={key}
              block={block}
              fallbackAlt={dictionary.imageAlt}
            />
          );
        case "content.gallery":
          return (
            <GalleryBlock
              key={key}
              block={block}
              fallbackAlt={dictionary.imageAlt}
              previousLabel={dictionary.previousSlide}
              nextLabel={dictionary.nextSlide}
            />
          );
        case "content.quote":
          return <QuoteBlock key={key} block={block} />;
        case "content.lyrics":
          return <LyricsBlock key={key} block={block} />;
        case "content.embed":
          return (
            <EmbedBlock
              key={key}
              block={block}
              fallbackTitle={dictionary.embedTitle}
              invalidLabel={dictionary.invalidContent}
            />
          );
        case "content.cta":
          return <CtaBlock key={key} block={block} />;
        default: {
          warnUnsupportedBlock(
            (block as { __component?: string }).__component ?? "unknown",
          );
          return null;
        }
      }
    })}
  </>
);
