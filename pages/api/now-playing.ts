import type { NextApiRequest, NextApiResponse } from "next";

const RADIOJAR_NOW_PLAYING_URL =
  "https://proxy.radiojar.com/api/stations/4qawu2xta2zuv/now_playing/";

type RadiojarNowPlayingResponse = {
  album?: string;
  artist?: string;
  duration?: string;
  guid?: string;
  thumb?: string;
  title?: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<RadiojarNowPlayingResponse>,
): Promise<void> {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).end();
    return;
  }

  try {
    const result = await fetch(RADIOJAR_NOW_PLAYING_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!result.ok) {
      response.status(200).json({});
      return;
    }

    const data = (await result.json()) as RadiojarNowPlayingResponse;
    response.status(200).json({
      album: data.album,
      artist: data.artist,
      duration: data.duration,
      guid: data.guid,
      thumb: data.thumb,
      title: data.title,
    });
  } catch {
    response.status(200).json({});
  }
}
