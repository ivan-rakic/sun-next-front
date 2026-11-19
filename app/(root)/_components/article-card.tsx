import Image from "next/image";
import Link from "next/link";

import styles from "@/styles/components/podcasts-articles.module.scss";

type ArticleProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
  date: string;
  readMoreLabel: string;
};

export const ArticleCard = ({
  href,
  imageSrc,
  imageAlt,
  category,
  title,
  description,
  date,
  readMoreLabel,
}: ArticleProps): React.ReactElement => {
  return (
    <Link href={href} className={styles.articleCard}>
      <div className={styles.articleCard__image}>
        <span>{category}</span>
        <Image fill src={imageSrc} alt={imageAlt} />
      </div>

      <div className={styles.articleCard__content}>
        <small>{date}</small>

        <h3>{title}</h3>

        <p>{description}</p>

        <strong>{readMoreLabel} →</strong>
      </div>
    </Link>
  );
};
