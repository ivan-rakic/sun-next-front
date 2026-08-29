import { notFound } from 'next/navigation';

import { ContentDetail } from '@/components/templates/content-detail';
import { getNews, getNewsBySlug } from '@/lib/content';
import styles from '@/styles/pages/podcasts.module.scss';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getNews().map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <main className={styles.podcastPage}>
      <ContentDetail
        backHref="/news"
        backLabel="Back to News"
        imageSrc={item.imageSrc}
        category={item.category}
        title={item.title}
        date={item.date}
        meta={item.displayDate}
        description={item.description}
        bodyContent={item.content}
      />
    </main>
  );
}
