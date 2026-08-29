"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import pic1 from "@/public/images/astronaut.jpg";
import pic2 from "@/public/images/flowers.jpg";
import pic3 from "@/public/images/trees.jpg";
import styles from "@/styles/components/slider.module.scss";

import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

type SlideItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  tag: string;
  image: StaticImageData;
};

const slides: SlideItem[] = [
  {
    id: "1",
    title: "Ponesi Sunce sa Sobom",
    description: "Pobedi mrak, budi sunca zrak! Skini mobilnu aplikaciju.",
    href: "/podcasts/decije-igre",
    tag: "Show",
    image: pic2,
  },
  {
    id: "2",
    title: "Novi serijal emisija",
    description: "Autorski program, razgovori i muzika koju volimo.",
    href: "/podcasts/orbit-sounds-episode-09",
    tag: "Podcast",
    image: pic1,
  },
  {
    id: "3",
    title: "SunRadio događaji",
    description: "Prati najave, gostovanja i specijalne live programe.",
    href: "/program",
    tag: "Event",
    image: pic3,
  },
  {
    id: "4",
    title: "Priče iz redakcije",
    description: "Kultura, muzika i ljudi koji donose drugačiji zvuk.",
    href: "/articles/protraceni-zivoti-irski",
    tag: "Article",
    image: pic1,
  },
];

export default function Slider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsMounted(true);
    }, 350);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);


  return (
    <div className={styles.slider}>
      {!isMounted && (
        <div className={styles.sliderLoader}>
          <div className={styles.sliderLoader__circle} />
        </div>
      )}
      <div
        className={`${styles.sliderContent} ${isMounted ? styles.sliderContentVisible : ""
          }`}
      >
        <Swiper
          autoplay={{ delay: 8000 }}
          speed={1400}
          allowTouchMove
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <article className={styles.sliderCard}>
                <Link className={styles.sliderCard__link} href={slide.href}>
                  <div className={styles.sliderCard__image}>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={slide.id === "1"}
                    />
                  </div>

                  <span className={styles.sliderCard__tag}>{slide.tag}</span>

                  <div className={styles.sliderCard__info}>
                    <h2>{slide.title}</h2>
                    <p>{slide.description}</p>
                  </div>
                </Link>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}