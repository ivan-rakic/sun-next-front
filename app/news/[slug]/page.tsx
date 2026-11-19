import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { ContentDetail } from "@/components/templates/content-detail";
import { getNews, getNewsBySlug, getSiteSettings } from "@/lib/content";
import { formatDate } from "@/lib/i18n/date";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { defaultLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import { getCanonicalUrl } from "@/lib/seo/metadata";
import { createArticleStructuredData } from "@/lib/seo/structured-data";
import styles from "@/styles/pages/podcasts.module.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const item = await getNewsBySlug(slug, locale);

  if (!item) return {};

  const fallback = getDictionary(locale).seo.pages.news;

  return createLocalizedMetadata(
    locale,
    `/news/${slug}`,
    {
      title: item.title,
      description: item.description,
      fallbackTitle: fallback.title,
      fallbackDescription: fallback.description,
      image: item.socialImage,
      seo: item.seo,
      openGraphType: "article",
    },
    { alternateLocales: false },
  );
}

export async function generateStaticParams() {
  const news = await getNews(defaultLocale);
  return news.map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [item, siteSettings] = await Promise.all([
    getNewsBySlug(slug, locale),
    getSiteSettings(locale),
  ]);

  if (!item) {
    notFound();
  }

  return (
    <main className={styles.podcastPage}>
      <JsonLd
        data={createArticleStructuredData({
          content: item,
          locale,
          type: "NewsArticle",
          publisherName: siteSettings?.siteName ?? dictionary.seo.brand,
          defaultShareImage:
            siteSettings?.defaultShareImage ||
            siteSettings?.defaultSeo?.shareImage,
        })}
      />
      <ContentDetail
        backHref={localizedPath(locale, "/news")}
        backLabel={`${dictionary.ui.backTo} ${dictionary.navigation.news}`}
        imageSrc={item.imageSrc}
        category={item.category}
        categories={item.categories}
        title={item.title}
        date={item.date}
        meta={formatDate(item.date, locale)}
        description={item.description}
        bodyContent={item.content}
        blocks={item.contentBlocks}
        contentDictionary={dictionary.content}
        share={{
          url: getCanonicalUrl(locale, `/news/${slug}`, item.seo?.canonicalUrl),
          title: item.seo?.shareTitle || item.seo?.metaTitle || item.title,
          text:
            item.seo?.shareDescription ||
            item.seo?.metaDescription ||
            item.description,
          labels: dictionary.ui.share,
        }}
      />
    </main>
  );
}
