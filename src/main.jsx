import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import App from "./App.jsx";
import { content, assetUrl } from "./data/content.js";
import "./styles/global.css";

// Kick off slideshow image fetches as early as possible (before React mounts)
// by injecting <link rel="preload" as="image"> hints into <head>. This avoids
// the visible top-to-bottom "pop in" you get when the reel lazy-loads each
// image only as it scrolls into view.
function preloadSlideshowImages() {
  const slideshow = content?.assets?.files?.slideshow;
  if (!Array.isArray(slideshow)) return;
  const head = document.head;
  for (const file of slideshow) {
    const href = assetUrl(file);
    if (!href) continue;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    link.fetchPriority = "high";
    head.appendChild(link);
  }
}

preloadSlideshowImages();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
