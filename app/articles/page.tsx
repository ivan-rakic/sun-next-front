import Link from 'next/link';

import { articles } from '@/constants';
import { PageHeader } from '@/components/page-header';
import styles from '@/styles/pages/podcasts.module.scss';
import stylesRes from '@/styles/reusable.module.scss';

export default function ArticlesPage() {
  return (
    <main className={`${stylesRes.content_container} ${styles.podcastPage}`}>
      <PageHeader
        eyebrow="SunRadio portal"
        title="Articles"
        description="Tekstovi, kolumne i priče iz SunRadio redakcije."
      />

      <section className={styles.podcastListSection}>
        <div className={styles.podcastListSection__header}>
          <h2>Najnoviji tekstovi</h2>
          <p>Odabrani članci iz SunRadio arhive.</p>
        </div>

        <div className={styles.podcastGrid}>
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={article.href}
              className={styles.podcastCard}
            >
              <div
                className={styles.podcastCard__image}
                style={{ backgroundImage: `url(${article.imageSrc})` }}
              >
                <span>{article.category}</span>
              </div>

              <div className={styles.podcastCard__content}>
                <time dateTime={article.date}>{article.displayDate}</time>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
