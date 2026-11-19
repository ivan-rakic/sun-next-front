// Domain content types used across the UI.
// These are intentionally decoupled from Strapi's raw response shape —
// once the Strapi schema is confirmed, only the normalize functions in
// `lib/content/normalize.ts` need to change, not the components/pages.

import type { ContentBlock } from "@/types/content-blocks";

export type ContentKind = "articles" | "news" | "podcasts";

export type ContentTag = {
  id?: number;
  slug: string;
  key: string;
  name: string;
  color?: string | null;
};

export type ContentSeo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  shareTitle?: string | null;
  shareDescription?: string | null;
  shareImage?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean;
};

export type SiteSettings = {
  siteName: string;
  tagline?: string | null;
  defaultDescription?: string | null;
  logo?: string | null;
  defaultShareImage?: string | null;
  defaultSeo?: ContentSeo | null;
  socialLinks: {
    platform: string;
    label?: string | null;
    url: string;
  }[];
};

export type ContentPageSettings = {
  header?: {
    eyebrow?: string | null;
    title: string;
    subtitle?: string | null;
    link?: {
      label: string;
      url: string;
      openInNewTab?: boolean;
    } | null;
  } | null;
  seo?: ContentSeo | null;
  content?: ContentBlock[];
};

export type ContentPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type ProgramShow = {
  title: string;
  description: string;
  time: string;
  isResident: boolean;
  slug?: string;
};

export type ProgramDay = {
  dayOfWeek: string;
  shows: ProgramShow[];
};

export type ContentCategory = "article" | "podcast" | "news";

export type BaseContent = {
  id?: string | number;
  slug: string;
  href: string;
  title: string;
  description: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  socialImage?: string | null;
  date: string;
  displayDate: string;
  categories?: ContentTag[];
  contentBlocks?: ContentBlock[];
  seo?: ContentSeo | null;
};

export type ArticleContent = BaseContent & {
  content: string;
};

export type NewsContent = BaseContent & {
  content: string;
};

export type PodcastContent = BaseContent & {
  duration: string;
  durationSeconds?: number | null;
  mixcloudUrl: string;
  show?: {
    title: string;
    slug: string;
  } | null;
};

export type PodcastShowContent = {
  id?: string | number;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  socialImage?: string | null;
  seo?: ContentSeo | null;
  episodes: PodcastContent[];
};

export type ResidentContent = {
  id: string | number;
  documentId?: string;
  slug: string;
  number?: string;
  name: string;
  summary: string;
  role: string;
  tag: string;
  socialLinks: {
    label: string;
    url: string;
    openInNewTab?: boolean;
  }[];
  imageSrc: string;
  socialImage?: string | null;
  imageAlt: string;
  isEditorialMember: boolean;
  editorialSortOrder: number;
  isFeatured: boolean;
  sortOrder: number;
  contentBlocks: ContentBlock[];
  seo?: ContentSeo | null;
};

export type ContentListingResult<T extends BaseContent> = {
  items: T[];
  categories: ContentTag[];
  pagination: ContentPagination;
  pageSettings?: ContentPageSettings | null;
};
