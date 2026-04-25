import styles from "./BulletList.module.css";

export default function BulletList({ items = [], variant = "dot" }) {
  return (
    <ul className={`${styles.list} ${styles[variant]}`}>
      {items.map((item, i) => (
        <li key={i} className={styles.item}>
          <span className={styles.marker} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
