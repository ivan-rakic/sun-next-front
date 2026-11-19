import type { Metadata } from "next";

import { getProgramSchedule, getStaticPageSettings } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { createLocalizedMetadata } from "@/lib/seo/metadata";

import { ProgramClient } from "./program-client";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const settings = await getStaticPageSettings("program-page", locale);
  const fallback = dictionary.seo.pages.program;
  return createLocalizedMetadata(locale, "/program", {
    title: settings?.header?.title,
    description: settings?.header?.subtitle,
    fallbackTitle: fallback.title,
    fallbackDescription: fallback.description,
    seo: settings?.seo,
  });
}

export default async function ProgramPage(): Promise<React.ReactElement> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [schedule, settings] = await Promise.all([
    getProgramSchedule(locale),
    getStaticPageSettings("program-page", locale),
  ]);

  return (
    <ProgramClient
      locale={locale}
      dictionary={dictionary.program}
      pageCopy={dictionary.seo.pages.program}
      eyebrow={settings?.header?.eyebrow || dictionary.pages.program.eyebrow}
      title={settings?.header?.title || dictionary.seo.pages.program.title}
      description={
        settings?.header?.subtitle || dictionary.seo.pages.program.description
      }
      programDays={schedule}
    />
  );
}
