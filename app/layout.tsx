import type { ReactNode } from "react";
import type { Metadata } from "next";

import { Changa } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header/header";
import Player from "@/components/player";
import { TopVisualTicker } from "@/components/top-visual-ticker";

import "@/styles/globals.scss";
import styles from "@/styles/pages/layout.module.scss";
import { StickyPlayer } from "@/components/sticky-player";
import { localeHtmlLang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import {
  getAbsolutePublicUrl,
  getSiteMetadataBase,
  isPublicIndexableEnvironment,
} from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/content";

const changa = Changa({
  subsets: ["latin"],
  variable: "--font-primary",
});

type RootLayoutProps = {
  children: ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const seo = getDictionary(locale).seo;
  const siteSettings = await getSiteSettings(locale);
  const defaultSeo = siteSettings?.defaultSeo;
  const brand = siteSettings?.siteName ?? seo.brand;
  const title = defaultSeo?.metaTitle || seo.defaultTitle;
  const description =
    defaultSeo?.metaDescription ||
    siteSettings?.defaultDescription ||
    siteSettings?.tagline ||
    seo.defaultDescription;
  const image = getAbsolutePublicUrl(
    siteSettings?.defaultShareImage ||
      defaultSeo?.shareImage ||
      "/images/stars.png",
  );
  const shouldIndex =
    isPublicIndexableEnvironment() && defaultSeo?.noIndex !== true;

  return {
    metadataBase: getSiteMetadataBase(),
    applicationName: brand,
    title: {
      default: title,
      template: `%s | ${brand}`,
    },
    description,
    openGraph: {
      type: "website",
      siteName: brand,
      title: defaultSeo?.shareTitle || title,
      description: defaultSeo?.shareDescription || description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultSeo?.shareTitle || title,
      description: defaultSeo?.shareDescription || description,
      images: [image],
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
    },
  };
}

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
