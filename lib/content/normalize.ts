import type {
  ArticleContent,
  ContentTag,
  NewsContent,
  PodcastContent,
  PodcastShowContent,
  SiteSettings,
} from "@/types/content";
import type {
  StrapiArticle,
  StrapiCategory,
  StrapiMedia,
  StrapiListingPage,
  StrapiNews,
  StrapiPodcast,
  StrapiPodcastShow,
  StrapiResident,
  StrapiSiteSetting,
  StrapiSeo,
} from "@/types/strapi";
import type { ContentBlock, EmbedBlock } from "@/types/content-blocks";
import { getEmbedUrl } from "@/lib/content/embeds";
import { getStrapiMediaUrl } from "@/lib/content/media";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { formatDate } from "@/lib/i18n/date";
import type { ResidentContent } from "@/types/content";

// The fallback dataset keeps a looser shape than the confirmed Strapi types.

type RawArticle = Record<string, unknown>;
type RawPodcast = Record<string, unknown>;
type RawNews = Record<string, unknown>;

const asString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

const categoryTag = (name: string): ContentTag => {
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return { slug, key: slug, name };
};

export const normalizeArticle = (raw: RawArticle): ArticleContent => {
  const slug = asString(raw.slug);
  const category = asString(raw.category);

  return {
    id: raw.id as string | number | undefined,
    slug,
    href: asString(raw.href, `/articles/${slug}`),
    title: asString(raw.title),
    description: asString(raw.description),
    category,
    categories: category ? [categoryTag(category)] : [],
    imageSrc: asString(raw.imageSrc),
    imageAlt: asString(raw.imageAlt, asString(raw.title)),
    date: asString(raw.date),
    displayDate: asString(raw.displayDate),
    content: asString(raw.content),
  };
};

export const normalizeNews = (raw: RawNews): NewsContent => {
  const slug = asString(raw.slug);
  const category = asString(raw.category);

  return {
    id: raw.id as string | number | undefined,
    slug,
    href: asString(raw.href, `/news/${slug}`),
    title: asString(raw.title),
    description: asString(raw.description),
    category,
    categories: category ? [categoryTag(category)] : [],
    imageSrc: asString(raw.imageSrc),
    imageAlt: asString(raw.imageAlt, asString(raw.title)),
    date: asString(raw.date),
    displayDate: asString(raw.displayDate),
    content: asString(raw.content),
  };
};

export const normalizePodcast = (raw: RawPodcast): PodcastContent => {
  const slug = asString(raw.slug);
  const category = asString(raw.category);

  return {
    id: raw.id as string | number | undefined,
    slug,
    href: asString(raw.href, `/podcasts/${slug}`),
    title: asString(raw.title),
    description: asString(raw.description),
    category,
    categories: category ? [categoryTag(category)] : [],
    imageSrc: asString(raw.image ?? raw.imageSrc),
    imageAlt: asString(raw.imageAlt, asString(raw.title)),
    date: asString(raw.date),
    displayDate: asString(raw.displayDate),
    duration: asString(raw.duration),
    mixcloudUrl: asString(raw.mixcloudUrl),
  };
};

// --- Strapi -> domain type mapping ---------------------------------------

const displayDate = (isoDate: string, locale: Locale): string =>
  isoDate ? formatDate(isoDate, locale) : "";

const mediaAlt = (media: StrapiMedia | null, fallback: string): string =>
  media?.alternativeText ?? fallback;

const normalizeCategories = (
  categories: StrapiCategory[] | null | undefined,
): ContentTag[] =>
  (categories ?? []).map((category) => ({
    id: category.id,
    slug: category.slug,
    key: category.key,
    name: category.name,
    color: category.color,
  }));

export const normalizeStrapiCategory = (
  category: StrapiCategory,
): ContentTag => ({
  id: category.id,
  slug: category.slug,
  key: category.key,
  name: category.name,
  color: category.color,
});

const normalizeSeo = (seo: StrapiSeo | null | undefined) =>
  seo
    ? {
        metaTitle: seo.metaTitle,
        metaDescription: seo.metaDescription,
        shareTitle: seo.shareTitle,
        shareDescription: seo.shareDescription,
        shareImage: getStrapiMediaUrl(seo.shareImage?.url),
        canonicalUrl: seo.canonicalUrl,
        noIndex: seo.noIndex,
      }
    : null;

