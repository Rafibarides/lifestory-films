import Section from "../ui/Section.jsx";
import Container from "../ui/Container.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import BulletList from "../ui/BulletList.jsx";
import { content, fileUrl } from "../../data/content.js";
import styles from "./PackagesSection.module.css";

function Column({ block }) {
  return (
    <div className={styles.col}>
      <h3 className={styles.colLabel}>{block.label}</h3>
      {block.subcategories.map((sub, i) => (
        <div key={i} className={styles.sub}>
          <h4 className={styles.subLabel}>{sub.label}</h4>
          <BulletList items={sub.items} />
        </div>
      ))}
    </div>
  );
}

export default function PackagesSection({ id }) {
  const { packagesSection } = content;

  return (
    <Section id={id} variant="surface">
      <Container>
        <SectionHeading
          eyebrow="Every documentary includes"
          title={packagesSection.sectionTitle}
          subtitle={packagesSection.sectionSubtitle}
        />

        <div className={styles.row}>
          <Column block={packagesSection.coreServices} />
          <figure className={styles.figure}>
            <img src={fileUrl("oldImageScan1")} alt="" loading="lazy" />
          </figure>
        </div>

        <div className={`${styles.row} ${styles.reverse}`}>
          <Column block={packagesSection.deliverables} />
          <figure className={styles.figure}>
            <img src={fileUrl("productionBts1")} alt="" loading="lazy" />
          </figure>
        </div>

        <p className={styles.note}>{packagesSection.inclusionNote}</p>
      </Container>
    </Section>
  );
}
