import type { NextApiRequest, NextApiResponse } from "next";

const RADIOJAR_RECENT_TRACKS_URL =
  "https://proxy.radiojar.com/api/stations/4qawu2xta2zuv/tracks/";

type RadiojarTrack = {
  album?: string;
  artist?: string;
  duration?: number;
  guid?: string;
  thumb?: string;
  tm?: string;
  tm_end?: string;
  track?: string;
};

type RecentTrack = {
  album?: string;
  artist: string;
  duration?: number;
  guid?: string;
  playedAt?: string;
  thumb?: string;
  title: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<RecentTrack[]>,
): Promise<void> {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).end();
    return;
  }

  try {
    const result = await fetch(RADIOJAR_RECENT_TRACKS_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!result.ok) {
      response.status(200).json([]);
      return;
    }

    const data = (await result.json()) as RadiojarTrack[];
    const tracks = data
      .sort(
        (a, b) =>
          new Date(b.tm ?? "").getTime() - new Date(a.tm ?? "").getTime(),
      )
      .slice(0, 5)
      .map((track) => ({
        album: track.album,
        artist: track.artist || "SunRadio",
        duration: track.duration,
        guid: track.guid,
        playedAt: track.tm,
        thumb: track.thumb,
        title: track.track || "Live",
      }));

    response.status(200).json(tracks);
  } catch {
    response.status(200).json([]);
  }
}
