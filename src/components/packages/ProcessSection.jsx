import { motion } from "framer-motion";
import Section from "../ui/Section.jsx";
import Container from "../ui/Container.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import BulletList from "../ui/BulletList.jsx";
import { content } from "../../data/content.js";
import styles from "./ProcessSection.module.css";

export default function ProcessSection({ id }) {
  const { processSection } = content;

  return (
    <Section id={id} variant="default">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title={processSection.sectionTitle}
          subtitle={processSection.sectionSubtitle}
        />

        <div className={styles.grid}>
          {processSection.steps.map((step, i) => (
            <motion.article
              key={step.number}
              className={styles.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            >
              <div className={styles.num}>
                <span>{String(step.number).padStart(2, "0")}</span>
              </div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.sub}>{step.subtitle}</p>
              <p className={styles.desc}>{step.description}</p>
              {step.deliverables?.length ? (
                <div className={styles.deliverables}>
                  <BulletList items={step.deliverables} variant="dash" />
                </div>
              ) : null}
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
