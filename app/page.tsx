import { GetServerSideProps } from 'next'
import React from 'react'
import 'react-alice-carousel/lib/alice-carousel.css';
import dynamic from 'next/dynamic';
import Image from 'next/image'


import styles from '@/styles/index.module.scss'
import stylesRes from '@/styles/reusable.module.scss'

import img1 from '../public/images/astronaut.jpg'
import img2 from '../public/images/beach.jpg'
import img3 from '../public/images/ocean.jpg'
import img4 from '../public/images/mountains.jpg'
import Link from 'next/link'
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from 'react-icons/ri';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await fetch('http://localhost:1337/api/header?[populate]=*');
    const data = await response.json();
    return { props: { data } };
  } catch (error) {
    console.error('Error:', error);
    return { props: { data: {} } };  // Return empty data prop on error
  }
}

const AliceCarousel = dynamic(
  () => import('react-alice-carousel'),
  { ssr: true }  // This line will disable server-side rendering
);

export default function Home({ data }: { data: any }) {

  const slides = [img1, img2, img3, img4, img2, img3, img1, img4]; // Add more images as needed
  return (
    <main className={styles.content}>
      {data && <div>{JSON.stringify(data)}</div>}
      {/* ---------- 
        ------ LATEST PODCAST SECTION 
        ---------- */}
      <section className={`${stylesRes.content_container} ${styles.content__featuredBox}`}>
        <div className={styles.content__featuredBox_header}>
          <h2>Featured</h2>
          <h5>Checkout the ltest featured selection, we picked for you</h5>
        </div>
        <div className={styles.content__featuredBox_wrapper}>
          <div className={styles.content__featuredBox_wrapper_left}>
            <div className={stylesRes.newsBig_box}>
              <Image src={img2} alt='test' />
              <span className={`${stylesRes.categoryTag} ${stylesRes.nasePrice}`}>NAŠE PRIČE</span>
              <div className={`${stylesRes.author_date}`}>
                <span className={`${stylesRes.author_date_newsDate}`}>ivander:</span>
                <span className={`${stylesRes.author_date_resident}`}>21.12.2023</span>
              </div>
              <h4 className={`${stylesRes.title}`}>Protraćeni životi irski: Tema za do 264 funte Sterlinga (300 evra po današnjem kursu)?</h4>
            </div>
          </div>
          <div className={styles.content__featuredBox_wrapper_right}>
            <div className={stylesRes.newsSmall_box}>
              <Image src={img1} alt='test' />
              <span className={`${stylesRes.categoryTag} ${stylesRes.razgovori}`}>RAZGOVORI</span>
              <div className={`${stylesRes.author_date}`}>
                <span className={`${stylesRes.author_date_newsDate}`}>ivander:</span>
                <span className={`${stylesRes.author_date_resident}`}>21.12.2023</span>
              </div>
              <p className={`${stylesRes.title}`}>Nije život jedna tegla ajvara</p>
            </div>
            <div className={stylesRes.newsSmall_box}>
              <Image src={img2} alt='test' />
              <span className={`${stylesRes.categoryTag} ${stylesRes.ritam}`}>RITAM</span>
              <div className={`${stylesRes.author_date}`}>
                <span className={`${stylesRes.author_date_newsDate}`}>ivander:</span>
                <span className={`${stylesRes.author_date_resident}`}>21.12.2023</span>
              </div>
              <p className={`${stylesRes.title}`}>Mali korak za muziku, veliki za domaću bluz scenu - pesma “Locked Down”</p>
            </div>
          </div>
        </div>
      </section>
      {/* ---------- 
        ------ LATEST PODCAST ARTICLES SECTION
         ---------- */}
      <section className={`${stylesRes.content_container} ${styles.content__podcastBox}`}>
        {/* <h2>Podcasts</h2> */}
        <div className={styles.content__podcastBox_header}>
          <h2 className={styles.content__podcastBox_header_title}>Podcasts</h2>
          <h5>Pregledajte selekciju najnovijih podcasta</h5>
          {/* <Link href='/podcast' className={styles.content__podcastBox_header_link}>
            <RiArrowRightDoubleFill />
            Svi Podcasti
          </Link> */}
        </div>
        <div className={styles.content__podcastBox_podcasts}>
          <Link href='/podcast' className={styles.content__podcastBox_podcasts_link}>
            <Image src={img1} alt='test' />
            <div className={styles.content__podcastBox_podcasts_link_tags}>
              <span>Playlist</span>
            </div>
            <p>Skubijev CITY POP SAT Ep24 | Sunradio.rs i dalje</p>
            <div className={styles.content__podcastBox_podcasts_link_author}>
              By: Rep Industrija
            </div>
          </Link>
          <Link href='/podcast' className={styles.content__podcastBox_podcasts_link}>
            <Image src={img2} alt='test' />
            <div className={styles.content__podcastBox_podcasts_link_tags}>
              <span>TalkShow</span><span>Playlist</span>
            </div>
            <p>neki naslov primer kao nesto, i jos neki drugi duyi malo naslov, i da dodamo i treci red</p>
            <div className={styles.content__podcastBox_podcasts_link_author}>
              Nesto
            </div>
          </Link>
          <Link href='/podcast' className={styles.content__podcastBox_podcasts_link}>
            <Image src={img3} alt='test' />
            <p>neki naslov primer kao nesto</p>
            <div className={styles.content__podcastBox_podcasts_link_author}>
              Nesto
            </div>
          </Link>
          <Link href='/podcast' className={styles.content__podcastBox_podcasts_link}>
            <Image src={img3} alt='test' />
            <p>neki naslov primer kao nesto</p>
            <div className={styles.content__podcastBox_podcasts_link_author}>
              Nesto
            </div>
          </Link>
          <Link href='/podcast' className={styles.content__podcastBox_podcasts_link}>
            <Image src={img4} alt='test' />
            <p>Preslicavanje: Novi podcast i revizija 2023</p>
            <div className={styles.content__podcastBox_podcasts_link_author}>
              Nesto
            </div>
          </Link>
          <Link href='/podcast' className={styles.content__podcastBox_podcasts_link}>
            <Image src={img3} alt='test' />
            <p>neki naslov primer kao nesto</p>
            <div className={styles.content__podcastBox_podcasts_link_author}>
              Nesto
            </div>
          </Link>
          <Link href='/podcast' className={styles.content__podcastBox_podcasts_link}>
            <Image src={img4} alt='test' />
            <p>Preslicavanje: Novi podcast i revizija 2023</p>
            <div className={styles.content__podcastBox_podcasts_link_author}>
              Nesto
            </div>
          </Link>
          <Link href='/podcast' className={styles.content__podcastBox_podcasts_link}>
            <Image src={img4} alt='test' />
            <p>Preslicavanje: Novi podcast i revizija 2023</p>
            <div className={styles.content__podcastBox_podcasts_link_author}>
              Nesto
            </div>
          </Link>
        </div>
        {/* <Link href='/podcast' className={styles.content__podcastBox_podcasts_linkLead}>Svi Podcasti</Link> */}
        {/* ARTICLES */}
        <div className={styles.content__podcastBox_header}>
          <h2 className={styles.content__podcastBox_header_title}>Articles</h2>
          <h5>Pregledajte selekciju odabranih tekstova redakcije</h5>
          {/* <Link href='/podcast' className={styles.content__podcastBox_header_link}>
            <RiArrowRightDoubleFill />
            Svi Teksovi
          </Link> */}
        </div>
        <div className={styles.content__podcastBox_articles}>
          <Link href='/podcast' className={styles.content__podcastBox_articles_link}>
            <Image src={img4} alt='test' />
            <span className={styles.content__podcastBox_articles_link_category} style={{ backgroundColor: 'purple' }}>nesto</span>
            <div className={styles.content__podcastBox_articles_link_titles}>
              <h5>Protraćeni životi irski: Tema za do 264 funte Sterlinga (300 evra po današnjem kursu)?</h5>
              <p>Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u Iraca</p>
            </div>
          </Link>
          <Link href='/podcast' className={styles.content__podcastBox_articles_link}>
            <Image src={img1} alt='test' />
            <span className={styles.content__podcastBox_articles_link_category} style={{ backgroundColor: 'orange' }}>nesto</span>
            <div className={styles.content__podcastBox_articles_link_titles}>
              <h5>Protraćeni životi irski: Tema za do 264 funte Sterlinga (300 evra po današnjem kursu)?</h5>
              <p>Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u Iraca</p>
            </div>
          </Link>
          <Link href='/podcast' className={styles.content__podcastBox_articles_link}>
            <Image src={img3} alt='test' />
            <span className={styles.content__podcastBox_articles_link_category} style={{ backgroundColor: 'darkblue' }}>nesto</span>
            <div className={styles.content__podcastBox_articles_link_titles}>
              <h5>Protraćeni životi irski: Tema za do 264 funte Sterlinga (300 evra po današnjem kursu)?</h5>
              <p>Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u Iraca</p>
            </div>
          </Link>
          <Link href='/podcast' className={styles.content__podcastBox_articles_link}>
            <Image src={img4} alt='test' />
            <span className={styles.content__podcastBox_articles_link_category} style={{ backgroundColor: 'limegreen' }}>nesto</span>
            <div className={styles.content__podcastBox_articles_link_titles}>
              <h5>Protraćeni životi irski: Tema za do 264 funte Sterlinga (300 evra po današnjem kursu)?</h5>
              <p>Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u Iraca</p>
            </div>
          </Link>
          <Link href='/podcast' className={styles.content__podcastBox_articles_link}>
            <Image src={img2} alt='test' />
            <span className={styles.content__podcastBox_articles_link_category} style={{ backgroundColor: 'orange' }}>nesto</span>
            <div className={styles.content__podcastBox_articles_link_titles}>
              <h5>Protraćeni životi irski: Tema za do 264 funte Sterlinga (300 evra po današnjem kursu)?</h5>
              <p>Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u Iraca</p>
            </div>
          </Link>
          <Link href='/podcast' className={styles.content__podcastBox_articles_link}>
            <Image src={img1} alt='test' />
            <span className={styles.content__podcastBox_articles_link_category} style={{ backgroundColor: 'red' }}>nesto</span>
            <div className={styles.content__podcastBox_articles_link_titles}>
              <h5>Protraćeni životi irski: Tema za do 264 funte Sterlinga (300 evra po današnjem kursu)?</h5>
              <p>Elita vs Radništvo - Podeljeni grad Belfast i nacionalizam u Iraca</p>
            </div>
          </Link>
        </div>
        {/* <Link href='/podcast' className={styles.content__podcastBox_articles_linkLead}>Svi Tekstovi</Link> */}
      </section>
      {/* ---------- 
        ------ CALL TO ACTION - donations section
         ---------- */}
      <section className={styles.content__donateContainer}>
        <div></div>
        <div className={styles.content__donateContainer_content}>
          <h3>PODRŽITE SUNCE - DA NASTAVI DA SIJA</h3>
          <p>
            Pozivamo Sunca zrake da podrže opstanak i rast našeg radija. Nemamo sponzore niti finansijere. Jedini od kojih hoćemo da zavisimo ste vi.
          </p>
          <Link href='/podrzi-sunce' className={styles.content__donateContainer_content_learnMoreButton}>Saznaj Više</Link>
          <Link href='https://www.paypal.com/paypalme/sunradiors' target='_blank' className={styles.content__donateContainer_content_ppButton}>PayPal</Link>
          <Link href='https://www.patreon.com/sunradio' target='_blank' className={styles.content__donateContainer_content_ptButton}>Patreon</Link>
        </div>
        <div className={styles.content__donateContainer_ctaContainer}>
        </div>
      </section>
      {/* ---------- 
        ------ LATEST RESIDENT featured content
         ---------- */}
      <section className={`${stylesRes.content_container} ${styles.content__residentsBox}`}>
        <h2>Popular Residents</h2>
        <div className={`${styles.slider}`}>
          <AliceCarousel
            autoPlay
            infinite
            mouseTracking
            touchTracking
            disableDotsControls
            autoPlayInterval={6000}
            responsive={{
              0: { items: 1 },
              600: { items: 2 },
              1024: { items: 3 },
            }}
            controlsStrategy="alternate"
            animationType="slide"
            animationDuration={2000}
            renderNextButton={() => <button className="custom-next-button"><RiArrowRightDoubleFill /></button>}
            renderPrevButton={() => <button className="custom-prev-button"><RiArrowLeftDoubleFill /></button>}
          >
            {/* {slides.map((slide, index) => (
              <div className='alice-carousel__stage-div' key={index}>
                <p className='alice-carousel__stage-r-name'>malo duze i ime i asd</p>
                <p className='alice-carousel__stage-r-desc'>opis kakav god hoces i kakav god neces, ponekad kratak ponekad dug</p>
                <p className='alice-carousel__stage-r-stat'>stat</p>
                <div className='alice-carousel__stage-imageDiv'>
                  <Image src={slide} alt='test' />
                </div>
              </div>
            ))} */}
          </AliceCarousel>
        </div>
      </section>
    </main >
  )
}
