import { notFound } from "next/navigation";

import { ContentDetail } from "@/components/templates/content-detail";
import { getArticleBySlug, getArticles } from "@/lib/content";
import { formatDate } from "@/lib/i18n/date";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";
import styles from "@/styles/pages/podcasts.module.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className={styles.podcastPage}>
      <ContentDetail
        backHref={localizedPath(locale, "/articles")}
        backLabel={`${dictionary.ui.backTo} ${dictionary.navigation.articles}`}
        imageSrc={article.imageSrc}
        category={article.category}
        title={article.title}
        date={article.date}
        meta={formatDate(article.date, locale)}
        description={article.description}
        bodyContent={article.content}
      />
    </main>
  );
}
