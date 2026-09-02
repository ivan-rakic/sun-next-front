import type { ContentBlock } from "@/types/content-blocks";
const image = {
  id: 1,
  url: "/images/astronaut.jpg",
  alternativeText: null,
  width: 1200,
  height: 800,
};
export const contentBlockFixtures: ContentBlock[] = [
  {
    id: 1,
    __component: "content.rich-text",
    body: [
      {
        type: "paragraph",
        children: [
          { type: "text", text: "A Strapi Blocks paragraph with " },
          { type: "text", text: "bold", bold: true },
          { type: "text", text: ", italic, and a " },
          {
            type: "link",
            url: "https://sunradio.rs",
            children: [{ type: "text", text: "safe external link" }],
          },
          { type: "text", text: " and an " },
          {
            type: "link",
            url: "javascript:alert('unsafe')",
            children: [{ type: "text", text: "unsafe link" }],
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Fixture heading" }],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [{ type: "text", text: "First item" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Second item" }],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    __component: "content.image",
    image,
    width: "wide",
    caption: "A fixture image caption.",
  },
  {
    id: 3,
    __component: "content.gallery",
    images: [
      image,
      { ...image, id: 2, url: "/images/mountains.jpg" },
      { ...image, id: 3, url: "/images/ocean.jpg" },
    ],
    layout: "grid",
    caption: "Grid gallery fixture.",
  },
  {
    id: 4,
    __component: "content.gallery",
    images: [image, { ...image, id: 4, url: "/images/mountains.jpg" }],
    layout: "carousel",
    caption: "Carousel gallery fixture.",
  },
  {
    id: 5,
    __component: "content.gallery",
    images: [
      image,
      { ...image, id: 5, url: "/images/ocean.jpg" },
      { ...image, id: 6, url: "/images/mountains.jpg" },
    ],
    layout: "masonry",
    caption: "Masonry gallery fixture.",
  },
  {
    id: 6,
    __component: "content.quote",
    text: "A quote can provide a pause in the editorial rhythm.",
    author: "SunRadio",
    source: "Fixture archive",
  },
  {
    id: 7,
    __component: "content.lyrics",
    title: "Fixture lyrics",
    body: "First line\nSecond line\n\nThird line",
    translation: "Translated first line\nTranslated second line",
    credits: "Words and music: SunRadio",
  },
  {
    id: 8,
    __component: "content.embed",
    provider: "youtube",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "YouTube fixture",
    aspectRatio: "16:9",
  },
  {
    id: 9,
    __component: "content.embed",
    provider: "youtube",
    url: "https://example.com/watch?v=invalid",
    aspectRatio: "16:9",
  },
  {
    id: 10,
    __component: "content.cta",
    title: "Fixture CTA",
    description:
      "This editorial CTA validates internal and external link rendering.",
    style: "primary",
    link: { label: "Internal route", url: "/articles" },
  },
  {
    id: 11,
    __component: "content.cta",
    title: "External CTA",
    style: "secondary",
    link: {
      label: "Open SunRadio",
      url: "https://sunradio.rs",
      openInNewTab: true,
    },
  },
];
