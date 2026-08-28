import Link from 'next/link';

import styles from '@/styles/components/donate-banner.module.scss';

export const DonateContainer = (): React.ReactElement => {
  return (
    <section className={styles.donateBanner}>
      <div className={styles.donateBanner__content}>
        <div>
          <span>Support SunRadio</span>

          <h3>PODRŽITE SUNCE — DA NASTAVI DA SIJA</h3>

          <p>
            Pozivamo Sunca zrake da podrže opstanak i rast našeg radija. Nemamo
            sponzore niti finansijere. Jedini od kojih hoćemo da zavisimo ste vi.
          </p>
        </div>

        <div className={styles.donateBanner__actions}>
          <Link href="/podrzi-sunce">Saznaj Više</Link>

          <Link href="https://www.paypal.com/paypalme/sunradiors" target="_blank">
            PayPal
          </Link>

          <Link href="https://www.patreon.com/sunradio" target="_blank">
            Patreon
          </Link>
        </div>
      </div>
    </section>
  );
};