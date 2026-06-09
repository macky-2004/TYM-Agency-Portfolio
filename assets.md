# TYM Agency — Asset Manifest (Industrial Terminal)

---

## 1. Background Grid / Noise Patterns

### 1A. Fractal Noise Overlay (Inline SVG)

Applied via `body::after` — do not save as a separate file. This creates the brushed-carbon grain over all dark surfaces.

```svg
<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noise)"/>
</svg>
```

**CSS application:**
```css
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  mix-blend-mode: overlay;
}
```

### 1B. Hex / Dot Grid Overlay

Applied to `.hero-grid-overlay` and optionally to `.section` wrappers. Two variants:

**Variant A — Blue-tinted tech grid:**
```css
background-image:
  linear-gradient(rgba(0, 229, 255, 0.04) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 229, 255, 0.04) 1px, transparent 1px);
background-size: 60px 60px;
```

**Variant B — White micro-dot pattern (for cards/surfaces):**
```css
background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
background-size: 24px 24px;
```

---

## 2. Velocity Engine — Scrolling Pipeline (CSS Keyframes)

A continuous horizontal-scrolling pipeline that conveys "always deploying / always building." Placed below the hero or as a full-width strip before the services section.

### HTML Structure
```html
<div class="velocity-engine">
  <div class="pipeline-track" aria-hidden="true">
    <div class="pipeline-node">
      <span class="pipeline-icon">◆</span>
      <span class="pipeline-label">DISCOVER</span>
      <span class="pipeline-duration">48h</span>
    </div>
    <span class="pipeline-arrow">▸</span>
    <div class="pipeline-node">
      <span class="pipeline-icon">◈</span>
      <span class="pipeline-label">STRATEGY</span>
      <span class="pipeline-duration">72h</span>
    </div>
    <span class="pipeline-arrow">▸</span>
    <div class="pipeline-node">
      <span class="pipeline-icon">◉</span>
      <span class="pipeline-label">BUILD</span>
      <span class="pipeline-duration">120h</span>
    </div>
    <span class="pipeline-arrow">▸</span>
    <div class="pipeline-node">
      <span class="pipeline-icon">◆</span>
      <span class="pipeline-label">DEPLOY</span>
      <span class="pipeline-duration">24h</span>
    </div>
    <span class="pipeline-arrow">▸</span>
    <div class="pipeline-node">
      <span class="pipeline-icon">⬟</span>
      <span class="pipeline-label">OPTIMIZE</span>
      <span class="pipeline-duration">ongoing</span>
    </div>
    <!-- duplicated nodes for seamless loop -->
    <div class="pipeline-node">
      <span class="pipeline-icon">◇</span>
      <span class="pipeline-label">DISCOVER</span>
      <span class="pipeline-duration">48h</span>
    </div>
    <span class="pipeline-arrow">▸</span>
    <div class="pipeline-node">
      <span class="pipeline-icon">◈</span>
      <span class="pipeline-label">STRATEGY</span>
      <span class="pipeline-duration">72h</span>
    </div>
    <span class="pipeline-arrow">▸</span>
    <div class="pipeline-node">
      <span class="pipeline-icon">◉</span>
      <span class="pipeline-label">BUILD</span>
      <span class="pipeline-duration">120h</span>
    </div>
    <span class="pipeline-arrow">▸</span>
    <div class="pipeline-node">
      <span class="pipeline-icon">◆</span>
      <span class="pipeline-label">DEPLOY</span>
      <span class="pipeline-duration">24h</span>
    </div>
    <span class="pipeline-arrow">▸</span>
    <div class="pipeline-node">
      <span class="pipeline-icon">⬟</span>
      <span class="pipeline-label">OPTIMIZE</span>
      <span class="pipeline-duration">ongoing</span>
    </div>
  </div>
</div>
```

