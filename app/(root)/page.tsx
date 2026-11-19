import Link from "next/link";
import type { Metadata } from "next";

import { ArticleCard } from "@/app/(root)/_components/article-card";
import { DonateContainer } from "@/app/(root)/_components/donate-container";
import { Podcasts } from "@/app/(root)/_components/podcasts";
import { JsonLd } from "@/components/seo/json-ld";

import {
  getContentListing,
  getFeaturedResidents,
  getSiteSettings,
} from "@/lib/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { formatDate } from "@/lib/i18n/date";
import { getRequestLocale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import { createHomepageStructuredData } from "@/lib/seo/structured-data";
import type { PodcastContent } from "@/types/content";

import Hero from "./_components/hero";
import Slider from "./_components/slider";

import styles from "@/styles/pages/home.module.scss";
import cardStyles from "@/styles/components/podcasts-articles.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const fallback = getDictionary(locale).seo.pages.home;
  return createLocalizedMetadata(locale, "/", {
    fallbackTitle: fallback.title,
    fallbackDescription: fallback.description,
  });
}

export default async function Home(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [podcastListing, articleListing, residents, siteSettings] =
    await Promise.all([
      getContentListing("podcasts", locale, 1, 5),
      getContentListing("articles", locale, 1, 4),
      getFeaturedResidents(locale, 4),
      getSiteSettings(locale),
    ]);

  return (
    <main className={styles.page}>
      <JsonLd
        data={createHomepageStructuredData(
          locale,
          siteSettings,
          dictionary.seo.defaultDescription,
        )}
      />
      <Hero dictionary={dictionary.home} locale={locale} />

      <section className={styles.contentRail}>
        <div className={styles.contentRail__header}>
          <div>
            <h2>{dictionary.navigation.podcasts}</h2>
            <p>{dictionary.home.latestPodcastsDescription}</p>
          </div>

          <Link href={localizedPath(locale, "/podcasts")}>
            {dictionary.ui.viewAllPodcasts} &rarr;
          </Link>
        </div>

        <Podcasts
          locale={locale}
          items={podcastListing.items.slice(0, 5) as PodcastContent[]}
        />
      </section>

      <section className={styles.contentRail}>
        <div className={styles.contentRail__header}>
          <div>
            <h2>{dictionary.navigation.articles}</h2>
            <p>{dictionary.home.latestArticlesDescription}</p>
          </div>

          <Link href={localizedPath(locale, "/articles")}>
            {dictionary.ui.viewAllArticles} &rarr;
          </Link>
        </div>

        <div className={cardStyles.articleRail}>
          {articleListing.items.slice(0, 4).map((article) => (
            <ArticleCard
              key={article.href}
              href={localizedPath(locale, article.href)}
              imageSrc={article.imageSrc}
              imageAlt={article.imageAlt}
              category={article.category}
              title={article.title}
              description={article.description}
              date={formatDate(article.date, locale)}
              readMoreLabel={dictionary.ui.readMore}
            />
          ))}
        </div>
      </section>

      <DonateContainer dictionary={dictionary.donateBanner} locale={locale} />

      <section className={styles.section} id="popular-residents">
        <div className={styles.sectionHeader}>
          <h2>{dictionary.home.popularResidents}</h2>
        </div>
        <Slider
          desktopSlidesPerView={4}
          slides={residents.map((resident) => ({
            id: resident.slug,
            title: resident.number
              ? `${dictionary.residents.namePrefix} ${resident.number}`
              : resident.name,
            href: localizedPath(locale, `/residents/${resident.slug}`),
            tag: resident.tag,
            image: resident.imageSrc,
            imageAlt: dictionary.residents.imageAlt,
          }))}
        />
      </section>
    </main>
  );
}
