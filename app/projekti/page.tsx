import type { Metadata } from "next";

import { ContentRenderer } from "@/components/content/content-renderer";
import { PageHeader } from "@/components/page-header";
import { getStaticPageSettings } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import styles from "@/styles/pages/podcasts.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const settings = await getStaticPageSettings("projects-page", locale);
  const fallback = dictionary.seo.pages.projects;
  return createLocalizedMetadata(locale, "/projekti", {
    title: settings?.header?.title,
    description: settings?.header?.subtitle,
    fallbackTitle: fallback.title,
    fallbackDescription: fallback.description,
    seo: settings?.seo,
  });
}

export default async function Projects() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const settings = await getStaticPageSettings("projects-page", locale);
  const fallback = dictionary.seo.pages.projects;

  return (
    <main className={styles.podcastPage}>
      <PageHeader
        eyebrow={settings?.header?.eyebrow || dictionary.pages.projects.eyebrow}
        title={settings?.header?.title || fallback.title}
        description={settings?.header?.subtitle || fallback.description}
      />
      {settings?.content?.length ? (
        <ContentRenderer
          blocks={settings.content}
          dictionary={dictionary.content}
        />
      ) : null}
    </main>
  );
}
