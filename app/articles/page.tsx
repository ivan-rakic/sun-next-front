import { PageHeader } from "@/components/page-header";
import { ContentCard } from "@/components/templates/content-card";
import { getArticles } from "@/lib/content";
import { formatDate } from "@/lib/i18n/date";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";
import styles from "@/styles/pages/podcasts.module.scss";
import cardStyles from "@/styles/components/podcasts-articles.module.scss";

export default async function ArticlesPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
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
              href={localizedPath(locale, article.href)}
              imageSrc={article.imageSrc}
              imageAlt={article.imageAlt}
              category={article.category}
              title={article.title}
              description={article.description}
              meta={formatDate(article.date, locale)}
              readMoreLabel={dictionary.ui.readMore}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
