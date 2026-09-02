import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/components/podcasts-articles.module.scss";

type ContentCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  meta: string;
  readMoreLabel: string;
};

export const ContentCard = ({
  href,
  imageSrc,
  imageAlt,
  category,
  title,
  description,
  meta,
  readMoreLabel,
}: ContentCardProps): React.ReactElement => {
  return (
    <Link href={href} className={styles.articleCard}>
      <div className={styles.articleCard__image}>
        <span>{category}</span>
        <Image fill src={imageSrc} alt={imageAlt} />
      </div>

      <div className={styles.articleCard__content}>
        <small>{meta}</small>

        <h3>{title}</h3>

        <p>{description}</p>

        <strong>{readMoreLabel} &rarr;</strong>
      </div>
    </Link>
  );
};
