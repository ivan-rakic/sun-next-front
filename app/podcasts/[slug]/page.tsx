import { notFound } from 'next/navigation';
import Link from 'next/link';

import { PODCASTS } from '@/constants';
import styles from '@/styles/podcasts.module.scss';
import stylesRes from '@/styles/reusable.module.scss';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PODCASTS.map((podcast) => ({ slug: podcast.slug }));
}

export default async function PodcastDetailPage({ params }: Props) {
  const { slug } = await params;
  const podcast = PODCASTS.find((p) => p.slug === slug);

  if (!podcast) {
    notFound();
  }

  return (
    <main className={`${stylesRes.content_container} ${styles.podcastPage}`}>
      <nav>
        <Link href="/podcasts">← Back to Podcasts</Link>
      </nav>

      <article className={styles.featuredPodcast}>
        <div>
          <div
            className={styles.featuredPodcast__image}
            style={{ backgroundImage: `url(${podcast.image})` }}
          />

          <div className={styles.featuredPodcast__content}>
            <span>{podcast.category}</span>
            <h1>{podcast.title}</h1>

            <time dateTime={podcast.date}>
              {podcast.displayDate} · {podcast.duration}
            </time>

            <p>{podcast.description}</p>

            <iframe
              title={podcast.title}
              width="100%"
              height="120"
              src={podcast.mixcloudUrl}
              frameBorder="0"
              allow="autoplay"
            />
          </div>
        </div>
      </article>
    </main>
  );
}
