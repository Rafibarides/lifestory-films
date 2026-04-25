import Section from "../ui/Section.jsx";
import Container from "../ui/Container.jsx";
import CheckList from "../ui/CheckList.jsx";
import PhotoReel from "./PhotoReel.jsx";
import { content, assetUrl } from "../../data/content.js";
import styles from "./SlideshowSection.module.css";

// Single knob for fine-tuning the slideshow speed.
// Units: seconds per image. Higher = slower, calmer. Lower = faster.
const REEL_SECONDS_PER_IMAGE = 35;

export default function SlideshowSection({ id }) {
  const { slideshowSection, assets } = content;
  const images = (assets.files.slideshow || []).map(assetUrl);

  // Split into two staggered columns (A: even indices, B: odd indices).
  // If images aren't evenly splittable, each reel still loops seamlessly.
  const colA = images.filter((_, i) => i % 2 === 0);
  const colB = images.filter((_, i) => i % 2 === 1);

  return (
    <Section id={id} variant="default">
      <Container>
        <div className={styles.grid}>
          <div className={styles.text}>
            <h2 className={styles.header}>{slideshowSection.header}</h2>
            <div className={styles.checkmarks}>
              <CheckList items={slideshowSection.checkmarks} />
            </div>
          </div>
          <div className={styles.tracks}>
            <PhotoReel
              images={colA}
              direction="up"
              speed={REEL_SECONDS_PER_IMAGE}
            />
            <PhotoReel
              images={colB}
              direction="down"
              speed={REEL_SECONDS_PER_IMAGE}
              offset={0.5}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
