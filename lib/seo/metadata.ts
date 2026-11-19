import type { Metadata } from "next";

import type { ContentSeo } from "@/types/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import {
  defaultLocale,
  localeHtmlLang,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { getSiteSettings } from "@/lib/content";

export type SeoCopy = {
  title?: string | null;
  description?: string | null;
  fallbackTitle?: string;
  fallbackDescription?: string;
  image?: string | null;
  seo?: ContentSeo | null;
  openGraphType?: "article" | "website";
};

const PRODUCTION_SITE_URL = "https://sunradio.rs";

const openGraphLocales: Record<Locale, string> = {
  "sr-Latn": "sr_RS",
  en: "en_GB",
  de: "de_DE",
};

export const getSiteMetadataBase = (): URL => new URL(PRODUCTION_SITE_URL);

export const isPublicIndexableEnvironment = (): boolean => {
  if (process.env.NODE_ENV !== "production") return false;

  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configuredUrl) return true;

  const { hostname, protocol } = new URL(configuredUrl);
  return protocol === "https:" && hostname === "sunradio.rs";
};

export const getCanonicalUrl = (
  locale: Locale,
  path: string,
  override?: string | null,
): string => {
  if (override) {
    try {
      const url = new URL(override);
      if (url.protocol === "https:") return url.toString();
    } catch {
      // Invalid optional Strapi URLs fall back to the generated canonical.
    }
  }

  return new URL(localizedPath(locale, path), getSiteMetadataBase()).toString();
};

export const getAbsolutePublicUrl = (value: string): string => {
  return new URL(value, getSiteMetadataBase()).toString();
};

export const createLocalizedMetadata = async (
  locale: Locale,
  path: string,
  copy: SeoCopy,
  options: { index?: boolean; alternateLocales?: boolean } = {},
): Promise<Metadata> => {
  const siteSettings = await getSiteSettings(locale);
  const dictionary = getDictionary(locale);
  const defaultSeo = siteSettings?.defaultSeo;
  const pageSeo = copy.seo;
  const title =
    pageSeo?.metaTitle ||
    copy.title ||
    defaultSeo?.metaTitle ||
    copy.fallbackTitle ||
    siteSettings?.siteName ||
    dictionary.seo.defaultTitle;
  const description =
    pageSeo?.metaDescription ||
    copy.description ||
    defaultSeo?.metaDescription ||
    siteSettings?.defaultDescription ||
    siteSettings?.tagline ||
    copy.fallbackDescription ||
    dictionary.seo.defaultDescription;
  const shareTitle =
    pageSeo?.shareTitle ||
    (copy.title || pageSeo?.metaTitle
      ? title
      : defaultSeo?.shareTitle || title);
  const shareDescription =
    pageSeo?.shareDescription ||
    (copy.description || pageSeo?.metaDescription
      ? description
      : defaultSeo?.shareDescription || description);
  const shareImage =
    pageSeo?.shareImage ||
    copy.image ||
    siteSettings?.defaultShareImage ||
    defaultSeo?.shareImage ||
    "/images/stars.png";
  const absoluteShareImage = getAbsolutePublicUrl(shareImage);
  const canonical = getCanonicalUrl(locale, path, pageSeo?.canonicalUrl);
  const shouldIndex =
    options.index !== false &&
    pageSeo?.noIndex !== true &&
    defaultSeo?.noIndex !== true &&
    isPublicIndexableEnvironment();
  const languages = Object.fromEntries([
    ...locales.map(
      (candidate) =>
        [localeHtmlLang[candidate], localizedPath(candidate, path)] as const,
    ),
    ["x-default", localizedPath(defaultLocale, path)] as const,
  ]);

  return {
    title,
    description,
    alternates: {
      canonical,
      ...(options.alternateLocales !== false && shouldIndex && { languages }),
    },
    openGraph: {
      type: copy.openGraphType ?? "website",
      siteName: siteSettings?.siteName ?? dictionary.seo.brand,
      title: shareTitle,
      description: shareDescription,
      url: canonical,
      locale: openGraphLocales[locale],
      images: [{ url: absoluteShareImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [absoluteShareImage],
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
    },
  };
};
