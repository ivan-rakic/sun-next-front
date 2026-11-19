import Image from "next/image";
import Link from "next/link";

import type { ContentTag } from "@/types/content";
import styles from "@/styles/components/podcasts-articles.module.scss";

type ContentCardProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  categories?: ContentTag[];
  title: string;
  description: string;
  meta: string;
  readMoreLabel: string;
  variant?: "featured" | "compact";
};

export const ContentCard = ({
  href,
  imageSrc,
  imageAlt,
  category,
  categories,
  title,
  description,
  meta,
  readMoreLabel,
  variant = "compact",
}: ContentCardProps): React.ReactElement => {
  const categoryLabel = categories?.length
    ? categories.map((item) => item.name).join(" · ")
    : category;

  return (
    <Link
      href={href}
      className={`${styles.articleCard} ${
        variant === "featured"
          ? styles.articleCardFeatured
          : styles.articleCardCompact
      }`}
    >
      <div className={styles.articleCard__image}>
        <span>{categoryLabel}</span>
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
