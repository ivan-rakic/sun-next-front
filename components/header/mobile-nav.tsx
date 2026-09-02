"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { RiCloseLine, RiMenuLine } from "react-icons/ri";

import { NavLinks } from "@/components/header/nav-links";
import type { Locale } from "@/lib/i18n/config";
import type { FrontendDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";

import styles from "@/styles/navigation/mobile-nav.module.scss";

type MobileNavProps = {
  locale: Locale;
  dictionary: FrontendDictionary["navigation"];
};

export const MobileNav = ({
  locale,
  dictionary,
}: MobileNavProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const portalLinks = [
    { id: "podcasts", href: "/podcasts", label: dictionary.podcasts },
    { id: "articles", href: "/articles", label: dictionary.articles },
    { id: "news", href: "/news", label: dictionary.news },
  ];
  const mainLinks = [
    { id: "kosmos-mi", href: "/kosmos-mi", label: dictionary.kosmos },
    { id: "program", href: "/program", label: dictionary.program },
    { id: "podrzi-sunce", href: "/podrzi-sunce", label: dictionary.donate },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 4);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeNav = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.mobileNav__toggle} ${
          isScrolled ? styles.mobileNav__toggleScrolled : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={dictionary.toggle}
        aria-expanded={isOpen}
      >
        {isOpen ? <RiCloseLine /> : <RiMenuLine />}
      </button>

      <div
        className={`${styles.mobileNav} ${
          isOpen ? styles.mobileNavVisible : ""
        }`}
      >
        <nav className={styles.mobileNav__links}>
          <div className={styles.mobileNav__group}>
            <span>{dictionary.portal}</span>
            {portalLinks.map((link) => (
              <Link
                key={link.href}
                href={localizedPath(locale, link.href)}
                onClick={closeNav}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.mobileNav__group}>
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={localizedPath(locale, link.href)}
                onClick={closeNav}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.mobileNav__socials}>
          <NavLinks locale={locale} dictionary={dictionary} />
        </div>
      </div>
    </>
  );
};
