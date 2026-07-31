'use client';

import { useState } from 'react';

import { RiCloseLine, RiMenuLine } from 'react-icons/ri';

import { LinksList } from '@/components/header/links-list';
import { NavLinks } from '@/components/header/nav-links';

import styles from '@/styles/navigation/mobile-nav.module.scss';

export const MobileNav = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.mobileNav__toggle}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        {isOpen ? <RiCloseLine /> : <RiMenuLine />}
      </button>

      <div
        className={`${styles.mobileNav} ${isOpen ? styles.mobileNavVisible : ''
          }`}
      >
        <nav className={styles.mobileNav__links}>
          <LinksList />
        </nav>

        <div className={styles.mobileNav__socials}>
          <NavLinks />
        </div>
      </div>
    </>
  );
};