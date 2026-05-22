'use client';

import { useEffect, useState } from 'react';
import {
  RiPauseCircleLine,
  RiPlayCircleLine,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from 'react-icons/ri';

import styles from '@/styles/sticky-player.module.scss';

export const StickyPlayer = (): React.ReactElement => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackInfo, setTrackInfo] = useState('Artist - Song');
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const trackInfoElement = document.querySelector('#trackInfo');

    if (!trackInfoElement) return;

    const updateTrackInfo = (): void => {
      const nextTrackInfo = trackInfoElement.textContent?.trim();

      if (nextTrackInfo) {
        setTrackInfo(nextTrackInfo);
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

  const handlePlay = (): void => {
    document.querySelector<HTMLButtonElement>('.jp-play')?.click();
    setIsPlaying(true);
  };

  const handlePause = (): void => {
    document.querySelector<HTMLButtonElement>('.jp-pause')?.click();
    setIsPlaying(false);
  };

  const handleMute = (): void => {
    document
      .querySelector<HTMLButtonElement>(isMuted ? '.jp-unmute' : '.jp-mute')
      ?.click();

    setIsMuted((prev) => !prev);
  };

  const handleVolumeClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ): void => {
    const realVolumeBar =
      document.querySelector<HTMLElement>('#rj-player .jp-volume-bar');

    if (!realVolumeBar) return;

    const stickyRect = event.currentTarget.getBoundingClientRect();

    const percentage = Math.min(
      Math.max((event.clientX - stickyRect.left) / stickyRect.width, 0),
      1,
    );

    const realRect = realVolumeBar.getBoundingClientRect();

    realVolumeBar.dispatchEvent(
      new MouseEvent('click', {
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
      className={`${styles.stickyPlayer} ${isVisible ? styles.stickyPlayerVisible : ''
        }`}
    >
      <div className={styles.stickyPlayer__inner}>
        <div className={styles.stickyPlayer__controls}>
          <div className={styles.stickyPlayer__roto} />

          <button
            type="button"
            title={isPlaying ? 'Pause' : 'Play'}
            className={styles.stickyPlayer__playButton}
            onClick={isPlaying ? handlePause : handlePlay}
          >
            {isPlaying ? <RiPauseCircleLine /> : <RiPlayCircleLine />}
          </button>
        </div>

        <div className={styles.stickyPlayer__track}>
          <span>NOW PLAYING</span>
          <p>{trackInfo}</p>
        </div>

        <div className={styles.stickyPlayer__volume}>
          <button
            type="button"
            title={isMuted ? 'Unmute' : 'Mute'}
            className={styles.stickyPlayer__soundButton}
            onClick={handleMute}
          >
            {isMuted ? <RiVolumeMuteLine /> : <RiVolumeUpLine />}
          </button>

          <div
            role="slider"
            tabIndex={0}
            aria-label="Volume"
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

        <div className={styles.stickyPlayer__live}>LIVE</div>
      </div>
    </div>
  );
};