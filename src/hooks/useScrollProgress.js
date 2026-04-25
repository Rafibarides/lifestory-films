import { useEffect, useRef, useState } from "react";

/**
 * Returns a 0..1 progress value representing how far the given section
 * has been scrolled through the viewport. 0 when the section's top hits
 * the bottom of the viewport, 1 when its bottom hits the top of the viewport.
 */
export default function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const compute = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = rect.height + viewport;
      const passed = viewport - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      setProgress(p);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return [ref, progress];
}
