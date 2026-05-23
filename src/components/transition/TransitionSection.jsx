import TransitionBlock from "./TransitionBlock.jsx";
import { content } from "../../data/content.js";

export default function TransitionSection() {
  const { transitionSection } = content;
  // Skip pairs whose testimonial copy hasn't been filled in yet. Same
  // pattern as FAQ: editors can leave placeholder rows in siteContent.json
  // without producing empty sections on the live site.
  const pairs = (transitionSection?.pairs || []).filter(
    (p) => p && p.copy?.trim(),
  );
  if (pairs.length === 0) return null;
  return (
    <>
      {pairs.map((pair) => (
        <TransitionBlock key={pair.id} pair={pair} />
      ))}
    </>
  );
}
