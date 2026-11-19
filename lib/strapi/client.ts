// Thin REST client for Strapi. Not wired into any page yet — this is the
// seam to use once a real Strapi backend exists (see lib/strapi/api.ts).

const STRAPI_URL = process.env.SUN_API_URL || "http://localhost:1337/api";
const STRAPI_TOKEN = process.env.SUN_API_TOKEN;

export class StrapiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "StrapiError";
  }
}

export type StrapiQuery = Record<string, string | number | boolean | undefined>;

const buildUrl = (path: string, query?: StrapiQuery): string => {
  const url = new URL(`${STRAPI_URL}${path}`);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });

  return url.toString();
};

export const strapiFetch = async <T>(
  path: string,
  query?: StrapiQuery,
  init?: RequestInit,
): Promise<T> => {
  const res = await fetch(buildUrl(path, query), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new StrapiError(
      `Strapi request failed: ${path} (${res.status})`,
      res.status,
    );
  }

  return res.json() as Promise<T>;
};
