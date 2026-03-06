![LinkedIn Banners — Andrii Zelenets](images/repo-banner.avif)

# Andrii Zelenets - Aegis Tactical Interface

Tactical-themed personal portfolio built with React + TypeScript + Vite.

The interface presents professional experience and capabilities as a mission control dashboard, with route-based modules for mission history, tech stack, R&D work, delivery protocols, and credentials.

## What this project includes

- Single-page React app with client-side routing (`react-router-dom`)
- Lazy-loaded route modules for better initial load behavior
- Tactical HUD-style UI with Tailwind utility classes and custom CSS overlays
- Privacy acknowledgment banner persisted in `localStorage`
- Geolocation and UTC telemetry widgets in navigation
- Hero diagnostics (public IP lookup + vibration pattern when supported)

## Route map

- `/` - Overview / hero module
- `/mission` - Mission log timeline
- `/arsenal` - Tech stack matrix with CLI-style search filter
- `/lab` - Experimental projects lab
- `/protocols` - Working model and delivery protocols
- `/credentials` - Education, courses, and skills dossier

## Tech stack

- React 19
- TypeScript
- Vite 6
- React Router 7
- ESLint 9 + TypeScript/React plugins
- Tailwind CSS (via CDN config in `index.html`)
- Google Fonts + Material Symbols

## Local development

Prerequisites:

- Node.js (Node 22 is used in CI)
- npm

Install and run:

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000` by default.

## Available scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build to ./dist
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
npm run lint:fix  # Run ESLint with auto-fixes
```

## Deployment

Deployment is automated through GitHub Actions:

- Workflow: `.github/workflows/deploy.yml`
- Trigger: push to `main`
- Build output: `dist/`
- Target: GitHub Pages (`actions/deploy-pages`)

## Notes

- The current app does not require API keys to run.
- `vite.config.ts` still defines `GEMINI_API_KEY` env mappings, but no runtime feature currently depends on them.
