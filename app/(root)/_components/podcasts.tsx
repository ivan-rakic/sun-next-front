import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { PodcastContent } from "@/types/content";
import { localizedPath } from "@/lib/i18n/paths";
import styles from "@/styles/components/podcasts-articles.module.scss";

type PodcastsProps = { locale: Locale; items: PodcastContent[] };

export const Podcasts = ({
  locale,
  items,
}: PodcastsProps): React.ReactElement => {
  return (
    <div className={styles.podcastRail}>
      {items.map((podcast) => (
        <Link
          key={podcast.slug}
          href={localizedPath(locale, `/podcasts/${podcast.slug}`)}
          className={styles.podcastCard}
        >
          <div
            className={styles.podcastCard__image}
            style={{
              backgroundImage: `url(${podcast.imageSrc})`,
            }}
          >
            <button>▶</button>
          </div>

          <span>{podcast.category}</span>

          <h3>{podcast.title}</h3>

          <p>
            {podcast.category} • {podcast.duration}
          </p>
        </Link>
      ))}
    </div>
  );
};
