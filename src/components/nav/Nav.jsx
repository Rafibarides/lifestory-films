import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Container from "../ui/Container.jsx";
import MenuButton from "../ui/MenuButton.jsx";
import { content } from "../../data/content.js";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import styles from "./Nav.module.css";

export default function Nav() {
  const { nav, meta } = content;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleAnchor = (e, path) => {
    if (!path?.startsWith("#")) return;
    const el = document.querySelector(path);
    if (!el) return;
    e.preventDefault();
    setOpen(false);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", path);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <Container>
        <div className={styles.bar}>
          <a
            className={styles.logo}
            href="#top"
            onClick={(e) => handleAnchor(e, "#top")}
            aria-label={meta.siteName}
          >
            <img
              className={styles.logoImg}
              src="/LifestoryFilmsLogo.png"
              alt=""
              draggable="false"
            />
            <span className={styles.logoText}>{nav.logo || meta.siteName}</span>
          </a>

          {!isMobile && (
            <nav className={styles.desktop} aria-label="Primary">
              {nav.buttons.map((btn) => (
                <MenuButton
                  key={btn.path}
                  href={btn.path}
                  variant={btn.isAccent ? "accent" : "text"}
                  onClick={(e) => handleAnchor(e, btn.path)}
                >
                  {btn.title}
                </MenuButton>
              ))}
            </nav>
          )}

          {isMobile && (
            <button
              className={styles.menuBtn}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </Container>

      <AnimatePresence>
        {isMobile && open && (
          <motion.nav
            className={styles.drawer}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Primary mobile"
          >
            <ul className={styles.drawerList}>
              {nav.buttons.map((btn) => (
                <li key={btn.path}>
                  <a
                    className={`${styles.drawerLink} ${btn.isAccent ? styles.drawerAccent : ""}`}
                    href={btn.path}
                    onClick={(e) => handleAnchor(e, btn.path)}
                  >
                    {btn.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
