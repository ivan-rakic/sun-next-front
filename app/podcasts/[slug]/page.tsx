import { notFound } from 'next/navigation';

import { ContentDetail } from '@/components/templates/content-detail';
import { getPodcastBySlug, getPodcasts } from '@/lib/content';
import styles from '@/styles/pages/podcasts.module.scss';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPodcasts().map((podcast) => ({ slug: podcast.slug }));
}

export default async function PodcastDetailPage({ params }: Props) {
  const { slug } = await params;
  const podcast = getPodcastBySlug(slug);

  if (!podcast) {
    notFound();
  }

  return (
    <main className={styles.podcastPage}>
      <ContentDetail
        backHref="/podcasts"
        backLabel="Back to Podcasts"
        imageSrc={podcast.imageSrc}
        category={podcast.category}
        title={podcast.title}
        date={podcast.date}
        meta={`${podcast.displayDate} · ${podcast.duration}`}
        description={podcast.description}
      >
        <iframe
          title={podcast.title}
          width="100%"
          height="120"
          src={podcast.mixcloudUrl}
          frameBorder="0"
          allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share;"
        />
      </ContentDetail>
    </main>
  );
}
