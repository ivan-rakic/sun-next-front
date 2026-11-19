import styles from "@/styles/components/hero.module.scss";
import type { FrontendDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { getHomepageFeatured } from "@/lib/content";
import { localizedPath } from "@/lib/i18n/paths";

import Slider from "./slider";

type HeroProps = {
  dictionary: FrontendDictionary["home"];
  locale: Locale;
};

export default function Hero({
  dictionary,
  locale,
}: HeroProps): Promise<React.ReactElement> {
  return getHomepageFeatured(locale, dictionary).then((featured) => (
    <section className={styles.hero__container}>
      <div className={styles.hero}>
        <div className={styles.hero__header}>
          <h2>{featured.title}</h2>
          <h5>{featured.subtitle}</h5>
        </div>
        <div className={styles.hero__slider}>
          <Slider
            slides={featured.slides.map((slide) => ({
              ...slide,
              href: localizedPath(locale, slide.href),
            }))}
          />
        </div>
      </div>
    </section>
  ));
}
