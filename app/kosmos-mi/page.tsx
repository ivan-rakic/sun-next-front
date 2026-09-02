import Image, { StaticImageData } from 'next/image';
import { SiFacebook, SiInstagram } from 'react-icons/si';

import { PageHeader } from '@/components/page-header';
import { ContentRenderer } from '@/components/content/content-renderer';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { getRequestLocale } from '@/lib/i18n/locale';
import styles from '@/styles/pages/about.module.scss';
import type { ContentBlock } from '@/types/content-blocks';

import img1 from '../../public/images/astronaut.jpg';
import img2 from '../../public/images/mountains.jpg';

type RedactionMember = {
  name: string;
  role: string;
  image: StaticImageData;
};

const members: RedactionMember[] = [
  { name: 'FirstName Lastname', role: 'Radio Editor', image: img1 },
  { name: 'FirstName Lastname', role: 'Podcast Host', image: img2 },
  { name: 'Vojislav Killo Killo Malešev', role: 'Social Media Manager', image: img1 },
  { name: 'FirstName Lastname', role: 'Podcast Host', image: img1 },
  { name: 'FirstName Lastname', role: 'Podcast Host', image: img2 },
  { name: 'FirstName Lastname', role: 'Podcast Host', image: img1 },
];

type AboutProps = {
  blocks?: ContentBlock[];
};

export default async function About({ blocks }: AboutProps): Promise<React.ReactElement> {
  const locale = await getRequestLocale();
  const dictionary = getDictionary(locale);

  return (
    <main className={styles.aboutPage}>
      <PageHeader
        eyebrow="Kosmos Mi"
        title="Redakcija"
        description="Ljudi koji stvaraju i održavaju SunRadio zajednicu."
      />

      {blocks ? <ContentRenderer blocks={blocks} dictionary={dictionary.content} /> : null}

      <section className={styles.aboutSection}>
        <div className={styles.redactionGrid}>
          {members.map((member) => (
            <article
              key={`${member.name}-${member.role}`}
              className={styles.redactionCard}
              itemScope
              itemType="http://schema.org/Person"
            >
              <div className={styles.redactionCard__image}>
                <Image src={member.image} alt={member.name} itemProp="image" fill />
              </div>

              <div className={styles.redactionCard__content}>
                <h2 itemProp="name">{member.name}</h2>
                <p itemProp="jobTitle">{member.role}</p>

                <div className={styles.redactionCard__socials}>
                  <a itemProp="url" href="http://www.facebook.com/person">
                    <SiFacebook />
                  </a>
                  <a itemProp="url" href="http://www.instagram.com/person">
                    <SiInstagram />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutSection__header}>
          <h2>Na Suncu svoje autorske sadržaje redovno emituju još</h2>
        </div>
      </section>
    </main>
  );
}