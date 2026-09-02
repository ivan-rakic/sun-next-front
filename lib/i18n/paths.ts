import { defaultLocale, isLocale, type Locale } from "./config";

const normalizePath = (path: string): string => {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "");
};

export const stripLocalePrefix = (path: string): string => {
  const normalizedPath = normalizePath(path);
  const [firstSegment] = normalizedPath.slice(1).split("/");

  if (!isLocale(firstSegment) || firstSegment === defaultLocale)
    return normalizedPath;

  const remainingPath = normalizedPath.slice(firstSegment.length + 1);
  return remainingPath || "/";
};

export const localizedPath = (locale: Locale, path: string): string => {
  const canonicalPath = stripLocalePrefix(path);

  if (locale === defaultLocale) return canonicalPath;

  return canonicalPath === "/" ? `/${locale}` : `/${locale}${canonicalPath}`;
};
