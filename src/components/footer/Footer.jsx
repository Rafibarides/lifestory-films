import Container from "../ui/Container.jsx";
import { content } from "../../data/content.js";
import styles from "./Footer.module.css";

export default function Footer() {
  const { footer } = content;

  const handleAnchor = (e, path) => {
    if (!path?.startsWith("#")) return;
    const el = document.querySelector(path);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>{footer.logo}</div>
            <p className={styles.tagline}>{footer.tagline}</p>
          </div>
          {footer.columns.map((col, i) => (
            <div key={i} className={styles.col}>
              <h4 className={styles.heading}>{col.heading}</h4>
              <ul className={styles.list}>
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a
                      className={styles.link}
                      href={link.path}
                      onClick={(e) => handleAnchor(e, link.path)}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.rule} aria-hidden="true" />

        <div className={styles.meta}>
          <p className={styles.location}>{footer.location}</p>
          <p className={styles.copy}>{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
