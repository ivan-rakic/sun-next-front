import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContentRenderer } from "@/components/content/content-renderer";
import { getResidentBySlug, getResidents } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getRequestLocale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import styles from "@/styles/pages/resident.module.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const resident = await getResidentBySlug(slug, locale);

  if (!resident) return {};

  const dictionary = getDictionary(locale);
  return createLocalizedMetadata(
    locale,
    `/residents/${slug}`,
    {
      title:
        resident.name ||
        `${dictionary.residents.namePrefix} ${resident.number}`,
      description: resident.summary,
      fallbackTitle: dictionary.seo.pages.about.title,
      fallbackDescription: dictionary.residents.placeholder,
      image: resident.socialImage,
      seo: resident.seo,
    },
    {
      index: resident.documentId ? undefined : false,
      alternateLocales: false,
    },
  );
}

export async function generateStaticParams() {
  const residents = await getResidents();
  return residents.map(({ slug }) => ({ slug }));
}

export default async function ResidentPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const resident = await getResidentBySlug(slug, locale);

  if (!resident) notFound();

  const dictionary = getDictionary(locale);
  const name =
    resident.name || `${dictionary.residents.namePrefix} ${resident.number}`;

  return (
    <main className={styles.residentPage}>
      <Link
        className={styles.residentBack}
        href={`${localizedPath(locale, "/")}#popular-residents`}
      >
        &larr; {dictionary.residents.back}
      </Link>

      <article className={styles.residentProfile}>
        <div className={styles.residentImage}>
          <Image
            src={resident.imageSrc}
            alt={dictionary.residents.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className={styles.residentInfo}>
          <p className={styles.residentLabel}>
            {dictionary.residents.profileLabel}
          </p>
          <h1>{name}</h1>
          <span className={styles.residentTag}>{resident.tag}</span>
          <p className={styles.residentPlaceholder}>
            {resident.summary || dictionary.residents.placeholder}
          </p>
          {resident.contentBlocks.length > 0 ? (
            <ContentRenderer
              blocks={resident.contentBlocks}
              dictionary={dictionary.content}
            />
          ) : null}
        </div>
      </article>
    </main>
  );
}
