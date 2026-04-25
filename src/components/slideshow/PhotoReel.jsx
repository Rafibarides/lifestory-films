import { useMemo } from "react";
import styles from "./PhotoReel.module.css";

/**
 * Infinite vertical auto-scroll reel.
 * - images: array of src urls
 * - direction: "up" | "down"
 * - speed: seconds per image visible (higher = slower, calmer).
 *          The reel duplicates its images once so the loop is seamless;
 *          total animation duration = images.length * speed.
 * - offset: 0..1 — fraction of the full loop to start offset by (for stagger)
 */
export default function PhotoReel({
  images = [],
  direction = "up",
  speed = 9,
  offset = 0,
}) {
  const loop = useMemo(() => [...images, ...images], [images]);
  const duration = Math.max(6, images.length * speed);
  const delay = -offset * duration;

  return (
    <div className={styles.viewport}>
      <div className={styles.vignetteTop} aria-hidden="true" />
      <ul
        className={`${styles.track} ${direction === "down" ? styles.down : styles.up}`}
        style={{
          "--reel-duration": `${duration}s`,
          "--reel-delay": `${delay}s`,
        }}
      >
        {loop.map((src, i) => (
          <li key={`${src}-${i}`} className={styles.slide}>
            <img src={src} alt="" loading="lazy" />
          </li>
        ))}
      </ul>
      <div className={styles.vignetteBottom} aria-hidden="true" />
    </div>
  );
}
