import { headers } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "./config";

export const parseLocale = (value: string | undefined): Locale | undefined =>
  isLocale(value) ? value : undefined;

export const getRequestLocale = async (): Promise<Locale> => {
  const requestHeaders = await headers();

  return (
    parseLocale(requestHeaders.get("x-sunradio-locale") ?? undefined) ??
    defaultLocale
  );
};
