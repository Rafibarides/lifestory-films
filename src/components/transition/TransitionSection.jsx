import TransitionBlock from "./TransitionBlock.jsx";
import { content } from "../../data/content.js";

export default function TransitionSection() {
  const { transitionSection } = content;
  return (
    <>
      {transitionSection.pairs.map((pair) => (
        <TransitionBlock key={pair.id} pair={pair} />
      ))}
    </>
  );
}
