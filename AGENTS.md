# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Snapshot

This is a client-rendered React 19 app built with TypeScript and Vite. It is deployed as a static site to GitHub Pages.

- Bootstrap: `index.tsx`
- App shell and routes: `App.tsx`
- Route module registry and preloading: `lib/routeModules.ts`
- Pages: `pages/`
- Shared UI: `components/`
- Static content/data: `constants/`
- Utilities: `lib/`
- Tests: `test/`

Do not apply Next.js, SSR, or server-component guidance here. This codebase is a browser-only SPA using `react-router-dom`.

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run lint:fix
npm run typecheck
npm run test
npm run test:watch
npm run checks
```

Before wrapping up code changes, run `npm run checks` unless the task is explicitly documentation-only.

## Verified Conventions

- Use the `@/` path alias for cross-folder imports.
- Route components are default exports.
- Shared components are also usually default exports. Do not mass-convert export style unless there is a concrete reason.
- Tests are primarily mirrored under `test/`, not colocated next to source files.
- Tailwind CSS v4 is used for styling.
- React Router routes are declared in `App.tsx`, while lazy import resolution lives in `lib/routeModules.ts`.

## React App Best Practices

### Component Design

- Prefer simple function components with typed props. Avoid class components.
- Prefer plain prop typing over `React.FC` for new components.
- Keep render logic pure. Compute derived values during render when possible instead of syncing them through state.
- Extract repeated view primitives or dense JSX into small local components when it improves readability.
- Avoid wrapper elements that exist only for structure. Use fragments when no DOM node is needed.

### State, Effects, and Events

- Reach for `useState` only for values that genuinely change over time.
- Use lazy state initialization when the initial value is non-trivial.
- Do not use `useEffect` to respond to clicks, typing, or route intent; keep interaction logic in event handlers.
- Effects should be reserved for real side effects: subscriptions, timers, DOM integration, analytics, and network/browser APIs.
- Every effect must either be dependency-complete or be restructured so it no longer needs unstable values.
- When an effect needs access to the latest props/state without re-subscribing, prefer React 19 patterns such as `useEffectEvent` over stale-closure workarounds.
- For non-urgent UI updates that can yield to interaction, prefer `startTransition`; for expensive derived filtering of typed input, consider `useDeferredValue`.

### Memoization

- Do not add `useMemo` or `useCallback` by default.
- Add memoization only when it protects a real boundary: stable props for a memoized child, expensive recalculation, or effect dependency control that cannot be simplified away.
- Preserve existing `memo(...)` usage unless it is clearly unnecessary and you are already touching that component for a reason.

### Routing and Code Splitting

- New routes must be wired in both `App.tsx` and `lib/routeModules.ts`.
- If a route should update document metadata, add or update its entry in `PAGE_META` in `App.tsx`.
- Keep route modules lazy-loaded through the existing `lazyRoute()` and `loadKnownRouteModule()` pattern.
- If navigation should preload a route, use the existing preload helpers rather than inventing a second mechanism.

### Browser-Only Constraints

- Code runs in the browser. Guard direct use of browser APIs when needed and keep them inside effects, event handlers, or lazy initializers.
- Do not introduce server-only assumptions, Node-only APIs in UI code, or SSR hydration workarounds that do not apply to Vite SPA rendering.

## TypeScript Guidance

- No `any` unless there is no reasonable alternative and the tradeoff is documented.
- Use `import type` for type-only imports.
- Prefer narrow unions and explicit interfaces/types for component props and structured content.
- Avoid non-null assertions unless the invariant is obvious and local.
- Keep utility modules side-effect free unless the file is explicitly about browser integration, such as `lib/analytics.ts`.

## Styling Guidance

- Prefer Tailwind utilities and existing design tokens over ad hoc inline styles.
- Follow the current visual language: tactical interface, dark surfaces, high-contrast accents, dense typography.
- Keep responsive behavior intentional; check both mobile and desktop layouts when adjusting structure.
- Avoid introducing new styling abstractions unless there is clear repetition that justifies them.

## Accessibility

- Use semantic landmarks and headings.
- Interactive elements must be reachable by keyboard and have an accessible name.
- Preserve focus visibility and avoid click-only interactions.
- External links opened in a new tab must include a safe `rel` value.
- Testing Library queries should prefer roles, labels, and visible text because accessibility is part of the contract.

## Performance

- Prefer direct imports over barrel files for source code that ships to the client.
- Keep bundle growth low. Avoid new dependencies for small problems.
- Use route-level lazy loading for pages and large article modules.
- Keep expensive work out of hot render paths.
- Preload or defer work intentionally; do not front-load code or data that is only needed after user intent.

## Testing

- Use Vitest with Testing Library.
- Add tests under the mirrored `test/` structure unless there is a strong reason to colocate.
- Test user-visible behavior, not implementation details.
- Prefer accessible queries over class selectors or test IDs.
- Update or add tests when changing routing, accessibility, consent flows, analytics hooks, or interactive state.

## Change Workflow

When adding or changing a page or route, verify the full set of touch points:

1. Page component under `pages/`
2. Route registration in `App.tsx`
3. Lazy loader entry in `lib/routeModules.ts`
4. Metadata in `PAGE_META` in `App.tsx`
5. Navigation content in `constants/navigation.ts` if applicable
6. Tests under `test/`

## Avoid

- Do not add Next.js-specific patterns, server actions, or RSC terminology.
- Do not duplicate route-loading logic outside `lib/routeModules.ts`.
- Do not duplicate SEO metadata in multiple places.
- Do not add `console.log`, `@ts-ignore`, or `eslint-disable` without a short justification.
- Do not introduce new runtime dependencies without a clear need.
- Do not rewrite large export-style or formatting patterns as drive-by cleanup.
