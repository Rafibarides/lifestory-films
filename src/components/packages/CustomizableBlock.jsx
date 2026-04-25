import Section from "../ui/Section.jsx";
import Container from "../ui/Container.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import BulletList from "../ui/BulletList.jsx";
import { content } from "../../data/content.js";
import styles from "./CustomizableBlock.module.css";

export default function CustomizableBlock() {
  const { packagesSection } = content;
  const { customizable } = packagesSection;

  return (
    <Section variant="surface">
      <Container>
        <SectionHeading
          eyebrow={customizable.label}
          title="Tailored to your family's story"
          subtitle={customizable.subtitle}
        />

        <div className={styles.grid}>
          {customizable.categories.map((cat, i) => (
            <div key={i} className={styles.col}>
              <h3 className={styles.colLabel}>{cat.label}</h3>
              <BulletList items={cat.items} />
            </div>
          ))}
        </div>

        <p className={styles.note}>{customizable.closingNote}</p>
      </Container>
    </Section>
  );
}
