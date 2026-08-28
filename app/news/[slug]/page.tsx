import { notFound } from 'next/navigation';
import Link from 'next/link';

import { news } from '@/constants';
import styles from '@/styles/pages/podcasts.module.scss';
import stylesRes from '@/styles/reusable.module.scss';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main className={`${stylesRes.content_container} ${styles.podcastPage}`}>
      <nav>
        <Link href="/news">← Back to News</Link>
      </nav>

      <article className={styles.featuredPodcast}>
        <div>
          <div
            className={styles.featuredPodcast__image}
            style={{ backgroundImage: `url(${item.imageSrc})` }}
          />

          <div className={styles.featuredPodcast__content}>
            <span>{item.category}</span>
            <h1>{item.title}</h1>

            <time dateTime={item.date}>{item.displayDate}</time>

            <p>{item.description}</p>

            <div>{item.content}</div>
          </div>
        </div>
      </article>
    </main>
  );
}
