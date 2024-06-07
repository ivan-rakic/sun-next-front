import styles from "@/styles/header.module.scss";
import { PodcastLink } from "@/components/podcast-link";
import { LinksList } from "@/components/links-list";
import { NavLinks } from "@/components/nav-links";
import { LogoLink } from "@/components/logo-link";

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
    <header className="h-12 w-full flex justify-center box-border relative z-50">
      <div className="w-full h-full flex flex-row justify-center items-start text-center relative">
        <nav className={styles.header_main__navigation}>
          {menu ? menu : <LinksList />}
        </nav>
        <LogoLink className={styles.header_main__logo} />
        <div className={styles.header_main__socials}>
          {socialLinks ? socialLinks : <NavLinks />}
        </div>
      </div>
    </header>
  );
}
