import { NextResponse } from 'next/server';

const RADIOJAR_LIVE_STATS_URL =
  'https://proxy.radiojar.com/api/stations/4qawu2xta2zuv/stats/live';

type RadiojarLiveStatsResponse = {
  data?: Array<{
    cities?: Array<{
      city?: string;
      count?: number;
    }>;
    country_code?: string;
    country_name?: string;
    count?: number;
  }>;
};

type LiveLocation = {
  city?: string;
  country: string;
  countryCode?: string;
  listeners: number;
};

type LiveLocationsResponse = {
  totalListeners: number;
  locations: LiveLocation[];
};

export async function GET(): Promise<NextResponse<LiveLocationsResponse>> {
  try {
    const response = await fetch(RADIOJAR_LIVE_STATS_URL, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ totalListeners: 0, locations: [] });
    }

    const data = (await response.json()) as RadiojarLiveStatsResponse;
    const locations = (data.data ?? []).flatMap((country) => {
      const cities = country.cities?.filter((city) => city.city && city.city !== 'Unknown') ?? [];

      if (!cities.length) {
        return [
          {
            country: country.country_name || 'Unknown',
            countryCode: country.country_code,
            listeners: country.count ?? 0,
          },
        ];
      }

      return cities.map((city) => ({
        city: city.city,
        country: country.country_name || 'Unknown',
        countryCode: country.country_code,
        listeners: city.count ?? 0,
      }));
    });

    return NextResponse.json({
      totalListeners: locations.reduce((sum, location) => sum + location.listeners, 0),
      locations,
    });
  } catch {
    return NextResponse.json({ totalListeners: 0, locations: [] });
  }
}
