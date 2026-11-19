import type { StaticImageData } from "next/image";

import astronautImage from "@/public/images/astronaut.jpg";
import mountainsImage from "@/public/images/mountains.jpg";

export type EditorialRole =
  | "radioEditor"
  | "podcastHost"
  | "socialMediaManager";

export type EditorialMemberFallback = {
  name: string;
  role: EditorialRole;
  image: StaticImageData;
  facebookUrl: string;
  instagramUrl: string;
};

export const editorialMembersFallback: EditorialMemberFallback[] = [
  {
    name: "FirstName Lastname",
    role: "radioEditor",
    image: astronautImage,
    facebookUrl: "http://www.facebook.com/person",
    instagramUrl: "http://www.instagram.com/person",
  },
  {
    name: "FirstName Lastname",
    role: "podcastHost",
    image: mountainsImage,
    facebookUrl: "http://www.facebook.com/person",
    instagramUrl: "http://www.instagram.com/person",
  },
  {
    name: "Vojislav Killo Killo Malešev",
    role: "socialMediaManager",
    image: astronautImage,
    facebookUrl: "http://www.facebook.com/person",
    instagramUrl: "http://www.instagram.com/person",
  },
  {
    name: "FirstName Lastname",
    role: "podcastHost",
    image: astronautImage,
    facebookUrl: "http://www.facebook.com/person",
    instagramUrl: "http://www.instagram.com/person",
  },
  {
    name: "FirstName Lastname",
    role: "podcastHost",
    image: mountainsImage,
    facebookUrl: "http://www.facebook.com/person",
    instagramUrl: "http://www.instagram.com/person",
  },
  {
    name: "FirstName Lastname",
    role: "podcastHost",
    image: astronautImage,
    facebookUrl: "http://www.facebook.com/person",
    instagramUrl: "http://www.instagram.com/person",
  },
];
