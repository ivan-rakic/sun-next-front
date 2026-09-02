import { notFound } from "next/navigation";

import { ContentDetail } from "@/components/templates/content-detail";
import { getNews, getNewsBySlug } from "@/lib/content";
import { formatDate } from "@/lib/i18n/date";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";
import styles from "@/styles/pages/podcasts.module.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getNews().map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const item = getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className={styles.podcastPage}>
      <ContentDetail
        backHref={localizedPath(locale, "/news")}
        backLabel={`${dictionary.ui.backTo} ${dictionary.navigation.news}`}
        imageSrc={item.imageSrc}
        category={item.category}
        title={item.title}
        date={item.date}
        meta={formatDate(item.date, locale)}
        description={item.description}
        bodyContent={item.content}
      />
    </main>
  );
}
