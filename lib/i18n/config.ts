export const locales = ["sr-Latn", "en", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sr-Latn";

export const isLocale = (value: string | undefined): value is Locale =>
  value !== undefined && locales.includes(value as Locale);

export const localeLabels: Record<Locale, string> = {
  "sr-Latn": "SR",
  en: "EN",
  de: "DE",
};

export const localeHtmlLang: Record<Locale, string> = {
  "sr-Latn": "sr-RS",
  en: "en",
  de: "de",
};

export const localeDateFormats: Record<Locale, string> = {
  "sr-Latn": "sr-Latn-RS",
  en: "en-GB",
  de: "de-DE",
};
