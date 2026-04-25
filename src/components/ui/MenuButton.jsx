import styles from "./MenuButton.module.css";

export default function MenuButton({
  children,
  href,
  onClick,
  variant = "text",
  type = "button",
  ...rest
}) {
  const cls = `${styles.base} ${styles[variant]}`;
  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} onClick={onClick} type={type} {...rest}>
      {children}
    </button>
  );
}
