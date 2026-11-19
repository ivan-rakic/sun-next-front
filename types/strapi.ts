// Generic shapes for Strapi's REST API (v5, flattened response — no
// `data.attributes` wrapper). If the project ends up on Strapi v4 instead,
// only these wrapper/media types change; the domain types in
// `types/content.ts` and the pages/components stay the same.

import type { ContentBlock } from "@/types/content-blocks";

export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
};

export type StrapiEntity = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type StrapiCollectionResponse<T> = {
  data: T[];
  meta: {
    pagination: {
      total: number;
      start?: number;
      limit?: number;
      page?: number;
      pageSize?: number;
      pageCount?: number;
    };
  };
};

export type StrapiSingleResponse<T> = {
  data: T;
  meta: Record<string, never>;
};

export type StrapiCategory = StrapiEntity & {
  name: string;
  slug: string;
  key: string;
  color?: string | null;
  sortOrder: number;
  useForArticles: boolean;
  useForPodcasts: boolean;
  useForNews: boolean;
};

export type StrapiSeo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  shareTitle?: string | null;
  shareDescription?: string | null;
  shareImage?: StrapiMedia | null;
  canonicalUrl?: string | null;
  noIndex?: boolean;
};

export type StrapiSocialLink = {
  id: number;
  platform:
    | "facebook"
    | "instagram"
    | "x"
    | "youtube"
    | "soundcloud"
    | "mixcloud"
    | "patreon"
    | "other";
  label?: string | null;
  url: string;
};

export type StrapiSiteSetting = StrapiEntity & {
  siteName: string;
  tagline?: string | null;
  defaultDescription?: string | null;
  logo?: StrapiMedia | null;
  defaultShareImage?: StrapiMedia | null;
  defaultSeo?: StrapiSeo | null;
  socialLinks?: StrapiSocialLink[];
};

export type StrapiEmbed = {
  provider:
    | "mixcloud"
    | "soundcloud"
    | "youtube"
    | "spotify"
    | "bandcamp"
    | "vimeo";
  url: string;
  title?: string | null;
  aspectRatio: "audio" | "16:9" | "1:1" | "4:3";
};

export type StrapiContentBase = StrapiEntity & {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  featuredImage: StrapiMedia | null;
  categories: StrapiCategory[];
  residents?: StrapiResident[];
  content: unknown[];
  seo?: StrapiSeo | null;
};

export type StrapiArticle = StrapiContentBase;

export type StrapiNews = StrapiContentBase;

export type StrapiPodcast = StrapiContentBase & {
  durationSeconds?: number | null;
  embed: StrapiEmbed;
  show?: StrapiPodcastShowSummary | null;
};

export type StrapiPodcastShowSummary = {
  title: string;
  slug: string;
  description?: string | null;
  featuredImage?: StrapiMedia | null;
  seo?: StrapiSeo | null;
};

export type StrapiPodcastShow = StrapiEntity &
  StrapiPodcastShowSummary & {
    categories?: StrapiCategory[];
    residents?: StrapiResident[];
    episodes?: StrapiPodcast[];
  };

export type StrapiResident = StrapiEntity & {
  name: string;
  slug: string;
  summary?: string | null;
  role?: string | null;
  tag?: string | null;
  socialLinks?: {
    label: string;
    url: string;
    openInNewTab?: boolean;
  }[];
  portrait?: StrapiMedia | null;
  content?: unknown[];
  isEditorialMember: boolean;
  editorialSortOrder: number;
  isFeatured: boolean;
  sortOrder: number;
  articles?: StrapiArticle[];
  podcasts?: StrapiPodcast[];
  news_items?: StrapiNews[];
  seo?: StrapiSeo | null;
};

export type StrapiSectionHeader = {
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  link?: {
    label: string;
    url: string;
    openInNewTab?: boolean;
  } | null;
};

export type StrapiListingPage = StrapiEntity & {
  header: StrapiSectionHeader;
  seo?: StrapiSeo | null;
  content?: ContentBlock[];
};

export type StrapiProgramSlot = StrapiEntity & {
  title: string;
  description?: string | null;
  dayOfWeek:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  daypart: "morning" | "evening";
  startTime: string;
  endTime: string;
  highlighted: boolean;
  resident?: StrapiResident | null;
};

type StrapiFeaturedContent = {
  title: string;
  slug: string;
  description?: string | null;
  featuredImage?: StrapiMedia | null;
  categories?: StrapiCategory[];
};

export type StrapiFeaturedItem = {
  id: number;
  __component: "featured.article" | "featured.podcast" | "featured.news";
  overrideTitle?: string | null;
  overrideDescription?: string | null;
  overrideImage?: StrapiMedia | null;
  article?: StrapiFeaturedContent | null;
  podcast?: StrapiFeaturedContent | null;
  news_item?: StrapiFeaturedContent | null;
};

export type StrapiFeaturedSelection = StrapiEntity & {
  title: string;
  subtitle?: string | null;
  items: StrapiFeaturedItem[];
};

export type StrapiMenuLink = {
  id: number;
  slug: string;
  label: string;
};

export type StrapiSocialMenu = {
  id: number;
  slug: string;
  link: string;
  label: string;
};

// Single type (site-wide header config), not a collection.
export type StrapiHeader = StrapiEntity & {
  menu_links: StrapiMenuLink[];
  social_menus: StrapiSocialMenu[];
};
