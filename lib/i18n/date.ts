import type { Locale } from "./config";
import { localeDateFormats } from "./config";

export const formatDate = (
  value: string | Date,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
): string =>
  new Intl.DateTimeFormat(localeDateFormats[locale], options).format(
    new Date(value),
  );
