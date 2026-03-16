import React from 'react';
import ArticleLayout from '../ArticleLayout';
import { P, H2, H3, Callout, Code } from '../ArticlePrimitives';

/* ─── Prose primitives ────────────────────────────────────────────────────── */


const MetricCard: React.FC<{
  name: string; full: string; good: string; needs: string; poor: string;
  description: string; color: string;
}> = ({ name, full, good, needs, poor, description, color }) => (
  <div className={`border p-5 ${color}`}>
    <div className="flex items-baseline gap-2 mb-2">
      <span className="text-white font-black font-display text-lg">{name}</span>
      <span className="text-[9px] font-mono text-slate-600 tracking-wider">{full}</span>
    </div>
    <p className="text-xs font-mono text-slate-500 leading-5 mb-4">{description}</p>
    <div className="grid grid-cols-3 gap-1 text-[9px] font-bold font-mono text-center">
      <div className="bg-green-400/10 border border-green-400/20 text-green-400/80 px-2 py-1.5">
        GOOD<br />{good}
      </div>
      <div className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400/80 px-2 py-1.5">
        NEEDS WORK<br />{needs}
      </div>
      <div className="bg-red-400/10 border border-red-400/20 text-red-400/80 px-2 py-1.5">
        POOR<br />{poor}
      </div>
    </div>
  </div>
);

const PhaseBar: React.FC<{ label: string; width: string; color: string; note?: string }> = ({ label, width, color, note }) => (
  <div className="mb-3">
    <div className="flex justify-between text-[9px] font-mono text-slate-600 mb-1">
      <span>{label}</span>
      {note && <span className="text-slate-700">{note}</span>}
    </div>
    <div className="h-5 bg-black/40 border border-primary/10 overflow-hidden">
      <div className={`h-full ${color} flex items-center px-2 text-[8px] font-bold font-mono text-black/70 transition-all`} style={{ width }}>
        {label}
      </div>
    </div>
  </div>
);

/* ─── Article ─────────────────────────────────────────────────────────────── */

