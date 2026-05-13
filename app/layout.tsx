import type { ReactNode } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header/header';
import Hero from '@/components/hero';

import '@/styles/global.scss';
import Player from '@/components/player';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en">
      <body>
        <div className="w-full">
          <Header />
          <Hero />
          <main>{children}</main>
          <Footer />
          <Player />
        </div>
      </body>
    </html>
  );
}