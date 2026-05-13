import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import Section from "../ui/Section.jsx";
import Container from "../ui/Container.jsx";
import { content, fileUrl } from "../../data/content.js";
import styles from "./DemoBlock.module.css";

export default function DemoBlock() {
  const { packagesSection } = content;
  const poster = fileUrl("cinematicScreengrab2");
  const videoUrl = fileUrl("demoVideo");

  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  // Once the <video> mounts after the user clicks play, kick it off
  // explicitly. The `autoPlay` attribute alone is enough for most browsers
  // when the mount is in the same task as a user gesture, but calling
  // play() defensively also covers iOS and lets us catch the rejection if
  // autoplay is somehow blocked.
  useEffect(() => {
    if (!playing) return;
    const el = videoRef.current;
    if (!el) return;
    const p = el.play();
    if (p && typeof p.catch === "function") {
      p.catch(() => {
        // Autoplay blocked: native controls remain so the user can press play.
      });
    }
  }, [playing]);

  return (
    <Section variant="default">
      <Container>
        <div className={styles.frame}>
          {playing ? (
            <video
              ref={videoRef}
              className={styles.video}
              src={videoUrl}
              poster={poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
            />
          ) : (
            <button
              type="button"
              className={styles.posterBtn}
              onClick={() => setPlaying(true)}
              aria-label="Play demo video"
            >
              <span
                className={styles.posterImg}
                style={{ backgroundImage: `url(${poster})` }}
                aria-hidden="true"
              />
              <span className={styles.overlay} aria-hidden="true" />
              <span className={styles.inner}>
                <span className={styles.label}>{packagesSection.demoLabel}</span>
                <span className={styles.subtitle}>
                  {packagesSection.demoSubtitle}
                </span>
                <span className={styles.play} aria-hidden="true">
                  <Play size={22} strokeWidth={1.5} />
                </span>
              </span>
            </button>
          )}
        </div>
      </Container>
    </Section>
  );
}
