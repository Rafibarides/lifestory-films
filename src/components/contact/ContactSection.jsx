import { Mail, Phone } from "lucide-react";
import Section from "../ui/Section.jsx";
import Container from "../ui/Container.jsx";
import { content } from "../../data/content.js";
import styles from "./ContactSection.module.css";

function digitsOnly(str) {
  return (str || "").replace(/[^+\d]/g, "");
}

export default function ContactSection({ id }) {
  const { contactSection } = content;
  const telHref = `tel:${digitsOnly(contactSection.phone)}`;
  const mailHref = `mailto:${contactSection.email}`;

  return (
    <Section id={id} variant="accent">
      <Container>
        <div className={styles.inner}>
          <h2 className={styles.cta}>{contactSection.cta}</h2>
          <div className={styles.links}>
            <a className={styles.link} href={telHref}>
              <Phone size={18} strokeWidth={1.6} aria-hidden="true" />
              <span>{contactSection.phone}</span>
            </a>
            <span className={styles.dot} aria-hidden="true" />
            <a className={styles.link} href={mailHref}>
              <Mail size={18} strokeWidth={1.6} aria-hidden="true" />
              <span>{contactSection.email}</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
