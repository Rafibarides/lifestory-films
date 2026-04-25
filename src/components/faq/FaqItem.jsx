import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import styles from "./FaqItem.module.css";

export default function FaqItem({ item, open, onToggle }) {
  return (
    <div className={`${styles.row} ${open ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className={styles.question}>{item.question}</span>
        <span className={styles.icon} aria-hidden="true">
          <Plus size={18} strokeWidth={1.6} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={styles.answerWrap}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.answer}>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
