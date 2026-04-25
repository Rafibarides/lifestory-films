import { motion } from "framer-motion";
import { content, fileUrl } from "../../data/content.js";
import styles from "./Hero.module.css";

export default function Hero() {
  const { hero } = content;
  const videoSrc = fileUrl("heroVideo");
  const aspect = (hero.videoAspectRatio || "10 / 5").replace(/\s/g, "");

  return (
    <section id="top" className={styles.hero} style={{ "--hero-aspect": aspect }}>
      <div className={styles.videoWrap}>
        <video
          className={styles.video}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className={styles.overlay} />
      </div>
      <div className={styles.inner}>
        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {hero.headline}
        </motion.h1>
        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
        >
          {hero.subheadline}
        </motion.p>
      </div>
    </section>
  );
}
