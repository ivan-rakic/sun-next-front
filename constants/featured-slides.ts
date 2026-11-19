import type { StaticImageData } from "next/image";

import astronautImage from "@/public/images/astronaut.jpg";
import flowersImage from "@/public/images/flowers.jpg";
import treesImage from "@/public/images/trees.jpg";

export const featuredSlideFallbacks = [
  {
    id: "mobileApp",
    href: "/podcasts/decije-igre",
    image: flowersImage,
    priority: true,
  },
  {
    id: "podcastSeries",
    href: "/podcasts/orbit-sounds-episode-09",
    image: astronautImage,
  },
  {
    id: "programEvents",
    href: "/program",
    image: treesImage,
  },
  {
    id: "editorial",
    href: "/articles/protraceni-zivoti-irski",
    image: astronautImage,
  },
] satisfies {
  id: "mobileApp" | "podcastSeries" | "programEvents" | "editorial";
  href: string;
  image: StaticImageData;
  priority?: boolean;
}[];
