import Link from 'next/link';

import { PODCASTS } from '@/constants';
import styles from '@/styles/components/podcasts-articles.module.scss';

export const Podcasts = (): React.ReactElement => {
  return (
    <div className={styles.podcastRail}>
      {PODCASTS.map((podcast) => (
        <Link
          key={podcast.slug}
          href={`/podcasts/${podcast.slug}`}
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