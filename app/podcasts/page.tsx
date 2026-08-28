import Link from "next/link";
import styles from "@/styles/podcasts.module.scss";
import stylesRes from "@/styles/reusable.module.scss";
import { PODCASTS } from "@/constants";

export default function PodcastPage() {
  const featuredPodcast = PODCASTS[0];

  return (
    <main className={`${stylesRes.content_container} ${styles.podcastPage}`}>
      <section className={styles.podcastHero}>
        <div>
          <span>SunRadio archive</span>
          <h1>Podcasts</h1>
          <p>
            Emisije, miksevi i specijalni audio zapisi iz SunRadio kosmosa.
            Slušaj direktno ovde ili otvori kompletnu arhivu na Mixcloudu.
          </p>
        </div>

        <Link
          href="https://www.mixcloud.com/sunradiosan/uploads/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mixcloud archive →
        </Link>
      </section>

      <section className={styles.featuredPodcast}>
        <article>
          <div
            className={styles.featuredPodcast__image}
            style={{ backgroundImage: `url(${featuredPodcast.image})` }}
          />

          <div className={styles.featuredPodcast__content}>
            <span>{featuredPodcast.category}</span>
            <h2>{featuredPodcast.title}</h2>

            <time dateTime={featuredPodcast.date}>
              {featuredPodcast.displayDate} · {featuredPodcast.duration}
            </time>

            <p>{featuredPodcast.description}</p>

            <iframe
              title={featuredPodcast.title}
              width="100%"
              height="60"
              src={featuredPodcast.mixcloudUrl}
              frameBorder="0"
              allow="autoplay"
            />
          </div>
        </article>
      </section>

      <section className={styles.podcastListSection}>
        <div className={styles.podcastListSection__header}>
          <h2>Latest episodes</h2>
          <p>Selected shows and sessions from the SunRadio archive.</p>
        </div>

        <div className={styles.podcastGrid}>
          {PODCASTS.map((podcast) => (
            <Link key={podcast.id} href={`/podcasts/${podcast.slug}`} className={styles.podcastCard}>
              <div
                className={styles.podcastCard__image}
                style={{ backgroundImage: `url(${podcast.image})` }}
              >
                <span>{podcast.category}</span>
              </div>

              <div className={styles.podcastCard__content}>
                <time dateTime={podcast.date}>
                  {podcast.displayDate} · {podcast.duration}
                </time>

                <h3>{podcast.title}</h3>
                <p>{podcast.description}</p>

                <iframe
                  title={podcast.title}
                  width="100%"
                  height="60"
                  src={podcast.mixcloudUrl}
                  frameBorder="0"
                  allow="autoplay"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}