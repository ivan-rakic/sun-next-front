import type { ReactNode } from 'react';
import Link from 'next/link';

import styles from '@/styles/components/content-detail.module.scss';

type ContentDetailProps = {
  backHref: string;
  backLabel: string;
  imageSrc: string;
  category: string;
  title: string;
  date: string;
  meta: string;
  description: string;
  bodyContent?: string;
  children?: ReactNode;
};

export const ContentDetail = ({
  backHref,
  backLabel,
  imageSrc,
  category,
  title,
  date,
  meta,
  description,
  bodyContent,
  children,
}: ContentDetailProps): React.ReactElement => {
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

          {children}

          <p className={styles.contentDetail__description}>{description}</p>

          {bodyContent ? (
            <div className={styles.contentDetail__body}>{bodyContent}</div>
          ) : null}

          <div className={styles.contentDetail__tags}>
            <span className={styles.contentDetail__tag}>{category}</span>
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

