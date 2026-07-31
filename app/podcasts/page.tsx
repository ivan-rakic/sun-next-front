import Link from "next/link";
import styles from "@/styles/podcasts.module.scss";
import stylesRes from "@/styles/reusable.module.scss";

const podcasts = [
  {
    id: 1,
    title: "Dečije igre",
    date: "2022-03-01",
    displayDate: "March 1, 2022",
    category: "Show",
    duration: "62 min",
    image: "/images/mountains.jpg",
    description:
      "Radio emisija iz SunRadio arhive. Muzika, razgovor i slobodna akcija u kosmičkom ritmu.",
    mixcloudUrl:
      "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fsunradiosan%2Fde%C4%8Dije-igre-emisija-4-sunradiors%2F",
  },
  {
    id: 2,
    title: "Solar Sessions Vol. 18",
    date: "2024-04-12",
    displayDate: "April 12, 2024",
    category: "Mix",
    duration: "60 min",
    image: "/images/flowers.jpg",
    description:
      "Melodičan izbor za lagano putovanje kroz sunčane frekvencije.",
    mixcloudUrl:
      "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fsunradiosan%2F",
  },
  {
    id: 3,
    title: "Orbit Sounds Episode 09",
    date: "2024-05-03",
    displayDate: "May 3, 2024",
    category: "Podcast",
    duration: "66 min",
    image: "/images/fake-brick.png",
    description:
      "Zvukovi orbite, razgovori i selekcija za noćno slušanje.",
    mixcloudUrl:
      "https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fsunradiosan%2F",
  },
];

export default function PodcastPage() {
  const featuredPodcast = podcasts[0];

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
          {podcasts.map((podcast) => (
            <article key={podcast.id} className={styles.podcastCard}>
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
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}