import { getEmbedUrl } from "@/lib/content/embeds";
import type { EmbedBlock as EmbedBlockData } from "@/types/content-blocks";
import styles from "@/components/content/content.module.scss";
export const EmbedBlock = ({
  block,
  fallbackTitle,
  invalidLabel,
}: {
  block: EmbedBlockData;
  fallbackTitle: string;
  invalidLabel: string;
}): React.ReactElement | null => {
  const src = getEmbedUrl(block);
  if (!src)
    return process.env.NODE_ENV !== "production" ? (
      <p className={styles.invalidEmbed}>{invalidLabel}</p>
    ) : null;
  return (
    <div
      className={`${styles.embed} ${styles[`embed_${block.aspectRatio.replace(":", "_")}`]}`}
    >
      <iframe
        src={src}
        title={block.title ?? fallbackTitle}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};
