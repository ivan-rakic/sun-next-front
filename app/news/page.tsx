import { PageHeader } from '@/components/page-header';
import { ContentCard } from '@/components/templates/content-card';
import { getNews } from '@/lib/content';
import styles from '@/styles/pages/podcasts.module.scss';
import cardStyles from '@/styles/components/podcasts-articles.module.scss';

export default function NewsPage() {
  const news = getNews();

  return (
    <main className={styles.podcastPage}>
      <PageHeader
        eyebrow="SunRadio portal"
        title="News"
        description="Najnovije vesti, događaji i obaveštenja iz SunRadio redakcije."
      />

      <section className={styles.podcastListSection}>
        <div className={styles.podcastListSection__header}>
          <h2>Najnovije vesti</h2>
          <p>Aktuelnosti iz SunRadio sveta.</p>
        </div>

        <div className={cardStyles.articleRail}>
          {news.map((item) => (
            <ContentCard
              key={item.slug}
              href={item.href}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              category={item.category}
              title={item.title}
              description={item.description}
              meta={item.displayDate}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
