import type { NextApiRequest, NextApiResponse } from "next";

import { getContentListing } from "@/lib/content";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import type { ContentKind } from "@/types/content";

const contentKinds: ContentKind[] = ["articles", "news", "podcasts"];

const queryValue = (
  value: string | string[] | undefined,
): string | undefined => (Array.isArray(value) ? value[0] : value);

const parsePositiveInteger = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).end();
    return;
  }

  const kindValue = queryValue(request.query.type);
  if (!kindValue || !contentKinds.includes(kindValue as ContentKind)) {
    response.status(404).json({ error: "Unknown content collection" });
    return;
  }

  const localeValue = queryValue(request.query.locale);
  const locale = isLocale(localeValue) ? localeValue : defaultLocale;
  const page = parsePositiveInteger(queryValue(request.query.page), 1);
  const pageSize = parsePositiveInteger(queryValue(request.query.pageSize), 12);
  const categorySlugs = Array.isArray(request.query.category)
    ? request.query.category
    : request.query.category
      ? [request.query.category]
      : [];

  const result = await getContentListing(
    kindValue as ContentKind,
    locale,
    page,
    pageSize,
    categorySlugs,
  );

  response.setHeader("Cache-Control", "no-store");
  response.status(200).json(result);
}
