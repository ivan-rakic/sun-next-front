import Image from 'next/image'
import styles from '../styles/footer.module.scss'
import stylesRes from '@/styles/reusable.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <h4 className={styles.footer_title_about}>ABOUT</h4>
        <p>Sun Radio je slobodna internet radio stanica čija je misija stvaranje otvorenih formi umetničke, obrazovne i zabavne prirode. Alternativni javni servis za svu decu Sunca.</p>
      </section>
      <section>
        <h4 className={styles.footer_title_contact}>CONTACT</h4>
        <p>
          Kontaktirajte nas:

          redakcija.sun@gmail.com
          Support the Sun:

          Donate - More Info
        </p>
      </section>
      <section>
        <h4 className={styles.footer_title_tunein}>TUNE IN</h4>
      </section>
      <section>
        <h4 className={styles.footer_title_networks}>NETWORKS</h4>
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
