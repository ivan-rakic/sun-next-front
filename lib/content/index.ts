import { articles, news, PODCASTS, programDays } from "@/constants";
import { editorialMembersFallback } from "@/constants/editorial-team";
import { featuredSlideFallbacks } from "@/constants/featured-slides";
import { residents as residentFallbacks } from "@/constants/residents";
import type {
  ArticleContent,
  ContentKind,
  ContentListingResult,
  ContentPageSettings,
  ContentTag,
  NewsContent,
  PodcastContent,
  PodcastShowContent,
  ProgramDay,
  ResidentContent,
  SiteSettings,
} from "@/types/content";
import type { StrapiArticle, StrapiNews, StrapiPodcast } from "@/types/strapi";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { FrontendDictionary } from "@/lib/i18n/dictionaries";
import {
  fetchCategories,
  fetchContentBySlug,
  fetchContentPage,
  fetchContentPageSettings,
  fetchFeaturedSelection,
  fetchPodcastShowBySlug,
  fetchPodcastShows,
  fetchProgramSlots,
  fetchResidents,
  fetchSiteSettings,
  fetchStaticPage,
  type StrapiStaticPage,
} from "@/lib/strapi/api";
import { StrapiError } from "@/lib/strapi/client";

import {
  normalizeArticle,
  normalizeNews,
  normalizePodcast,
  normalizeStrapiArticle,
  normalizeStrapiCategory,
  normalizeStrapiListingPage,
  normalizeStrapiNews,
  normalizeStrapiPodcast,
  normalizeStrapiPodcastShow,
  normalizeStrapiResident,
  normalizeStrapiSiteSettings,
} from "./normalize";
import { getStrapiMediaUrl } from "./media";

type HomepageSlide = {
  id: string;
  title: string;
  description: string;
  href: string;
  tag: string;
  image: string;
  priority?: boolean;
};

export type HomepageFeatured = {
  title: string;
  subtitle: string;
  slides: HomepageSlide[];
};

const fallbackHomepageFeatured = (
  dictionary: FrontendDictionary["home"],
): HomepageFeatured => ({
  title: dictionary.featured,
  subtitle: dictionary.featuredDescription,
  slides: featuredSlideFallbacks.map((slide) => ({
    ...dictionary.featuredSlides[slide.id],
    id: slide.id,
    href: slide.href,
    image: slide.image.src,
    priority: slide.priority,
  })),
});

export const getHomepageFeatured = async (
  locale: Locale,
  dictionary: FrontendDictionary["home"],
): Promise<HomepageFeatured> => {
  try {
    const response = await fetchFeaturedSelection(locale);
    const selection = response.data;
    if (!selection?.items?.length) return fallbackHomepageFeatured(dictionary);

    const slides = selection.items.flatMap((item, index): HomepageSlide[] => {
      const content =
        item.__component === "featured.article"
          ? item.article
          : item.__component === "featured.podcast"
            ? item.podcast
            : item.news_item;
      if (!content) return [];

      const fallback =
        item.__component === "featured.article"
          ? dictionary.featuredSlides.editorial
          : item.__component === "featured.podcast"
            ? dictionary.featuredSlides.podcastSeries
            : dictionary.featuredSlides.programEvents;
      const route =
        item.__component === "featured.article"
          ? "/articles"
          : item.__component === "featured.podcast"
            ? "/podcasts"
            : "/news";
      const tag =
        content.categories?.[0]?.name ??
        (item.__component === "featured.article"
          ? dictionary.featuredTags.article
          : item.__component === "featured.podcast"
            ? dictionary.featuredTags.podcast
            : dictionary.featuredTags.news);

      return [
        {
          id: `${item.__component}-${item.id}-${index}`,
          title: item.overrideTitle || content.title || fallback.title,
          description:
            item.overrideDescription ||
            content.description ||
            fallback.description,
          href: `${route}/${content.slug}`,
          tag,
          image:
            getStrapiMediaUrl(item.overrideImage?.url) ??
            getStrapiMediaUrl(content.featuredImage?.url) ??
            "/images/stars.png",
          priority: index === 0,
        },
      ];
    });

    return slides.length > 0
      ? {
          title: selection.title || dictionary.featured,
          subtitle: selection.subtitle || dictionary.featuredDescription,
          slides,
        }
      : fallbackHomepageFeatured(dictionary);
  } catch {
    return fallbackHomepageFeatured(dictionary);
  }
};

