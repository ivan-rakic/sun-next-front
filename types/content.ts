// Domain content types used across the UI.
// These are intentionally decoupled from Strapi's raw response shape —
// once the Strapi schema is confirmed, only the normalize functions in
// `lib/content/normalize.ts` need to change, not the components/pages.

export type ContentCategory = 'article' | 'podcast' | 'news';

export type BaseContent = {
  id?: string | number;
  slug: string;
  href: string;
  title: string;
  description: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  displayDate: string;
};

export type ArticleContent = BaseContent & {
  content: string;
};

export type NewsContent = BaseContent & {
  content: string;
};

export type PodcastContent = BaseContent & {
  duration: string;
  mixcloudUrl: string;
};
