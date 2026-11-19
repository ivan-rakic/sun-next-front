import Link from "next/link";

import type { FrontendDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import styles from "@/styles/components/donate-banner.module.scss";

type DonateContainerProps = {
  dictionary: FrontendDictionary["donateBanner"];
  locale: Locale;
};

export const DonateContainer = ({
  dictionary,
  locale,
}: DonateContainerProps): React.ReactElement => {
  return (
    <section className={styles.donateBanner}>
      <div className={styles.donateBanner__content}>
        <div>
          <span>{dictionary.eyebrow}</span>

          <h3>{dictionary.title}</h3>

          <p>{dictionary.description}</p>
        </div>

        <div className={styles.donateBanner__actions}>
          <Link href={localizedPath(locale, "/podrzi-sunce")}>
            {dictionary.learnMore}
          </Link>

          <Link
            href="https://www.paypal.com/paypalme/sunradiors"
            target="_blank"
          >
            {dictionary.paypal}
          </Link>

          <Link href="https://www.patreon.com/sunradio" target="_blank">
            {dictionary.patreon}
          </Link>
        </div>
      </div>
    </section>
  );
};
