import styles from '@/styles/index.module.scss';

const podcasts = [
  {
    title: 'Stellar Vibrations Episode 42',
    genre: 'Deep',
    duration: '68 min',
    image: '/images/astronaut.jpg',
  },
  {
    title: 'Cosmic Flow Mixed by Lunar',
    genre: 'Progressive',
    duration: '72 min',
    image: '/images/flowers.jpg',
  },
  {
    title: 'Solar Sessions Vol. 18',
    genre: 'Melodic House',
    duration: '60 min',
    image: '/images/trees.jpg',
  },
  {
    title: 'Orbit Sounds Episode 09',
    genre: 'Techno',
    duration: '66 min',
    image: '/images/astronaut.jpg',
  },
  {
    title: 'Galactic Grooves With Aria',
    genre: 'Afro House',
    duration: '70 min',
    image: '/images/flowers.jpg',
  },
];

export const Podcasts = (): React.ReactElement => {
  return (
    <div className={styles.podcastRail}>
      {podcasts.map((podcast) => (
        <article
          key={podcast.title}
          className={styles.podcastCard}
        >
          <div
            className={styles.podcastCard__image}
            style={{
              backgroundImage: `url(${podcast.image})`,
            }}
          >
            <button>▶</button>
          </div>

          <span>PODCAST</span>

          <h3>{podcast.title}</h3>

          <p>
            {podcast.genre} • {podcast.duration}
          </p>
        </article>
      ))}
    </div>
  );
};