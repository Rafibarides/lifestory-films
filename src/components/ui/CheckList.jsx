import { Check } from "lucide-react";
import styles from "./CheckList.module.css";

export default function CheckList({ items = [], size = "md" }) {
  const iconSize = size === "sm" ? 14 : 16;
  return (
    <ul className={`${styles.list} ${styles[size]}`}>
      {items.map((item, i) => (
        <li key={i} className={styles.item}>
          <Check className={styles.icon} size={iconSize} strokeWidth={2} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
