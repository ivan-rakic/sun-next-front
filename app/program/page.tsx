import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";

import { ProgramClient } from "./program-client";

export default async function ProgramPage(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return <ProgramClient locale={locale} dictionary={dictionary.program} />;
}
