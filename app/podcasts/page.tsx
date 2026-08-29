import { PageHeader } from "@/components/page-header";
import { ContentCard } from "@/components/templates/content-card";
import { getPodcasts } from "@/lib/content";
import styles from "@/styles/pages/podcasts.module.scss";
import cardStyles from "@/styles/components/podcasts-articles.module.scss";

export default function PodcastPage() {
  const podcasts = getPodcasts();

  return (
    <main className={styles.podcastPage}>
      <PageHeader
        eyebrow="SunRadio archive"
        title="Podcasts"
        description="Emisije, miksevi i specijalni audio zapisi iz SunRadio kosmosa. Slušaj direktno ovde ili otvori kompletnu arhivu na Mixcloudu."
        action={{
          href: "https://www.mixcloud.com/sunradiosan/uploads/",
          label: "Mixcloud archive",
          external: true,
        }}
      />

      <section className={styles.podcastListSection}>
        <div className={styles.podcastListSection__header}>
          <h2>Latest episodes</h2>
          <p>Selected shows and sessions from the SunRadio archive.</p>
        </div>

        <div className={cardStyles.articleRail}>
          {podcasts.map((podcast) => (
            <ContentCard
              key={podcast.slug}
              href={`/podcasts/${podcast.slug}`}
              imageSrc={podcast.imageSrc}
              imageAlt={podcast.imageAlt}
              category={podcast.category}
              title={podcast.title}
              description={podcast.description}
              meta={`${podcast.displayDate} · ${podcast.duration}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}