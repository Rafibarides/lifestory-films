import { useState } from "react";
import Section from "../ui/Section.jsx";
import Container from "../ui/Container.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import FaqItem from "./FaqItem.jsx";
import { content } from "../../data/content.js";
import styles from "./FaqSection.module.css";

export default function FaqSection({ id }) {
  const { faqSection } = content;
  const [openIndex, setOpenIndex] = useState(null);

  // Drop any item that doesn't have BOTH a non-empty question and a
  // non-empty answer. Lets editors leave placeholder rows in
  // siteContent.json without producing empty disclosure rows in the UI.
  const items = (faqSection.items || []).filter(
    (item) => item && item.question?.trim() && item.answer?.trim(),
  );

  if (items.length === 0) return null;

  return (
    <Section id={id} variant="default">
      <Container width="prose">
        <SectionHeading
          eyebrow="Frequently asked"
          title={faqSection.sectionTitle}
          align="center"
        />
        <div className={styles.list}>
          {items.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
