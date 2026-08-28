import { NextResponse } from 'next/server';

const RADIOJAR_RECENT_TRACKS_URL =
  'https://proxy.radiojar.com/api/stations/4qawu2xta2zuv/tracks/';

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

export async function GET(): Promise<NextResponse<RecentTrack[]>> {
  try {
    const response = await fetch(RADIOJAR_RECENT_TRACKS_URL, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json([]);
    }

    const data = (await response.json()) as RadiojarTrack[];
    const tracks = data
      .sort((a, b) => new Date(b.tm ?? '').getTime() - new Date(a.tm ?? '').getTime())
      .slice(0, 5)
      .map((track) => ({
        album: track.album,
        artist: track.artist || 'SunRadio',
        duration: track.duration,
        guid: track.guid,
        playedAt: track.tm,
        thumb: track.thumb,
        title: track.track || 'Live',
      }));

    return NextResponse.json(tracks);
  } catch {
    return NextResponse.json([]);
  }
}
