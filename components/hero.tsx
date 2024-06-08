import styles from "../styles/hero.module.scss";
import Slider from "./slider";
import Player from "./player";
import {cn} from "@/lib/utils";

export default function Hero() {
  return (
    <div className={styles.hero__container}>
      <span className={styles.span_subMenu}>Podcast / Articles / Featured</span>
      <section className={cn(styles.hero,'relative flex justify-center items-center flex-col lg:flex-row overflow-hidden h-[750px] lg:h-[500px]')}>
        <div className={styles.hero__player}>
          <Player />
        </div>
        <div className={styles.hero__slider}>
          <Slider />
        </div>
      </section>
      <span className={styles.span_highlight}></span>
    </div>
  );
}
