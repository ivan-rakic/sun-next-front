import type { StrapiMedia } from "@/types/content-blocks";

const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export const getStrapiMediaUrl = (url?: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith("/images/")) return url;

  try {
    return new URL(url).toString();
  } catch {
    if (!strapiBaseUrl) return null;

    try {
      return new URL(url, strapiBaseUrl).toString();
    } catch {
      return null;
    }
  }
};

export const hasRenderableMedia = (
  media: StrapiMedia | null | undefined,
): media is StrapiMedia => Boolean(media && getStrapiMediaUrl(media.url));
