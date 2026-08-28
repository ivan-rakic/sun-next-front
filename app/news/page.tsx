import Link from 'next/link';

import { news } from '@/constants';
import styles from '@/styles/podcasts.module.scss';
import stylesRes from '@/styles/reusable.module.scss';

export default function NewsPage() {
  return (
    <main className={`${stylesRes.content_container} ${styles.podcastPage}`}>
      <section className={styles.podcastHero}>
        <div>
          <span>SunRadio portal</span>
          <h1>News</h1>
          <p>Najnovije vesti, događaji i obaveštenja iz SunRadio redakcije.</p>
        </div>
      </section>

      <section className={styles.podcastListSection}>
        <div className={styles.podcastListSection__header}>
          <h2>Najnovije vesti</h2>
          <p>Aktuelnosti iz SunRadio sveta.</p>
        </div>

        <div className={styles.podcastGrid}>
          {news.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className={styles.podcastCard}
            >
              <div
                className={styles.podcastCard__image}
                style={{ backgroundImage: `url(${item.imageSrc})` }}
              >
                <span>{item.category}</span>
              </div>

              <div className={styles.podcastCard__content}>
                <time dateTime={item.date}>{item.displayDate}</time>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
