"use client";

import { useState } from "react";

import styles from "@/styles/components/share-actions.module.scss";

export type ShareActionLabels = {
  share: string;
  copyLink: string;
  copied: string;
  copyError: string;
  facebook: string;
  x: string;
};

type ShareActionsProps = {
  url: string;
  title: string;
  text: string;
  labels: ShareActionLabels;
};

export const ShareActions = ({
  url,
  title,
  text,
  labels,
}: ShareActionsProps): React.ReactElement => {
  const [status, setStatus] = useState("");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus(labels.copied);
    } catch {
      setStatus(labels.copyError);
    }
  };

  const share = async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, text, url });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await copyLink();
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(title);

  return (
    <div className={styles.shareActions} role="group" aria-label={labels.share}>
      <button type="button" onClick={share}>
        {labels.share}
      </button>
      <button type="button" onClick={copyLink}>
        {labels.copyLink}
      </button>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {labels.facebook}
      </a>
      <a
        href={`https://x.com/intent/post?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {labels.x}
      </a>
      <span className={styles.shareActions__status} aria-live="polite">
        {status}
      </span>
    </div>
  );
};