### CSS Keyframes & Styles
```css
.velocity-engine {
  width: 100%;
  overflow: hidden;
  background: var(--obsidian-mid);
  border-top: 1px solid rgba(0, 229, 255, 0.06);
  border-bottom: 1px solid rgba(0, 229, 255, 0.06);
  padding: 24px 0;
  position: relative;
}

.velocity-engine::before,
.velocity-engine::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 2;
  pointer-events: none;
}
.velocity-engine::before {
  left: 0;
  background: linear-gradient(90deg, var(--obsidian-mid), transparent);
}
.velocity-engine::after {
  right: 0;
  background: linear-gradient(-90deg, var(--obsidian-mid), transparent);
}

.pipeline-track {
  display: flex;
  align-items: center;
  gap: 24px;
  width: max-content;
  animation: pipelineScroll 24s linear infinite;
}

.pipeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 20px;
  border: 1px solid var(--obsidian-border);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.015);
  min-width: 100px;
  position: relative;
}

.pipeline-node::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 4px;
  background: var(--blue-flux);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.4s;
}
.pipeline-node:hover::after {
  opacity: 1;
}

.pipeline-icon {
  font-size: 1.2rem;
  color: var(--blue-neon);
}

.pipeline-label {
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--silver-bright);
}

.pipeline-duration {
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.55rem;
  color: var (--gray-500);
}

.pipeline-arrow {
  font-size: 1rem;
  color: var(--blue-neon);
  opacity: 0.5;
  flex-shrink: 0;
}

@keyframes pipelineScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### Animation Specs
| Property | Value |
|----------|-------|
| Duration | 24s (adjust for viewport width) |
| Easing | linear (continuous seamless loop) |
| Direction | infinite, horizontal scroll left |
| Duplicate | first 5 nodes cloned at end for seamless loop |
| Stop on interaction | `animation-play-state: paused` on `.velocity-engine:hover .pipeline-track` |

---

## 3. Case Study Showroom — Image Framing (Industrial Clip-Path)

Sharp, machined-angle framing for project/case-study images. No rounded corners — only straight cuts and diagonal shears.

### Primary Frame — "Forged Edge"
```css
clip-path: polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%);
```
Creates a clipped lower-right corner. Best for hero case studies and large feature images.

### Secondary Frame — "Shear Cut" (Parallelogram)
```css
clip-path: polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
```
A subtle horizontal skew. Best for thumbnails and grid cards.

### Tertiary Frame — "Hex Notch" (6-sided)
```css
clip-path: polygon(24px 0, 100% 0, calc(100% - 24px) 12px, 100% 50%, calc(100% - 24px) calc(100% - 12px), 100% 100%, 24px 100%, 0 calc(100% - 12px), 0 12px);
```
Creates a hexagonal profile with top/bottom notches. Best for team headshots and portfolio highlights.

### Quaternary Frame — "Chamfer" (Beveled corners)
```css
clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px);
```
Simple single-bevel on the bottom-right corner. Best for service images.

### Frame Border Treatment
Each clipped image should be wrapped in a container with a 1px metallic border:
```css
.image-frame {
  position: relative;
  overflow: hidden;
}
.image-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid var(--silver-mid);
  clip-path: inherit; /* matches the image clip-path */
  z-index: 1;
  pointer-events: none;
  opacity: 0.6;
}
.image-frame:hover::before {
  border-color: var(--blue-neon);
  opacity: 1;
}
```

### Full Usage Example (Case Study Hero)
```html
<div class="image-frame" style="clip-path: polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%);">
  <img src="images/project-sabesh.png" alt="Sabesh Fashions" style="width:100%;height:100%;object-fit:cover;">
</div>
```
Add a `.image-frame-glow` class for a subtle neon rim light:
```css
.image-frame-glow {
  box-shadow: inset 0 0 30px rgba(0, 229, 255, 0.05);
}
```

---

## 4. Image Inventory (Updated for .PNG)

All images should be 24-bit PNG with no compression artefacts (or WebP with PNG fallback).

| Path | Dimensions (px) | Notes |
|------|----------------|-------|
| `images/tym-agency-logo.png` | 120×auto | Full-color logo, transparent BG |
| `images/favicon.png` | 32×32 | Favicon square |
| `images/about-hero-page.png` | 800×600 | About hero image |
| `images/team-david.png` | 400×400 | CEO headshot, 1:1 |
| `images/team-elias.png` | 400×400 | Founder headshot, 1:1 |
| `images/team-stephen.png` | 400×400 | CRM headshot, 1:1 |
| `images/team-mackrine.png` | 400×400 | Web dev headshot, 1:1 |
| `images/project-sabesh.png` | 640×400 | 16:10 crop |
| `images/project-tymevents.png` | 640×400 | 16:10 crop |
| `images/project-tymjewellery.png` | 640×400 | 16:10 crop |
| `images/project-electricals.png` | 640×400 | 16:10 crop |
| `images/project-kaveri.png` | 640×400 | 16:10 crop |
| `images/project-restaurant.png` | 640×400 | 16:10 crop |
| `images/project-arunagiri.png` | 640×400 | 16:10 crop |
| `images/project-portfolio.png` | 640×400 | 16:10 crop |
| `images/service-web.png` | 600×400 | Web dev |
| `images/service-seo.png` | 600×400 | SEO |
| `images/service-social.png` | 600×400 | Social media |
| `images/service-content.png` | 600×400 | Content strategy |
| `images/service-branding.png` | 600×400 | Branding |
| `images/service-video.png` | 600×400 | Video marketing |
| `images/service-analytics.png` | 600×400 | Analytics / growth |
