import type { MetadataRoute } from "next";

import {
  fetchContentPage,
  fetchPodcastShows,
  fetchResidents,
} from "@/lib/strapi/api";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import {
  getCanonicalUrl,
  isPublicIndexableEnvironment,
} from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/content";
import type { ContentKind } from "@/types/content";
import type { StrapiCollectionResponse } from "@/types/strapi";

export const dynamic = "force-dynamic";

const pageSize = 100;
const publicStaticPaths = [
  "/",
  "/articles",
  "/news",
  "/podcasts",
  "/kosmos-mi",
  "/program",
  "/projekti",
  "/podrzi-sunce",
];

const fetchAllPublished = async <T>(
  fetchPage: (page: number) => Promise<StrapiCollectionResponse<T>>,
): Promise<T[]> => {
  const items: T[] = [];
  let page = 1;
  let pageCount = 1;

  while (page <= pageCount) {
    const response = await fetchPage(page);
    items.push(...response.data);
    pageCount =
      response.meta.pagination.pageCount ??
      Math.ceil(response.meta.pagination.total / pageSize);
    if (response.data.length === 0) break;
    page += 1;
  }

  return items;
};

const listingEntries = async (kind: ContentKind, locale: Locale) =>
  fetchAllPublished((page) =>
    fetchContentPage(kind, {
      locale,
      page,
      pageSize,
      start: (page - 1) * pageSize,
      limit: pageSize,
    }),
  );

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteSettings = await getSiteSettings(defaultLocale);
  if (
    !isPublicIndexableEnvironment() ||
    siteSettings?.defaultSeo?.noIndex === true
  ) {
    return [];
  }

  const staticEntries = locales.flatMap((locale) =>
    publicStaticPaths.map((path) => ({
      url: getCanonicalUrl(locale, localizedPath(locale, path)),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : 0.7,
    })),
  );

  const contentEntries = await Promise.all(
    locales.map(async (locale) => {
      const [articles, news, podcasts, shows, residents] = await Promise.all([
        listingEntries("articles", locale),
        listingEntries("news", locale),
        listingEntries("podcasts", locale),
        fetchAllPublished((page) => fetchPodcastShows(locale, page, pageSize)),
        fetchAllPublished((page) => fetchResidents({ locale, page, pageSize })),
      ]);

      return [
        ...articles
          .filter((item) => item.seo?.noIndex !== true)
          .map((item) => ({
            url: getCanonicalUrl(
              locale,
              localizedPath(locale, `/articles/${item.slug}`),
              item.seo?.canonicalUrl,
            ),
            lastModified: new Date(item.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          })),
        ...news
          .filter((item) => item.seo?.noIndex !== true)
          .map((item) => ({
            url: getCanonicalUrl(
              locale,
              localizedPath(locale, `/news/${item.slug}`),
              item.seo?.canonicalUrl,
            ),
            lastModified: new Date(item.updatedAt),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          })),
        ...podcasts
          .filter((item) => item.seo?.noIndex !== true)
          .map((item) => ({
            url: getCanonicalUrl(
              locale,
              localizedPath(locale, `/podcasts/${item.slug}`),
              item.seo?.canonicalUrl,
            ),
            lastModified: new Date(item.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.6,
          })),
        ...shows
          .filter((show) => show.seo?.noIndex !== true)
          .map((show) => ({
            url: getCanonicalUrl(
              locale,
              localizedPath(locale, `/podcast-shows/${show.slug}`),
              show.seo?.canonicalUrl,
            ),
            lastModified: new Date(show.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          })),
        ...residents
          .filter((resident) => resident.seo?.noIndex !== true)
          .map((resident) => ({
            url: getCanonicalUrl(
              locale,
              localizedPath(locale, `/residents/${resident.slug}`),
              resident.seo?.canonicalUrl,
            ),
            lastModified: new Date(resident.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.5,
          })),
      ];
    }),
  );

  return [...staticEntries, ...contentEntries.flat()];
}
