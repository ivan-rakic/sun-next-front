import type {
  StrapiCategory,
  StrapiArticle,
  StrapiCollectionResponse,
  StrapiHeader,
  StrapiFeaturedSelection,
  StrapiListingPage,
  StrapiNews,
  StrapiPodcast,
  StrapiPodcastShow,
  StrapiProgramSlot,
  StrapiResident,
  StrapiSiteSetting,
  StrapiSingleResponse,
} from "@/types/strapi";
import type { ContentKind } from "@/types/content";
import type { Locale } from "@/lib/i18n/config";

import { strapiFetch } from "./client";

type ContentCollection = StrapiArticle | StrapiNews | StrapiPodcast;

export type ContentQueryOptions = {
  locale: Locale;
  page: number;
  pageSize: number;
  categorySlugs?: string[];
  start?: number;
  limit?: number;
};

type ContentEndpoint = {
  collection: string;
  page: string;
  categoryFlag: string;
};

const contentPopulation: Record<string, string> = {
  "populate[featuredImage]": "true",
  "populate[categories]": "true",
  "populate[residents]": "true",
  "populate[content][populate]": "*",
  "populate[seo][populate]": "*",
};

const contentEndpoints: Record<ContentKind, ContentEndpoint> = {
  articles: {
    collection: "/articles",
    page: "/articles-page",
    categoryFlag: "useForArticles",
  },
  news: {
    collection: "/news-items",
    page: "/news-page",
    categoryFlag: "useForNews",
  },
  podcasts: {
    collection: "/podcasts",
    page: "/podcasts-page",
    categoryFlag: "useForPodcasts",
  },
};

export const fetchContentPage = (
  kind: ContentKind,
  options: ContentQueryOptions,
) => {
  const limit = options.limit ?? (options.page === 1 ? 12 : 8);
  const start =
    options.start ?? (options.page === 1 ? 0 : 12 + (options.page - 2) * 8);
  const query: Record<string, string | number | boolean> = {
    locale: options.locale,
    status: "published",
    "sort[0]": "publishedDate:desc",
    "pagination[start]": start,
    "pagination[limit]": limit,
    ...contentPopulation,
  };

  if (kind === "podcasts") query["populate[show]"] = "true";
  options.categorySlugs?.forEach((slug, index) => {
    query[`filters[categories][slug][$in][${index}]`] = slug;
  });

  return strapiFetch<StrapiCollectionResponse<ContentCollection>>(
    contentEndpoints[kind].collection,
    query,
    { cache: "no-store" },
  );
};

export const fetchContentBySlug = (
  kind: ContentKind,
  slug: string,
  locale: Locale,
) => {
  const query: Record<string, string | number | boolean> = {
    locale,
    status: "published",
    "filters[slug][$eq]": slug,
    "pagination[page]": 1,
    "pagination[pageSize]": 1,
    ...contentPopulation,
  };

  if (kind === "podcasts") query["populate[show]"] = "true";

  return strapiFetch<StrapiCollectionResponse<ContentCollection>>(
    contentEndpoints[kind].collection,
    query,
    { cache: "no-store" },
  );
};

export const fetchCategories = (kind: ContentKind, locale: Locale) =>
  strapiFetch<StrapiCollectionResponse<StrapiCategory>>(
    "/categories",
    {
      locale,
      [`filters[${contentEndpoints[kind].categoryFlag}][$eq]`]: true,
      "sort[0]": "sortOrder:asc",
      "sort[1]": "name:asc",
      "pagination[page]": 1,
      "pagination[pageSize]": 100,
    },
    { cache: "no-store" },
  );

export const fetchContentPageSettings = (kind: ContentKind, locale: Locale) =>
  strapiFetch<StrapiSingleResponse<StrapiListingPage>>(
    contentEndpoints[kind].page,
    {
      locale,
      "populate[header][populate]": "*",
      "populate[content][populate]": "*",
      "populate[seo][populate]": "*",
    },
    { cache: "no-store" },
  );

export const fetchFeaturedSelection = (locale: Locale) =>
  strapiFetch<StrapiSingleResponse<StrapiFeaturedSelection>>(
    "/featured-selection",
    {
      locale,
      status: "published",
      "populate[items][on][featured.article][populate][article][populate]":
        "featuredImage,categories",
      "populate[items][on][featured.article][populate][overrideImage]": "true",
      "populate[items][on][featured.podcast][populate][podcast][populate]":
        "featuredImage,categories",
      "populate[items][on][featured.podcast][populate][overrideImage]": "true",
      "populate[items][on][featured.news][populate][news_item][populate]":
        "featuredImage,categories",
      "populate[items][on][featured.news][populate][overrideImage]": "true",
    },
    { cache: "no-store" },
  );

