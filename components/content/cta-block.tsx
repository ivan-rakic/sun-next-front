import Link from "next/link";
import { isExternalUrl } from "@/lib/content/embeds";
import type { CtaBlock as CtaBlockData } from "@/types/content-blocks";
import styles from "@/components/content/content.module.scss";
export const CtaBlock = ({
  block,
}: {
  block: CtaBlockData;
}): React.ReactElement | null => {
  if (!block.link.url || !block.link.label) return null;
  const external = isExternalUrl(block.link.url);
  const className = `${styles.cta} ${styles[`cta_${block.style}`]}`;
  return (
    <section className={styles.ctaSection}>
      {block.title ? <h2>{block.title}</h2> : null}
      {block.description ? <p>{block.description}</p> : null}
      {external ? (
        <a
          className={className}
          href={block.link.url}
          target={block.link.openInNewTab ? "_blank" : undefined}
          rel={block.link.openInNewTab ? "noopener noreferrer" : undefined}
        >
          {block.link.label}
        </a>
      ) : (
        <Link className={className} href={block.link.url}>
          {block.link.label}
        </Link>
      )}
    </section>
  );
};
