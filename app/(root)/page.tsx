import { ArticleCard } from '@/app/(root)/_components/article-card';
import { DonateContainer } from '@/app/(root)/_components/donate-container';
import { Podcasts } from '@/app/(root)/_components/podcasts';

import { articles } from '@/constants';

import Hero from './_components/hero';

import styles from '@/styles/index.module.scss';
import cardStyles from '@/styles/index/podcasts-articles.module.scss';

export default function Home(): React.ReactElement {
  return (
    <main className={styles.page}>
      <Hero />

      <section className={styles.contentRail}>
        <div className={styles.contentRail__header}>
          <div>
            <h2>Podcasts</h2>
            <p>Checkout the latest featured podcasts, we picked for you</p>
          </div>

          <button>VIEW ALL PODCASTS →</button>
        </div>

        <Podcasts />
      </section>

      <section className={styles.contentRail}>
        <div className={styles.contentRail__header}>
          <div>
            <h2>Articles</h2>
            <p>Checkout the latest articles, we picked for you</p>
          </div>

          <button>VIEW ALL ARTICLES →</button>
        </div>

        <div className={cardStyles.articleRail}>
          {articles.map((article) => (
            <ArticleCard
              key={article.href}
              href={article.href}
              imageSrc={article.imageSrc}
              imageAlt={article.imageAlt}
              category={article.category}
              title={article.title}
              description={article.description}
            />
          ))}
        </div>
      </section>

      <DonateContainer />

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Popular Residents</h2>
        </div>
      </section>
    </main>
  );
}