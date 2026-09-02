// Generic shapes for Strapi's REST API (v5, flattened response — no
// `data.attributes` wrapper). If the project ends up on Strapi v4 instead,
// only these wrapper/media types change; the domain types in
// `types/content.ts` and the pages/components stay the same.

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
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiSingleResponse<T> = {
  data: T;
  meta: Record<string, never>;
};

// --- Content types (mirrors the fields used in types/content.ts) ---

export type StrapiArticle = StrapiEntity & {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
  date: string;
  cover: StrapiMedia | null;
};

export type StrapiNews = StrapiEntity & {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
  date: string;
  cover: StrapiMedia | null;
};

export type StrapiPodcast = StrapiEntity & {
  slug: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  mixcloudUrl: string;
  date: string;
  cover: StrapiMedia | null;
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
