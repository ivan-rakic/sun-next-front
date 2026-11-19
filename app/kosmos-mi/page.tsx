import type { Metadata } from "next";
import Image from "next/image";
import { SiFacebook, SiInstagram } from "react-icons/si";

import { PageHeader } from "@/components/page-header";
import { ContentRenderer } from "@/components/content/content-renderer";
import { getEditorialResidents, getStaticPageSettings } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import styles from "@/styles/pages/about.module.scss";
import type { ContentBlock } from "@/types/content-blocks";

type AboutProps = {
  blocks?: ContentBlock[];
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const settings = await getStaticPageSettings("about-page", locale);
  const fallback = dictionary.seo.pages.about;
  return createLocalizedMetadata(locale, "/kosmos-mi", {
    title: settings?.header?.title,
    description: settings?.header?.subtitle,
    fallbackTitle: fallback.title,
    fallbackDescription: fallback.description,
    seo: settings?.seo,
  });
}

export default async function About({
  blocks,
}: AboutProps): Promise<React.ReactElement> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const [members, pageSettings] = await Promise.all([
    getEditorialResidents(locale),
    getStaticPageSettings("about-page", locale),
  ]);
  const pageHeader = pageSettings?.header;
  const pageBlocks = blocks ?? pageSettings?.content;

  return (
    <main className={styles.aboutPage}>
      <PageHeader
        eyebrow={pageHeader?.eyebrow || dictionary.pages.about.eyebrow}
        title={pageHeader?.title || dictionary.seo.pages.about.title}
        description={
          pageHeader?.subtitle || dictionary.seo.pages.about.description
        }
        action={
          pageHeader?.link
            ? {
                href: pageHeader.link.url,
                label: pageHeader.link.label,
                external: pageHeader.link.url.startsWith("http"),
              }
            : undefined
        }
      />

      {pageBlocks?.length ? (
        <ContentRenderer blocks={pageBlocks} dictionary={dictionary.content} />
      ) : null}

      <section className={styles.aboutSection}>
        <div className={styles.redactionGrid}>
          {members.map((member) => (
            <article
              key={member.id}
              className={styles.redactionCard}
              itemScope
              itemType="http://schema.org/Person"
            >
              <div className={styles.redactionCard__image}>
                <Image
                  src={member.imageSrc}
                  alt={member.name}
                  itemProp="image"
                  fill
                />
              </div>

              <div className={styles.redactionCard__content}>
                <h2 itemProp="name">{member.name}</h2>
                <p itemProp="jobTitle">{member.role}</p>

                <div className={styles.redactionCard__socials}>
                  {member.socialLinks.map((socialLink) => (
                    <a
                      key={socialLink.label}
                      itemProp="url"
                      href={socialLink.url}
                      target={socialLink.openInNewTab ? "_blank" : undefined}
                      rel={
                        socialLink.openInNewTab
                          ? "noopener noreferrer"
                          : undefined
                      }
                      aria-label={socialLink.label}
                    >
                      {socialLink.label.toLowerCase().includes("facebook") ? (
                        <SiFacebook />
                      ) : (
                        <SiInstagram />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutSection__header}>
          <h2>{dictionary.pages.about.residentsHeading}</h2>
        </div>
      </section>
    </main>
  );
}
