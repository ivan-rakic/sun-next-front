import { NextResponse } from 'next/server';

const RADIOJAR_NOW_PLAYING_URL =
  'https://proxy.radiojar.com/api/stations/4qawu2xta2zuv/now_playing/';

type RadiojarNowPlayingResponse = {
  album?: string;
  artist?: string;
  duration?: string;
  guid?: string;
  thumb?: string;
  title?: string;
};

export async function GET(): Promise<NextResponse<RadiojarNowPlayingResponse>> {
  try {
    const response = await fetch(RADIOJAR_NOW_PLAYING_URL, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({}, { status: 200 });
    }

    const data = (await response.json()) as RadiojarNowPlayingResponse;

    return NextResponse.json({
      album: data.album,
      artist: data.artist,
      duration: data.duration,
      guid: data.guid,
      thumb: data.thumb,
      title: data.title,
    });
  } catch {
    return NextResponse.json({}, { status: 200 });
  }
}
