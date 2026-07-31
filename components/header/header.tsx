import styles from "@/styles/navigation/header.module.scss";
import { HeaderNavigation } from "@/components/header/header-navigation";
import { LogoLink } from "@/components/logo-link";
import { MobileNav } from "@/components/header/mobile-nav";
import { NavLinks } from "@/components/header/nav-links";

interface HeaderProps {
  data?: any;
}
export default function Header({ data }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.header_main}>
        <nav className={styles.header_main__navigation}>
          <HeaderNavigation />
        </nav>

        <LogoLink className={styles.header_main__logo} />

        <div className={styles.header_main__socials}>
          <NavLinks />
        </div>
      </div>

      <MobileNav />
    </header>
  );
}