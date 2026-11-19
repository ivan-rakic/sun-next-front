import type { ReactNode } from "react";
import Link from "next/link";

import { ContentRenderer } from "@/components/content/content-renderer";
import {
  ShareActions,
  type ShareActionLabels,
} from "@/components/share-actions";
import type { FrontendDictionary } from "@/lib/i18n/dictionaries";
import styles from "@/styles/components/content-detail.module.scss";
import type { ContentTag } from "@/types/content";
import type { ContentBlock } from "@/types/content-blocks";

type ContentDetailProps = {
  backHref: string;
  backLabel: string;
  imageSrc: string;
  category: string;
  categories?: ContentTag[];
  title: string;
  date: string;
  meta: string;
  description: string;
  bodyContent?: string;
  blocks?: ContentBlock[];
  contentDictionary?: FrontendDictionary["content"];
  share?: {
    url: string;
    title: string;
    text: string;
    labels: ShareActionLabels;
  };
  children?: ReactNode;
};

export const ContentDetail = ({
  backHref,
  backLabel,
  imageSrc,
  category,
  categories,
  title,
  date,
  meta,
  description,
  bodyContent,
  blocks,
  contentDictionary,
  share,
  children,
}: ContentDetailProps): React.ReactElement => {
  const visibleCategories = categories?.length
    ? categories
    : category
      ? [{ slug: category, name: category, key: category }]
      : [];

  return (
    <div className={styles.contentDetail}>
      <Link href={backHref} className={styles.contentDetail__back}>
        &larr; {backLabel}
      </Link>

      <article className={styles.contentDetail__grid}>
        <div className={styles.contentDetail__content}>
          <h1 className={styles.contentDetail__title}>{title}</h1>

          <time className={styles.contentDetail__meta} dateTime={date}>
            {meta}
          </time>

          {share ? (
            <ShareActions
              url={share.url}
              title={share.title}
              text={share.text}
              labels={share.labels}
            />
          ) : null}

          {children}

          <p className={styles.contentDetail__description}>{description}</p>

          {blocks && contentDictionary ? (
            <ContentRenderer blocks={blocks} dictionary={contentDictionary} />
          ) : bodyContent ? (
            <div className={styles.contentDetail__body}>{bodyContent}</div>
          ) : null}

          <div className={styles.contentDetail__tags}>
            {visibleCategories.map((item) => (
              <span className={styles.contentDetail__tag} key={item.slug}>
                {item.name}
              </span>
            ))}
          </div>
        </div>

        <div
          className={styles.contentDetail__image}
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      </article>
    </div>
  );
};
