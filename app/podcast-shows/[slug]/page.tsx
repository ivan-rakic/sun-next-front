import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { ShareActions } from "@/components/share-actions";
import { PageHeader } from "@/components/page-header";
import {
  getPodcastShowBySlug,
  getPodcastShows,
  getSiteSettings,
} from "@/lib/content";
import { formatDate } from "@/lib/i18n/date";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";
import { createLocalizedMetadata, getCanonicalUrl } from "@/lib/seo/metadata";
import { createPodcastSeriesStructuredData } from "@/lib/seo/structured-data";
import styles from "@/styles/pages/podcasts.module.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const show = await getPodcastShowBySlug(slug, locale);
  const fallback = getDictionary(locale).seo.pages.podcasts;

  if (!show) return {};

  return createLocalizedMetadata(
    locale,
    `/podcast-shows/${slug}`,
    {
      title: show.title,
      description: show.description,
      fallbackTitle: fallback.title,
      fallbackDescription: fallback.description,
      image: show.socialImage,
      seo: show.seo,
    },
    { alternateLocales: false },
  );
}

export async function generateStaticParams() {
  const shows = await getPodcastShows(defaultLocale);
  return shows.map(({ slug }) => ({ slug }));
}

export default async function PodcastShowPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [show, siteSettings] = await Promise.all([
    getPodcastShowBySlug(slug, locale),
    getSiteSettings(locale),
  ]);

  if (!show) notFound();

  return (
    <main className={styles.podcastPage}>
      <JsonLd
        data={createPodcastSeriesStructuredData(
          show,
          locale,
          siteSettings?.siteName ?? dictionary.seo.brand,
          siteSettings?.defaultShareImage ||
            siteSettings?.defaultSeo?.shareImage,
        )}
      />
      <PageHeader
        eyebrow={dictionary.pages.podcasts.eyebrow}
        title={show.title}
        description={show.description}
      />
      <ShareActions
        url={getCanonicalUrl(
          locale,
          `/podcast-shows/${slug}`,
          show.seo?.canonicalUrl,
        )}
        title={show.seo?.shareTitle || show.seo?.metaTitle || show.title}
        text={
          show.seo?.shareDescription ||
          show.seo?.metaDescription ||
          show.description
        }
        labels={dictionary.ui.share}
      />

      <section className={styles.podcastListSection}>
        <div className={styles.podcastListSection__header}>
          <h2>{dictionary.home.latestEpisodes}</h2>
        </div>
        <div className={styles.podcastGrid}>
          {show.episodes.map((episode) => (
            <Link
              className={styles.podcastCard}
              href={localizedPath(locale, episode.href)}
              key={episode.slug}
            >
              <div
                className={styles.podcastCard__image}
                style={{ backgroundImage: `url(${episode.imageSrc})` }}
                aria-hidden="true"
              />
              <div className={styles.podcastCard__content}>
                <time dateTime={episode.date}>
                  {formatDate(episode.date, locale)}
                </time>
                <h3>{episode.title}</h3>
                <p>{episode.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
