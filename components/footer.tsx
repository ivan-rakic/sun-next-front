import styles from "../styles/footer.module.scss";
import { FooterSection } from "@/components/footer-section";
import { ABOUT_CONTENT, CONTACT_CONTENT, NETWORKS_CONTENT } from "@/constants";

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <FooterSection
          title="ABOUT"
          content={ABOUT_CONTENT}
          style={styles.footer_title_about}
        />
        <FooterSection
          title="CONTACT"
          content={CONTACT_CONTENT}
          style={styles.footer_title_contact}
        />
        <FooterSection
          title="TUNE IN"
          content={""}
          style={styles.footer_title_contact}
        />
        <FooterSection
          title="NETWORKS"
          content={NETWORKS_CONTENT}
          style={styles.footer_title_networks}
        />
      </div>
      <div className="text-center">
        <h3>Copyright © Sun Radio 2017 - 2023</h3>
      </div>
    </footer>
  );
}
