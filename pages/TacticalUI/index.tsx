import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import Tag from '@/components/Tag';

interface Practice {
  id: string;
  icon: string;
  title: string;
  tag: string;
  points: string[];
}

const practices: Practice[] = [
  {
    id: 'design-systems',
    icon: 'design_services',
    title: 'DESIGN_SYSTEM_ARCHITECTURE',
    tag: 'FOUNDATION',
    points: [
      'Build a single source of truth: tokens → primitives → components → patterns → pages.',
      'Design tokens (color, spacing, typography, elevation) as variables — never hardcode raw values.',
      'Component API contracts first: define props, variants, and states before visual implementation.',
      'Atomic Design methodology keeps components composable and independently testable.',
      'Version your design system like software — breaking changes deserve major version bumps.',
    ],
  },
  {
    id: 'accessibility',
    icon: 'accessibility_new',
    title: 'ACCESSIBILITY_&_INCLUSIVITY',
    tag: 'A11Y',
    points: [
      'Target WCAG 2.2 AA as the minimum bar — AAA for text-heavy or public-sector products.',
      'Semantic HTML is the cheapest accessibility win: use <button>, <nav>, <main>, <article> correctly.',
      'Minimum contrast ratio 4.5:1 for normal text, 3:1 for large text and UI components.',
      'Every interactive element must be keyboard-focusable with a visible focus ring — never outline: none without a replacement.',
      'Test with real screen readers (NVDA, VoiceOver) not just automated axe/Lighthouse audits.',
    ],
  },
  {
    id: 'performance',
    icon: 'speed',
    title: 'RENDERING_PERFORMANCE',
    tag: 'PERF',
    points: [
      'Core Web Vitals targets: LCP < 2.5 s, INP < 200 ms, CLS < 0.1 — measure in field data, not just lab.',
      'Code-split at the route level; lazy-load below-the-fold components and heavy third-party libraries.',
      'Avoid layout thrash: batch DOM reads before writes; use CSS transforms instead of top/left for animation.',
      'Virtualise long lists (react-virtual, TanStack Virtual) — never render thousands of DOM nodes.',
      'Prefer CSS animations over JS-driven ones; use will-change sparingly and only where profiling proves benefit.',
    ],
  },
  {
    id: 'responsive',
    icon: 'devices',
    title: 'RESPONSIVE_&_ADAPTIVE_DESIGN',
    tag: 'LAYOUT',
    points: [
      'Mobile-first CSS: write base styles for small screens, then layer up with min-width breakpoints.',
      'Fluid typography and spacing with clamp() — eliminate abrupt jumps between fixed breakpoint sizes.',
      'CSS Grid for two-dimensional layouts; Flexbox for one-dimensional alignment — use the right tool.',
      'Touch targets minimum 44×44 px (Apple HIG) / 48×48 dp (Material) on mobile.',
      'Test on real devices, not just browser DevTools emulation — DevTools does not replicate input latency or font rendering.',
    ],
  },
  {
    id: 'state-ux',
    icon: 'psychology',
    title: 'INTERACTION_&_STATE_DESIGN',
    tag: 'UX_PATTERNS',
    points: [
      'Model UI state explicitly: every component should handle loading, empty, error, and success states.',
      'Optimistic UI updates with rollback on failure reduce perceived latency for common actions.',
      'Skeleton screens over spinners for content-heavy loads — they reduce perceived wait time.',
      'Undo over confirmation dialogs for destructive actions — less friction, same safety net.',
      'Debounce search inputs (300–500 ms); throttle scroll/resize handlers to avoid janky experiences.',
    ],
  },
  {
    id: 'forms',
    icon: 'edit_note',
    title: 'FORMS_&_DATA_ENTRY',
    tag: 'INPUT_DESIGN',
    points: [
      'Inline validation on blur, not on change — on-change errors feel punishing before the user finishes.',
      'Always show a visible label; placeholder text is not a label substitute — it disappears on focus.',
      'Group related fields visually and logically; long forms should be split into steps with progress indicators.',
      'Autofill-friendly: correct autocomplete attributes on name, email, address, and card fields.',
      'Error messages must say what went wrong and how to fix it — "Invalid input" is not an error message.',
    ],
  },
  {
    id: 'typography',
    icon: 'text_fields',
    title: 'TYPOGRAPHY_&_VISUAL_HIERARCHY',
    tag: 'VISUAL_DESIGN',
    points: [
      'Limit to 2–3 typefaces per product; pair a display face for headings with a legible workhorse for body.',
      'Body text line-length 60–80 characters for optimal readability; use max-width on text containers.',
      'Line-height 1.4–1.6 for body copy; tighter (1.1–1.2) for large display headings only.',
      'Type scale built on a ratio (Major Third 1.25, Perfect Fourth 1.333) ensures consistent visual rhythm.',
      'Never use font-weight below 400 for body text on screen; thin fonts sacrifice legibility for aesthetics.',
    ],
  },
  {
    id: 'testing',
    icon: 'bug_report',
    title: 'UI_TESTING_STRATEGY',
    tag: 'QUALITY',
    points: [
      'Visual regression tests (Chromatic, Percy) catch unintended style changes across component variants.',
      'Component tests with Testing Library: query by accessible role/label, not implementation details.',
      'E2E tests (Playwright, Cypress) for critical user journeys only — they are expensive; keep the suite lean.',
      'Storybook as a living component catalogue — every component state documented and visually tested.',
      'Accessibility audits automated in CI with axe-core; fix violations before merging, not after release.',
    ],
  },
];

