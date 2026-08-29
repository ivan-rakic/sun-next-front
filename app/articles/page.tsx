import { PageHeader } from '@/components/page-header';
import { ContentCard } from '@/components/templates/content-card';
import { getArticles } from '@/lib/content';
import styles from '@/styles/pages/podcasts.module.scss';
import cardStyles from '@/styles/components/podcasts-articles.module.scss';

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <main className={styles.podcastPage}>
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

        <div className={cardStyles.articleRail}>
          {articles.map((article) => (
            <ContentCard
              key={article.slug}
              href={article.href}
              imageSrc={article.imageSrc}
              imageAlt={article.imageAlt}
              category={article.category}
              title={article.title}
              description={article.description}
              meta={article.displayDate}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
