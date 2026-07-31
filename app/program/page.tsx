"use client";

import { useMemo, useState } from "react";
import styles from "@/styles/program.module.scss";
import { programDays } from "@/constants";

const weekDayMap = [
  "Nedelja",
  "Ponedeljak",
  "Utorak",
  "Sreda",
  "Četvrtak",
  "Petak",
  "Subota",
];


export default function Program() {
  const currentDayIndex = useMemo(() => {
    const currentDayName = weekDayMap[new Date().getDay()];

    const foundIndex = programDays.findIndex(
      (day) => day.day === currentDayName,
    );

    return foundIndex >= 0 ? foundIndex : 0;
  }, []);

  const [selectedDayIndex, setSelectedDayIndex] =
    useState(currentDayIndex);

  const selectedDay = programDays[selectedDayIndex];

  const firstHalfShows = selectedDay.shows.filter((show) => {
    const hour = Number(show.time.split(":")[0]);

    return hour < 12;
  });

  const secondHalfShows = selectedDay.shows.filter((show) => {
    const hour = Number(show.time.split(":")[0]);

    return hour >= 12;
  });

  const renderShow = (show: (typeof selectedDay.shows)[number]) => (
    <div key={`${show.time}-${show.title}`} className={styles.programShow}>
      <div className={styles.programShow__time}>{show.time}</div>

      <div className={styles.programShow__content}>
        {show.isResident && show.slug ? (
          <a href={`/resident/${show.slug}`}>{show.title}</a>
        ) : (
          <h2>{show.title}</h2>
        )}

        <p>{show.description}</p>
      </div>
    </div>
  );

  return (
    <main className={styles.programPage}>
      <section className={styles.programHeader}>
        <span>Program</span>
        <h1>Raspored emitovanja</h1>
      </section>

      <section className={styles.programTabs}>
        {programDays.map((programDay, index) => (
          <button
            key={programDay.day}
            type="button"
            className={`${styles.programTab} ${selectedDayIndex === index ? styles.programTabActive : ""
              }`}
            onClick={() => setSelectedDayIndex(index)}
          >
            {programDay.day}
          </button>
        ))}
      </section>

      <section className={styles.programTable}>
        <div className={styles.programColumn}>
          <h3>Morning & Daytime</h3>

          {firstHalfShows.length > 0 ? (
            firstHalfShows.map(renderShow)
          ) : (
            <p className={styles.programEmpty}>Nema programa za ovaj period.</p>
          )}
        </div>

        <div className={styles.programColumn}>
          <h3>Evening & Night</h3>

          {secondHalfShows.length > 0 ? (
            secondHalfShows.map(renderShow)
          ) : (
            <p className={styles.programEmpty}>Nema programa za ovaj period.</p>
          )}
        </div>
      </section>
    </main>
  );
}