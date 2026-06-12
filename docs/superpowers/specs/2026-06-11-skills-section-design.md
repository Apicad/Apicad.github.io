# Skills Section — Marquee Design

Date: 2026-06-11
Status: Approved (brainstormed via visual companion; user selected style B, grouping B2, slide-in entrance)

## Overview

Replace the Skills section's category-card grid with three full-width, continuously
scrolling marquee rows of skill chips. The section sits between About Me and Work
Experience (`Element name="skills"`, `section id="Skills"`), already wired into
`src/App.jsx` and the navbar.

## Structure

Three rows, each with a small uppercase label above it:

1. **Languages & Frameworks** — Python, TypeScript, JavaScript, Java, C++, SQL,
   HTML/CSS, Node.js, React, Next.js, Three.js, Framer Motion. Cyan-glow chips.
2. **AI & LLM** — LLM APIs (Anthropic Claude), Prompt Engineering, Structured
   Tool-Use / Function Calling, AI-Assisted Data Analysis, Schema Validation (Zod).
   **Magenta-tinted chips** to make the AI row stand out.
3. **Data · Tools & Practices** — SQLite, ETL & Data Cleaning, Power BI, Excel,
   Git, Agile, Release Management, REST & SOAP APIs, Postman, Trello. Cyan/blue chips.

## Visual treatment

- Chips: pill-shaped, `#162d57` background, glyph prefix in the row's accent color,
  1px glow border (cyan `rgba(0,219,222,…)` default; magenta `rgba(252,0,255,…)`
  for the AI row).
- Row edges: CSS `mask-image` gradient so chips fade out at both sides
  (mask, not overlay, so it works over the body's gradient background).
- "Skills" header keeps the standard section-header fade-down box.

## Motion

- Marquee: CSS keyframe translating the track by -50%; chip set rendered twice
  (second copy `aria-hidden`) in equal-width groups so the loop is seamless.
  Directions alternate left / right / left with durations ~30s / 26s / 28s so the
  rows never sync. Hovering a row pauses its animation.
- Entrance: Framer Motion `whileInView` (once) — each row slides in from the
  direction it travels toward (left-moving row enters from x:+80, right-moving
  from x:-80), staggered 0.15s top to bottom, flowing into the drift.
- `prefers-reduced-motion: reduce`: marquee animation off, duplicate group hidden,
  chips wrap as a static readable pill list, mask removed.

## Scope

Rewrite `components/skills/Skills.jsx` (row data: label, chips with glyphs,
direction, duration, tint) and `components/skills/Skills.scss`. No changes to
App/navbar wiring. Rows with few chips repeat their chip set within each group so
one copy always exceeds the container width (needed for a gapless loop).