export type ListingContent = ArticleContent | NewsContent | PodcastContent;

const fallbackItems = (kind: ContentKind): ListingContent[] => {
  const items =
    kind === "articles"
      ? articles.map(normalizeArticle)
      : kind === "news"
        ? news.map(normalizeNews)
        : PODCASTS.map(normalizePodcast);

  return items.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
};

const uniqueCategories = (items: ListingContent[]): ContentTag[] => {
  const categories = new Map<string, ContentTag>();
  for (const item of items) {
    for (const category of item.categories ?? []) {
      categories.set(category.slug, category);
    }
  }
  return [...categories.values()].sort((first, second) =>
    first.name.localeCompare(second.name),
  );
};

const matchesCategories = (
  item: ListingContent,
  selectedSlugs: string[],
): boolean =>
  selectedSlugs.length === 0 ||
  (item.categories ?? []).some((category) =>
    selectedSlugs.includes(category.slug),
  );

const paginateFallback = (
  kind: ContentKind,
  page: number,
  pageSize: number,
  categorySlugs: string[],
): ContentListingResult<ListingContent> => {
  const allItems = fallbackItems(kind);
  const categories = uniqueCategories(allItems);
  const filteredItems = allItems.filter((item) =>
    matchesCategories(item, categorySlugs),
  );
  const pageCount =
    filteredItems.length <= 12
      ? 1
      : 1 + Math.ceil((filteredItems.length - 12) / 8);
  const offset = page === 1 ? 0 : 12 + (page - 2) * 8;

  return {
    items: filteredItems.slice(offset, offset + pageSize),
    categories,
    pagination: {
      page,
      pageSize,
      pageCount,
      total: filteredItems.length,
    },
    pageSettings: null,
  };
};

const normalizeContent = (
  kind: ContentKind,
  item: StrapiArticle | StrapiNews | StrapiPodcast,
  locale: Locale,
): ListingContent => {
  if (kind === "articles")
    return normalizeStrapiArticle(item as StrapiArticle, locale);
  if (kind === "news") return normalizeStrapiNews(item as StrapiNews, locale);
  return normalizeStrapiPodcast(item as StrapiPodcast, locale);
};

export const getContentListing = async (
  kind: ContentKind,
  locale: Locale,
  page = 1,
  pageSize = 12,
  categorySlugs: string[] = [],
): Promise<ContentListingResult<ListingContent>> => {
  const safePage = Math.max(1, Math.floor(page));
  const maxPageSize = safePage === 1 ? 12 : 8;
  const safePageSize = Math.max(1, Math.min(maxPageSize, Math.floor(pageSize)));

  const [response, categoryResponse, pageResponse] = await Promise.all([
    fetchContentPage(kind, {
      locale,
      page: safePage,
      pageSize: safePageSize,
      categorySlugs,
    }).catch(() => null),
    fetchCategories(kind, locale).catch(() => null),
    fetchContentPageSettings(kind, locale).catch(() => null),
  ]);
  const pageSettings = pageResponse
    ? normalizeStrapiListingPage(pageResponse.data)
    : null;
  const fallbackResult = paginateFallback(
    kind,
    safePage,
    safePageSize,
    categorySlugs,
  );

  if (!response || response.data.length === 0) {
    return {
      ...fallbackResult,
      categories: categoryResponse
        ? categoryResponse.data.map(normalizeStrapiCategory)
        : fallbackResult.categories,
      pageSettings,
    };
  }

  const items = response.data.map((item) =>
    normalizeContent(kind, item, locale),
  );
  return {
    items,
    categories: categoryResponse
      ? categoryResponse.data.map(normalizeStrapiCategory)
      : uniqueCategories(items),
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      pageCount:
        response.meta.pagination.total <= 12
          ? 1
          : 1 + Math.ceil((response.meta.pagination.total - 12) / 8),
      total: response.meta.pagination.total,
    },
    pageSettings,
  };
};

export const getListingPageSettings = async (
  kind: ContentKind,
  locale: Locale,
) => {
  try {
    const response = await fetchContentPageSettings(kind, locale);
    return normalizeStrapiListingPage(response.data);
  } catch {
    return null;
  }
};

