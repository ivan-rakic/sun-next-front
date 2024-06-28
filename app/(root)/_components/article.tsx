import styles from "@/styles/index.module.scss";
import Image from "next/image";
import Link from "next/link";

type ArticleProps = {
  href: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  title: string;
  description: string;
};

export const Article = ({
  href,
  imageSrc,
  imageAlt,
  category,
  title,
  description,
}: ArticleProps) => {
  return (
    <Link href={href} className={styles.content__podcastBox_articles_link}>
      <Image width={50} height={50} src={imageSrc} alt={imageAlt} />
      <span
        className={styles.content__podcastBox_articles_link_category}
        style={{ backgroundColor: "purple" }}
      >
        {category}
      </span>
      <div className={styles.content__podcastBox_articles_link_titles}>
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </Link>
  );
};
