import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { ContentRenderer } from "@/components/content/content-renderer";
import { donationDetailsFallback } from "@/constants/donation-details";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { getStaticPageSettings } from "@/lib/content";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import styles from "@/styles/pages/donate.module.scss";
import type { ContentBlock } from "@/types/content-blocks";

type DonateProps = {
  blocks?: ContentBlock[];
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const settings = await getStaticPageSettings("support-page", locale);
  const fallback = dictionary.seo.pages.donate;
  return createLocalizedMetadata(locale, "/podrzi-sunce", {
    title: settings?.header?.title,
    description: settings?.header?.subtitle,
    fallbackTitle: fallback.title,
    fallbackDescription: fallback.description,
    seo: settings?.seo,
  });
}

export default async function Donate({
  blocks,
}: DonateProps): Promise<React.ReactElement> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);
  const pageSettings = await getStaticPageSettings("support-page", locale);
  const pageHeader = pageSettings?.header;
  const pageBlocks = blocks ?? pageSettings?.content;

  return (
    <main className={styles.donatePage}>
      <PageHeader
        eyebrow={pageHeader?.eyebrow || dictionary.pages.donate.eyebrow}
        title={pageHeader?.title || dictionary.seo.pages.donate.title}
        description={
          pageHeader?.subtitle || dictionary.seo.pages.donate.description
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

      <div className={styles.donateActions}>
        <Link href="https://www.paypal.com/paypalme/sunradiors" target="_blank">
          {dictionary.pages.donate.paypal}
        </Link>

        <Link href="https://www.patreon.com/sunradio" target="_blank">
          {dictionary.pages.donate.patreon}
        </Link>
      </div>

      {pageBlocks?.length ? (
        <ContentRenderer blocks={pageBlocks} dictionary={dictionary.content} />
      ) : null}

      {!pageBlocks?.length ? (
        <section className={styles.donateContent}>
          <article className={styles.donateContent__main}>
            <h2>{dictionary.pages.donate.communityTitle}</h2>

            {dictionary.pages.donate.communityParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <h3>{dictionary.pages.donate.directDonation}</h3>

            <div className={styles.donateContent__accounts}>
              <div>
                <span>{dictionary.pages.donate.dinarAccount}</span>
                <strong>{donationDetailsFallback.dinar.accountNumber}</strong>
              </div>

              <div>
                <span>{dictionary.pages.donate.foreignAccount}</span>
                <strong>{donationDetailsFallback.foreign.accountNumber}</strong>
              </div>
            </div>
          </article>

          <aside className={styles.donateContent__side}>
            <h3>{dictionary.pages.donate.supportTitle}</h3>

            <ul>
              {dictionary.pages.donate.supportBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </aside>
        </section>
      ) : null}
      {!pageBlocks?.length ? (
        <section className={styles.donationInfo}>
          <h2>{dictionary.pages.donate.directDonationHeading}</h2>

          <div className={styles.donationCards}>
            <div className={styles.donationCard}>
              <h3>{dictionary.pages.donate.dinarAccount} (RSD)</h3>

              <p>
                <strong>{dictionary.pages.donate.accountNumber}</strong>
                <br />
                {donationDetailsFallback.dinar.internationalAccountNumber}
              </p>

              <p>
                <strong>{dictionary.pages.donate.transferPurpose}</strong>
                <br />
                {donationDetailsFallback.dinar.purpose}
              </p>

              <p>
                <strong>{dictionary.pages.donate.recipient}</strong>
                <br />
                {donationDetailsFallback.dinar.recipient}
                <br />
                {donationDetailsFallback.dinar.address}
              </p>
            </div>

            <div className={styles.donationCard}>
              <h3>{dictionary.pages.donate.foreignAccount} (EUR)</h3>

              <p>
                <strong>{dictionary.pages.donate.accountNumber}</strong>
                <br />
                {donationDetailsFallback.foreign.internationalAccountNumber}
              </p>

              <p>
                <strong>{dictionary.pages.donate.swift}</strong>
                <br />
                {donationDetailsFallback.foreign.swift}
              </p>

              <p>
                <strong>{dictionary.pages.donate.iban}</strong>
                <br />
                {donationDetailsFallback.foreign.iban}
              </p>

              <p>
                <strong>{dictionary.pages.donate.intermediary}</strong>
                <br />
                {donationDetailsFallback.foreign.intermediary}
                <br />
                {dictionary.pages.donate.swift}{" "}
                {donationDetailsFallback.foreign.intermediarySwift}
              </p>

              <p>
                <strong>
                  {dictionary.pages.donate.accountWithInstitution}
                </strong>
                <br />
                {donationDetailsFallback.foreign.institution}
                <br />
                {dictionary.pages.donate.swift}{" "}
                {donationDetailsFallback.foreign.institutionSwift}
              </p>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
