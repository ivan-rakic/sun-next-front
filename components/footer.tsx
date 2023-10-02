import Image from 'next/image'
import styles from '../styles/footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section>SUN RADIO
        <p>Sun Radio je slobodna internet radio stanica čija je misija stvaranje otvorenih formi umetničke, obrazovne i zabavne prirode. Alternativni javni servis za svu decu Sunca.</p>
      </section>
      <section>CONTACT
        <p>
          Kontaktirajte nas:

          redakcija.sun@gmail.com
          Support the Sun:

          Donate - More Info
        </p>
      </section>
      <section>TUNE IN</section>
      <section>SOCIAL
        <p>
          Facebook
          Instagram
          MixCloud
          SoundCloud
          Twitter
          Youtube
        </p>
      </section>
      <h3>Copyright © Sun Radio 2017 - 2023</h3>
    </footer>
  )
}
