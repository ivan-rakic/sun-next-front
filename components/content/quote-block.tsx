import type { QuoteBlock as QuoteBlockData } from "@/types/content-blocks";
import styles from "@/styles/components/content.module.scss";
export const QuoteBlock = ({
  block,
}: {
  block: QuoteBlockData;
}): React.ReactElement | null =>
  block.text ? (
    <blockquote className={styles.quote}>
      <p>{block.text}</p>
      {block.author || block.source ? (
        <footer>
          {block.author ? <span>{block.author}</span> : null}
          {block.source ? <cite>{block.source}</cite> : null}
        </footer>
      ) : null}
    </blockquote>
  ) : null;
