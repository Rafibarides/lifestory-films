import palette from "../../colors.js";

// Semantic tokens derived from the palette.
// Components should read ONLY from semantic tokens (via CSS vars),
// so editing the palette or this file propagates sitewide.
export const semantic = {
  "color-bg": palette.black,
  "color-surface": palette.espresso,
  "color-ink": palette.white,
  "color-ink-soft": palette.cream,
  "color-muted": "rgba(250, 247, 239, 0.62)",
  "color-rule": "rgba(250, 247, 239, 0.12)",
  "color-accent": palette.gold,
  "color-accent-ink": palette.black,
  "color-accent-deep": palette.rust,

  "color-cta": palette.wine,
  "color-cta-ink": palette.white,
  "color-cta-hover": palette.rust,
};

export const tokens = {
  "font-display": "'Baskerville', 'Libre Baskerville', 'Baskervville', Georgia, 'Times New Roman', serif",
  "font-sans":
    "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",

  "radius-xs": "2px",
  "radius-sm": "3px",
  "radius-md": "4px",

  "shadow-soft": "0 1px 0 rgba(0,0,0,0.2)",

  "maxw-page": "1240px",
  "maxw-prose": "720px",

  "space-1": "4px",
  "space-2": "8px",
  "space-3": "12px",
  "space-4": "16px",
  "space-5": "24px",
  "space-6": "32px",
  "space-7": "48px",
  "space-8": "64px",
  "space-9": "96px",
  "space-10": "128px",

  "ease-out": "cubic-bezier(0.22, 1, 0.36, 1)",
  "ease-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
};

export function cssVariables() {
  const entries = [
    ...Object.entries(palette).map(([k, v]) => [`--palette-${k}`, v]),
    ...Object.entries(semantic).map(([k, v]) => [`--${k}`, v]),
    ...Object.entries(tokens).map(([k, v]) => [`--${k}`, v]),
  ];
  return entries.map(([k, v]) => `${k}: ${v};`).join("\n");
}
