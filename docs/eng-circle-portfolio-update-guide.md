# EngCircle Portfolio Update Guide

This guide explains how to add or update engineering case studies for the `EngCirclePortfolio` page.

## 1. Primary Data Source

All portfolio content is data-driven from:

- `client/src/data/engCirclePortfolio.ts`

Each case study in `engineeringCaseStudies` feeds:

- Sidebar navigation, search, and filters
- Hero summary and quick facts
- Section cards and section jump
- Interactive visuals (SLD, before/after, profile)
- Expand/deep-dive modal views
- Media and asset preview blocks
- Student learning track and CTA language

## 2. Adding a New Case Study

Add a new object to `engineeringCaseStudies` with these required blocks:

1. Metadata: `id`, `title`, `navigationTitle`, `subtitle`, `stage`, `published`, `readTimeMins`
2. Classification: `domainTags`, `tools`
3. Hero: `hero.headline`, `hero.subhead`, `hero.badges`
4. Content: `quickFacts`, `sections`
5. Visuals: `visuals` (one or more of `sld`, `before-after`, `profile`)
6. Deep dive: `deepDive` blocks
7. Assets: `assets`
8. Media: `media`

Optional but recommended:

- `learningTrack` for student-oriented packaging
- `disclaimer` for professional boundary context

## 3. Visual Blocks Reference

`visual.type = "sld"`

- Provide `sld.nodes` and `sld.edges`
- `nodes` use normalized coordinates (`x`, `y`) in percent (0-100)
- Keep labels short so nodes remain readable on mobile

`visual.type = "before-after"`

- Provide `beforeAfter` metrics with `before`, `after`, `unit`
- Set `direction` to `"higher"` or `"lower"` for improvement logic

`visual.type = "profile"`

- Provide `profile` metrics with `value` and `max`
- Keep `max` consistent within a visual (typically `100`)

## 4. Section-to-Visual Linking

For section-specific relevance, use:

- `section.visualIds = ["visual-id-a", "visual-id-b"]`

This enables linked visual chips in section cards and section expand views.

## 5. Media and Asset Paths

Use static paths under:

- `/project-assets/engineering/...`

Common asset kinds:

- `image`, `video`, `pdf`, `link`

Preview support:

- Images and videos open in modal
- PDFs open embedded in modal

## 6. Quality Checklist Before Commit

Run:

```bash
npm run check
```

Manual validation checklist:

1. Sidebar search/filter returns expected studies.
2. Prev/Next navigation updates correctly within filtered results.
3. SLD nodes are clickable and readable on desktop + mobile.
4. Before/after and profile animations render without layout shift.
5. Expand buttons open full views for overview, sections, and visuals.
6. Side panel remains sticky on large screens; main content scrolls independently.
7. Theme contrast is readable in light/dark contexts.
8. Media and asset previews open and close correctly.

## 7. Release Notes Convention

When updating this page, include in your PR description:

1. Case studies added/changed
2. Visual blocks added/changed
3. New asset paths
4. Any route/CTA behavior changes
5. Validation steps executed (`npm run check`, manual checks)
