import useScrollProgress from "../../hooks/useScrollProgress.js";
import { assetUrl } from "../../data/content.js";
import styles from "./TransitionBlock.module.css";

// -----------------------------------------------------------------------------
// Morph tuning knobs (fine-tune how the scroll-driven cross-fade feels).
// `progress` = 0..1, where 0 is the section just entering from below the
// viewport and 1 is it just leaving off the top. ~0.5 is centered.
//
// The order of events as you scroll:
//   1. Block enters. OLD image is held (nothing fading yet).
//   2. Past FADE_START, the OLD image begins dissolving into the YOUNG.
//   3. By FADE_END, only the YOUNG image is visible.
//   4. Block stays YOUNG until it exits the top.
//
// TILT_DEG is the max rotation applied to the square image container as it
// scrolls through the viewport (subtle organic motion). 0 disables tilt.
// -----------------------------------------------------------------------------
const FADE_START = 0.4;
const FADE_END = 0.6;
const TILT_DEG = 3.2;

/**
 * Scroll-driven old-to-young image cross-fade, with a subtle tilt on scroll.
 * Degrades gracefully: the "to" (young) image sits beneath the "from" (old)
 * image, so if JS fails to compute progress, the young image is visible.
 */
export default function TransitionBlock({ pair }) {
  const [ref, progress] = useScrollProgress();

  const fadeSpan = Math.max(0.0001, FADE_END - FADE_START);
  const fade = Math.max(0, Math.min(1, (progress - FADE_START) / fadeSpan));
  const fromOpacity = 1 - fade;

  const tilt = (progress - 0.5) * TILT_DEG;

  const isImageLeft = pair.layout === "imageLeft";

  return (
    <section
      ref={ref}
      className={`${styles.block} ${isImageLeft ? styles.imageLeft : styles.imageRight}`}
    >
      <div className={styles.inner}>
        <div className={styles.media} style={{ transform: `rotate(${tilt}deg)` }}>
          <img
            className={styles.imgBase}
            src={assetUrl(pair.imageTo)}
            alt=""
            draggable="false"
          />
          <img
            className={styles.imgTop}
            src={assetUrl(pair.imageFrom)}
            alt=""
            draggable="false"
            style={{ opacity: fromOpacity }}
          />
        </div>
        <div className={styles.copyWrap}>
          <p className={styles.copy}>{pair.copy}</p>
        </div>
      </div>
    </section>
  );
}
