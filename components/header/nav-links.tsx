import Link from "next/link";
import { navLinks } from "@/constants";
import styles from "@/styles/navigation/header.module.scss";
import { IconType } from "react-icons";

type NavLink = {
  href: string;
  title: string;
  icon: IconType;
  color: string;
  target?: "_blank" | "_self";
};

export const NavLinks = () => {
  const borderedIcons = ["Mixcloud", "Soundcloud"];
  
  return (
    <div className={styles.socialLinks}>
      <nav className={styles.socialLinks__nav} aria-label="Social links">
        {navLinks.map(({ href, title, icon: Icon, color, target }) => (
          <Link
            key={href}
            className={`${styles.socialLinks__link} ${borderedIcons.includes(title) ? styles.socialLinks__linkBordered : ""
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

      <div className={styles.headerActions}>
        <Link
          className={styles.headerActions__player}
          href="https://player.sunradio.rs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Player
        </Link>

        <Link className={styles.headerActions__donate} href="/podrzi-sunce">
          Donate
        </Link>
      </div>
    </div>
  );
};