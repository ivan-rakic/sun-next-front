"use client";

import Image from "next/image";
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { getStrapiMediaUrl, hasRenderableMedia } from "@/lib/content/media";
import type { GalleryBlock as GalleryBlockData } from "@/types/content-blocks";
import styles from "@/styles/components/content.module.scss";
import "swiper/css";
import "swiper/css/navigation";

type GalleryBlockProps = {
  block: GalleryBlockData;
  fallbackAlt: string;
  previousLabel: string;
  nextLabel: string;
};

export const GalleryBlock = ({
  block,
  fallbackAlt,
  previousLabel,
  nextLabel,
}: GalleryBlockProps): React.ReactElement | null => {
  const images = block.images.filter(hasRenderableMedia);
  if (!images.length) return null;
  const renderImage = (image: (typeof images)[number]) => {
    const src = getStrapiMediaUrl(image.url);
    return src ? (
      <Image
        src={src}
        alt={image.alternativeText ?? image.caption ?? fallbackAlt}
        width={image.width ?? 1200}
        height={image.height ?? 800}
        sizes="(max-width: 768px) 100vw, 600px"
      />
    ) : null;
  };

  if (block.layout === "carousel")
    return (
      <figure className={styles.gallery}>
        <Swiper
          modules={[Navigation, A11y]}
          navigation={{
            prevEl: `.${styles.galleryPrev}`,
            nextEl: `.${styles.galleryNext}`,
          }}
          a11y={{
            prevSlideMessage: previousLabel,
            nextSlideMessage: nextLabel,
          }}
          slidesPerView={1}
          spaceBetween={16}
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>{renderImage(image)}</SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.galleryControls}>
          <button
            type="button"
            className={styles.galleryPrev}
            aria-label={previousLabel}
          >
            ←
          </button>
          <button
            type="button"
            className={styles.galleryNext}
            aria-label={nextLabel}
          >
            →
          </button>
        </div>
        {block.caption ? <figcaption>{block.caption}</figcaption> : null}
      </figure>
    );

  return (
    <figure
      className={`${styles.gallery} ${block.layout === "masonry" ? styles.gallery_masonry : styles.gallery_grid}`}
    >
      <div>
        {images.map((image) => (
          <div key={image.id}>{renderImage(image)}</div>
        ))}
      </div>
      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
    </figure>
  );
};
