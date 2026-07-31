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

interface CustomWindow extends Window {
  rjq: any;
}

declare const window: CustomWindow;

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackInfo, setTrackInfo] = useState("Artist - Song");

  useEffect(() => {
    const initializePlayer = (): void => {
      const rjq = window.rjq;
      if (!rjq) return;

      const player = rjq("#rjp-radiojar-player");

      const handleTrackLoad = (
        event: unknown,
        data: { artist?: string; title?: string; thumb?: string },
      ): void => {
        updateInfo(data);

        const nextTrackInfo =
          data.title || data.artist
            ? `${data.artist ?? "Unknown"} - "${data.title ?? ""}"`
            : "SunRadio Live";

        setTrackInfo(nextTrackInfo);

        rjq(".rjp-trackinfo-container").show();
        rjq("#trackInfo").html(nextTrackInfo);
      };

      const updateInfo = (data: { thumb?: string }): void => {
        if (data.thumb) {
          rjq("#rj-cover").html(
            `<a href="#"><img src="${data.thumb}" alt="" title="" /></a>`,
          );
        } else {
          rjq("#rj-cover").html("");
        }
      };

      player.off("rj-track-load-event");
      player.on("rj-track-load-event", handleTrackLoad);

      player.radiojar("player", {
        streamName: "4qawu2xta2zuv",
        enableUpdates: true,
        defaultImage:
          "//www.radiojar.com/img/sample_images/Radio_Stations_Avatar_BLUE.png",
        autoplay: false,
      });
    };

    if (window.rjq) {
      initializePlayer();
    } else {
      const script = document.createElement("script");
      script.src = "//www.radiojar.com/wrappers/api-plugins/v1/radiojar-min.js";
      script.onload = initializePlayer;
      document.body.appendChild(script);
    }
  }, []);

  // TODO
  // Track info is not updating when new track is playing

  const trackInfoRef = useRef<HTMLParagraphElement | null>(null);

  return (
    <section>
      <div className={styles.player}>
        <div className={styles.controls}>
          <PlayerButton
            title="Play"
            isHidden={false}
            className="jp-play"
            onClick={() => setIsPlaying(true)}
          >
            <RiPlayCircleLine />
          </PlayerButton>

          <PlayerButton
            title="Pause"
            isHidden={true}
            className="jp-pause"
            onClick={() => setIsPlaying(false)}
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
                      isHidden={false}
                    >
                      <RiVolumeUpLine />
                    </PlayerButton>
                    <PlayerButton
                      className="jp-unmute block"
                      title="Unmute"
                      isHidden={false}
                    >
                      <RiVolumeMuteLine />
                    </PlayerButton>
                    <div className="jp-volume-bar-wrapper">
                      <div className="jp-volume-bar">
                        <div className="jp-volume-bar-value"></div>
                      </div>
                    </div>
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
