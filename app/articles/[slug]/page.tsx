import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { ContentDetail } from "@/components/templates/content-detail";
import { getArticleBySlug, getArticles, getSiteSettings } from "@/lib/content";
import { formatDate } from "@/lib/i18n/date";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { defaultLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getCanonicalUrl } from "@/lib/seo/metadata";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import { createArticleStructuredData } from "@/lib/seo/structured-data";
import styles from "@/styles/pages/podcasts.module.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const article = await getArticleBySlug(slug, locale);

  if (!article) return {};

  const fallback = getDictionary(locale).seo.pages.articles;

  return createLocalizedMetadata(
    locale,
    `/articles/${slug}`,
    {
      title: article.title,
      description: article.description,
      fallbackTitle: fallback.title,
      fallbackDescription: fallback.description,
      image: article.socialImage,
      seo: article.seo,
      openGraphType: "article",
    },
    { alternateLocales: false },
  );
}

export async function generateStaticParams() {
  const articles = await getArticles(defaultLocale);
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [article, siteSettings] = await Promise.all([
    getArticleBySlug(slug, locale),
    getSiteSettings(locale),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <main className={styles.podcastPage}>
      <JsonLd
        data={createArticleStructuredData({
          content: article,
          locale,
          type: "Article",
          publisherName: siteSettings?.siteName ?? dictionary.seo.brand,
          defaultShareImage:
            siteSettings?.defaultShareImage ||
            siteSettings?.defaultSeo?.shareImage,
        })}
      />
      <ContentDetail
        backHref={localizedPath(locale, "/articles")}
        backLabel={`${dictionary.ui.backTo} ${dictionary.navigation.articles}`}
        imageSrc={article.imageSrc}
        category={article.category}
        categories={article.categories}
        title={article.title}
        date={article.date}
        meta={formatDate(article.date, locale)}
        description={article.description}
        bodyContent={article.content}
        blocks={article.contentBlocks}
        contentDictionary={dictionary.content}
        share={{
          url: getCanonicalUrl(
            locale,
            `/articles/${slug}`,
            article.seo?.canonicalUrl,
          ),
          title:
            article.seo?.shareTitle || article.seo?.metaTitle || article.title,
          text:
            article.seo?.shareDescription ||
            article.seo?.metaDescription ||
            article.description,
          labels: dictionary.ui.share,
        }}
      />
    </main>
  );
}
