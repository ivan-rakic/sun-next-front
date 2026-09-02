import Link from 'next/link';

import { PODCASTS } from '@/constants';
import type { Locale } from '@/lib/i18n/config';
import { localizedPath } from '@/lib/i18n/paths';
import styles from '@/styles/components/podcasts-articles.module.scss';

type PodcastsProps = { locale: Locale };

export const Podcasts = ({ locale }: PodcastsProps): React.ReactElement => {
  return (
    <div className={styles.podcastRail}>
      {PODCASTS.map((podcast) => (
        <Link
          key={podcast.slug}
          href={localizedPath(locale, `/podcasts/${podcast.slug}`)}
          className={styles.podcastCard}
        >
          <div
            className={styles.podcastCard__image}
            style={{
              backgroundImage: `url(${podcast.image})`,
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