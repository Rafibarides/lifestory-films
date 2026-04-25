import styles from "./SectionHeading.module.css";

export default function SectionHeading({ title, subtitle, align = "center", eyebrow }) {
  return (
    <header className={`${styles.root} ${styles[align]}`}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </header>
  );
}
