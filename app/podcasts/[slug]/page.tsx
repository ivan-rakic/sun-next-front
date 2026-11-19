import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { ContentDetail } from "@/components/templates/content-detail";
import { getPodcastBySlug, getPodcasts, getSiteSettings } from "@/lib/content";
import { formatDate } from "@/lib/i18n/date";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { defaultLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import { getCanonicalUrl } from "@/lib/seo/metadata";
import { createPodcastEpisodeStructuredData } from "@/lib/seo/structured-data";
import styles from "@/styles/pages/podcasts.module.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const podcast = await getPodcastBySlug(slug, locale);

  if (!podcast) return {};

  const fallback = getDictionary(locale).seo.pages.podcasts;

  return createLocalizedMetadata(
    locale,
    `/podcasts/${slug}`,
    {
      title: podcast.title,
      description: podcast.description,
      fallbackTitle: fallback.title,
      fallbackDescription: fallback.description,
      image: podcast.socialImage,
      seo: podcast.seo,
    },
    { alternateLocales: false },
  );
}

export async function generateStaticParams() {
  const podcasts = await getPodcasts(defaultLocale);
  return podcasts.map((podcast) => ({ slug: podcast.slug }));
}

export default async function PodcastDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [podcast, siteSettings] = await Promise.all([
    getPodcastBySlug(slug, locale),
    getSiteSettings(locale),
  ]);

  if (!podcast) {
    notFound();
  }

  return (
    <main className={styles.podcastPage}>
      <JsonLd
        data={createPodcastEpisodeStructuredData(
          podcast,
          locale,
          siteSettings?.siteName ?? dictionary.seo.brand,
          siteSettings?.defaultShareImage ||
            siteSettings?.defaultSeo?.shareImage,
        )}
      />
      <ContentDetail
        backHref={localizedPath(locale, "/podcasts")}
        backLabel={`${dictionary.ui.backTo} ${dictionary.navigation.podcasts}`}
        imageSrc={podcast.imageSrc}
        category={podcast.category}
        categories={podcast.categories}
        title={podcast.title}
        date={podcast.date}
        meta={`${formatDate(podcast.date, locale)} · ${podcast.duration}`}
        description={podcast.description}
        blocks={podcast.contentBlocks}
        contentDictionary={dictionary.content}
        share={{
          url: getCanonicalUrl(
            locale,
            `/podcasts/${slug}`,
            podcast.seo?.canonicalUrl,
          ),
          title:
            podcast.seo?.shareTitle || podcast.seo?.metaTitle || podcast.title,
          text:
            podcast.seo?.shareDescription ||
            podcast.seo?.metaDescription ||
            podcast.description,
          labels: dictionary.ui.share,
        }}
      >
        {podcast.mixcloudUrl ? (
          <iframe
            title={podcast.title}
            width="100%"
            height="120"
            src={podcast.mixcloudUrl}
            frameBorder="0"
            allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share;"
          />
        ) : null}
      </ContentDetail>
    </main>
  );
}
