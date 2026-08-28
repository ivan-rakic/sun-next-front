import type { ReactNode } from 'react';

import { Changa } from 'next/font/google';

import Footer from '@/components/footer';
import Header from '@/components/header/header';
import Hero from '@/app/(root)/_components/hero';
import Player from '@/components/player';
import { TopVisualTicker } from '@/components/top-visual-ticker';

import '@/styles/globals.scss';
import styles from '@/styles/pages/layout.module.scss';
import { StickyPlayer } from '@/components/sticky-player';


const changa = Changa({
  subsets: ['latin'],
  variable: '--font-primary',
});

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en" className={changa.variable}>
      <body suppressHydrationWarning>

        <Header />

        <section className={styles.topVisual}>
          <div className={styles.topVisual__bannerLeft} />
          <div className={styles.topVisual__bannerRight} />

          <div className={styles.topVisual__backDrop} />

          <span className={styles.topVisual__topShade} />

          <Player />

          <div className={styles.topVisual__bottomShade}>
            <TopVisualTicker />
          </div>
        </section>
        <main>{children}</main>

        <StickyPlayer />
        <Footer />
      </body>
    </html>
  );
}