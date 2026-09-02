"use client";

import { useEffect, useState } from "react";
import {
  RiPauseCircleLine,
  RiPlayCircleLine,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from "react-icons/ri";

import styles from "@/styles/player/sticky-player.module.scss";
import Image from "next/image";
import type { FrontendDictionary } from "@/lib/i18n/dictionaries";

type PlayerStateEvent = CustomEvent<{
  isPlaying?: boolean;
  isMuted?: boolean;
  artwork?: string;
  duration?: string;
  trackInfo?: string;
  volume?: number;
}>;

type StickyPlayerProps = { dictionary: FrontendDictionary["player"] };

export const StickyPlayer = ({
  dictionary,
}: StickyPlayerProps): React.ReactElement => {
  const FALLBACK_ARTWORK = "/images/speakers-back.png";
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackInfo, setTrackInfo] = useState("SunRadio Live");
  const [volume, setVolume] = useState(70);
  const [radiojarArtwork, setRadiojarArtwork] = useState<string | null>(null);

  const [currentArtwork, setCurrentArtwork] = useState(FALLBACK_ARTWORK);

  const [artist, songName] = trackInfo.includes(" - ")
    ? trackInfo.split(" - ", 2).map((item) => item.trim())
    : ["", trackInfo.trim()];

  const formatTrackInfo = (value: string): string => {
    return value
      .trim()
      .replace(/^Unknown\s*-\s*/i, "")
      .replace(/\.mp3"?$/i, '"')
      .replace(/^\d+[_\-\s.]*/, "")
      .replace(/_/g, " ")
      .trim();
  };

  // TODO: check the "" in the file name, as last one is removed

  useEffect(() => {
    const handleScroll = (): void => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handlePlayerState = (event: Event): void => {
      const { artwork, isPlaying, isMuted, trackInfo, volume } = (
        event as PlayerStateEvent
      ).detail;

      if (typeof artwork === "string") setRadiojarArtwork(artwork || null);
      if (typeof isPlaying === "boolean") setIsPlaying(isPlaying);
      if (typeof isMuted === "boolean") setIsMuted(isMuted);
      if (typeof trackInfo === "string")
        setTrackInfo(formatTrackInfo(trackInfo));
      if (typeof volume === "number") setVolume(volume);
    };

    window.addEventListener("sunradio-player-state", handlePlayerState);

    return () => {
      window.removeEventListener("sunradio-player-state", handlePlayerState);
    };
  }, []);

  useEffect(() => {
    if (radiojarArtwork) {
      setCurrentArtwork(radiojarArtwork);
      return;
    }

    if (!artist || !songName) {
      setCurrentArtwork(FALLBACK_ARTWORK);
      return;
    }

    const controller = new AbortController();

    const fetchArtwork = async (): Promise<void> => {
      try {
        const query = encodeURIComponent(`${artist} ${songName}`);

        const response = await fetch(
          `https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=1`,
          { signal: controller.signal },
        );

        const data = await response.json();

        const artworkUrl = data.results?.[0]?.artworkUrl100;

        if (!artworkUrl) {
          setCurrentArtwork(FALLBACK_ARTWORK);
          return;
        }

        setCurrentArtwork(artworkUrl.replace("100x100bb", "600x600bb"));
      } catch {
        if (!controller.signal.aborted) {
          setCurrentArtwork(FALLBACK_ARTWORK);
        }
      }
    };

    fetchArtwork();

    return () => {
      controller.abort();
    };
  }, [artist, songName, radiojarArtwork]);

  useEffect(() => {
    const trackInfoElement = document.querySelector("#trackInfo");

    if (!trackInfoElement) return;

    const updateTrackInfo = (): void => {
      const nextTrackInfo = trackInfoElement.textContent?.trim();

      if (nextTrackInfo) {
        setTrackInfo(formatTrackInfo(nextTrackInfo));
      }
    };

    updateTrackInfo();

    const observer = new MutationObserver(updateTrackInfo);

    observer.observe(trackInfoElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: songName || trackInfo,
      artist: artist || "SunRadio",
      album: "SunRadio Live",
      artwork: [
        {
          src: currentArtwork,
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });
  }, [artist, songName, trackInfo, currentArtwork]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: songName || trackInfo,
      artist: artist || "SunRadio",
      album: "SunRadio Live",
      artwork: [
        {
          src: currentArtwork,
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });

    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";

    navigator.mediaSession.setActionHandler("play", handlePlay);
    navigator.mediaSession.setActionHandler("pause", handlePause);
  }, [artist, songName, trackInfo, currentArtwork, isPlaying]);

  const handlePlay = (): void => {
    document.querySelector<HTMLButtonElement>(".jp-play")?.click();
    setIsPlaying(true);
  };

  const handlePause = (): void => {
    document.querySelector<HTMLButtonElement>(".jp-pause")?.click();
    setIsPlaying(false);
  };

  const handleMute = (): void => {
    document
      .querySelector<HTMLButtonElement>(isMuted ? ".jp-unmute" : ".jp-mute")
      ?.click();

    // isMuted updates via the sunradio-player-state event dispatched by the click above
  };

  const handleVolumeClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const realVolumeBar = document.querySelector<HTMLElement>(
      "#rj-player .jp-volume-bar",
    );

    if (!realVolumeBar) return;

    const stickyRect = event.currentTarget.getBoundingClientRect();

    const percentage = Math.min(
      Math.max((event.clientX - stickyRect.left) / stickyRect.width, 0),
      1,
    );

    const realRect = realVolumeBar.getBoundingClientRect();

    realVolumeBar.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: realRect.left + realRect.width * percentage,
        clientY: realRect.top + realRect.height / 2,
      }),
    );

    setVolume(Math.round(percentage * 100));
  };

  return (
    <div
      className={`${styles.stickyPlayer} ${
        isVisible ? styles.stickyPlayerVisible : ""
      }`}
    >
      <div className={styles.stickyPlayer__inner}>
        <div className={styles.stickyPlayer__chevrons} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className={styles.stickyPlayer__controls}>
          <div className={styles.stickyPlayer__roto} />

          <button
            type="button"
            title={isPlaying ? dictionary.pause : dictionary.play}
            className={styles.stickyPlayer__playButton}
            onClick={isPlaying ? handlePause : handlePlay}
          >
            {isPlaying ? <RiPauseCircleLine /> : <RiPlayCircleLine />}
          </button>
        </div>

        <div className={styles.stickyPlayer__artwork}>
          <Image
            src={currentArtwork}
            alt={dictionary.artworkAlt}
            width={52}
            height={52}
            unoptimized
          />
        </div>

        <div className={styles.stickyPlayer__track}>
          <span>{dictionary.nowPlaying}</span>
          <p>{trackInfo}</p>
        </div>

        <div className={styles.stickyPlayer__volume}>
          <button
            type="button"
            title={isMuted ? dictionary.unmute : dictionary.mute}
            className={styles.stickyPlayer__soundButton}
            onClick={handleMute}
          >
            {isMuted ? <RiVolumeMuteLine /> : <RiVolumeUpLine />}
          </button>

          <div
            role="slider"
            tabIndex={0}
            aria-label={dictionary.volume}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={volume}
            className={styles.stickyPlayer__volumeBar}
            onClick={handleVolumeClick}
          >
            <div
              className={styles.stickyPlayer__volumeBarValue}
              style={{ width: `${volume}%` }}
            />
          </div>
        </div>

        <div className={styles.stickyPlayer__live}>{dictionary.live}</div>
      </div>
    </div>
  );
};
