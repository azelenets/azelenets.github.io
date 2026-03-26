![LinkedIn Banners — Andrii Zelenets](public/images/repo-banner.avif)

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
- Local font assets bundled by Vite (JetBrains Mono, Orbitron, Space Grotesk, Material Symbols)

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
npm run dev        # Start Vite dev server
npm run build      # Production build to ./dist
npm run preview    # Preview production build locally
npm run test       # Run unit tests (single pass)
npm run test:watch # Run unit tests in watch mode
npm run lint       # Run ESLint
npm run lint:fix   # Run ESLint with auto-fixes
```

## Testing

Unit tests are written with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

**Stack:** Vitest + `@testing-library/react` + `@testing-library/user-event` + `jsdom`

Test files live under `test/`, mirroring the source structure:

```
test/
├── setup.ts                          # jest-dom matchers setup
├── App.test.tsx                      # Routing and layout integration
├── constants/
│   ├── navigation.test.ts            # navItems shape and integrity
│   ├── lab.test.ts                   # labCards shape, links
│   └── arsenal.test.ts               # stackColumns and specCards shape
├── components/
│   ├── StatCard.test.tsx             # Progress bar vs. segmented render
│   └── layout/
│       ├── PageHeader.test.tsx       # Optional props rendering
│       ├── PrivacyBanner.test.tsx    # localStorage logic, dismiss/acknowledge
│       └── Navigation.test.tsx       # formatCoord, geo states, mobile menu
└── pages/
    ├── Arsenal/
    │   ├── CliFilter.test.tsx        # Controlled input, onChange behaviour
    │   └── Arsenal.test.tsx          # Filter by title/item, empty state
    └── Laboratory/
        └── LabCard.test.tsx          # Link vs. span action, color variants
```

## Deployment

Deployment is automated through GitHub Actions:

- Workflow: `.github/workflows/deploy.yml`
- Trigger: push to `main`
- Build output: `dist/`
- Target: GitHub Pages (`actions/deploy-pages`)

## Asset caching

Font files are bundled through Vite's asset pipeline rather than served from `public/`.
That gives them content-hashed URLs in `dist/assets`, which is the safe prerequisite for long cache lifetimes recommended by Chrome's "Use efficient cache lifetimes" guidance.
GitHub Pages header policy is not configured in this repo, so if you later front the site with a proxy/CDN, set font responses to `Cache-Control: public, max-age=31536000, immutable`.
