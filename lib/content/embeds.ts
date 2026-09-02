import type { EmbedBlock } from "@/types/content-blocks";

const providerHosts: Record<EmbedBlock["provider"], readonly string[]> = {
  mixcloud: ["mixcloud.com", "www.mixcloud.com"],
  soundcloud: ["soundcloud.com", "www.soundcloud.com", "w.soundcloud.com"],
  youtube: [
    "youtube.com",
    "www.youtube.com",
    "youtu.be",
    "www.youtu.be",
    "youtube-nocookie.com",
    "www.youtube-nocookie.com",
  ],
  spotify: ["spotify.com", "www.spotify.com", "open.spotify.com"],
  bandcamp: ["bandcamp.com"],
  vimeo: ["vimeo.com", "www.vimeo.com", "player.vimeo.com"],
};

const isAllowedHost = (
  host: string,
  provider: EmbedBlock["provider"],
): boolean =>
  providerHosts[provider].some(
    (allowed) => host === allowed || host.endsWith(`.${allowed}`),
  );

export const getEmbedUrl = (block: EmbedBlock): string | null => {
  try {
    const source = new URL(block.url);
    if (!isAllowedHost(source.hostname, block.provider)) return null;

    if (block.provider === "soundcloud")
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(source.toString())}`;
    if (block.provider === "mixcloud")
      return `https://www.mixcloud.com/widget/iframe/?hide_cover=1&light=1&feed=${encodeURIComponent(source.pathname)}`;
    if (block.provider === "youtube") {
      const id = source.hostname.endsWith("youtu.be")
        ? source.pathname.slice(1)
        : (source.searchParams.get("v") ??
          source.pathname.split("/").filter(Boolean).at(-1));
      return id
        ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`
        : null;
    }
    if (block.provider === "spotify")
      return source.pathname.startsWith("/embed/")
        ? source.toString()
        : `https://open.spotify.com/embed${source.pathname}`;
    if (block.provider === "vimeo") {
      const id = source.pathname.split("/").filter(Boolean).at(-1);
      return id
        ? `https://player.vimeo.com/video/${encodeURIComponent(id)}`
        : null;
    }
    return source.pathname.includes("/EmbeddedPlayer/")
      ? source.toString()
      : null;
  } catch {
    return null;
  }
};

export const isExternalUrl = (value: string): boolean => {
  try {
    return new URL(value).origin !== "http://localhost";
  } catch {
    return false;
  }
};
