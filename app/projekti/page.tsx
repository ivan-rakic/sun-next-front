import { PageHeader } from "@/components/page-header";
import styles from "@/styles/pages/podcasts.module.scss";

export default function Program() {
  return (
    <main className={styles.podcastPage}>
      <PageHeader
        eyebrow="SunRadio projects"
        title="Projekti"
        description="Posebni projekti, saradnje i programske celine SunRadio zajednice."
      />
    </main>
  );
}