export type StrapiStaticPage =
  | "about-page"
  | "program-page"
  | "projects-page"
  | "support-page";

export const fetchStaticPage = (page: StrapiStaticPage, locale: Locale) =>
  strapiFetch<StrapiSingleResponse<StrapiListingPage>>(
    `/${page}`,
    {
      locale,
      "populate[header][populate]": "*",
      "populate[content][populate]": "*",
      "populate[seo][populate]": "*",
    },
    { cache: "no-store" },
  );

export const fetchSiteSettings = (locale: Locale) =>
  strapiFetch<StrapiSingleResponse<StrapiSiteSetting>>(
    "/site-setting",
    {
      locale,
      status: "published",
      "populate[logo]": "true",
      "populate[defaultShareImage]": "true",
      "populate[defaultSeo][populate]": "*",
      "populate[socialLinks]": "*",
    },
    { cache: "no-store" },
  );

export const fetchProgramSlots = (locale: Locale) =>
  strapiFetch<StrapiCollectionResponse<StrapiProgramSlot>>(
    "/program-slots",
    {
      locale,
      status: "published",
      "sort[0]": "dayOfWeek:asc",
      "sort[1]": "startTime:asc",
      "pagination[page]": 1,
      "pagination[pageSize]": 100,
      populate: "*",
    },
    { cache: "no-store" },
  );

export type ResidentQueryOptions = {
  locale: Locale;
  page?: number;
  pageSize?: number;
  featured?: boolean;
  editorialMember?: boolean;
  slug?: string;
};

export const fetchResidents = (options: ResidentQueryOptions) => {
  const query: Record<string, string | number | boolean> = {
    locale: options.locale,
    status: "published",
    "sort[0]": options.editorialMember
      ? "editorialSortOrder:asc"
      : "sortOrder:asc",
    "pagination[page]": options.page ?? 1,
    "pagination[pageSize]": options.pageSize ?? 100,
    "populate[portrait]": "true",
    "populate[socialLinks]": "true",
    "populate[seo][populate]": "*",
  };

  if (options.featured !== undefined)
    query["filters[isFeatured][$eq]"] = options.featured;
  if (options.editorialMember !== undefined)
    query["filters[isEditorialMember][$eq]"] = options.editorialMember;
  if (options.slug) query["filters[slug][$eq]"] = options.slug;

  return strapiFetch<StrapiCollectionResponse<StrapiResident>>(
    "/residents",
    query,
    { cache: "no-store" },
  );
};

export const fetchPodcastShows = (locale: Locale, page = 1, pageSize = 100) =>
  strapiFetch<StrapiCollectionResponse<StrapiPodcastShow>>(
    "/podcast-shows",
    {
      locale,
      status: "published",
      "sort[0]": "title:asc",
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
      "populate[featuredImage]": "true",
      "populate[seo][populate]": "*",
    },
    { cache: "no-store" },
  );

export const fetchPodcastShowBySlug = (slug: string, locale: Locale) =>
  strapiFetch<StrapiCollectionResponse<StrapiPodcastShow>>(
    "/podcast-shows",
    {
      locale,
      status: "published",
      "filters[slug][$eq]": slug,
      "pagination[page]": 1,
      "pagination[pageSize]": 1,
      "populate[featuredImage]": "true",
      "populate[seo][populate]": "*",
      "populate[episodes][populate]": "*",
    },
    { cache: "no-store" },
  );

export const fetchArticles = () =>
  fetchContentPage("articles", { locale: "sr-Latn", page: 1, pageSize: 100 });

export const fetchArticleBySlug = (slug: string) =>
  fetchContentBySlug("articles", slug, "sr-Latn");

export const fetchNews = () =>
  fetchContentPage("news", { locale: "sr-Latn", page: 1, pageSize: 100 });

export const fetchNewsBySlug = (slug: string) =>
  fetchContentBySlug("news", slug, "sr-Latn");

export const fetchPodcasts = () =>
  fetchContentPage("podcasts", { locale: "sr-Latn", page: 1, pageSize: 100 });

export const fetchPodcastBySlug = (slug: string) =>
  fetchContentBySlug("podcasts", slug, "sr-Latn");

// Single type — one record for the whole site, no slug/filtering needed.
export const fetchHeader = () =>
  strapiFetch<StrapiSingleResponse<StrapiHeader>>("/header", { populate: "*" });
