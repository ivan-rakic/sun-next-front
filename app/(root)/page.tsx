import Image from "next/image";

import styles from "@/styles/index.module.scss";
import stylesRes from "@/styles/reusable.module.scss";

import img1 from "../../public/images/astronaut.jpg";
import img2 from "../../public/images/beach.jpg";
import img3 from "../../public/images/ocean.jpg";
import img4 from "../../public/images/mountains.jpg";
import Link from "next/link";

import { Features } from "@/app/(root)/_components/features";
import { Podcasts } from "@/app/(root)/_components/podcasts";
import { Carousel } from "@/app/(root)/_components/carousel";
import React from "react";
import { slides } from "@/constants";

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
          <Link
            href="/podcast"
            className={styles.content__podcastBox_articles_link}
          >
            <Image src={img4} alt="test" />
            <span
              className={styles.content__podcastBox_articles_link_category}
              style={{ backgroundColor: "purple" }}
            >
              nesto
            </span>
            <div className={styles.content__podcastBox_articles_link_titles}>
              <h5>
                Protraćeni životi irski: Tema za do 264 funte Sterlinga (300
                evra po današnjem kursu)?
              </h5>
              <p>
                Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u
                Iraca
              </p>
            </div>
          </Link>
          <Link
            href="/podcast"
            className={styles.content__podcastBox_articles_link}
          >
            <Image src={img1} alt="test" />
            <span
              className={styles.content__podcastBox_articles_link_category}
              style={{ backgroundColor: "orange" }}
            >
              nesto
            </span>
            <div className={styles.content__podcastBox_articles_link_titles}>
              <h5>
                Protraćeni životi irski: Tema za do 264 funte Sterlinga (300
                evra po današnjem kursu)?
              </h5>
              <p>
                Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u
                Iraca
              </p>
            </div>
          </Link>
          <Link
            href="/podcast"
            className={styles.content__podcastBox_articles_link}
          >
            <Image src={img3} alt="test" />
            <span
              className={styles.content__podcastBox_articles_link_category}
              style={{ backgroundColor: "darkblue" }}
            >
              nesto
            </span>
            <div className={styles.content__podcastBox_articles_link_titles}>
              <h5>
                Protraćeni životi irski: Tema za do 264 funte Sterlinga (300
                evra po današnjem kursu)?
              </h5>
              <p>
                Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u
                Iraca
              </p>
            </div>
          </Link>
          <Link
            href="/podcast"
            className={styles.content__podcastBox_articles_link}
          >
            <Image src={img4} alt="test" />
            <span
              className={styles.content__podcastBox_articles_link_category}
              style={{ backgroundColor: "limegreen" }}
            >
              nesto
            </span>
            <div className={styles.content__podcastBox_articles_link_titles}>
              <h5>
                Protraćeni životi irski: Tema za do 264 funte Sterlinga (300
                evra po današnjem kursu)?
              </h5>
              <p>
                Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u
                Iraca
              </p>
            </div>
          </Link>
          <Link
            href="/podcast"
            className={styles.content__podcastBox_articles_link}
          >
            <Image src={img2} alt="test" />
            <span
              className={styles.content__podcastBox_articles_link_category}
              style={{ backgroundColor: "orange" }}
            >
              nesto
            </span>
            <div className={styles.content__podcastBox_articles_link_titles}>
              <h5>
                Protraćeni životi irski: Tema za do 264 funte Sterlinga (300
                evra po današnjem kursu)?
              </h5>
              <p>
                Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u
                Iraca
              </p>
            </div>
          </Link>
          <Link
            href="/podcast"
            className={styles.content__podcastBox_articles_link}
          >
            <Image src={img1} alt="test" />
            <span
              className={styles.content__podcastBox_articles_link_category}
              style={{ backgroundColor: "red" }}
            >
              nesto
            </span>
            <div className={styles.content__podcastBox_articles_link_titles}>
              <h5>
                Protraćeni životi irski: Tema za do 264 funte Sterlinga (300
                evra po današnjem kursu)?
              </h5>
              <p>
                Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u
                Iraca
              </p>
            </div>
          </Link>
        </div>
        {/* <Link href='/podcast' className={styles.content__podcastBox_articles_linkLead}>Svi Tekstovi</Link> */}
      </section>
      <section className={styles.content__donateContainer}>
        <div></div>
        <div className={styles.content__donateContainer_content}>
          <h3>PODRŽITE SUNCE - DA NASTAVI DA SIJA</h3>
          <p>
            Pozivamo Sunca zrake da podrže opstanak i rast našeg radija. Nemamo
            sponzore niti finansijere. Jedini od kojih hoćemo da zavisimo ste
            vi.
          </p>
          <Link
            href="/podrzi-sunce"
            className={styles.content__donateContainer_content_learnMoreButton}
          >
            Saznaj Više
          </Link>
          <Link
            href="https://www.paypal.com/paypalme/sunradiors"
            target="_blank"
            className={styles.content__donateContainer_content_ppButton}
          >
            PayPal
          </Link>
          <Link
            href="https://www.patreon.com/sunradio"
            target="_blank"
            className={styles.content__donateContainer_content_ptButton}
          >
            Patreon
          </Link>
        </div>
        <div className={styles.content__donateContainer_ctaContainer}></div>
      </section>
      <section
        className={`${stylesRes.content_container} ${styles.content__residentsBox}`}
      >
        <h2>Popular Residents</h2>
        <Carousel slides={slides} />
      </section>
    </main>
  );
}