const CoreWebVitalsINP: React.FC = () => (
  <ArticleLayout
    id="POST_006"
    title="Core Web Vitals in the Real World: INP Is the New LCP"
    category="FRONTEND"
    date="2025-07-14"
    readTime={12}
    tags={['PERFORMANCE', 'WEB_VITALS', 'INP', 'CHROME']}
  >
    <P>
      In March 2024, Google replaced First Input Delay (FID) with Interaction to Next Paint (INP) as a Core Web
      Vital. It was not a minor bookkeeping change. FID was easy to pass — it measured only the input delay of
      the very first interaction, ignoring everything after. INP measures the worst interaction delay across
      the entire page lifetime. It is a fundamentally harder target, and most sites that had green FID scores
      discovered they had poor INP the moment they started measuring it.
    </P>

    <P>
      This is not just a ranking signal problem, though that is real. Pages with poor INP feel sluggish. Clicks
      that do not respond instantly break trust. On low-end Android devices — which represent the majority of
      global web traffic — a React app with unoptimised event handlers can feel like it is running in treacle
      while your MacBook benchmarks show green across the board.
    </P>

    <Callout type="warn">
      Lab tools (Lighthouse, WebPageTest) cannot measure INP. INP is a field metric — it requires real users
      interacting with your page on real devices over real networks. The Chrome User Experience Report (CrUX)
      and the <code>web-vitals</code> JavaScript library are your measurement tools, not Lighthouse.
    </Callout>

    {/* ── Section 1 ── */}
    <H2 num="01">The Core Web Vitals Scorecard</H2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-primary/10 border border-primary/10 my-7">
      <MetricCard
        name="LCP"
        full="Largest Contentful Paint"
        good="≤ 2.5s"
        needs="≤ 4.0s"
        poor="> 4.0s"
        description="Time until the largest visible content element (hero image, heading) is painted. Measures perceived load speed."
        color="border-blue-400/15 bg-blue-400/5"
      />
      <MetricCard
        name="INP"
        full="Interaction to Next Paint"
        good="≤ 200ms"
        needs="≤ 500ms"
        poor="> 500ms"
        description="Latency from user interaction (click, keypress, tap) to next frame paint. Measures runtime responsiveness across the full session."
        color="border-primary/15 bg-primary/5"
      />
      <MetricCard
        name="CLS"
        full="Cumulative Layout Shift"
        good="≤ 0.1"
        needs="≤ 0.25"
        poor="> 0.25"
        description="Sum of unexpected layout shifts weighted by viewport impact. Measures visual stability during and after load."
        color="border-purple-400/15 bg-purple-400/5"
      />
    </div>

    <P>
      All three must be in the "Good" range at the 75th percentile of real user sessions to pass Core Web Vitals.
      The 75th percentile requirement means you cannot optimise only for fast devices and fast networks — you
      must perform well for the slower quarter of your users too.
    </P>

    {/* ── Section 2 ── */}
    <H2 num="02">How INP Is Measured</H2>

    <P>
      INP captures every click, tap, and keypress interaction during a page session. It measures three phases
      from input event to the browser committing the next frame:
    </P>

    <div className="my-7 p-5 border border-primary/10 bg-black/30">
      <PhaseBar label="INPUT DELAY"        width="20%" color="bg-yellow-400/70" note="Time from interaction to event handler start" />
      <PhaseBar label="PROCESSING DURATION" width="50%" color="bg-red-400/70"    note="Time spent running event handlers" />
      <PhaseBar label="PRESENTATION DELAY" width="30%" color="bg-primary/60"    note="Time from handler done to next frame paint" />
      <div className="mt-4 flex justify-between text-[9px] font-mono text-slate-600">
        <span>0ms</span>
        <span className="text-primary/60">← INP = sum of all three phases →</span>
        <span>200ms good threshold</span>
      </div>
    </div>

    <P>
      At the end of the session, INP is reported as the <strong className="text-white">98th percentile</strong>{' '}
      interaction latency — not the worst single interaction, but near-worst. One anomalous slow interaction
      does not tank your score, but consistent slow interactions absolutely will.
    </P>

    <H3>Measuring INP in the field</H3>

    <Code label="web-vitals library — capture INP and send to your analytics endpoint">
{`import { onINP } from 'web-vitals/attribution';

onINP(({ value, rating, attribution }) => {
  const { interactionTarget, interactionType, inputDelay,
          processingDuration, presentationDelay, longAnimationFrameEntries } = attribution;

  // Send to your analytics / RUM platform
  analytics.track('web_vital', {
    metric:               'INP',
    value,                              // milliseconds
    rating,                             // 'good' | 'needs-improvement' | 'poor'
    interactionTarget,                  // CSS selector of the element interacted with
    interactionType,                    // 'pointer' | 'keyboard'
    inputDelay,                         // ms waiting before handler ran
    processingDuration,                 // ms running event handlers
    presentationDelay,                  // ms from handler done to frame
    longAnimationFrames: longAnimationFrameEntries.length,
    url:                  location.href,
    deviceMemory:         (navigator as any).deviceMemory,
    connectionType:       (navigator as any).connection?.effectiveType,
  });
}, { reportAllChanges: false }); // only report final INP value`}
    </Code>

    <P>
      The <code className="text-primary text-xs">attribution</code> object is the key. It tells you exactly
      which element was interacted with, which phase dominated the latency, and which long animation frames
      were active during the interaction. Without attribution, INP scores are numbers without diagnosis.
    </P>

    {/* ── Section 3 ── */}
    <H2 num="03">The Main Thread Is the Bottleneck</H2>

    <P>
      The browser's main thread handles JavaScript execution, style calculation, layout, and paint — sequentially,
      in that order, for every frame. INP is almost always a main-thread problem. The three culprits, in order
      of frequency:
    </P>

    <H3>1. Long tasks — the primary offender</H3>

    <P>
      A long task is any main-thread task that runs for more than 50ms. During a long task, the browser cannot
      respond to user input. If a user clicks a button while a 300ms JavaScript task is running, the input sits
      in a queue — that queuing time becomes your input delay.
    </P>

    <Code label="PerformanceObserver — find long tasks in the field">
{`const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 50) {
      console.warn('Long task detected:', {
        duration:  entry.duration.toFixed(1) + 'ms',
        startTime: entry.startTime.toFixed(1) + 'ms',
        // attribution shows which script caused it (where available)
        attribution: (entry as any).attribution,
      });

      // In production: send to your RUM platform
      analytics.track('long_task', {
        duration:  Math.round(entry.duration),
        startTime: Math.round(entry.startTime),
        url:       location.href,
      });
    }
  }
});

observer.observe({ type: 'longtask', buffered: true });`}
    </Code>

    <H3>2. Unyielded event handlers — the React-specific trap</H3>

    <P>
      React's synchronous render model means a state update triggered by a click handler blocks the main thread
      until the entire component tree has re-rendered, committed to the DOM, and all layout effects have run.
      On a complex page, a single <code className="text-primary text-xs">setState</code> call can produce a
      200–400ms processing duration.
    </P>

    <Code label="The problem — synchronous state update blocks the main thread">
{`// User clicks a filter button on a data-heavy list
function FilterButton({ value, onFilter }: Props) {
  return (
    <button onClick={() => {
      // This triggers a synchronous React render of the entire list
      // If the list has 500 items with complex components, this can
      // take 300ms+ on a mid-range Android device — all main thread,
      // all blocking, all visible as INP latency
      setFilter(value);
    }}>
      {value}
    </button>
  );
}`}
    </Code>

    <Code label="The fix — startTransition yields to the browser between input and render">
{`import { useTransition } from 'react';

function FilterButton({ value, onFilter }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        // The filter state update is marked as a non-urgent transition.
        // React yields to the browser after the click event,
        // allowing it to paint first, then renders the list update.
        // INP measures to the first paint after the click — which now
        // happens immediately, before the expensive render.
        startTransition(() => setFilter(value));
      }}
      aria-busy={isPending}
    >
      {isPending ? 'Filtering...' : value}
    </button>
  );
}`}
    </Code>

    <Callout type="info">
      <code>startTransition</code> does not make the render faster — it makes the interaction feel instant by
      letting the browser paint an intermediate state (the button pressed, the old list still visible) before
      committing the expensive update. INP measures to that first paint, not to the final render completing.
    </Callout>

    <H3>3. Third-party scripts — the invisible tax</H3>

    <P>
      Analytics, tag managers, chat widgets, A/B testing frameworks, ad loaders — each one runs JavaScript on
      your main thread. A single Google Tag Manager container firing five tags on page load can schedule 800ms
      of main-thread work across the first 5 seconds of the session. That work competes directly with your
      event handlers for main-thread time.
    </P>

    <Code label="Audit third-party main-thread impact in Chrome DevTools Performance panel">
{`// In the Chrome DevTools Performance panel:
// 1. Record a trace while interacting with the page
// 2. In the Bottom-Up tab, group by "Domain"
// 3. Third-party domains with > 50ms self time are candidates for removal or deferral

// Programmatically identify third-party long tasks:
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    const scripts = (entry as any).attribution ?? [];
    for (const script of scripts) {
      const isThirdParty = !script.containerSrc?.includes(location.hostname);
      if (isThirdParty && entry.duration > 50) {
        console.warn('Third-party long task:', {
          src:      script.containerSrc,
          duration: entry.duration,
        });
      }
    }
  }
});
observer.observe({ type: 'longtask', buffered: true });`}
    </Code>

    {/* ── Section 4 ── */}
    <H2 num="04">Breaking Up Long Tasks — the scheduler.yield() Pattern</H2>

    <P>
      Not every long task can be replaced with <code className="text-primary text-xs">startTransition</code>.
      Some work genuinely needs to run — processing a large dataset, applying a complex filter, sorting a table.
      The solution is to break the work into chunks and yield back to the browser between each chunk, giving it
      the opportunity to process pending input events.
    </P>

    <Code label="scheduler.yield() — the modern way to yield to the browser mid-task">
{`// scheduler.yield() pauses the current task and re-queues the rest,
// allowing the browser to process input events between chunks.
// It has higher priority than setTimeout(fn, 0) and MessageChannel.

async function processLargeDataset(items: DataItem[]): Promise<Result[]> {
  const results: Result[] = [];
  const CHUNK_SIZE = 50;  // tune based on per-item processing cost

  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    const chunk = items.slice(i, i + CHUNK_SIZE);

    for (const item of chunk) {
      results.push(expensiveTransform(item));
    }

    // Yield to the browser after each chunk.
    // Any pending click/keypress events are processed here
    // before we resume with the next chunk.
    if (i + CHUNK_SIZE < items.length) {
      await scheduler.yield();
    }
  }

  return results;
}

// Polyfill for browsers without scheduler.yield():
const yieldToMain = () =>
  new Promise<void>(resolve => {
    if ('scheduler' in window && 'yield' in (window as any).scheduler) {
      (window as any).scheduler.yield().then(resolve);
    } else {
      setTimeout(resolve, 0);
    }
  });`}
    </Code>

    <H3>Deferring non-critical work with requestIdleCallback</H3>

    <Code label="requestIdleCallback — run non-critical work only when the browser is idle">
{`// Analytics event batching, prefetch triggering, and non-critical
// initialisation should never run synchronously during user interactions.

function scheduleNonCriticalWork(work: () => void) {
  if ('requestIdleCallback' in window) {
    // Run only when the browser has at least 20ms of idle time.
    // If the browser stays busy, the work runs after 2 seconds anyway.
    requestIdleCallback(work, { timeout: 2000 });
  } else {
    // Safari fallback
    setTimeout(work, 200);
  }
}

// Example: batch analytics flushes away from interaction handlers
function trackEvent(name: string, data: object) {
  queue.push({ name, data, timestamp: Date.now() });

  scheduleNonCriticalWork(() => {
    if (queue.length > 0) {
      analytics.flush(queue.splice(0));
    }
  });
}`}
    </Code>

    {/* ── Section 5 ── */}
    <H2 num="05">Input Delay — The Invisible Phase</H2>

    <P>
      Input delay is the gap between when the user interacts and when the browser starts running your event
      handler. Most engineers focus on processing duration (making handlers faster), but input delay can
      contribute 100–200ms of INP latency without a single slow line of code in the handler itself.
    </P>

    <P>
      Input delay is caused by other tasks that are already running when the input arrives. The most common
      sources on a page after load:
    </P>

    <div className="grid grid-cols-1 gap-3 my-7">
      {[
        {
          source: 'hydration tasks',
          impact: 'React / framework hydration on page load runs a large synchronous task. Any input during this window is queued.',
          fix: 'Partial hydration (Islands architecture), streaming SSR with Suspense, or defer hydration of below-fold components.',
          color: 'border-red-400/20 bg-red-400/5',
          tag: 'text-red-400/60',
        },
        {
          source: 'setInterval / polling',
          impact: 'Interval callbacks firing every 100–500ms create a continuous stream of small tasks that can delay input processing.',
          fix: 'Replace polling with WebSockets or SSE; if polling is unavoidable, use Web Workers for the processing logic.',
          color: 'border-yellow-400/20 bg-yellow-400/5',
          tag: 'text-yellow-400/60',
        },
        {
          source: 'synchronous XHR / fetch in handlers',
          impact: 'Any network call or heavy computation triggered synchronously in a scroll or resize handler blocks the thread continuously.',
          fix: 'Debounce scroll/resize handlers; move computation to requestAnimationFrame or a Web Worker.',
          color: 'border-orange-400/20 bg-orange-400/5',
          tag: 'text-orange-400/60',
        },
      ].map(item => (
        <div key={item.source} className={`border p-5 ${item.color}`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div>
              <p className={`text-[9px] font-bold tracking-widest mb-1 ${item.tag}`}>SOURCE</p>
              <p className="text-slate-300 font-bold uppercase">{item.source}</p>
            </div>
            <div>
              <p className={`text-[9px] font-bold tracking-widest mb-1 ${item.tag}`}>IMPACT</p>
              <p className="text-slate-400 leading-5">{item.impact}</p>
            </div>
            <div>
              <p className={`text-[9px] font-bold tracking-widest mb-1 ${item.tag}`}>FIX</p>
              <p className="text-slate-400 leading-5">{item.fix}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* ── Section 6 ── */}
    <H2 num="06">Presentation Delay — The Last Mile</H2>

    <P>
      Presentation delay is the time between your event handler completing and the browser actually painting the
      next frame. It is often overlooked because it feels outside the developer's control — but it is not.
    </P>

    <H3>Forced layout and style recalculation</H3>

    <P>
      Reading layout properties (<code className="text-primary text-xs">offsetWidth</code>,{' '}
      <code className="text-primary text-xs">getBoundingClientRect</code>,{' '}
      <code className="text-primary text-xs">scrollTop</code>) after writing to the DOM forces the browser to
      perform a synchronous layout before it can return the value. In a tight loop, this layout thrash can
      add tens of milliseconds to your presentation delay.
    </P>

    <Code label="Layout thrash — reading after writing forces synchronous layout">
{`// ❌ Layout thrash — browser must recalculate layout on every read
function animateItems(items: HTMLElement[]) {
  items.forEach(item => {
    const height = item.offsetHeight;  // READ — forces layout
    item.style.height = height + 10 + 'px';  // WRITE
    // Next iteration reads after write — layout thrash on every item
  });
}

// ✓ Batch reads before writes — one layout calculation total
function animateItemsFast(items: HTMLElement[]) {
  // All reads first
  const heights = items.map(item => item.offsetHeight);

  // Then all writes
  items.forEach((item, i) => {
    item.style.height = heights[i] + 10 + 'px';
  });
}`}
    </Code>

    <H3>Content-visibility for off-screen rendering</H3>

    <Code label="CSS content-visibility — skip rendering of off-screen sections entirely">
{`/* Apply to large off-screen sections to defer their rendering cost.
   The browser skips layout and paint until the section is near the viewport.
   For a page with many sections, this can reduce rendering time by 60–80%. */

.article-section {
  content-visibility: auto;

  /* Hint the browser about the expected rendered height to prevent
     layout shifts when the section becomes visible */
  contain-intrinsic-size: auto 600px;
}

/* Do NOT apply to above-the-fold content — it will delay initial paint */`}
    </Code>

    {/* ── Section 7 ── */}
    <H2 num="07">The INP Debugging Workflow</H2>

    <P>
      A systematic approach to diagnosing and fixing INP issues in production:
    </P>

    <Code label="Step 1 — identify your worst interactions from field data">
{`// Using the web-vitals library with full attribution
onINP(({ value, rating, attribution }) => {
  if (rating !== 'good') {
    // Log the selector of the element the user interacted with
    // and which phase dominated the latency
    console.table({
      element:          attribution.interactionTarget,
      type:             attribution.interactionType,
      totalINP:         value,
      inputDelay:       attribution.inputDelay,
      processingTime:   attribution.processingDuration,
      presentationDelay: attribution.presentationDelay,
      worstPhase: [
        ['inputDelay',       attribution.inputDelay],
        ['processingDuration', attribution.processingDuration],
        ['presentationDelay', attribution.presentationDelay],
      ].sort((a, b) => (b[1] as number) - (a[1] as number))[0][0],
    });
  }
}, { reportAllChanges: true }); // true = log every interaction, not just final`}
    </Code>

    <Code label="Step 2 — reproduce in DevTools with CPU throttling enabled">
{`// In Chrome DevTools:
// 1. Performance panel → gear icon → CPU throttling: 4x or 6x slowdown
//    (simulates mid-range Android device)
// 2. Click "Record" and perform the slow interaction
// 3. Stop recording — look for:
//    - Red triangles in the main thread = long tasks
//    - "Interaction" entries in the Timings lane = INP candidates
//    - "Forced reflow" warnings in the summary

// Key DevTools shortcuts:
// Cmd+Shift+P → "Show rendering" → enable "Frame rendering stats"
// Cmd+Shift+P → "Disable JavaScript" → baseline CLS without JS

// Performance Insights panel (newer DevTools) directly flags
// INP issues and links them to the responsible call stack`}
    </Code>

    <Code label="Step 3 — profile the specific handler with performance.mark()">
{`function handleFilterChange(value: string) {
  performance.mark('filter-start');

  // Phase 1: synchronous work before state update
  const processed = preprocessFilter(value);
  performance.mark('filter-preprocess-done');

  // Phase 2: state update (triggers React render)
  setFilter(processed);
  performance.mark('filter-state-set');

  performance.measure('preprocess', 'filter-start', 'filter-preprocess-done');
  performance.measure('state-update', 'filter-preprocess-done', 'filter-state-set');

  // View in DevTools Performance panel → Timings lane
  // or programmatically:
  const measures = performance.getEntriesByType('measure');
  measures.forEach(m => console.log(m.name, m.duration.toFixed(1) + 'ms'));
}`}
    </Code>

    {/* ── Conclusion ── */}
    <H2 num="08">Conclusion</H2>

    <P>
      INP is harder than LCP because it is a runtime problem, not a load-time problem. You cannot fix it by
      optimising images, adding a CDN, or tuning your server's time-to-first-byte. It requires understanding
      the browser's rendering pipeline, the main thread's scheduling model, and the specific interaction
      patterns of your users on their actual devices.
    </P>

    <P>
      The diagnostic path is always the same: measure in the field with attribution, identify the dominant
      phase, reproduce with CPU throttling, profile the responsible code, and apply the right fix —{' '}
      <code className="text-primary text-xs">startTransition</code> for expensive renders,{' '}
      <code className="text-primary text-xs">scheduler.yield()</code> for long synchronous tasks,
      third-party script audits for input delay, and layout batching for presentation delay.
    </P>

    <Callout type="info">
      Start with your worst interactions first — the ones your <code>web-vitals</code> attribution data
      identifies as highest latency on the most common elements. Fixing the top three interactions on a
      typical e-commerce page will often move you from "Needs Improvement" to "Good" faster than any
      architectural change.
    </Callout>
  </ArticleLayout>
);

export default CoreWebVitalsINP;
