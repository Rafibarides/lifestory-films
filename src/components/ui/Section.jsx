import styles from "./Section.module.css";

export default function Section({
  id,
  children,
  variant = "default",
  className = "",
  as: Tag = "section",
}) {
  const cls = [styles.section, styles[variant], className].filter(Boolean).join(" ");
  return (
    <Tag id={id} className={cls}>
      {children}
    </Tag>
  );
}
