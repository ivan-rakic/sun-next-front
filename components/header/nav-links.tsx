import Link from "next/link";
import { navLinks } from "@/constants";
import styles from "@/styles/navigation/header.module.scss";
import type { Locale } from "@/lib/i18n/config";
import type { FrontendDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";
import { LanguageSwitcher } from "@/components/header/language-switcher";

type NavLinksProps = {
  locale: Locale;
  dictionary: FrontendDictionary["navigation"];
};

export const NavLinks = ({ locale, dictionary }: NavLinksProps) => {
  const borderedIcons = ["Mixcloud", "Soundcloud"];

  return (
    <div className={styles.socialLinks}>
      <nav
        className={styles.socialLinks__nav}
        aria-label={dictionary.socialLinks}
      >
        {navLinks.map(({ href, title, icon: Icon, color, target }) => (
          <Link
            key={href}
            className={`${styles.socialLinks__link} ${
              borderedIcons.includes(title)
                ? styles.socialLinks__linkBordered
                : ""
            }`}
            href={href}
            title={title}
            target={target}
            rel={target === "_blank" ? "noopener noreferrer" : undefined}
            style={{ "--icon-color": `#${color}` } as React.CSSProperties}
          >
            <Icon aria-hidden="true" />
            <span className={styles.srOnly}>{title}</span>
          </Link>
        ))}
      </nav>

      <LanguageSwitcher locale={locale} label={dictionary.language} />

      <div className={styles.headerActions}>
        <Link
          className={styles.headerActions__player}
          href="https://player.sunradio.rs"
          target="_blank"
          rel="noopener noreferrer"
        >
          {dictionary.player}
        </Link>

        <Link
          className={styles.headerActions__donate}
          href={localizedPath(locale, "/podrzi-sunce")}
        >
          {dictionary.donate}
        </Link>
      </div>
    </div>
  );
};
