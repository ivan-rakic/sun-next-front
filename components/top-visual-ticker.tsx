'use client';

import { useEffect, useState } from 'react';

import styles from '@/styles/pages/layout.module.scss';

type RecentTrack = {
  artist: string;
  title: string;
};

type LiveLocation = {
  city?: string;
  country: string;
  listeners: number;
};

type LiveLocationsResponse = {
  totalListeners: number;
  locations: LiveLocation[];
};

const FALLBACK_ITEMS = [
  'SUN RADIO',
  'Deep House',
  'Cosmic Sounds',
  'Podcasts',
  'Articles',
  'Live Shows',
  'Community',
];

export const TopVisualTicker = (): React.ReactElement => {
  const [recentTracks, setRecentTracks] = useState<string[]>([]);
  const [liveLocations, setLiveLocations] = useState<string[]>([]);
  const [totalListeners, setTotalListeners] = useState(0);

  useEffect(() => {
    const fetchRecentTracks = async (): Promise<void> => {
      try {
        const response = await fetch('/api/radio/recent-tracks', {
          cache: 'no-store',
        });

        if (!response.ok) return;

        const tracks = (await response.json()) as RecentTrack[];

        setRecentTracks(
          tracks.map((track) => `${track.artist} - ${track.title}`),
        );
      } catch {
        setRecentTracks([]);
      }
    };

    fetchRecentTracks();
    const intervalId = window.setInterval(fetchRecentTracks, 60000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const fetchLiveLocations = async (): Promise<void> => {
      try {
        const response = await fetch('/api/radio/live-locations', {
          cache: 'no-store',
        });

        if (!response.ok) return;

        const live = (await response.json()) as LiveLocationsResponse;

        const locationItems = live.locations.map((location) => {
          const place = location.city
            ? `${location.city}, ${location.country}`
            : location.country;

          return `${place} (${location.listeners})`;
        });

        setTotalListeners(live.totalListeners);
        setLiveLocations(locationItems);
      } catch {
        setTotalListeners(0);
        setLiveLocations([]);
      }
    };

    fetchLiveLocations();
    const intervalId = window.setInterval(fetchLiveLocations, 60000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const recentTracksText = recentTracks.length
    ? `Recently played • ${recentTracks.join(' • ')}`
    : FALLBACK_ITEMS.join(' • ');
  const liveLocationsText = liveLocations.length
    ? `Live locations • ${totalListeners} listeners • ${liveLocations.join(' • ')}`
    : 'Live locations • waiting for listeners';

  return (
    <div className={styles.topVisual__ticker}>
      <div className={styles.topVisual__tickerTrack}>
        <span>{recentTracksText}</span>
        <span>{liveLocationsText}</span>
        <span>{recentTracksText}</span>
        <span>{liveLocationsText}</span>
      </div>
    </div>
  );
};