export const getStaticPageSettings = async (
  page: StrapiStaticPage,
  locale: Locale,
): Promise<ContentPageSettings | null> => {
  try {
    const response = await fetchStaticPage(page, locale);
    return normalizeStrapiListingPage(response.data);
  } catch {
    return null;
  }
};

const weekdayKeys: ProgramDay["dayOfWeek"][] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const formatSlotTime = (value: string): string => value.slice(0, 5);

const fallbackProgramSchedule = (): ProgramDay[] =>
  programDays.map((day, index) => ({
    dayOfWeek: weekdayKeys[index],
    shows: day.shows.map((show) => ({
      time: show.time,
      title: show.title,
      description: show.description,
      isResident: show.isResident,
      slug: show.slug,
    })),
  }));

export const getProgramSchedule = async (
  locale: Locale,
): Promise<ProgramDay[]> => {
  try {
    const response = await fetchProgramSlots(locale);
    if (response.data.length === 0) return fallbackProgramSchedule();

    return weekdayKeys.map((dayOfWeek) => ({
      dayOfWeek,
      shows: response.data
        .filter((slot) => slot.dayOfWeek === dayOfWeek)
        .sort((first, second) =>
          first.startTime.localeCompare(second.startTime),
        )
        .map((slot) => ({
          time: `${formatSlotTime(slot.startTime)} - ${formatSlotTime(slot.endTime)}`,
          title: slot.title,
          description: slot.description ?? "",
          isResident: Boolean(slot.resident),
          slug: slot.resident?.slug,
        })),
    }));
  } catch {
    return fallbackProgramSchedule();
  }
};

const getSingleFallback = <T extends ListingContent>(
  kind: ContentKind,
  slug: string,
): T | undefined =>
  fallbackItems(kind).find((item) => item.slug === slug) as T | undefined;

const getCollection = async <T extends ListingContent>(
  kind: ContentKind,
  locale: Locale,
): Promise<T[]> => {
  try {
    const response = await fetchContentPage(kind, {
      locale,
      page: 1,
      pageSize: 100,
      start: 0,
      limit: 100,
    });
    if (response.data.length === 0) return fallbackItems(kind) as T[];
    return response.data.map((item) =>
      normalizeContent(kind, item, locale),
    ) as T[];
  } catch {
    return fallbackItems(kind) as T[];
  }
};

const getBySlug = async <T extends ListingContent>(
  kind: ContentKind,
  slug: string,
  locale: Locale,
): Promise<T | undefined> => {
  try {
    const response = await fetchContentBySlug(kind, slug, locale);
    const item = response.data[0];
    return item ? (normalizeContent(kind, item, locale) as T) : undefined;
  } catch {
    return getSingleFallback<T>(kind, slug);
  }
};

export const getArticles = (locale: Locale = defaultLocale) =>
  getCollection<ArticleContent>("articles", locale);
export const getArticleBySlug = (
  slug: string,
  locale: Locale = defaultLocale,
) => getBySlug<ArticleContent>("articles", slug, locale);

export const getNews = (locale: Locale = defaultLocale) =>
  getCollection<NewsContent>("news", locale);
export const getNewsBySlug = (slug: string, locale: Locale = defaultLocale) =>
  getBySlug<NewsContent>("news", slug, locale);

export const getPodcasts = (locale: Locale = defaultLocale) =>
  getCollection<PodcastContent>("podcasts", locale);
export const getPodcastBySlug = (
  slug: string,
  locale: Locale = defaultLocale,
) => getBySlug<PodcastContent>("podcasts", slug, locale);

export const getPodcastShows = async (
  locale: Locale = defaultLocale,
): Promise<PodcastShowContent[]> => {
  try {
    const response = await fetchPodcastShows(locale);
    return response.data.map((show) =>
      normalizeStrapiPodcastShow(show, locale),
    );
  } catch (error) {
    console.error("Failed to fetch published podcast shows from Strapi", error);
    return [];
  }
};

export const getPodcastShowBySlug = async (
  slug: string,
  locale: Locale,
): Promise<PodcastShowContent | undefined> => {
  try {
    const response = await fetchPodcastShowBySlug(slug, locale);
    const show = response.data[0];
    return show ? normalizeStrapiPodcastShow(show, locale) : undefined;
  } catch (error) {
    if (error instanceof StrapiError && error.status === 404) return undefined;
    throw error;
  }
};

