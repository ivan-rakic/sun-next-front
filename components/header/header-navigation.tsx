// components/header/header-navigation.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

import { mainLinks, portalLinks } from "@/constants";
import styles from "@/styles/navigation/header.module.scss";
import { RiArrowDownSLine } from "react-icons/ri";

export const HeaderNavigation = (): React.ReactElement => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);

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
          Portal
          <RiArrowDownSLine />
        </button>

        <div className={`${styles.headerPortal__dropdown} ${isPortalOpen ? styles.headerPortal__dropdownOpen : ""
          }`}>
          {portalLinks.map((link) => (
            <Link key={link.id} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      {mainLinks.map((link) => (
        <Link key={link.id} href={link.href}>
          {link.label}
        </Link>
      ))}
    </>
  );
};