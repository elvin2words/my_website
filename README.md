# Elvin Mazwimairi Portfolio

Modern portfolio platform built with React + TypeScript on the client and Express on the server.

## Overview

This project powers my multi-circle personal brand site:

- `EngCircle` (engineering)
- `CodeCircle` (software projects)
- `DesignCircle` (creative work, gallery, writings)
- `BizCircle` / technopreneur track

It also includes dynamic content APIs so media and writing files are automatically discovered from folders.

## Tech Stack

- Frontend: `React`, `TypeScript`, `Wouter`, `Tailwind CSS`, `shadcn/ui`, `Framer Motion`
- Backend: `Express`, `TypeScript`
- Build: `Vite` (client) + `esbuild` (server bundle)
- Data layer: currently file/folder-driven for portfolio content, with schema support in `shared/`

## Project Structure

```txt
client/
  public/
    gallery/            # photo gallery source files
    creatives/          # design/creative source files
    writings/           # markdown/text writing files
  src/
    components/
    data/
    hooks/
    pages/
server/
  routes.ts             # content discovery APIs
shared/
  schema.ts
```

## Content Automation

### Gallery

Files dropped into:

`client/public/gallery`

Behavior:

- files at root -> `General` concept
- files inside subfolders -> folder name becomes concept
- gallery page auto-loads from `/api/content/gallery`

### Creatives / DesignCircle

Files dropped into:

`client/public/creatives`

Behavior:

- same concept rules as gallery
- supports current image workflows and future media growth (video / 3D / docs metadata in API)
- design page auto-loads from `/api/content/designs`

### Blog + Writings

Files dropped into:

`client/public/writings`

Supported extensions:

- `.md`
- `.markdown`
- `.txt`

Frontmatter example:

```md
---
title: Building a Living Portfolio System
date: 2026-02-08
kind: blog
status: published
tags: portfolio, systems
collection: General
link: https://elvinmazwi.me
coverImage: /gallery/Zz4/20250623_120419.jpg
---
```

Notes:

- root files -> `General`
- folder files -> concept by folder
- `link` supports embedded external references
- `coverImage` supports image preview (future-ready)
- page auto-loads from `/api/content/writings`

## Theme System (Dark / Light)

Theme support is class-based with persistence:

- provider: `client/src/components/theme-provider.tsx`
- hook used by headers/buttons: `client/src/hooks/use-theme.ts`
- theme class applied on `html` element (`light` / `dark`)
- preference stored in `localStorage` (`theme`)

The app now uses shared CSS tokens so both themes render consistently.

## Routes

Core routes include:

- `/`
- `/engineer`
- `/developer`
- `/creative/portfolio`
- `/creative/gallery`
- `/creative/visual-designs`
- `/blog`
- `/technopreneur`
- `/privacy-policy`
- `/terms-of-service`

## AI Search + Chat

The app now includes:

- AI-powered search endpoint: `POST /api/ai/search`
- AI chat endpoint: `POST /api/ai/chat`
- AI reindex endpoint: `POST /api/ai/reindex`
- Referenced responses (site links + citations when available)

### Eddy Backend Wiring

To route AI responses to my Eddy backend, we have the following template:

```bash
EDDY_AI_BACKEND_URL="https://eddy.iqal.me/v1/chat/completions"
EDDY_AI_API_KEY="api-key"
EDDY_AI_AUTH_HEADER="Authorization"
EDDY_AI_MODEL="eddy-model-id"
EDDY_AI_MODE="openai" # or "generic"
EDDY_AI_TIMEOUT_MS="20000"
EDDY_AI_SYSTEM_PROMPT="Assistant behavior instructions"
```

If `EDDY_AI_BACKEND_URL` is not set, APIs fall back to local site-index retrieval and still return referenced results.

## Legal Pages

Added:

- `Privacy Policy` page
- `Terms of Service` page

Footer links now route to those pages.

## Scripts

```bash
npm run dev
npm run dev:api
npm run build
npm run start
```

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Optional API-only mode (when running client Vite separately):

```bash
npm run dev:api
```

4. Open local URL shown by Express/Vite.

## Deployment

### Vercel (Full Stack)

- Deploy from repository root (not `client/`).
- Static frontend is built to `client/dist`.
- Express API is served as a Vercel function via `api/[...route].ts`.
- Content manifests are generated at build time into `server/generated/content` so API content endpoints work in serverless mode.

If this project was previously configured as a client-only app on Vercel, update Project Settings:

- `Root Directory`: set to repository root (`.`), not `client`
- `Framework Preset`: `Other` (or leave unset and allow `vercel.json` to drive build behavior)
- `Build Command`: clear any override (or set to `npm run vercel:build`)
- `Output Directory`: clear any override (or set to `client/dist`)
- `Install Command`: clear any override (or set to `npm install && npm run build:content-manifests`)
- `Node.js Version`: use `20.x`+
- Save settings, then trigger a new deployment

Important:

- This repository now uses only the root `vercel.json`.
- Do not keep a second `vercel.json` in `client/`.

Build flow used on Vercel:

```bash
npm run vercel:build
```

Set required environment variables in Vercel for backend features (for example `DATABASE_URL`, SMTP settings, and Eddy AI variables if used).

### Self-Hosted Node

Production build bundles:

- client assets to `dist/public`
- server entry to `dist/index.js`

Use:

```bash
npm run build
npm run start
```

## Notes

- Some large chunk warnings may appear in production builds due to rich UI dependencies.
- If folder content is updated while app is open, need to use in-page refresh buttons on gallery/design/writings pages.
