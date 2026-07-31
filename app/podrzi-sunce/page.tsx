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
      <section className={styles.donationInfo}>
        <h2>Direktnom donacijom</h2>

        <div className={styles.donationCards}>
          <div className={styles.donationCard}>
            <h3>Dinarski račun (RSD)</h3>

            <p>
              <strong>Broj računa:</strong>
              <br />
              xxx - xxxxxx xxxxxx - xxxxxx
            </p>

            <p>
              <strong>Svrha uplate:</strong>
              <br />
              Donacija za Sunradio.rs
            </p>

            <p>
              <strong>Primalac:</strong>
              <br />
              Udruženje građana Slobodna Akcija
              <br />
              Street address, city
            </p>
          </div>

          <div className={styles.donationCard}>
            <h3>Devizni račun (EUR)</h3>

            <p>
              <strong>Broj računa:</strong>
              <br />
              xxx - xxxxxx xxxxxx - xxxxxx
            </p>

            <p>
              <strong>SWIFT CODE:</strong>
              <br />
              OTPVRS22
            </p>

            <p>
              <strong>IBAN / ACCOUNT NUMBER:</strong>
              <br />
              RS xxxx xxx x xx xx xxxxxx x x
            </p>

            <p>
              <strong>56A: Intermediary</strong>
              <br />
              COMMERZBANK AG, FRANKFURT AM MAIN
              <br />
              SWIFT CODE: xxxxxx
            </p>

            <p>
              <strong>57A: Account with institution</strong>
              <br />
              OTP BANKA SRBIJA A.D.
              <br />
              SWIFT CODE: xxxxxx
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}