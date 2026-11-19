import type { MetadataRoute } from "next";

import { getSiteSettings } from "@/lib/content";
import { defaultLocale } from "@/lib/i18n/config";
import { isPublicIndexableEnvironment } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteSettings = await getSiteSettings(defaultLocale);
  const canIndex =
    isPublicIndexableEnvironment() &&
    siteSettings?.defaultSeo?.noIndex !== true;

  return {
    rules: {
      userAgent: "*",
      ...(canIndex ? { allow: "/" } : { disallow: "/" }),
    },
    sitemap: "https://sunradio.rs/sitemap.xml",
  };
}
