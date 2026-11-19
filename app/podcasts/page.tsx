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
  const settings = await getListingPageSettings("podcasts", locale);
  const fallback = dictionary.seo.pages.podcasts;
  return createLocalizedMetadata(locale, "/podcasts", {
    title: settings?.header?.title,
    description: settings?.header?.subtitle,
    fallbackTitle: fallback.title,
    fallbackDescription: fallback.description,
    seo: settings?.seo,
  });
}

export default async function PodcastPage() {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const listing = await getContentListing("podcasts", locale, 1, 12);
  const fallbackHeader = dictionary.seo.pages.podcasts;
  const header = listing.pageSettings?.header;
  const headerLink = header?.link;

  return (
    <main className={styles.podcastPage}>
      <PageHeader
        eyebrow={header?.eyebrow || dictionary.pages.podcasts.eyebrow}
        title={header?.title || fallbackHeader.title}
        description={header?.subtitle || fallbackHeader.description}
        action={{
          href:
            headerLink?.url ?? "https://www.mixcloud.com/sunradiosan/uploads/",
          label: headerLink?.label ?? dictionary.pages.podcasts.mixcloudArchive,
          external:
            headerLink?.openInNewTab ??
            headerLink?.url.startsWith("http") ??
            true,
        }}
      />

      <section className={styles.podcastListSection}>
        <div className={styles.podcastListSection__header}>
          <h2>{dictionary.home.latestEpisodes}</h2>
          <p>{dictionary.pages.podcasts.latestDescription}</p>
        </div>

        <ContentListing
          kind="podcasts"
          locale={locale}
          initialResult={listing}
          dictionary={dictionary.listing}
          readMoreLabel={dictionary.ui.readMore}
        />
      </section>
    </main>
  );
}
