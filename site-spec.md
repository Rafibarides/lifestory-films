# LifeStory Films — Landing Page Spec

> All copy and asset URLs are driven by `siteContent.json`. No text or file paths should be hardcoded in components. To change anything on the site, edit the JSON only.
##Global:
Baskerville font, and san francisco font only

Black background, overall dark theme. 

---

## Section 1 — Navigation Bar

**Layout:** Fixed top bar, full width, black background.

- **Left:** Logo text (`meta.siteName`)
- **Right:** Nav buttons rendered dynamically from `nav.buttons` array. Each button is an object with a `title` and `path`.
  - All buttons are plain white text with no background — except the last button (`isAccent: true`), which gets the site's accent color as a filled background with a slight border radius. This is the "Contact Us" CTA.
- No border, no shadow. Flat and clean.

---

## Section 2 — Hero Banner (Video Background)

**Layout:** Full-width banner. Aspect ratio 10:5 (2:1). Video plays silently in the background — no controls, no play button, autoplay, muted, looped.

- Video source: `assets.baseUrl + "/" + assets.files.heroVideo`
(https://pub-955ce23b5d9f4e908ac3ca25ba28d7f9.r2.dev/background_smaller.mp4)
- Overlay: Dark semi-transparent layer on top of the video so text is readable.
- **Centered on top of the video:**
  - Headline (`hero.headline`) — large, Baskerville serif font
  - Subheadline (`hero.subheadline`) — small, beneath the headline, San Francisco / system sans-serif font
- Text is centered both horizontally and vertically within the banner.

---

## Section 3 — Slideshow + Text (Split Layout)

**Layout:** Two-column. Left side is static text. Right side is an auto-scrolling vertical slideshow of photos.

- **Left side:**
  - Header text from `slideshowSection.header`
  - Below the header: a vertical list of checkmark items from `slideshowSection.checkmarks` array. Each item is a single word rendered with a checkmark icon to the left. Small text, clean.

- **Right side:**
  - Continuous auto-scrolling vertical photo reel using `assets.files.slideshow` array (6 images).
  - Images loop seamlessly. No manual controls. Pure CSS or JS scroll animation.
  - Images sourced as: `assets.baseUrl + "/" + filename`

---

## Section 4 — Scroll-Based Old-to-Young Photo Transition

**Layout:** Two full-width stacked banner blocks. Each has a large photo on one side and copy text on the other.

### Block 1 — Lady (Image Left, Text Right)
- Image area starts showing `transitionSection.pairs[0].imageFrom` (`old-lady1.png`)
- As the user **scrolls down through this section**, the image **cross-fades/morphs** into `transitionSection.pairs[0].imageTo` (`young-lady2.png`)
- This is a scroll-position-driven opacity transition — not a hover or a click. Use `IntersectionObserver` or a scroll progress value tied to the section's scroll depth.
- Copy text from `transitionSection.pairs[0].copy` displayed on the right side, vertically centered.

### Block 2 — Man (Image Right, Text Left)
- Layout is **inverted**: image on the right, text on the left.
- Same scroll-morph transition: starts on `transitionSection.pairs[1].imageFrom` (`old-man1.png`), transitions to `transitionSection.pairs[1].imageTo` (`young-man1.png`)
- Copy text from `transitionSection.pairs[1].copy` on the left side.

**Effect goal:** Emotional, cinematic. The morph should feel like time passing. Opacity cross-fade between the two images based on scroll progress is the target effect — the old image fades out as the young one fades in.

---

## Section 5 — Packages, Services & Process

This section is one large content-rich area. It has three distinct sub-sections rendered in sequence.

### 5a — Included In Every Documentary

- Section title: `packagesSection.sectionTitle`
- Section subtitle: `packagesSection.sectionSubtitle`
- Two-column content block:
  - **Left column:** Core Services (`packagesSection.coreServices`) — label, subcategory label, bulleted list of items
  - **Right column:** Deliverables (`packagesSection.deliverables`) — label, subcategory label, bulleted list of items
- Beneath the columns: the inclusion note (`packagesSection.inclusionNote`) in smaller text, slightly muted.
- **Interspersed between or alongside the text:** Use `assets.files.oldImageScan1–4` and `assets.files.productionBts1` and `assets.files.cinematicScreengrab1/2` as atmospheric photos. These should feel like they're woven into the layout — not just a grid below the text. Think editorial.

### 5b — Demo Block

- Label: `packagesSection.demoLabel`
- Subtitle: `packagesSection.demoSubtitle`
- This is a placeholder area where a video embed or thumbnail will go. For now, style it as a dark card or placeholder frame with the label and subtitle displayed over it.

### 5c — Fully Customizable Add-Ons

- Label: `packagesSection.customizable.label`
- Subtitle: `packagesSection.customizable.subtitle`
- Three columns, one per category from `packagesSection.customizable.categories`:
  - Each column has a heading (`label`) and a bulleted list of `items`
- Closing note: `packagesSection.customizable.closingNote` in small muted text beneath.

### 5d — Our Process (Steps)

- Section title: `processSection.sectionTitle`
- Section subtitle: `processSection.sectionSubtitle`
- Rendered as a **6-step grid** (2 rows × 3 columns, or a horizontal numbered timeline). Each step from `processSection.steps` contains:
  - Step number
  - Title
  - Subtitle (smaller, muted)
  - Description paragraph
  - Deliverables: small bulleted list
- Steps alternate or are clearly numbered. The visual should feel like a guided journey — clean, structured, confidence-inspiring.

---

## Section 6 — FAQ (Expandable Q&A)

- Section title: `faqSection.sectionTitle`
- Render each item from `faqSection.items` as an **accordion/expandable row**:
  - Collapsed state: shows `question` with a `+` or chevron icon on the right
  - Expanded state: reveals `answer` below with a smooth open/close animation
- Only one item open at a time (or allow multiple — designer's choice, but consistent).
- Clean, editorial styling. Not bubbly or card-heavy. Think newspaper Q&A format.

---

## Section 7 — Contact Banner

**Layout:** Full-width accent-colored banner. Centered content.

- CTA headline: `contactSection.cta`
- Phone: `contactSection.phone` — rendered as a `tel:` link
- Email: `contactSection.email` — rendered as a `mailto:` link
- Bold, large, inviting. This is the conversion moment.

---

## Section 8 — Footer

**Layout:** Dark background, multi-column layout.

- **Top left:** Logo (`footer.logo`) + tagline (`footer.tagline`)
- **Columns:** Rendered dynamically from `footer.columns` array. Each column has a `heading` and a list of `links` (each with `title` and `path`).
- **Below columns:**
  - Location blurb: `footer.location`
  - Copyright line: `footer.copyright`
- Clean, minimal. No clutter.

---

## Global Notes

- **Accent color:** To be defined as a CSS variable (`--accent`). Used on the nav CTA button, the contact banner background, and any highlight elements. Should feel warm and trustworthy — not tech-blue. Think deep gold, warm amber, or a rich earthy tone.
- **Typography:**
  - Display/headlines: Baskerville or a close serif equivalent
  - Body/UI: System sans-serif (San Francisco on Apple, Segoe on Windows) or a clean humanist sans
- **All data comes from `siteContent.json`.** Components receive this as a prop or imported module. No strings or URLs hardcoded in JSX.
- **Images:** All sourced by concatenating `assets.baseUrl + "/" + assets.files[key]`
- **Scroll interactions** in Section 4 should degrade gracefully — if JS is disabled or the observer fails, show the "young" image by default.
