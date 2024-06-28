import styles from "@/styles/header.module.scss";
import { PodcastLink } from "@/components/podcast-link";
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
    <PodcastLink
      key={el.attributes.slug}
      slug={el.attributes.slug}
      label={el.attributes.label}
    />
  ));

  return (
    <header className="h-12 w-full flex lg:justify-center box-border relative z-50">
      <div className="hidden w-full h-full lg:flex flex-row justify-center items-start text-center relative">
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
