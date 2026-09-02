import styles from "../styles/components/footer.module.scss";

import { ABOUT_CONTENT, CONTACT_CONTENT, NETWORKS_CONTENT } from "@/constants";

import { FooterSection } from "@/components/footer-section";
import type { FrontendDictionary } from "@/lib/i18n/dictionaries";

type FooterProps = { dictionary: FrontendDictionary["footer"] };

export default function Footer({
  dictionary,
}: FooterProps): React.ReactElement {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__bannerLeft} />
      <div className={styles.footer__bannerRight} />

      <div className={styles.footer__backDrop} />

      <div className={styles.footer__content}>
        <div className={styles.footer__grid}>
          <FooterSection
            title={dictionary.about}
            content={ABOUT_CONTENT}
            style={styles.footer__about}
          />

          <FooterSection
            title={dictionary.contact}
            content={CONTACT_CONTENT}
            style={styles.footer__contact}
          />

          <FooterSection
            title={dictionary.tuneIn}
            content={dictionary.streaming}
            style={styles.footer__tunein}
          />

          <FooterSection
            title={dictionary.networks}
            content={NETWORKS_CONTENT}
            style={styles.footer__networks}
          />
        </div>

        <div className={styles.footer__bottom}>
          <p>{dictionary.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