const normalizeStrapiContent = (
  raw: StrapiArticle | StrapiNews | StrapiPodcast,
  locale: Locale,
) => {
  const categories = normalizeCategories(raw.categories);
  const cover = raw.featuredImage;

  return {
    id: raw.id,
    documentId: raw.documentId,
    slug: raw.slug,
    title: raw.title,
    description: raw.description ?? "",
    category: categories[0]?.name ?? "",
    categories,
    imageSrc: getStrapiMediaUrl(cover?.url) ?? "/images/stars.png",
    socialImage: getStrapiMediaUrl(cover?.url),
    imageAlt: mediaAlt(cover, raw.title),
    date: raw.publishedDate,
    displayDate: displayDate(raw.publishedDate, locale),
    content: "",
    contentBlocks: raw.content as ContentBlock[],
    seo: normalizeSeo(raw.seo),
  };
};

export const normalizeStrapiArticle = (
  raw: StrapiArticle,
  locale: Locale = defaultLocale,
): ArticleContent => ({
  ...normalizeStrapiContent(raw, locale),
  href: `/articles/${raw.slug}`,
});

export const normalizeStrapiNews = (
  raw: StrapiNews,
  locale: Locale = defaultLocale,
): NewsContent => ({
  ...normalizeStrapiContent(raw, locale),
  href: `/news/${raw.slug}`,
});

const formatDuration = (durationSeconds?: number | null): string =>
  durationSeconds && durationSeconds > 0
    ? `${Math.round(durationSeconds / 60)} min`
    : "";

export const normalizeStrapiPodcast = (
  raw: StrapiPodcast,
  locale: Locale = defaultLocale,
): PodcastContent => {
  const embed: EmbedBlock = {
    __component: "content.embed",
    provider: raw.embed.provider,
    url: raw.embed.url,
    title: raw.embed.title,
    aspectRatio: raw.embed.aspectRatio,
  };

  return {
    ...normalizeStrapiContent(raw, locale),
    href: `/podcasts/${raw.slug}`,
    duration: formatDuration(raw.durationSeconds),
    durationSeconds: raw.durationSeconds,
    mixcloudUrl: getEmbedUrl(embed) ?? "",
    show: raw.show ? { title: raw.show.title, slug: raw.show.slug } : null,
  };
};

export const normalizeStrapiPodcastShow = (
  raw: StrapiPodcastShow,
  locale: Locale = defaultLocale,
): PodcastShowContent => ({
  id: raw.id,
  slug: raw.slug,
  title: raw.title,
  description: raw.description ?? "",
  imageSrc: getStrapiMediaUrl(raw.featuredImage?.url) ?? "/images/stars.png",
  socialImage: getStrapiMediaUrl(raw.featuredImage?.url),
  seo: normalizeSeo(raw.seo),
  episodes: (raw.episodes ?? []).map((episode) =>
    normalizeStrapiPodcast(episode, locale),
  ),
});

export const normalizeStrapiSiteSettings = (
  raw: StrapiSiteSetting,
): SiteSettings => ({
  siteName: raw.siteName,
  tagline: raw.tagline,
  defaultDescription: raw.defaultDescription,
  logo: getStrapiMediaUrl(raw.logo?.url),
  defaultShareImage: getStrapiMediaUrl(raw.defaultShareImage?.url),
  defaultSeo: normalizeSeo(raw.defaultSeo),
  socialLinks: raw.socialLinks ?? [],
});

export const normalizeStrapiResident = (
  raw: StrapiResident,
): ResidentContent => ({
  id: raw.id,
  documentId: raw.documentId,
  slug: raw.slug,
  name: raw.name,
  summary: raw.summary ?? "",
  role: raw.role ?? "",
  tag: raw.tag ?? raw.role ?? "",
  socialLinks: raw.socialLinks ?? [],
  imageSrc: getStrapiMediaUrl(raw.portrait?.url) ?? "/images/astronaut.jpg",
  socialImage: getStrapiMediaUrl(raw.portrait?.url),
  imageAlt: mediaAlt(raw.portrait ?? null, raw.name),
  isEditorialMember: raw.isEditorialMember,
  editorialSortOrder: raw.editorialSortOrder,
  isFeatured: raw.isFeatured,
  sortOrder: raw.sortOrder,
  contentBlocks: (raw.content ?? []) as ContentBlock[],
  seo: normalizeSeo(raw.seo),
});

export const normalizeStrapiListingPage = (raw: StrapiListingPage | null) =>
  raw
    ? {
        header: raw.header,
        seo: normalizeSeo(raw.seo),
        content: raw.content ?? [],
      }
    : null;
