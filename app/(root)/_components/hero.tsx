import styles from '@/styles/components/hero.module.scss';
import type { FrontendDictionary } from '@/lib/i18n/dictionaries';

import Slider from './slider';

type HeroProps = { dictionary: FrontendDictionary['home'] };

export default function Hero({ dictionary }: HeroProps): React.ReactElement {
  return (
    <section className={styles.hero__container}>
      <div className={styles.hero}>
        <div className={styles.hero__header}>
          <h2>{dictionary.featured}</h2>
          <h5>Checkout the latest featured selection, we picked for you</h5>
        </div>
        <div className={styles.hero__slider}>
          <Slider />
        </div>
      </div>
    </section>
  );
}