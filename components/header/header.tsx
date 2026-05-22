import styles from "@/styles/header.module.scss";
import { NavigationMenu } from "@/components/navigation-menu";
import { NavLinks } from "@/components/header/nav-links";
import { LogoLink } from "@/components/logo-link";
import { MobileNav } from "@/components/header/mobile-nav";
import { LinksList } from "@/components/header/links-list";

interface HeaderProps {
  data?: any;
}

export default function Header({ data }: HeaderProps) {
  const socialLinks = undefined;

  const menu = data?.data?.map((el: any) => (
    <NavigationMenu
      key={el.attributes.slug}
      slug={el.attributes.slug}
      label={el.attributes.label}
    />
  ));

  return (
    <header className={styles.header}>
      <div className={styles.header_main}>
        <nav className={styles.header_main__navigation}>
          {menu ? menu : <LinksList />}
        </nav>

        <LogoLink className={styles.header_main__logo} />

        <div className={styles.header_main__socials}>
          {socialLinks ? socialLinks : <NavLinks />}
        </div>
      </div>

      <MobileNav />
    </header>
  );
}
