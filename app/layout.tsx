import type { ReactNode } from "react";

import { Changa } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header/header";
import Hero from "@/app/(root)/_components/hero";
import Player from "@/components/player";
import { TopVisualTicker } from "@/components/top-visual-ticker";

import "@/styles/globals.scss";
import styles from "@/styles/pages/layout.module.scss";
import { StickyPlayer } from "@/components/sticky-player";
import { localeHtmlLang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";

const changa = Changa({
  subsets: ["latin"],
  variable: "--font-primary",
});

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({
  children,
}: RootLayoutProps): Promise<React.ReactElement> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return (
    <html lang={localeHtmlLang[locale]} className={changa.variable}>
      <body suppressHydrationWarning>
        <Header locale={locale} dictionary={dictionary} />

        <section className={styles.topVisual}>
          <div className={styles.topVisual__bannerLeft} />
          <div className={styles.topVisual__bannerRight} />

          <div className={styles.topVisual__backDrop} />

          <span className={styles.topVisual__topShade} />

          <Player dictionary={dictionary.player} />

          <div className={styles.topVisual__bottomShade}>
            <TopVisualTicker dictionary={dictionary.ticker} />
          </div>
        </section>
        <main>{children}</main>

        <StickyPlayer dictionary={dictionary.player} />
        <Footer dictionary={dictionary.footer} />
      </body>
    </html>
  );
}
