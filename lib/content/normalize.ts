import type { ArticleContent, NewsContent, PodcastContent } from '@/types/content';
import type { StrapiArticle, StrapiMedia, StrapiNews, StrapiPodcast } from '@/types/strapi';

// Raw shapes are intentionally loose (`any`-ish) until the Strapi schema is
// confirmed. Once it is, only the field paths below need to change
// (e.g. `raw.attributes.title` instead of `raw.title`) — callers and
// components stay untouched since they only ever see the domain types above.

type RawArticle = Record<string, unknown>;
type RawPodcast = Record<string, unknown>;
type RawNews = Record<string, unknown>;

const asString = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback;

export const normalizeArticle = (raw: RawArticle): ArticleContent => {
  const slug = asString(raw.slug);

  return {
    id: raw.id as string | number | undefined,
    slug,
    href: asString(raw.href, `/articles/${slug}`),
    title: asString(raw.title),
    description: asString(raw.description),
    category: asString(raw.category),
    imageSrc: asString(raw.imageSrc),
    imageAlt: asString(raw.imageAlt, asString(raw.title)),
    date: asString(raw.date),
    displayDate: asString(raw.displayDate),
    content: asString(raw.content),
  };
};

export const normalizeNews = (raw: RawNews): NewsContent => {
  const slug = asString(raw.slug);

  return {
    id: raw.id as string | number | undefined,
    slug,
    href: asString(raw.href, `/news/${slug}`),
    title: asString(raw.title),
    description: asString(raw.description),
    category: asString(raw.category),
    imageSrc: asString(raw.imageSrc),
    imageAlt: asString(raw.imageAlt, asString(raw.title)),
    date: asString(raw.date),
    displayDate: asString(raw.displayDate),
    content: asString(raw.content),
  };
};

export const normalizePodcast = (raw: RawPodcast): PodcastContent => {
  const slug = asString(raw.slug);

  return {
    id: raw.id as string | number | undefined,
    slug,
    href: asString(raw.href, `/podcasts/${slug}`),
    title: asString(raw.title),
    description: asString(raw.description),
    category: asString(raw.category),
    imageSrc: asString(raw.image ?? raw.imageSrc),
    imageAlt: asString(raw.imageAlt, asString(raw.title)),
    date: asString(raw.date),
    displayDate: asString(raw.displayDate),
    duration: asString(raw.duration),
    mixcloudUrl: asString(raw.mixcloudUrl),
  };
};

// --- Strapi -> domain type mapping ---------------------------------------
// Not used anywhere yet. Once a real Strapi backend exists, swap the bodies
// of getArticles/getNews/getPodcasts in `lib/content/index.ts` to call
// `lib/strapi/api.ts` and pass the results through these instead.

const displayDate = (isoDate: string): string =>
  isoDate
    ? new Date(isoDate).toLocaleDateString('sr-RS', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

const mediaUrl = (media: StrapiMedia | null): string => media?.url ?? '';
const mediaAlt = (media: StrapiMedia | null, fallback: string): string =>
  media?.alternativeText ?? fallback;

export const normalizeStrapiArticle = (raw: StrapiArticle): ArticleContent => ({
  id: raw.id,
  slug: raw.slug,
  href: `/articles/${raw.slug}`,
  title: raw.title,
  description: raw.description,
  category: raw.category,
  imageSrc: mediaUrl(raw.cover),
  imageAlt: mediaAlt(raw.cover, raw.title),
  date: raw.date,
  displayDate: displayDate(raw.date),
  content: raw.content,
});

export const normalizeStrapiNews = (raw: StrapiNews): NewsContent => ({
  id: raw.id,
  slug: raw.slug,
  href: `/news/${raw.slug}`,
  title: raw.title,
  description: raw.description,
  category: raw.category,
  imageSrc: mediaUrl(raw.cover),
  imageAlt: mediaAlt(raw.cover, raw.title),
  date: raw.date,
  displayDate: displayDate(raw.date),
  content: raw.content,
});

export const normalizeStrapiPodcast = (raw: StrapiPodcast): PodcastContent => ({
  id: raw.id,
  slug: raw.slug,
  href: `/podcasts/${raw.slug}`,
  title: raw.title,
  description: raw.description,
  category: raw.category,
  imageSrc: mediaUrl(raw.cover),
  imageAlt: mediaAlt(raw.cover, raw.title),
  date: raw.date,
  displayDate: displayDate(raw.date),
  duration: raw.duration,
  mixcloudUrl: raw.mixcloudUrl,
});
