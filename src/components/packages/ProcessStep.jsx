import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import BulletList from "../ui/BulletList.jsx";
import styles from "./ProcessStep.module.css";

/**
 * Single row in the "Our Process" accordion.
 * Collapsed: number + title + subtitle.
 * Expanded:  also shows description and deliverables list.
 */
export default function ProcessStep({ step, open, onToggle }) {
  const num = String(step.number).padStart(2, "0");
  const hasBody =
    Boolean(step.description) || (step.deliverables?.length ?? 0) > 0;

  return (
    <div className={`${styles.row} ${open ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        onClick={onToggle}
        disabled={!hasBody}
      >
        <span className={styles.num}>{num}</span>
        <span className={styles.headings}>
          <span className={styles.title}>{step.title}</span>
          {step.subtitle ? (
            <span className={styles.sub}>{step.subtitle}</span>
          ) : null}
        </span>
        {hasBody ? (
          <span className={styles.icon} aria-hidden="true">
            <Plus size={20} strokeWidth={1.6} />
          </span>
        ) : null}
      </button>

      <AnimatePresence initial={false}>
        {open && hasBody && (
          <motion.div
            className={styles.bodyWrap}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.body}>
              {step.description ? (
                <p className={styles.desc}>{step.description}</p>
              ) : null}
              {step.deliverables?.length ? (
                <div className={styles.deliverables}>
                  <BulletList items={step.deliverables} variant="dash" />
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
