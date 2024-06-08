import styles from "@/styles/index.module.scss";
import stylesRes from "@/styles/reusable.module.scss";


import { Features } from "@/app/(root)/_components/features";
import { Podcasts } from "@/app/(root)/_components/podcasts";
import { Carousel } from "@/app/(root)/_components/carousel";
import React from "react";
import {articles, slides} from "@/constants";
import {DonateContainer} from "@/app/(root)/_components/donate-container";
import {Article} from "@/app/(root)/_components/article";

export default function Home() {


  return (
    <main className={styles.content}>
      <section
        className={`${stylesRes.content_container} ${styles.content__featuredBox}`}
      >
        <div className={styles.content__featuredBox_header}>
          <h2>Featured</h2>
          <h5>Checkout the ltest featured selection, we picked for you</h5>
        </div>
        <Features />
      </section>
      <section
        className={`${stylesRes.content_container} ${styles.content__podcastBox}`}
      >
        <div className={styles.content__podcastBox_header}>
          <h2 className={styles.content__podcastBox_header_title}>Podcasts</h2>
          <h5>Pregledajte selekciju najnovijih podcasta</h5>
        </div>
        <Podcasts />
        <div className={styles.content__podcastBox_header}>
          <h2 className={styles.content__podcastBox_header_title}>Articles</h2>
          <h5>Pregledajte selekciju odabranih tekstova redakcije</h5>
        </div>
        <div className={styles.content__podcastBox_articles}>
          {articles.map((article, index) => (
            <Article
              key={index}
              href={article.href}
              imageSrc={article.imageSrc}
              imageAlt={article.imageAlt}
              category={article.category}
              title={article.title}
              description={article.description}
            />
          ))}
        </div>
      </section>
      <DonateContainer/>
      <section
        className={`${stylesRes.content_container} ${styles.content__residentsBox}`}
      >
        <h2>Popular Residents</h2>
        <Carousel slides={slides} />
      </section>
    </main>
  );
}
