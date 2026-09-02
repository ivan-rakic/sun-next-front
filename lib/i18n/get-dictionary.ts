import type { Locale } from "./config";
import { dictionaries, type FrontendDictionary } from "./dictionaries";

export const getDictionary = (locale: Locale): FrontendDictionary =>
  dictionaries[locale];
