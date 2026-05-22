import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles/donate.module.scss';

import img2 from '../../public/images/beach.jpg';

export default function Donate(): React.ReactElement {
  return (
    <main className={styles.donatePage}>
      <section className={styles.donateHero}>
        <div className={styles.donateHero__image}>
          <Image src={img2} alt="Podržite Sunce" fill priority />
        </div>

        <div className={styles.donateHero__content}>
          <span>Support SunRadio</span>

          <h1>Zašto da podržite Sunce?</h1>

          <p>
            Sun Radio je slobodna internet radio stanica čija je misija
            stvaranje otvorenih formi umetničke, obrazovne i radosne prirode.
          </p>

          <div className={styles.donateHero__actions}>
            <Link href="https://www.paypal.com/paypalme/sunradiors" target="_blank">
              PayPal
            </Link>

            <Link href="https://www.patreon.com/sunradio" target="_blank">
              Patreon
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.donateContent}>
        <article className={styles.donateContent__main}>
          <h2>Sunce opstaje zahvaljujući zajednici</h2>

          <p>
            Godinama istrajavamo u izgradnji slobodnog i nezavisnog medija koji
            neguje kulturu za koju nema mesta u popularnim i komercijalnim
            sredstvima dezinformisanja.
          </p>

          <p>
            Naš radio ne emituje reklame. Nemamo sponzore niti finansijere. Ni
            od koga i ni od čega ne zavisimo. Sve što stvaramo je plod
            volonterskog rada članova naše slobodne redakcije.
          </p>

          <h3>Direktna donacija</h3>

          <div className={styles.donateContent__accounts}>
            <div>
              <span>Dinarski račun</span>
              <strong>000-0000000000000-00</strong>
            </div>

            <div>
              <span>Devizni račun</span>
              <strong>RS00 0000 0000 0000 0000 00</strong>
            </div>
          </div>
        </article>

        <aside className={styles.donateContent__side}>
          <h3>Kako vaša podrška pomaže?</h3>

          <ul>
            <li>Održavanje streaminga i servera</li>
            <li>Razvoj emisija, podcasta i tekstova</li>
            <li>Podrška nezavisnoj internet radio kulturi</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}