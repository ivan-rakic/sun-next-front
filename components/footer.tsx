import styles from '../styles/footer.module.scss';

import {
  ABOUT_CONTENT,
  CONTACT_CONTENT,
  NETWORKS_CONTENT,
} from '@/constants';

import { FooterSection } from '@/components/footer-section';

export default function Footer(): React.ReactElement {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__bannerLeft} />
      <div className={styles.footer__bannerRight} />

      <div className={styles.footer__backDrop} />

      <div className={styles.footer__content}>
        <div className={styles.footer__grid}>
          <FooterSection
            title="ABOUT"
            content={ABOUT_CONTENT}
            style={styles.footer__about}
          />

          <FooterSection
            title="CONTACT"
            content={CONTACT_CONTENT}
            style={styles.footer__contact}
          />

          <FooterSection
            title="TUNE IN"
            content="24/7 streaming across all major platforms."
            style={styles.footer__tunein}
          />

          <FooterSection
            title="NETWORKS"
            content={NETWORKS_CONTENT}
            style={styles.footer__networks}
          />
        </div>

        <div className={styles.footer__bottom}>
          <p>Copyright © Sun Radio 2017 - 2026</p>
        </div>
      </div>
    </footer>
  );
}