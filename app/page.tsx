import Image from 'next/image'
import styles from '@/styles/index.module.scss'
import stylesRes from '@/styles/reusable.module.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'

import img1 from '../public/images/astronaut.jpg'
import img2 from '../public/images/beach.jpg'
import img3 from '../public/images/ocean.jpg'
import img4 from '../public/images/mountains.jpg'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.content}>
      {/* ---------- 
        ------ LATEST PODCAST SECTION 
        ---------- */}
      <section className={styles.content__featuredBox}>
        <h2>SunRadio Predstavlja - lista najnovije okacenih vesti</h2>
        <div className={styles.content__featuredBox_left}>
          <div className={stylesRes.newsBig_box}>
            <Image src={img2} alt='test' />
            <div>
              <label>Podcast</label>
              <label>Jazz</label>
              <label>Tag3</label>
              <label>Featured</label>
              <label>Tag3</label>
              <label>Featured</label>
              <label>Tag3</label>
              <label>Featured</label>
            </div>
            <p >neki naslov primer kao nesto</p>
          </div>
        </div>
        <div className={styles.content__featuredBox_right}>
          <div className={stylesRes.newsSmall_box}>
            <Image src={img1} alt='test' />
            <div >
              <label>Podcast</label>
              <label>Jazz</label>
              <label>Tag3</label>
              <label>Featured</label>
              <label>Featured</label>
            </div>
            <p >neki naslov primer kao nesto</p>
          </div>
          <div className={stylesRes.newsSmall_box}>
            <Image src={img2} alt='test' />
            <div >
              <label>Podcast</label>
              <label>Jazz</label>
              <label>Tag3</label>
              <label>Featured</label>
            </div>
            <p >neki naslov primer kao nesto</p>
          </div>
        </div>
      </section>
      {/* ---------- 
        ------ LATEST PODCAST ARTICLES SECTION
         ---------- */}
      <section className={styles.content__podcastBox}>
        <h2>SunRadio Predstavlja - lista najnovije okacenih podcasta</h2>
        <div className={stylesRes.podcastBox}>
          <div>
            <label>Podcast</label>
            <label>Jazz</label>
            <label>Tag3</label>
            <label>Featured</label>
          </div>
          <Image src={img3} alt='test' />
          <p>neki naslov primer kao nesto</p>
        </div>
        <div className={stylesRes.podcastBox}>
          <div>
            <label>Podcast</label>
            <label>Jazz</label>
            <label>Tag3</label>
            <label>Featured</label>
          </div>
          <Image src={img1} alt='test' />
          <p>neki naslov primer kao nesto</p>
        </div>
        <div className={stylesRes.podcastBox}>
          <div>
            <label>Podcast</label>
            <label>Jazz</label>
            <label>Tag3</label>
            <label>Featured</label>
          </div>
          <Image src={img2} alt='test' />
          <p>neki naslov primer kao nesto</p>
        </div>
        <div className={stylesRes.podcastBox}>
          <div>
            <label>Podcast</label>
            <label>Jazz</label>
            <label>Tag3</label>
            <label>Featured</label>
          </div>
          <Image src={img3} alt='test' />
          <p>neki naslov primer kao nesto</p>
        </div>
        <div className={stylesRes.podcastBox}>
          <div>
            <label>Podcast</label>
            <label>Jazz</label>
            <label>Tag3</label>
            <label>Featured</label>
          </div>
          <Image src={img4} alt='test' />
          <p>neki naslov primer kao nesto</p>
        </div>
        <div className={stylesRes.podcastBox}>
          <div>
            <label>Podcast</label>
            <label>Jazz</label>
            <label>Tag3</label>
            <label>Featured</label>
          </div>
          <Image src={img2} alt='test' />
          <p>neki naslov primer kao nesto</p>
        </div>
        <div className={stylesRes.podcastBox}>
          <div>
            <label>Podcast</label>
            <label>Jazz</label>
            <label>Tag3</label>
            <label>Featured</label>
          </div>
          <Image src={img1} alt='test' />
          <p>neki naslov primer kao nesto</p>
        </div>
        <div className={stylesRes.podcastBox}>
          <div>
            <label>Podcast</label>
            <label>Jazz</label>
            <label>Tag3</label>
            <label>Featured</label>
          </div>
          <Image src={img4} alt='test' />
          <p>neki naslov primer kao nesto</p>
        </div>
        <div className={stylesRes.podcastBox}>
          <div>
            <label>Podcast</label>
            <label>Jazz</label>
            <label>Tag3</label>
            <label>Featured</label>
          </div>
          <Image src={img3} alt='test' />
          <p>neki naslov primer kao nesto</p>
        </div>
      </section>
      {/* ---------- 
        ------ CALL TO ACTION - donations section
         ---------- */}
      <section className={styles.content__donateBox}>
        <div className={stylesRes.donateBox}>
          <h3>PODRŽITE SUNCE - DA NASTAVI DA SIJA</h3>
          <p>
            Pozivamo Sunca zrake da podrže opstanak i rast našeg radija. Nemamo sponzore niti finansijere. Jedini od kojih hoćemo da zavisimo ste vi.
          </p>
          <Link href='/podrzi-sunce'>Podrži Sunce</Link>
        </div>
      </section>
      {/* ---------- 
        ------ LATEST RESIDENT featured content
         ---------- */}
      <section className={styles.content__residentsBox}>
        <h2>Popular Residents</h2>

      </section>
      {/* ---------- 
        ------ FRIENDS OF SUNRADIO - list of friends etc
         ---------- */}
      <section className={styles.content__friendsBox}>
        <p>Popular Residents</p>
        <div className={stylesRes.friendsBox}>
          <div className={stylesRes.friendsBox_box}>
            <Link title="Omladinski kreativni centar OKCe" href="https://www.facebook.com/OKCe.NS" target="_blank">
              <img src="assets/prijatelji/okce.png" alt="" title="Omladinski kreativni centar OKCe" />
              <h3>Omladinski kreativni centar OKCe</h3>
            </Link>
          </div>
          <div className={stylesRes.friendsBox_box}>
            <Link title="Reggae Hr" href="https://www.reggaehr.org/" target="_blank"> <img src="assets/prijatelji/reggaehr.png"
              alt="" title="Reggae Hr" />
              <h3>Reggae Hr</h3>
            </Link>
          </div>
          <div className={stylesRes.friendsBox_box}>
            <Link title="Šok Zadruga" href="https://sokzadruga.com/" target="_blank">
              <img src="assets/prijatelji/sokzadruga.png" alt="" title="Šok Zadruga" />
              <h3>Šok Zadruga</h3>
            </Link>
          </div>
          <div className={stylesRes.friendsBox_box}>
            <Link title="Zadužbina Milana Mladenovića" href="https://www.milanmladenovic.com/" target="_blank">
              <img src="assets/prijatelji/zaduzbinaMM.jpg" alt="" title="Zadužbina Milana Mladenovića" />
              <h3>Zadužbina Milana Mladenovića</h3>
            </Link>
          </div>
        </div>
      </section>
    </main >
  )
}
