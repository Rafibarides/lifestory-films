import { Mail, Phone } from "lucide-react";
import Section from "../ui/Section.jsx";
import Container from "../ui/Container.jsx";
import { content } from "../../data/content.js";
import styles from "./ContactSection.module.css";

function digitsOnly(str) {
  return (str || "").replace(/[^+\d]/g, "");
}

// Format US numbers as (XXX) XXX-XXXX so they don't read as a foreign
// 10-digit string. 11-digit numbers starting with "1" get the leading
// country code. Anything else falls through to whatever the editor typed,
// so this is forward-compatible if the studio ever lists an international
// number in /admin.
function formatPhone(raw) {
  const digits = digitsOnly(raw);
  if (/^\d{10}$/.test(digits)) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (/^1\d{10}$/.test(digits)) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return raw;
}

export default function ContactSection({ id }) {
  const { contactSection } = content;
  const telHref = `tel:${digitsOnly(contactSection.phone)}`;
  const mailHref = `mailto:${contactSection.email}`;
  const phoneDisplay = formatPhone(contactSection.phone);

  return (
    <Section id={id} variant="accent" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <h2 className={styles.cta}>{contactSection.cta}</h2>
          <div className={styles.actions}>
            <a
              className={`${styles.action} ${styles.actionFilled}`}
              href={telHref}
            >
              <Phone size={16} strokeWidth={1.7} aria-hidden="true" />
              <span>{phoneDisplay}</span>
            </a>
            <a
              className={`${styles.action} ${styles.actionOutline}`}
              href={mailHref}
            >
              <Mail size={16} strokeWidth={1.7} aria-hidden="true" />
              <span className={styles.email}>{contactSection.email}</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
