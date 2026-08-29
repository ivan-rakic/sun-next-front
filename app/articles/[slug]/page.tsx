import { notFound } from 'next/navigation';

import { ContentDetail } from '@/components/templates/content-detail';
import { getArticleBySlug, getArticles } from '@/lib/content';
import styles from '@/styles/pages/podcasts.module.scss';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className={styles.podcastPage}>
      <ContentDetail
        backHref="/articles"
        backLabel="Back to Articles"
        imageSrc={article.imageSrc}
        category={article.category}
        title={article.title}
        date={article.date}
        meta={article.displayDate}
        description={article.description}
        bodyContent={article.content}
      />
    </main>
  );
}
