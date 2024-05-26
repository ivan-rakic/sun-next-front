import Image from 'next/image'
import styles from '@/styles/podcast.module.scss'
import stylesRes from '@/styles/reusable.module.scss'

import img4 from '../../public/images/mountains.jpg'
import img1 from '../../public/images/astronaut.jpg'

export default function Podcast() {
  return (
    <main className={`${stylesRes.content_container} ${styles.podcast_page}`} >
      <section className={`${styles.podcast_page__details}`}>
        <article>
          <Image src={img4} alt="Dečije igre" />
          <header>
            <h2>Dečije igre</h2>
            <time dateTime="2022-03-01">March 1, 2022</time>
            <p>Tags: <span>Show</span>, <span>Mix</span>, <span>Talkshow</span></p>
          </header>
          <iframe width="100%" height="60" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2Fsunradiosan%2Fde%C4%8Dije-igre-emisija-4-sunradiors%2F" frameborder="0" ></iframe>
        </article>


      </section>
      <section className={`${styles.podcast_page__featured}`}>
        <h2>Featured</h2>

      </section>
    </ main>
  )
}
