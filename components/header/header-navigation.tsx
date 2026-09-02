// components/header/header-navigation.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

import styles from "@/styles/navigation/header.module.scss";
import { RiArrowDownSLine } from "react-icons/ri";
import type { Locale } from "@/lib/i18n/config";
import type { FrontendDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/paths";

type HeaderNavigationProps = {
  locale: Locale;
  dictionary: FrontendDictionary["navigation"];
};

export const HeaderNavigation = ({
  locale,
  dictionary,
}: HeaderNavigationProps): React.ReactElement => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
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

  return (
    <>
      <div className={styles.headerPortal}>
        <button
          type="button"
          className={styles.headerPortal__label}
          aria-haspopup="true"
          aria-expanded={isPortalOpen}
          onClick={() => setIsPortalOpen((prev) => !prev)}
        >
          {dictionary.portal}
          <RiArrowDownSLine />
        </button>

        <div
          className={`${styles.headerPortal__dropdown} ${
            isPortalOpen ? styles.headerPortal__dropdownOpen : ""
          }`}
        >
          {portalLinks.map((link) => (
            <Link key={link.id} href={localizedPath(locale, link.href)}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      {mainLinks.map((link) => (
        <Link key={link.id} href={localizedPath(locale, link.href)}>
          {link.label}
        </Link>
      ))}
    </>
  );
};
