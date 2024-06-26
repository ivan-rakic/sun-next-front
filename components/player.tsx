"use client";
import 'react-awesome-slider/dist/styles.css';
import React, { useEffect } from 'react';
import Script from 'next/script';

import { RiPlayCircleLine, RiPauseCircleLine, RiVolumeUpLine, RiVolumeMuteLine } from "react-icons/ri";


export default function Player() {

  useEffect(() => {
    const rjq: any = (window as any).rjq;
    rjq('#rjp-radiojar-player').radiojar('player', {
      "streamName": "4qawu2xta2zuv",
      "enableUpdates": true,
      "defaultImage": "//www.radiojar.com/img/sample_images/Radio_Stations_Avatar_BLUE.png",
      "autoplay": false
    });

    rjq('#rjp-radiojar-player').off('rj-track-load-event');
    rjq('#rjp-radiojar-player').on('rj-track-load-event', function (event, data) {
      updateInfo(data);
      if (data.title != "" || data.artist != "") {
        rjq('.rjp-trackinfo-container').show();
        rjq('#trackInfo').html(data.artist + ' - "' + data.title + '"')
      } else {
        rjq('.rjp-trackinfo-container').hide();
      }
    });

    function updateInfo(data: any) {
      if (data.thumb) {
        rjq('#rj-cover').html('<a href="#"><img src="' + data.thumb + '" alt="" title="" /></a>')
      } else {
        rjq('#rj-cover').html('')
      }
    }
  }, []);

  // TODO
  // Track info is not updating when new track is playing

  const trackInfoRef = React.useRef<any>(null);

  let trackInfo, artist, title;

  if (trackInfoRef.current?.textContent) {
    trackInfo = trackInfoRef.current.textContent.split(' - ');
    artist = trackInfo[0]?.trim();
    title = trackInfo[1]?.trim();
  }

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          // console.log('New content:', trackInfoRef.current?.textContent);
        }
      }
    });

    if (trackInfoRef.current) {
      observer.observe(trackInfoRef.current, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [trackInfoRef]);

  if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title,
      artist: artist,
      album: "",
      artwork: [
        { src: 'track-icon-96x96.png', sizes: '96x96', type: 'image/png' },
        { src: 'track-icon-128x128.png', sizes: '128x128', type: 'image/png' },
        { src: 'track-icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'track-icon-256x256.png', sizes: '256x256', type: 'image/png' },
        { src: 'track-icon-384x384.png', sizes: '384x384', type: 'image/png' },
        { src: 'track-icon-512x512.png', sizes: '512x512', type: 'image/png' },
      ]
    });

    navigator.mediaSession.setActionHandler('play', function () { /* Code to handle play action */ });
    navigator.mediaSession.setActionHandler('pause', function () { /* Code to handle pause action */ });
    // Add other action handlers as needed
  };

  return (
    <main>
      <Script src="//www.radiojar.com/wrappers/api-plugins/v1/radiojar-min.js" strategy="beforeInteractive" />
      <div id="stickPlayer">
        <div className="stickPlayer__controls">
          <a href="javascript:;" className="jp-play" title="Play"><RiPlayCircleLine /></a>
          <a href="javascript:;" style={{ display: 'none' }} className="jp-pause" title="Pause"><RiPauseCircleLine /></a>
        </div>
        <div id="rj-player">
          {/* <div id="rj-cover">
            <img src="" />
          </div> */}
          <div className="rj-info">
            <div className="rjp-trackinfo-container">
              <h4 className="rjp-label">Now playing:</h4>
              <p ref={trackInfoRef} id="trackInfo" className="rjp-info">Artist - Song</p>
            </div>
            <div className="rjp-player-container">
              <div id="rjp-radiojar-player"></div>
              <div id="rj-player-controls" className="rj-player-controls">
                <div>
                  <div className="jp-controls">
                    <a href="javascript:;" style={{ display: 'block' }} className="jp-mute" title="Mute"><RiVolumeUpLine /></a>
                    <a href="javascript:;" style={{ display: 'none' }} className="jp-unmute" title="Unmute"><RiVolumeMuteLine /></a>
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
    </main >
  )
}
