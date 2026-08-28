"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  RiPlayCircleLine,
  RiPauseCircleLine,
  RiVolumeUpLine,
  RiVolumeMuteLine,
} from "react-icons/ri";
import { PlayerButton } from "@/components/player-button";
import styles from '../styles/player/player.module.scss';

type NowPlayingResponse = {
  artist?: string;
  duration?: string;
  thumb?: string;
  title?: string;
};

const STREAM_URL = "https://stream.radiojar.com/4qawu2xta2zuv";
const NOW_PLAYING_URL = "/api/now-playing";

const dispatchPlayerState = (detail: {
  isPlaying?: boolean;
  isMuted?: boolean;
  artwork?: string;
  duration?: string;
  trackInfo?: string;
  volume?: number;
}): void => {
  window.dispatchEvent(new CustomEvent("sunradio-player-state", { detail }));
};

const formatDuration = (value?: string): string => {
  const seconds = Number(value);

  if (!Number.isFinite(seconds) || seconds <= 0) return "--:--";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackInfoRef = useRef<HTMLParagraphElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [trackInfo, setTrackInfo] = useState("SunRadio Live");
  const [duration, setDuration] = useState("--:--");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const fetchTrackInfo = async (): Promise<void> => {
      try {
        const response = await fetch(NOW_PLAYING_URL, { cache: "no-store" });

        if (!response.ok) return;

        const data = (await response.json()) as NowPlayingResponse;
        const artist = data.artist?.trim();
        const title = data.title?.trim();

        const nextTrackInfo =
          artist || title ? `${artist || "SunRadio"} - "${title || "Live"}"` : "SunRadio Live";
        const nextDuration = formatDuration(data.duration);

        setTrackInfo(nextTrackInfo);
        setDuration(nextDuration);
        dispatchPlayerState({
          artwork: data.thumb,
          duration: nextDuration,
          trackInfo: nextTrackInfo,
        });
      } catch {
        setTrackInfo("SunRadio Live");
        setDuration("--:--");
      }
    };

    fetchTrackInfo();
    const intervalId = window.setInterval(fetchTrackInfo, 20000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const handlePlay = async (): Promise<void> => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
      dispatchPlayerState({ isPlaying: true });
    } catch {
      setIsPlaying(false);
      dispatchPlayerState({ isPlaying: false });
    }
  };

  const handlePause = (): void => {
    audioRef.current?.pause();
    setIsPlaying(false);
    dispatchPlayerState({ isPlaying: false });
  };

  const handleMute = (): void => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
    dispatchPlayerState({ isMuted: audio.muted });
  };

  const handleVolumeClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextVolume = Math.min(
      Math.max((event.clientX - rect.left) / rect.width, 0),
      1,
    );

    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
      audioRef.current.muted = false;
    }

    setVolume(Math.round(nextVolume * 100));
    setIsMuted(false);
    dispatchPlayerState({ volume: Math.round(nextVolume * 100), isMuted: false });
  };

  return (
    <section>
      <div className={styles.player}>
        <audio
          ref={audioRef}
          src={STREAM_URL}
          preload="none"
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />

        <div className={styles.controls}>
          <PlayerButton
            title="Play"
            isHidden={isPlaying}
            className="jp-play"
            onClick={handlePlay}
          >
            <RiPlayCircleLine />
          </PlayerButton>

          <PlayerButton
            title="Pause"
            isHidden={!isPlaying}
            className="jp-pause"
            onClick={handlePause}
          >
            <RiPauseCircleLine />
          </PlayerButton>
        </div>
        <div id="rj-player">
          <div className="rj-info">
            <div className="rjp-trackinfo-container">
              <h4 className="rjp-label">Now playing:</h4>
              <p ref={trackInfoRef} id="trackInfo" className="rjp-info">
                {trackInfo}
              </p>
            </div>
            <div className="rjp-player-container">
              <div id="rjp-radiojar-player"></div>
              <div id="rj-player-controls" className="rj-player-controls">
                <div>
                  <div className="jp-controls">
                    <PlayerButton
                      className="jp-mute block"
                      title="Mute"
                      isHidden={isMuted}
                      onClick={handleMute}
                    >
                      <RiVolumeUpLine />
                    </PlayerButton>
                    <PlayerButton
                      className="jp-unmute block"
                      title="Unmute"
                      isHidden={!isMuted}
                      onClick={handleMute}
                    >
                      <RiVolumeMuteLine />
                    </PlayerButton>
                    <div className="jp-volume-bar-wrapper">
                      <div className="jp-volume-bar" onClick={handleVolumeClick}>
                        <div
                          className="jp-volume-bar-value"
                          style={{ width: `${volume}%` }}
                        />
                      </div>
                    </div>
                    <span className="jp-duration">{duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
