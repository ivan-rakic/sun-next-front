import { notFound } from "next/navigation";
import { ContentRenderer } from "@/components/content/content-renderer";
import { contentBlockFixtures } from "@/lib/content/block-fixtures";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import styles from "@/styles/pages/podcasts.module.scss";
export default async function ContentPreviewPage(): Promise<React.ReactElement> {
  if (process.env.NODE_ENV === "production") notFound();
  const locale = await getRequestLocale();
  return (
    <main className={styles.podcastPage}>
      <ContentRenderer
        blocks={contentBlockFixtures}
        dictionary={getDictionary(locale).content}
      />
    </main>
  );
}
