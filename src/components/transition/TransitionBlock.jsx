import useScrollProgress from "../../hooks/useScrollProgress.js";
import { assetUrl } from "../../data/content.js";
import styles from "./TransitionBlock.module.css";

// -----------------------------------------------------------------------------
// Morph tuning knobs (fine-tune how the scroll-driven cross-fade feels).
// `progress` = 0..1, where 0 is the section just entering from below the
// viewport and 1 is it just leaving off the top. ~0.5 is centered.
//
// Behavior:
//   1. While scroll progress is below FADE_THRESHOLD, the OLD image is held.
//   2. The instant progress crosses the threshold, the OLD image is hidden.
//   3. A short CSS opacity transition (see .imgTop in the stylesheet) gives
//      it the briefest fade so the cut isn't pixel-snapping ugly. The effect
//      reads as a flicker / jump-cut, NOT a long dissolve where both faces
//      sit overlaid (which felt uncanny).
//
// TILT_DEG is the max rotation applied to the square image container as it
// scrolls through the viewport (subtle organic motion). 0 disables tilt.
// -----------------------------------------------------------------------------
const FADE_THRESHOLD = 0.5;
const TILT_DEG = 3.2;

/**
 * Scroll-driven old-to-young image jump-cut, with a subtle tilt on scroll.
 * Degrades gracefully: the "to" (young) image sits beneath the "from" (old)
 * image, so if JS fails to compute progress, the young image is visible.
 */
export default function TransitionBlock({ pair }) {
  const [ref, progress] = useScrollProgress();

  const fromOpacity = progress < FADE_THRESHOLD ? 1 : 0;

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
          <blockquote className={styles.testimonial}>
            <p className={styles.copy}>{pair.copy}</p>
            {pair.attribution?.trim() ? (
              <footer className={styles.attribution}>
                &mdash; {pair.attribution}
              </footer>
            ) : null}
          </blockquote>
        </div>
      </div>
    </section>
  );
}
