import { useEffect } from "react";
import { cssVariables } from "./theme.js";

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const id = "lsf-theme-vars";
    let styleEl = document.getElementById(id);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = id;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `:root{\n${cssVariables()}\n}`;
  }, []);
  return children;
}
