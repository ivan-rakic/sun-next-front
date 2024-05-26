import Image from 'next/image'
import styles from '@/styles/about.module.scss'
import stylesRes from '@/styles/reusable.module.scss'

import { SiFacebook, SiInstagram, SiMixcloud, SiSoundcloud, SiTwitter, SiYoutube } from 'react-icons/si'

import img1 from '../../public/images/astronaut.jpg'
import img2 from '../../public/images/beach.jpg'
import img3 from '../../public/images/ocean.jpg'
import img4 from '../../public/images/mountains.jpg'


export default function About() {
  return (
    <main className={styles.content}>
      {/* ---- REDAKCIJA --------- */}
      <section className={`${styles.container} ${styles.content__redactionBox}`}>
        <h2>redAkcija</h2>
        <div className={styles.content__redactionBox_redactionContainer} >
          <div className={styles.content__redactionBox_redactionContainer_entity} itemScope itemType="http://schema.org/Person">
            <Image src={img1} alt='test' itemProp="image" />
            <div>
              <h4 itemProp="name">Bojan Vucicevic</h4>
              <p itemProp="jobTitle">Podcast Host</p>
              <div itemProp="sameAs" itemScope itemType="http://schema.org/WebPage">
                <a itemProp="url" href="http://www.facebook.com/person"><SiFacebook /></a>
                <a itemProp="url" href="http://www.twitter.com/person"><SiInstagram /></a>
              </div>
            </div>
          </div>
          <div className={styles.content__redactionBox_redactionContainer_entity} itemScope itemType="http://schema.org/Person">
            <Image src={img1} alt='test' itemProp="image" />
            <div>
              <h4 itemProp="name">Bojan Vucicevic</h4>
              <p itemProp="jobTitle">Podcast Host</p>
              <div itemProp="sameAs" itemScope itemType="http://schema.org/WebPage">
                <a itemProp="url" href="http://www.facebook.com/person"><SiFacebook /></a>
                <a itemProp="url" href="http://www.twitter.com/person"><SiInstagram /></a>
              </div>
            </div>
          </div>
          <div className={styles.content__redactionBox_redactionContainer_entity} itemScope itemType="http://schema.org/Person">
            <Image src={img1} alt='test' itemProp="image" />
            <div>
              <h4 itemProp="name">Vojislav Killo Killo Malešev</h4>
              <p itemProp="jobTitle">Podcast Host</p>
              <div itemProp="sameAs" itemScope itemType="http://schema.org/WebPage">
                <a itemProp="url" href="http://www.facebook.com/person"><SiFacebook /></a>
                <a itemProp="url" href="http://www.twitter.com/person"><SiInstagram /></a>
              </div>
            </div>
          </div>
          <div className={styles.content__redactionBox_redactionContainer_entity} itemScope itemType="http://schema.org/Person">
            <Image src={img1} alt='test' itemProp="image" />
            <div>
              <h4 itemProp="name">Bojan Vucicevic</h4>
              <p itemProp="jobTitle">Podcast Host</p>
              <div itemProp="sameAs" itemScope itemType="http://schema.org/WebPage">
                <a itemProp="url" href="http://www.facebook.com/person"><SiFacebook /></a>
                <a itemProp="url" href="http://www.twitter.com/person"><SiInstagram /></a>
              </div>
            </div>
          </div>
          <div className={styles.content__redactionBox_redactionContainer_entity} itemScope itemType="http://schema.org/Person">
            <Image src={img1} alt='test' itemProp="image" />
            <div>
              <h4 itemProp="name">Bojan Vucicevic</h4>
              <p itemProp="jobTitle">Podcast Host</p>
              <div itemProp="sameAs" itemScope itemType="http://schema.org/WebPage">
                <a itemProp="url" href="http://www.facebook.com/person"><SiFacebook /></a>
                <a itemProp="url" href="http://www.twitter.com/person"><SiInstagram /></a>
              </div>
            </div>
          </div>
          <div className={styles.content__redactionBox_redactionContainer_entity} itemScope itemType="http://schema.org/Person">
            <Image src={img1} alt='test' itemProp="image" />
            <div>
              <h4 itemProp="name">Bojan Vucicevic</h4>
              <p itemProp="jobTitle">Podcast Host</p>
              <div itemProp="sameAs" itemScope itemType="http://schema.org/WebPage">
                <a itemProp="url" href="http://www.facebook.com/person"><SiFacebook /></a>
                <a itemProp="url" href="http://www.twitter.com/person"><SiInstagram /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ---- REDAKCIJA --------- */}
      <section className={`${styles.container} ${styles.content__redactionBox}`}>
        <h2>Na Suncu svoje autorske sadržaje redovno emituju još:</h2>
      </section>
    </main>
  )
}
