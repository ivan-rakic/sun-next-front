import Link from 'next/link';

import { ArticleCard } from '@/app/(root)/_components/article-card';
import { DonateContainer } from '@/app/(root)/_components/donate-container';
import { Podcasts } from '@/app/(root)/_components/podcasts';

import { articles } from '@/constants';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getRequestLocale } from '@/lib/i18n/locale';
import { localizedPath } from '@/lib/i18n/paths';

import Hero from './_components/hero';

import styles from '@/styles/pages/home.module.scss';
import cardStyles from '@/styles/components/podcasts-articles.module.scss';

export default async function Home(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return (
    <main className={styles.page}>
      <Hero dictionary={dictionary.home} />

      <section className={styles.contentRail}>
        <div className={styles.contentRail__header}>
          <div>
            <h2>{dictionary.navigation.podcasts}</h2>
            <p>Checkout the latest featured podcasts, we picked for you</p>
          </div>

          <Link href={localizedPath(locale, '/podcasts')}>
            {dictionary.ui.viewAllPodcasts} &rarr;
          </Link>
        </div>

        <Podcasts locale={locale} />
      </section>

      <section className={styles.contentRail}>
        <div className={styles.contentRail__header}>
          <div>
            <h2>{dictionary.navigation.articles}</h2>
            <p>Checkout the latest articles, we picked for you</p>
          </div>

          <Link href={localizedPath(locale, '/articles')}>
            {dictionary.ui.viewAllArticles} &rarr;
          </Link>
        </div>

        <div className={cardStyles.articleRail}>
          {articles.map((article) => (
            <ArticleCard
              key={article.href}
              href={localizedPath(locale, article.href)}
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
          <h2>{dictionary.home.popularResidents}</h2>
        </div>
      </section>
    </main>
  );
}