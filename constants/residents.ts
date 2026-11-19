import type { StaticImageData } from "next/image";

import astronautImage from "@/public/images/astronaut.jpg";
import flowersImage from "@/public/images/flowers.jpg";
import mountainsImage from "@/public/images/mountains.jpg";
import treesImage from "@/public/images/trees.jpg";

export type ResidentTag = "podcast" | "news" | "article" | "radio";

export type ResidentPlaceholder = {
  slug: string;
  number: string;
  tag: ResidentTag;
  image: StaticImageData;
};

export const residents: ResidentPlaceholder[] = [
  {
    slug: "resident-01",
    number: "01",
    tag: "podcast",
    image: flowersImage,
  },
  {
    slug: "resident-02",
    number: "02",
    tag: "news",
    image: astronautImage,
  },
  {
    slug: "resident-03",
    number: "03",
    tag: "article",
    image: treesImage,
  },
  {
    slug: "resident-04",
    number: "04",
    tag: "radio",
    image: mountainsImage,
  },
];
