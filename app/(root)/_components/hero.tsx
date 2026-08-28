import styles from '@/styles/components/hero.module.scss';

import Slider from './slider';

export default function Hero(): React.ReactElement {
  return (
    <section className={styles.hero__container}>
      <div className={styles.hero}>
        <div className={styles.hero__header}>
          <h2>Featured</h2>
          <h5>Checkout the latest featured selection, we picked for you</h5>
        </div>
        <div className={styles.hero__slider}>
          <Slider />
        </div>
      </div>
    </section>
  );
}