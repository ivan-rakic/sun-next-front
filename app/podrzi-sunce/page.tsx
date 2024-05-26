import Image from 'next/image'
import styles from '@/styles/donate.module.scss'
import stylesRes from '@/styles/reusable.module.scss'

import img1 from '../../public/images/astronaut.jpg'
import img2 from '../../public/images/beach.jpg'
import img3 from '../../public/images/ocean.jpg'
import img4 from '../../public/images/mountains.jpg'

export default function Donate() {
  return (
    <main className={stylesRes.content}>
      <div className={`${stylesRes.content_container} ${styles.donate}`}>
        <section className={`${styles.donate_main} ${stylesRes.content_container_main}`}>
          <article>
            <header>
              <Image src={img2} alt='test' />
              <div>
                <h2>Zašto da podržite Sunce?</h2>
                <span>Sun Radio je slobodna internet radio stanica čija je misija stvaranje otvorenih formi umetničke, obrazovne i radosne prirode.</span>
                <span>Sun Radio je slobodna internet radio stanica čija je misija stvaranje otvorenih formi umetničke, obrazovne i radosne prirode.</span>
                <span>Sun Radio je slobodna internet radio stanica čija je misija stvaranje otvorenih formi umetničke, obrazovne i radosne prirode.</span>
                <span>Sun Radio je slobodna internet radio stanica čija je misija stvaranje otvorenih formi umetničke, obrazovne i radosne prirode.</span>
              </div>
            </header>
            <br />
            Godinama istrajavamo u izgradnji slobodnog i nezavisnog medija koji neguje kulturu za koju nema mesta u popularnim i komercijalnim sredstvima dezinformisanja. Naš radio ne emituje reklame. Nemamo sponzore niti finansijere. Ni od koga i ni od čega ne zavisimo. Sve što stvaramo je plod volonterskog rada članova naše slobodne redakcije.
            <h3>Zašto da podržite Sunce?</h3>
            <div className={styles.donate_main_ctaDiv}>
              <button className={stylesRes.standard_button}>Podrži Sunce</button>
              <button className={stylesRes.standard_button}>Podrži Sunce 2</button>
            </div>
            <h4>Direktna Donacija - dinarski racun</h4>
            <h4>Direktna Donacija - devizni racun</h4>
          </article>
        </section>
        <section className={`${stylesRes.content_container_promo} ${styles.donate_promo}`}>
          dsdsdddddddd
        </section>
      </div>
    </main>
  )
}
