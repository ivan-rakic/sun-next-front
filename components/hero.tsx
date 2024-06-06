import styles from '../styles/hero.module.scss'
import Slider from './slider'
import Player from './player';

export default function Hero() {
  return (
    <div className={styles.hero__container}>
      <span className={styles.span_subMenu}>Podcast / Articles / Featured</span>
      <section className={styles.hero}>
        <div className={styles.hero__player}>
          <Player />
        </div>
        <div className={styles.hero__slider}>
          <Slider />
        </div>
      </section>
      <span className={styles.span_highlight}></span>
    </div>
  )
}
