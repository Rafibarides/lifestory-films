import { Play } from "lucide-react";
import Section from "../ui/Section.jsx";
import Container from "../ui/Container.jsx";
import { content, fileUrl } from "../../data/content.js";
import styles from "./DemoBlock.module.css";

export default function DemoBlock() {
  const { packagesSection } = content;
  const poster = fileUrl("cinematicScreengrab2");

  return (
    <Section variant="default">
      <Container>
        <div className={styles.frame} style={{ backgroundImage: `url(${poster})` }}>
          <div className={styles.overlay} />
          <div className={styles.inner}>
            <span className={styles.label}>{packagesSection.demoLabel}</span>
            <p className={styles.subtitle}>{packagesSection.demoSubtitle}</p>
            <button className={styles.play} aria-label={packagesSection.demoLabel} type="button">
              <Play size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
