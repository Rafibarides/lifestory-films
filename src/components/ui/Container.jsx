import styles from "./Container.module.css";

export default function Container({ children, width = "page", className = "" }) {
  const cls = [styles.base, width === "prose" ? styles.prose : styles.page, className]
    .filter(Boolean)
    .join(" ");
  return <div className={cls}>{children}</div>;
}
