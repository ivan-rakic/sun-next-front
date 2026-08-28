import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { articles } from '@/constants';
import styles from '@/styles/podcasts.module.scss';
import stylesRes from '@/styles/reusable.module.scss';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className={`${stylesRes.content_container} ${styles.podcastPage}`}>
      <nav>
        <Link href="/articles">← Back to Articles</Link>
      </nav>

      <article className={styles.featuredPodcast}>
        <div>
          <div
            className={styles.featuredPodcast__image}
            style={{ backgroundImage: `url(${article.imageSrc})` }}
          />

          <div className={styles.featuredPodcast__content}>
            <span>{article.category}</span>
            <h1>{article.title}</h1>

            <time dateTime={article.date}>{article.displayDate}</time>

            <p>{article.description}</p>

            <div>{article.content}</div>
          </div>
        </div>
      </article>
    </main>
  );
}
