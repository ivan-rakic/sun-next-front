import type { LyricsBlock as LyricsBlockData } from "@/types/content-blocks";
import styles from "@/styles/components/content.module.scss";
export const LyricsBlock = ({
  block,
}: {
  block: LyricsBlockData;
}): React.ReactElement | null =>
  block.body ? (
    <section className={styles.lyrics}>
      {block.title ? <h2>{block.title}</h2> : null}
      <div>{block.body}</div>
      {block.translation ? (
        <div className={styles.lyricsTranslation}>{block.translation}</div>
      ) : null}
      {block.credits ? <p>{block.credits}</p> : null}
    </section>
  ) : null;
