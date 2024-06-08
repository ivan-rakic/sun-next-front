import styles from "@/styles/index.module.scss";
import Link from "next/link";

export const DonateContainer = () => {
    return (
        <section className={styles.content__donateContainer}>
            <div className={styles.content__donateContainer_content}>
                <h3>PODRŽITE SUNCE - DA NASTAVI DA SIJA</h3>
                <p>
                    Pozivamo Sunca zrake da podrže opstanak i rast našeg radija. Nemamo
                    sponzore niti finansijere. Jedini od kojih hoćemo da zavisimo ste
                    vi.
                </p>
                <Link
                    href="/podrzi-sunce"
                    className={styles.content__donateContainer_content_learnMoreButton}
                >
                    Saznaj Više
                </Link>
                <Link
                    href="https://www.paypal.com/paypalme/sunradiors"
                    target="_blank"
                    className={styles.content__donateContainer_content_ppButton}
                >
                    PayPal
                </Link>
                <Link
                    href="https://www.patreon.com/sunradio"
                    target="_blank"
                    className={styles.content__donateContainer_content_ptButton}
                >
                    Patreon
                </Link>
            </div>
            <div className={styles.content__donateContainer_ctaContainer}></div>
        </section>
    );
};
