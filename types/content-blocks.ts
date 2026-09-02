export type StrapiMedia = {
  id: number;
  documentId?: string;
  url: string;
  alternativeText: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  formats?: Record<string, unknown> | null;
};

export type RichTextBlock = {
  id?: number;
  __component: "content.rich-text";
  body: unknown;
};
export type ImageBlock = {
  id?: number;
  __component: "content.image";
  image: StrapiMedia;
  caption?: string | null;
  width: "default" | "wide" | "full";
};
export type GalleryBlock = {
  id?: number;
  __component: "content.gallery";
  images: StrapiMedia[];
  caption?: string | null;
  layout: "grid" | "carousel" | "masonry";
};
export type QuoteBlock = {
  id?: number;
  __component: "content.quote";
  text: string;
  author?: string | null;
  source?: string | null;
};
export type LyricsBlock = {
  id?: number;
  __component: "content.lyrics";
  title?: string | null;
  body: string;
  translation?: string | null;
  credits?: string | null;
};
export type EmbedBlock = {
  id?: number;
  __component: "content.embed";
  provider:
    | "mixcloud"
    | "soundcloud"
    | "youtube"
    | "spotify"
    | "bandcamp"
    | "vimeo";
  url: string;
  title?: string | null;
  aspectRatio: "audio" | "16:9" | "1:1" | "4:3";
};
export type CtaBlock = {
  id?: number;
  __component: "content.cta";
  title: string;
  description?: string | null;
  style: "primary" | "secondary";
  link: { label: string; url: string; openInNewTab?: boolean };
};

export type ContentBlock =
  | RichTextBlock
  | ImageBlock
  | GalleryBlock
  | QuoteBlock
  | LyricsBlock
  | EmbedBlock
  | CtaBlock;
