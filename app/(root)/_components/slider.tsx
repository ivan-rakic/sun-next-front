"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "@/styles/components/slider.module.scss";

import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

type SlideItem = {
  id: string;
  title: string;
  description?: string;
  href: string;
  tag: string;
  image: StaticImageData | string;
  imageAlt?: string;
  priority?: boolean;
};

type SliderProps = {
  slides: SlideItem[];
  desktopSlidesPerView?: number;
};

export default function Slider({
  slides,
  desktopSlidesPerView = 3,
}: SliderProps) {
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
        className={`${styles.sliderContent} ${
          isMounted ? styles.sliderContentVisible : ""
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
              slidesPerView: desktopSlidesPerView,
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
                      alt={slide.imageAlt ?? slide.title}
                      fill
                      sizes={`(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${Math.floor(100 / desktopSlidesPerView)}vw`}
                      priority={slide.priority ?? false}
                    />
                  </div>

                  <span className={styles.sliderCard__tag}>{slide.tag}</span>

                  <div className={styles.sliderCard__info}>
                    <h2>{slide.title}</h2>
                    {slide.description && <p>{slide.description}</p>}
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
