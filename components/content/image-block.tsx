import Image from "next/image";

import { getStrapiMediaUrl, hasRenderableMedia } from "@/lib/content/media";
import type { ImageBlock as ImageBlockData } from "@/types/content-blocks";
import styles from "@/components/content/content.module.scss";

type ImageBlockProps = { block: ImageBlockData; fallbackAlt: string };

export const ImageBlock = ({
  block,
  fallbackAlt,
}: ImageBlockProps): React.ReactElement | null => {
  if (!hasRenderableMedia(block.image)) return null;
  const src = getStrapiMediaUrl(block.image.url);
  if (!src) return null;
  const caption = block.caption ?? block.image.caption;

  return (
    <figure className={`${styles.image} ${styles[`image_${block.width}`]}`}>
      <Image
        src={src}
        alt={block.image.alternativeText ?? caption ?? fallbackAlt}
        width={block.image.width ?? 1600}
        height={block.image.height ?? 900}
        sizes="(max-width: 768px) 100vw, 900px"
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
};