export const getSiteSettings = async (
  locale: Locale = defaultLocale,
): Promise<SiteSettings | null> => {
  try {
    const response = await fetchSiteSettings(locale);
    return normalizeStrapiSiteSettings(response.data);
  } catch (error) {
    if (error instanceof StrapiError && error.status === 404) return null;
    console.error("Failed to fetch Strapi site settings", error);
    return null;
  }
};

const normalizeFallbackResident = (
  resident: (typeof residentFallbacks)[number],
  index: number,
  locale: Locale,
): ResidentContent => {
  const dictionary = getDictionary(locale);
  const tag = dictionary.residents.tags[resident.tag];

  return {
    id: resident.slug,
    slug: resident.slug,
    number: resident.number,
    name: "",
    summary: dictionary.residents.examples[resident.tag],
    role: tag,
    tag,
    socialLinks: [],
    imageSrc: resident.image.src,
    imageAlt: dictionary.residents.imageAlt,
    isEditorialMember: false,
    editorialSortOrder: index,
    isFeatured: true,
    sortOrder: index,
    contentBlocks: [],
  };
};

export const getFeaturedResidents = async (
  locale: Locale,
  limit = 4,
): Promise<ResidentContent[]> => {
  try {
    const response = await fetchResidents({
      locale,
      featured: true,
      page: 1,
      pageSize: limit,
    });
    return response.data.length > 0
      ? response.data.map(normalizeStrapiResident)
      : residentFallbacks
          .slice(0, limit)
          .map((resident, index) =>
            normalizeFallbackResident(resident, index, locale),
          );
  } catch {
    return residentFallbacks
      .slice(0, limit)
      .map((resident, index) =>
        normalizeFallbackResident(resident, index, locale),
      );
  }
};

const fallbackEditorialMembers = (locale: Locale): ResidentContent[] => {
  const dictionary = getDictionary(locale);
  return editorialMembersFallback.map((member, index) => ({
    id: `editorial-${index + 1}`,
    slug: `editorial-${index + 1}`,
    name: member.name,
    summary: "",
    role: dictionary.pages.about.roles[member.role],
    tag: dictionary.pages.about.roles[member.role],
    socialLinks: [
      { label: "Facebook", url: member.facebookUrl, openInNewTab: true },
      { label: "Instagram", url: member.instagramUrl, openInNewTab: true },
    ],
    imageSrc: member.image.src,
    imageAlt: member.name,
    isEditorialMember: true,
    editorialSortOrder: index,
    isFeatured: false,
    sortOrder: index,
    contentBlocks: [],
  }));
};

export const getEditorialResidents = async (
  locale: Locale,
): Promise<ResidentContent[]> => {
  try {
    const response = await fetchResidents({
      locale,
      editorialMember: true,
      page: 1,
      pageSize: 100,
    });
    return response.data.length > 0
      ? response.data.map(normalizeStrapiResident)
      : fallbackEditorialMembers(locale);
  } catch {
    return fallbackEditorialMembers(locale);
  }
};

export const getResidents = async (
  locale: Locale = defaultLocale,
): Promise<ResidentContent[]> => {
  try {
    const response = await fetchResidents({ locale, page: 1, pageSize: 100 });
    return response.data.length > 0
      ? response.data.map(normalizeStrapiResident)
      : residentFallbacks.map((resident, index) =>
          normalizeFallbackResident(resident, index, locale),
        );
  } catch {
    return residentFallbacks.map((resident, index) =>
      normalizeFallbackResident(resident, index, locale),
    );
  }
};

export const getResidentBySlug = async (
  slug: string,
  locale: Locale,
): Promise<ResidentContent | undefined> => {
  try {
    const response = await fetchResidents({ locale, slug, pageSize: 1 });
    const resident = response.data[0];
    if (resident) return normalizeStrapiResident(resident);
  } catch {
    // Keep the profile placeholders available while Strapi is offline.
  }

  const fallbackIndex = residentFallbacks.findIndex(
    (resident) => resident.slug === slug,
  );
  return fallbackIndex < 0
    ? undefined
    : normalizeFallbackResident(
        residentFallbacks[fallbackIndex],
        fallbackIndex,
        locale,
      );
};