const tagColors: Record<string, string> = {
  FOUNDATION: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  A11Y: 'text-green-400 border-green-400/30 bg-green-400/5',
  PERF: 'text-red-400 border-red-400/30 bg-red-400/5',
  LAYOUT: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  UX_PATTERNS: 'text-primary border-primary/30 bg-primary/5',
  INPUT_DESIGN: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
  VISUAL_DESIGN: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
  QUALITY: 'text-pink-400 border-pink-400/30 bg-pink-400/5',
};

const PracticeCard: React.FC<Practice> = ({ id, icon, title, tag, points }) => (
  <article
    key={id}
    className="bg-surface-terminal border border-primary/10 p-6 flex flex-col gap-4 hover:border-primary/30 transition-colors"
  >
    <header className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
        <h3 className="text-white font-bold text-xs tracking-widest uppercase">{title}</h3>
      </div>
      <Tag label={tag} colorClass={tagColors[tag]} />
    </header>
    <ul className="flex flex-col gap-2">
      {points.map((p, i) => (
        <li key={i} className="flex gap-2 text-slate-400 text-xs font-mono leading-relaxed">
          <span className="text-primary/50 shrink-0 mt-0.5">▸</span>
          <span>{p}</span>
        </li>
      ))}
    </ul>
  </article>
);

const TacticalUI: React.FC = () => (
  <section className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">
    <PageHeader
      eyebrow="Design Systems · VX"
      titleMain="Tactical"
      titleAccent="UI/UX"
      description="Opinionated principles and battle-tested patterns for building accessible, performant, and maintainable web interfaces."
    />

    {/* Stats bar */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary/10 border border-primary/10">
      {[
        { label: 'PATTERNS', value: '8' },
        { label: 'PRINCIPLES', value: '40+' },
        { label: 'A11Y_TARGET', value: 'WCAG_AA' },
        { label: 'LCP_TARGET', value: '<2.5s' },
      ].map(stat => (
        <div key={stat.label} className="bg-bg-dark px-6 py-4 flex flex-col gap-1">
          <span className="text-primary text-2xl font-black font-display">{stat.value}</span>
          <span className="text-slate-400 text-[9px] font-bold tracking-[0.3em] uppercase">{stat.label}</span>
        </div>
      ))}
    </div>

    {/* Info banner */}
    <div className="border border-primary/20 bg-primary/5 px-4 py-3 flex items-start gap-3">
      <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">info</span>
      <p className="text-primary/70 text-[10px] font-mono leading-relaxed uppercase tracking-wider">
        Good UI is invisible — users accomplish their goals without thinking about the interface. Good UX is intentional — every friction point removed is a conversion point gained.
      </p>
    </div>

    {/* Practice cards grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10 border border-primary/10">
      {practices.map(p => (
        <PracticeCard key={p.id} {...p} />
      ))}
    </div>
  </section>
);

export default TacticalUI;
