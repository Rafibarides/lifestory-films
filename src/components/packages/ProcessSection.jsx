import { useState } from "react";
import Section from "../ui/Section.jsx";
import Container from "../ui/Container.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import ProcessStep from "./ProcessStep.jsx";
import { content } from "../../data/content.js";
import styles from "./ProcessSection.module.css";

export default function ProcessSection({ id }) {
  const { processSection } = content;
  // Multi-open accordion: a Set of indices that are currently expanded.
  // Multi-open works better than single-open here because users tend to
  // read steps sequentially and benefit from being able to keep earlier
  // steps in view while opening the next one.
  const [openSet, setOpenSet] = useState(() => new Set());

  const toggle = (i) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <Section id={id} variant="default">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title={processSection.sectionTitle}
          subtitle={processSection.sectionSubtitle}
        />

        <div className={styles.list}>
          {processSection.steps.map((step, i) => (
            <ProcessStep
              key={step.number}
              step={step}
              open={openSet.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
