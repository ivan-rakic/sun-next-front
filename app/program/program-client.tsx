"use client";

import Link from "next/link";
import { useState } from "react";

import { PageHeader } from "@/components/page-header";
import type { Locale } from "@/lib/i18n/config";
import type { FrontendDictionary } from "@/lib/i18n/dictionaries";
import type { ProgramDay } from "@/types/content";
import { localizedPath } from "@/lib/i18n/paths";
import styles from "@/styles/pages/program.module.scss";

type ProgramClientProps = {
  locale: Locale;
  dictionary: FrontendDictionary["program"];
  pageCopy: FrontendDictionary["seo"]["pages"]["program"];
  eyebrow: string;
  title: string;
  description: string;
  programDays: ProgramDay[];
};

export const ProgramClient = ({
  locale,
  dictionary,
  pageCopy,
  eyebrow,
  title,
  description,
  programDays,
}: ProgramClientProps): React.ReactElement => {
  const currentDayIndex = (new Date().getDay() + 6) % 7;
  const [selectedDayIndex, setSelectedDayIndex] = useState(currentDayIndex);
  const selectedDay = programDays[selectedDayIndex];
  const firstHalfShows = selectedDay.shows.filter(
    (show) => Number(show.time.split(":")[0]) < 12,
  );
  const secondHalfShows = selectedDay.shows.filter(
    (show) => Number(show.time.split(":")[0]) >= 12,
  );

  const renderShow = (show: (typeof selectedDay.shows)[number]) => (
    <div key={`${show.time}-${show.title}`} className={styles.programShow}>
      <div className={styles.programShow__time}>{show.time}</div>
      <div className={styles.programShow__content}>
        {show.isResident && show.slug ? (
          <Link href={localizedPath(locale, `/residents/${show.slug}`)}>
            {show.title}
          </Link>
        ) : (
          <h2>{show.title}</h2>
        )}
        <p>{show.description}</p>
      </div>
    </div>
  );

  return (
    <main className={styles.programPage}>
      <PageHeader
        eyebrow={eyebrow}
        title={title || pageCopy.title}
        description={description || pageCopy.description}
      />
      <section className={styles.programTabs}>
        {programDays.map((programDay, index) => (
          <button
            key={programDay.dayOfWeek}
            type="button"
            className={`${styles.programTab} ${selectedDayIndex === index ? styles.programTabActive : ""}`}
            onClick={() => setSelectedDayIndex(index)}
          >
            {dictionary.weekdays[index]}
          </button>
        ))}
      </section>
      <section className={styles.programTable}>
        <div className={styles.programColumn}>
          <h3>{dictionary.morningAndDaytime}</h3>
          {firstHalfShows.length > 0 ? (
            firstHalfShows.map(renderShow)
          ) : (
            <p className={styles.programEmpty}>{dictionary.empty}</p>
          )}
        </div>
        <div className={styles.programColumn}>
          <h3>{dictionary.eveningAndNight}</h3>
          {secondHalfShows.length > 0 ? (
            secondHalfShows.map(renderShow)
          ) : (
            <p className={styles.programEmpty}>{dictionary.empty}</p>
          )}
        </div>
      </section>
    </main>
  );
};
