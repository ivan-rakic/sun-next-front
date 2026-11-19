import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ContentListing } from "@/components/content/content-listing";
import { getContentListing, getListingPageSettings } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import styles from "@/styles/pages/podcasts.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const settings = await getListingPageSettings("articles", locale);
  const fallback = dictionary.seo.pages.articles;
  return createLocalizedMetadata(locale, "/articles", {
    title: settings?.header?.title,
    description: settings?.header?.subtitle,
    fallbackTitle: fallback.title,
    fallbackDescription: fallback.description,
    seo: settings?.seo,
  });
}

export default async function ArticlesPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const listing = await getContentListing("articles", locale, 1, 12);
  const fallbackHeader = dictionary.archive.articles;
  const header = listing.pageSettings?.header;

  return (
    <main className={styles.podcastPage}>
      <PageHeader
        eyebrow={header?.eyebrow || dictionary.archive.portalEyebrow}
        title={header?.title || fallbackHeader.title}
        description={header?.subtitle || fallbackHeader.description}
      />

      <section className={styles.podcastListSection}>
        <div className={styles.podcastListSection__header}>
          <h2>{fallbackHeader.sectionTitle}</h2>
          <p>{fallbackHeader.sectionDescription}</p>
        </div>
        <ContentListing
          kind="articles"
          locale={locale}
          initialResult={listing}
          dictionary={dictionary.listing}
          readMoreLabel={dictionary.ui.readMore}
        />
      </section>
    </main>
  );
}
