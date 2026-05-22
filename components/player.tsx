"use client";
import "react-awesome-slider/dist/styles.css";
import React, { useEffect, useRef, useState } from "react";
import {
  RiPlayCircleLine,
  RiPauseCircleLine,
  RiVolumeUpLine,
  RiVolumeMuteLine,
} from "react-icons/ri";
import { PlayerButton } from "@/components/player-button";
import styles from '../styles/player.module.scss';

interface CustomWindow extends Window {
  rjq: any;
}

declare const window: CustomWindow;

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    const initializePlayer = () => {
      const rjq = window.rjq;
      if (!rjq) return;

      rjq("#rjp-radiojar-player").radiojar("player", {
        streamName: "4qawu2xta2zuv",
        enableUpdates: true,
        defaultImage:
          "//www.radiojar.com/img/sample_images/Radio_Stations_Avatar_BLUE.png",
        autoplay: false,
      });

      rjq("#rjp-radiojar-player").off("rj-track-load-event");
      rjq("#rjp-radiojar-player").on(
        "rj-track-load-event",
        function (event: any, data: any) {
          updateInfo(data);
          if (data.title || data.artist) {
            rjq(".rjp-trackinfo-container").show();
            rjq("#trackInfo").html(`${data.artist} - "${data.title}"`);
          } else {
            rjq(".rjp-trackinfo-container").hide();
          }
        },
      );

      function updateInfo(data: any) {
        if (data.thumb) {
          rjq("#rj-cover").html(
            `<a href="#"><img src="${data.thumb}" alt="" title="" /></a>`,
          );
        } else {
          rjq("#rj-cover").html("");
        }
      }
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

  const trackInfoRef = useRef<any>(null);

  let trackInfo, artist, title;

  if (trackInfoRef.current?.textContent) {
    trackInfo = trackInfoRef.current.textContent.split(" - ");
    artist = trackInfo[0]?.trim();
    title = trackInfo[1]?.trim();
  }

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          // console.log('New content:', trackInfoRef.current?.textContent);
        }
      }
    });

    if (trackInfoRef.current) {
      observer.observe(trackInfoRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [trackInfoRef]);

  if (typeof window !== "undefined" && "mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title,
      artist: artist,
      album: "",
      artwork: [
        { src: "track-icon-96x96.png", sizes: "96x96", type: "image/png" },
        { src: "track-icon-128x128.png", sizes: "128x128", type: "image/png" },
        { src: "track-icon-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "track-icon-256x256.png", sizes: "256x256", type: "image/png" },
        { src: "track-icon-384x384.png", sizes: "384x384", type: "image/png" },
        { src: "track-icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
    });

    navigator.mediaSession.setActionHandler("play", function () {
      /* Code to handle play action */
    });
    navigator.mediaSession.setActionHandler("pause", function () {
      /* Code to handle pause action */
    });
    // Add other action handlers as needed
  }

  return (
    <section>
      <div className={styles.player}>
        <div className={styles.controls}>
          {/* <div className={styles.equalizer}>
            {Array.from({ length: 48 }).map((_, index) => (
              <span
                key={index}
                className={styles.bar}
                style={
                  {
                    '--i': index,
                    '--d': `${Math.random() * 1.2}s`,
                    '--h': `${18 + Math.random() * 35}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div> */}
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
                Artist - Song
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
