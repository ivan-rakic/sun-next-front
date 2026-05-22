import type { ReactNode } from 'react';

import { Changa } from 'next/font/google';

import Footer from '@/components/footer';
import Header from '@/components/header/header';
import Hero from '@/components/hero';
import Player from '@/components/player';

import '@/styles/globals.scss';
import styles from '@/styles/layout.module.scss';

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
      <body>
        <Header />

        <section className={styles.topVisual}>
          <div className={styles.topVisual__bannerLeft} />
          <div className={styles.topVisual__bannerRight} />

          <div className={styles.topVisual__backDrop} />

          <span className={styles.topVisual__topShade} />

          <Player />

          <div className={styles.topVisual__bottomShade}>
            <div className={styles.topVisual__ticker}>
              <div className={styles.topVisual__tickerTrack}>
                <span>
                  SUN RADIO • Deep House • Cosmic Sounds • Podcasts • Articles • Live
                  Shows • Community • SUN RADIO • Deep House • Cosmic Sounds • Podcasts
                  • Articles • Live Shows • Community
                </span>
                <span>
                  SUN RADIO • Deep House • Cosmic Sounds • Podcasts • Articles • Live
                  Shows • Community • SUN RADIO • Deep House • Cosmic Sounds • Podcasts
                  • Articles • Live Shows • Community
                </span>
              </div>
            </div>
          </div>
        </section>

        <Hero />

        <main>{children}</main>

        <StickyPlayer />
        <Footer />
      </body>
    </html>
  );
}