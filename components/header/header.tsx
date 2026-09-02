import styles from "@/styles/navigation/header.module.scss";
import { HeaderNavigation } from "@/components/header/header-navigation";
import { LogoLink } from "@/components/logo-link";
import { MobileNav } from "@/components/header/mobile-nav";
import { NavLinks } from "@/components/header/nav-links";
import type { Locale } from "@/lib/i18n/config";
import type { FrontendDictionary } from "@/lib/i18n/dictionaries";

interface HeaderProps {
  locale: Locale;
  dictionary: FrontendDictionary;
}
export default function Header({ locale, dictionary }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.header_main}>
        <nav className={styles.header_main__navigation}>
          <HeaderNavigation
            locale={locale}
            dictionary={dictionary.navigation}
          />
        </nav>

        <LogoLink
          className={styles.header_main__logo}
          href={locale === "sr-Latn" ? "/" : `/${locale}`}
        />

        <div className={styles.header_main__socials}>
          <NavLinks locale={locale} dictionary={dictionary.navigation} />
        </div>
      </div>

      <MobileNav locale={locale} dictionary={dictionary.navigation} />
    </header>
  );
}
