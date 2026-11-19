import type {
  ArticleContent,
  NewsContent,
  PodcastContent,
  PodcastShowContent,
  SiteSettings,
} from "@/types/content";

import { getAbsolutePublicUrl, getCanonicalUrl } from "./metadata";
import { localeHtmlLang, type Locale } from "@/lib/i18n/config";

const isValidDate = (value: string): boolean =>
  value.length > 0 && !Number.isNaN(Date.parse(value));

export const createHomepageStructuredData = (
  locale: Locale,
  site: SiteSettings | null,
  defaultDescription: string,
) => {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site?.siteName ?? "SunRadio",
    url: getCanonicalUrl(locale, "/"),
    ...(site?.logo && { logo: getAbsolutePublicUrl(site.logo) }),
    ...(site?.socialLinks.length && {
      sameAs: site.socialLinks.map(({ url }) => url),
    }),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site?.siteName ?? "SunRadio",
    url: getCanonicalUrl(locale, "/"),
    description:
      site?.defaultDescription || site?.tagline || defaultDescription,
    inLanguage: localeHtmlLang[locale],
    publisher: {
      "@type": "Organization",
      name: site?.siteName ?? "SunRadio",
      url: getCanonicalUrl(locale, "/"),
    },
  };

  return [organization, website];
};

type ArticleStructuredDataInput = {
  content: ArticleContent | NewsContent;
  locale: Locale;
  type: "Article" | "NewsArticle";
  publisherName: string;
  defaultShareImage?: string | null;
};

export const createArticleStructuredData = ({
  content,
  locale,
  type,
  publisherName,
  defaultShareImage,
}: ArticleStructuredDataInput) => {
  const url = getCanonicalUrl(locale, content.href, content.seo?.canonicalUrl);

  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: content.title,
    ...(content.description && { description: content.description }),
    image: getAbsolutePublicUrl(
      content.seo?.shareImage ||
        content.socialImage ||
        defaultShareImage ||
        "/images/stars.png",
    ),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(isValidDate(content.date) && { datePublished: content.date }),
    publisher: {
      "@type": "Organization",
      name: publisherName,
      url: getCanonicalUrl(locale, "/"),
    },
  };
};

export const createPodcastEpisodeStructuredData = (
  episode: PodcastContent,
  locale: Locale,
  publisherName: string,
  defaultShareImage?: string | null,
) => {
  const url = getCanonicalUrl(locale, episode.href, episode.seo?.canonicalUrl);

  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    ...(episode.description && { description: episode.description }),
    image: getAbsolutePublicUrl(
      episode.seo?.shareImage ||
        episode.socialImage ||
        defaultShareImage ||
        "/images/stars.png",
    ),
    url,
    ...(isValidDate(episode.date) && { datePublished: episode.date }),
    ...(episode.durationSeconds &&
      episode.durationSeconds > 0 && {
        duration: `PT${episode.durationSeconds}S`,
      }),
    ...(episode.show && {
      partOfSeries: {
        "@type": "PodcastSeries",
        name: episode.show.title,
        url: getCanonicalUrl(locale, `/podcast-shows/${episode.show.slug}`),
      },
    }),
    ...(episode.mixcloudUrl && {
      associatedMedia: {
        "@type": "MediaObject",
        contentUrl: episode.mixcloudUrl,
      },
    }),
    publisher: {
      "@type": "Organization",
      name: publisherName,
      url: getCanonicalUrl(locale, "/"),
    },
  };
};

export const createPodcastSeriesStructuredData = (
  show: PodcastShowContent,
  locale: Locale,
  publisherName: string,
  defaultShareImage?: string | null,
) => {
  const url = getCanonicalUrl(
    locale,
    `/podcast-shows/${show.slug}`,
    show.seo?.canonicalUrl,
  );

  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: show.title,
    ...(show.description && { description: show.description }),
    image: getAbsolutePublicUrl(
      show.seo?.shareImage ||
        show.socialImage ||
        defaultShareImage ||
        "/images/stars.png",
    ),
    url,
    publisher: {
      "@type": "Organization",
      name: publisherName,
      url: getCanonicalUrl(locale, "/"),
    },
  };
};
