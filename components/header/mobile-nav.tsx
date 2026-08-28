'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { RiCloseLine, RiMenuLine } from 'react-icons/ri';

import { NavLinks } from '@/components/header/nav-links';
import { mainLinks, portalLinks } from '@/constants';

import styles from '@/styles/navigation/mobile-nav.module.scss';

export const MobileNav = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeNav = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={styles.mobileNav__toggle}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
      >
        {isOpen ? <RiCloseLine /> : <RiMenuLine />}
      </button>

      <div
        className={`${styles.mobileNav} ${isOpen ? styles.mobileNavVisible : ''
          }`}
      >
        <nav className={styles.mobileNav__links}>
          <div className={styles.mobileNav__group}>
            <span>Portal</span>
            {portalLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeNav}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.mobileNav__group}>
            {mainLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeNav}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.mobileNav__socials}>
          <NavLinks />
        </div>
      </div>
    </>
  );
};