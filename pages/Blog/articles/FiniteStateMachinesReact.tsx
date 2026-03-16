import React from 'react';
import ArticleLayout from '../ArticleLayout';
import { P, H2, H3, Callout, Code } from '../ArticlePrimitives';

/* ─── Prose primitives ────────────────────────────────────────────────────── */


const StateNode: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <div className={`border px-3 py-2 text-[10px] font-bold font-mono tracking-widest text-center min-w-[90px] transition-colors
    ${active
      ? 'border-primary bg-primary/10 text-primary'
      : 'border-primary/20 bg-primary/5 text-primary/50'}`}>
    {label}
  </div>
);

const TransitionArrow: React.FC<{ label: string; dir?: 'right' | 'down' }> = ({ label, dir = 'right' }) => (
  <div className={`flex ${dir === 'down' ? 'flex-col' : 'flex-row'} items-center text-slate-600 gap-1`}>
    {dir === 'right' ? (
      <>
        <div className="flex-1 h-px bg-primary/20 min-w-[24px]" />
        <span className="text-[8px] font-mono text-slate-700 whitespace-nowrap">{label}</span>
        <span className="text-primary/40 text-xs">›</span>
      </>
    ) : (
      <>
        <div className="w-px flex-1 bg-primary/20 min-h-[16px]" />
        <span className="text-[8px] font-mono text-slate-700 whitespace-nowrap">{label}</span>
        <span className="text-primary/40 text-xs rotate-90">›</span>
      </>
    )}
  </div>
);

const BugCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border border-red-400/15 bg-red-400/5 p-4 my-3">
    <p className="text-[9px] font-bold font-mono text-red-400/60 tracking-widest mb-1.5">BUG PATTERN</p>
    <p className="text-xs font-bold text-slate-300 mb-1">{title}</p>
    <p className="text-xs font-mono text-slate-500 leading-5">{children}</p>
  </div>
);

/* ─── Article ─────────────────────────────────────────────────────────────── */

const FiniteStateMachinesReact: React.FC = () => (
  <ArticleLayout
    id="POST_005"
    title="Rethinking Component State: Finite State Machines in React"
    category="FRONTEND"
    date="2025-08-05"
    readTime={10}
    tags={['REACT', 'STATE_MACHINES', 'UX', 'XSTATE']}
  >
    <P>
      There is a class of UI bug that is uniquely frustrating to debug: the ones that only happen in a specific
      sequence of user actions, that disappear when you add a <code className="text-primary text-xs">console.log</code>,
      and that your component tests never catch because they test states, not transitions between them.
    </P>

    <P>
      A button that stays in a loading spinner after a successful submission. A form that can be submitted twice
      if the user clicks fast enough. An error message that persists after the user corrects their input and
      retries. These bugs share a root cause: the component's state is a collection of independent boolean flags
      rather than an explicit model of what the component is actually doing.
    </P>

    <P>
      Finite State Machines (FSMs) are the cure. They have been a cornerstone of computer science since the 1950s
      and apply directly to UI components. This article shows why boolean-flag state management breaks down, how
      FSMs fix it, and how to apply the pattern in React — from a hand-rolled <code className="text-primary text-xs">useReducer</code> to
      full XState.
    </P>

    {/* ── Section 1 ── */}
    <H2 num="01">The Boolean Flag Problem</H2>

    <P>
      Most React state for async operations looks like this:
    </P>

    <Code label="The classic boolean flag approach — deceptively simple">
{`const [data, setData]       = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError]     = useState(null);

async function fetchData() {
  setIsLoading(true);
  try {
    const result = await api.getData();
    setData(result);
  } catch (e) {
    setError(e);
  } finally {
    setIsLoading(false);
  }
}`}
    </Code>

    <P>
      Three booleans, eight possible combinations. How many of those combinations are actually valid? Two, maybe
      three. The rest are impossible states that your component has no protection against entering.
    </P>

    <div className="my-7 border border-primary/10 overflow-hidden">
      <div className="grid grid-cols-4 text-[9px] font-bold font-mono tracking-widest bg-primary/10">
        <div className="px-4 py-2 text-primary/50">isLoading</div>
        <div className="px-4 py-2 text-primary/50">error</div>
        <div className="px-4 py-2 text-primary/50">data</div>
        <div className="px-4 py-2 text-primary/50">VALID?</div>
      </div>
      {[
        ['false', 'null',   'null',   '✓  idle — initial state'],
        ['true',  'null',   'null',   '✓  loading'],
        ['false', 'null',   'result', '✓  success'],
        ['false', 'Error',  'null',   '✓  error'],
        ['true',  'Error',  'null',   '✗  loading AND error simultaneously?'],
        ['true',  'null',   'result', '✗  loading AND has data — stale + loading?'],
        ['false', 'Error',  'result', '✗  error AND has data — which wins?'],
        ['true',  'Error',  'result', '✗  all three — completely undefined'],
      ].map(([loading, error, data, valid]) => (
        <div key={valid} className={`grid grid-cols-4 text-xs font-mono border-t border-primary/5
          ${valid.startsWith('✗') ? 'bg-red-400/5' : 'bg-bg-dark'}`}>
          <div className="px-4 py-2 text-slate-500">{loading}</div>
          <div className="px-4 py-2 text-slate-500">{error}</div>
          <div className="px-4 py-2 text-slate-500">{data}</div>
          <div className={`px-4 py-2 text-[10px] ${valid.startsWith('✓') ? 'text-primary/60' : 'text-red-400/70'}`}>{valid}</div>
        </div>
      ))}
    </div>

    <P>
      Four impossible states that should never exist — but can, because nothing in the code prevents them.
      The bugs happen in the transitions: a race condition sets <code className="text-primary text-xs">isLoading = false</code>{' '}
      before <code className="text-primary text-xs">error</code> is cleared from a previous attempt, a retry
      starts before the previous error state is reset, a slow network response arrives after the component has
      already succeeded with a cached result.
    </P>

    <BugCard title="The double-submit race">
      User clicks Submit. isLoading becomes true. Network is slow. User clicks again. A second request fires
      — isLoading was already true but nothing blocked the handler. Both responses race. The second one wins
      and sets data; then the first one arrives and overwrites it with stale data.
    </BugCard>

    <BugCard title="The ghost error">
      User submits a form. It fails — error is set. User fixes the input and retries. The new request fires,
      isLoading becomes true, but error is not cleared yet. The UI shows a loading spinner AND an error
      message simultaneously. Users report "the form looks broken."
    </BugCard>

    <BugCard title="The zombie loader">
      Component mounts and fetches. User navigates away — component unmounts. The fetch resolves, calls
      setIsLoading(false) and setData(result) on an unmounted component. React warns. In older code without
      the warning, the state update fires and the component re-renders — into a success state it was never
      supposed to reach.
    </BugCard>

    {/* ── Section 2 ── */}
    <H2 num="02">What a Finite State Machine Is</H2>

    <P>
      A Finite State Machine is a model with a fixed set of states, a set of events that trigger transitions
      between those states, and rules governing which transitions are valid from which states. At any moment,
      the machine is in exactly one state.
    </P>

    <P>
      For a data-fetching component, the states are obvious once you name them explicitly:
    </P>

    <div className="flex flex-wrap items-center gap-2 my-7 p-5 border border-primary/10 bg-black/30 overflow-x-auto">
      <StateNode label="IDLE" active />
      <TransitionArrow label="FETCH" />
      <StateNode label="LOADING" />
      <TransitionArrow label="SUCCESS" />
      <StateNode label="SUCCESS" />
      <div className="w-full sm:hidden" />
      <div className="hidden sm:flex items-center gap-2 ml-4 text-slate-600">
        <span className="text-[9px] font-mono">LOADING</span>
        <TransitionArrow label="FAILURE" />
        <StateNode label="ERROR" />
        <TransitionArrow label="RETRY" />
        <StateNode label="LOADING" />
      </div>
    </div>

    <P>
      With explicit states, impossible combinations disappear by construction. The machine cannot be
      simultaneously in LOADING and ERROR — it is in one state at a time. Transitions are the only way to move
      between states, and transitions can enforce guards (conditions) and side effects (actions).
    </P>

    {/* ── Section 3 ── */}
    <H2 num="03">Hand-Rolled FSM with useReducer</H2>

    <P>
      You do not need XState to get FSM benefits. A <code className="text-primary text-xs">useReducer</code> with
      an explicit state discriminant gives you most of the value with zero dependencies. The key discipline:
      the <code className="text-primary text-xs">status</code> field is the single source of truth for which
      state the machine is in.
    </P>

    <Code label="TypeScript — explicit state union eliminates impossible states at the type level">
{`// Every valid state is a discriminated union — impossible states
// cannot be expressed in the type system

type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error';   error: Error; retryCount: number };

type FetchEvent<T> =
  | { type: 'FETCH' }
  | { type: 'SUCCESS'; data: T }
  | { type: 'FAILURE'; error: Error }
  | { type: 'RETRY' }
  | { type: 'RESET' };`}
    </Code>

    <Code label="The reducer — transitions are the only way to change state">
{`function fetchReducer<T>(
  state: FetchState<T>,
  event: FetchEvent<T>,
): FetchState<T> {
  switch (state.status) {

    case 'idle':
      if (event.type === 'FETCH') return { status: 'loading' };
      return state; // ignore all other events in idle

    case 'loading':
      if (event.type === 'SUCCESS') return { status: 'success', data: event.data };
      if (event.type === 'FAILURE') return { status: 'error', error: event.error, retryCount: 0 };
      return state; // double-submit protection: FETCH ignored while loading

    case 'success':
      if (event.type === 'FETCH') return { status: 'loading' }; // allow refresh
      if (event.type === 'RESET') return { status: 'idle' };
      return state;

    case 'error':
      if (event.type === 'RETRY') return { status: 'loading' };
      if (event.type === 'RESET') return { status: 'idle' };
      return state;

    default:
      return state;
  }
}`}
    </Code>

    <P>
      Notice what the reducer gives you for free: double-submit protection (the LOADING state ignores FETCH events),
      ghost error elimination (you cannot be in LOADING and ERROR at once), and a clear retryCount field only
      present in the ERROR state where it is actually meaningful.
    </P>

    <Code label="The hook — wiring the reducer to async logic">
{`function useFetch<T>(fetcher: () => Promise<T>) {
  const [state, dispatch] = useReducer(fetchReducer<T>, { status: 'idle' });

  const fetch = useCallback(async () => {
    dispatch({ type: 'FETCH' });
    try {
      const data = await fetcher();
      dispatch({ type: 'SUCCESS', data });
    } catch (error) {
      dispatch({ type: 'FAILURE', error: error as Error });
    }
  }, [fetcher]);

  const retry  = useCallback(() => dispatch({ type: 'RETRY' }), []);
  const reset  = useCallback(() => dispatch({ type: 'RESET'  }), []);

  // Re-fetch when state transitions to loading (covers both FETCH and RETRY)
  useEffect(() => {
    if (state.status === 'loading') {
      fetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  return { state, fetch, retry, reset };
}`}
    </Code>

    <Code label="Component — exhaustive state rendering, no boolean checks">
{`function UserProfile({ userId }: { userId: string }) {
  const { state, fetch } = useFetch(() => api.getUser(userId));

  // Exhaustive switch — TypeScript will error if a state is unhandled
  switch (state.status) {
    case 'idle':
      return <button onClick={fetch}>Load profile</button>;

    case 'loading':
      return <ProfileSkeleton />;

    case 'success':
      return <ProfileCard user={state.data} />;

    case 'error':
      return (
        <ErrorPanel
          message={state.error.message}
          retryCount={state.retryCount}
          onRetry={retry}
        />
      );
  }
}`}
    </Code>

    <Callout type="info">
      The exhaustive <code>switch</code> on <code>state.status</code> is enforced by TypeScript's discriminated
      union. Add a new state to the union and the compiler immediately flags every component that does not handle
      it. Missing states become compile errors, not runtime surprises.
    </Callout>

    {/* ── Section 4 ── */}
    <H2 num="04">Beyond Async — FSMs for Complex UI Logic</H2>

    <P>
      The FSM pattern is not limited to data fetching. Any component with multiple modes of behaviour benefits
      from explicit state modelling. Consider a multi-step checkout form:
    </P>

    <Code label="Multi-step form — state machine with context (extended state)">
{`type CheckoutState =
  | { status: 'cart';     items: CartItem[] }
  | { status: 'shipping'; items: CartItem[]; address?: Address }
  | { status: 'payment';  items: CartItem[]; address: Address }
  | { status: 'review';   items: CartItem[]; address: Address; paymentMethod: PaymentMethod }
  | { status: 'submitting'; order: PendingOrder }
  | { status: 'confirmed';  orderId: string }
  | { status: 'failed';     error: Error; previousOrder: PendingOrder };

type CheckoutEvent =
  | { type: 'PROCEED_TO_SHIPPING' }
  | { type: 'SET_ADDRESS';  address: Address }
  | { type: 'PROCEED_TO_PAYMENT' }
  | { type: 'SET_PAYMENT';  method: PaymentMethod }
  | { type: 'REVIEW' }
  | { type: 'SUBMIT' }
  | { type: 'CONFIRMED'; orderId: string }
  | { type: 'FAILED'; error: Error }
  | { type: 'RETRY' }
  | { type: 'BACK' };`}
    </Code>

    <P>
      Each state carries exactly the data that is available and meaningful at that point in the flow. The
      PAYMENT state has a validated address (non-optional) because you cannot reach payment without one.
      The REVIEW state has both address and payment method. The CONFIRMED state has only an order ID — all
      the intermediate data is gone because it is no longer needed.
    </P>

    <P>
      This is the deeper value of FSMs: they make implicit sequencing constraints explicit in the type system.
      You cannot access <code className="text-primary text-xs">state.address</code> in the CART state because
      it does not exist there. The compiler prevents entire classes of "accessed undefined" errors.
    </P>

    {/* ── Section 5 ── */}
    <H2 num="05">XState — When useReducer Is Not Enough</H2>

    <P>
      The hand-rolled <code className="text-primary text-xs">useReducer</code> approach covers most component-level
      needs. When state logic grows — parallel states, delayed transitions, spawned actors, visualisation — XState
      is the right tool. It implements the W3C SCXML specification and adds statecharts: hierarchical state machines
      with orthogonal regions.
    </P>

    <Code label="XState v5 — the same fetch machine as a proper statechart">
{`import { createMachine, assign } from 'xstate';

const fetchMachine = createMachine({
  id: 'fetch',
  initial: 'idle',
  types: {} as {
    context: { data: User | null; error: Error | null; retryCount: number };
    events:
      | { type: 'FETCH' }
      | { type: 'RETRY' }
      | { type: 'RESET' };
  },
  context: { data: null, error: null, retryCount: 0 },

  states: {
    idle: {
      on: { FETCH: 'loading' },
    },

    loading: {
      invoke: {
        src: 'fetchUser',
        onDone: {
          target: 'success',
          actions: assign({ data: ({ event }) => event.output, error: null }),
        },
        onError: {
          target: 'error',
          actions: assign({ error: ({ event }) => event.error }),
        },
      },
    },

    success: {
      on: {
        FETCH: 'loading',  // allow re-fetch / refresh
        RESET: { target: 'idle', actions: assign({ data: null }) },
      },
    },

    error: {
      on: {
        RETRY: {
          target: 'loading',
          actions: assign({ retryCount: ({ context }) => context.retryCount + 1 }),
        },
        RESET: {
          target: 'idle',
          actions: assign({ error: null, retryCount: 0 }),
        },
      },
    },
  },
});`}
    </Code>

    <Code label="Using the machine in a React component with useMachine">
{`import { useMachine } from '@xstate/react';

function UserProfile({ userId }: { userId: string }) {
  const [state, send] = useMachine(fetchMachine, {
    actors: {
      fetchUser: () => api.getUser(userId),
    },
  });

  if (state.matches('idle'))
    return <button onClick={() => send({ type: 'FETCH' })}>Load</button>;

  if (state.matches('loading'))
    return <ProfileSkeleton />;

  if (state.matches('success'))
    return <ProfileCard user={state.context.data!} />;

  if (state.matches('error'))
    return (
      <ErrorPanel
        message={state.context.error!.message}
        retryCount={state.context.retryCount}
        onRetry={() => send({ type: 'RETRY' })}
      />
    );
}`}
    </Code>

    <H3>The XState DevTools advantage</H3>

    <P>
      XState ships with a browser inspector that visualises the statechart in real time as events fire. You can
      see the current state highlighted, replay event sequences, and share a link to a specific machine state
      with a colleague. For complex flows this is transformative for debugging and onboarding.
    </P>

    <Code label="Enable the XState inspector in development">
{`import { inspect } from '@xstate/inspect';

if (process.env.NODE_ENV === 'development') {
  inspect({ iframe: false }); // opens in a new tab
}

// In useMachine — pass inspect: true to connect to the inspector
const [state, send] = useMachine(fetchMachine, {
  inspect: process.env.NODE_ENV === 'development',
});`}
    </Code>

    {/* ── Section 6 ── */}
    <H2 num="06">Testing State Machines — The Missing Piece</H2>

    <P>
      State machines are significantly easier to test than boolean-flag components because the test structure
      mirrors the machine structure: given a state, send an event, assert the next state. No component rendering
      required for logic tests.
    </P>

    <Code label="Unit testing the reducer — pure function, no React needed">
{`import { fetchReducer } from './fetchReducer';

describe('fetchReducer', () => {
  it('transitions idle → loading on FETCH', () => {
    const state = fetchReducer({ status: 'idle' }, { type: 'FETCH' });
    expect(state.status).toBe('loading');
  });

  it('ignores FETCH events while already loading (double-submit protection)', () => {
    const loadingState = { status: 'loading' } as const;
    const state = fetchReducer(loadingState, { type: 'FETCH' });
    expect(state).toBe(loadingState); // same reference — no change
  });

  it('transitions loading → error on FAILURE', () => {
    const error = new Error('Network failure');
    const state = fetchReducer(
      { status: 'loading' },
      { type: 'FAILURE', error },
    );
    expect(state).toEqual({ status: 'error', error, retryCount: 0 });
  });

  it('preserves retryCount across retries', () => {
    const afterFirstRetry = fetchReducer(
      { status: 'error', error: new Error('x'), retryCount: 0 },
      { type: 'RETRY' },
    );
    // loading state...
    const afterSecondError = fetchReducer(afterFirstRetry, {
      type: 'FAILURE', error: new Error('y'),
    });
    expect(afterSecondError).toMatchObject({ status: 'error', retryCount: 1 });
  });
});`}
    </Code>

    <Callout type="info">
      Testing the reducer as a pure function covers every state transition in milliseconds, with no jsdom, no
      React Testing Library, no async/await. Reserve component-level tests for UI rendering assertions and
      user interaction flows — the state logic is already covered by pure unit tests.
    </Callout>

    {/* ── Section 7 ── */}
    <H2 num="07">When to Use Each Approach</H2>

    <div className="grid grid-cols-1 gap-px bg-primary/10 border border-primary/10 my-7">
      {[
        {
          approach: 'useState (booleans)',
          use: 'Truly independent toggles: isOpen, isVisible, isDarkMode',
          avoid: 'Async operations, multi-step flows, anything with loading/error/success',
          color: 'border-slate-700/50',
          label: 'text-slate-500',
        },
        {
          approach: 'useReducer + discriminated union',
          use: 'Data fetching, form submission, component-local flows with 2–6 states',
          avoid: 'Shared cross-component state, parallel state regions, delayed transitions',
          color: 'border-primary/20',
          label: 'text-primary/60',
        },
        {
          approach: 'XState useMachine',
          use: 'Complex multi-step flows, parallel states, actor-based coordination, visualisation needed',
          avoid: 'Simple toggles or single async calls — XState adds overhead not worth it there',
          color: 'border-blue-400/20',
          label: 'text-blue-400/60',
        },
      ].map(row => (
        <div key={row.approach} className="bg-bg-dark p-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div>
            <p className={`text-[9px] font-bold tracking-widest mb-1 ${row.label}`}>APPROACH</p>
            <p className="text-white font-bold">{row.approach}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold tracking-widest mb-1 text-green-400/60">USE WHEN</p>
            <p className="text-slate-400 leading-5">{row.use}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold tracking-widest mb-1 text-red-400/60">AVOID WHEN</p>
            <p className="text-slate-400 leading-5">{row.avoid}</p>
          </div>
        </div>
      ))}
    </div>

    {/* ── Conclusion ── */}
    <H2 num="08">Conclusion</H2>

    <P>
      The bugs that live in state transitions — the ghost errors, the double submits, the zombie loaders — are
      not caused by missing error handling or insufficient null checks. They are caused by a state model that
      allows impossible combinations to exist. More defensive code in a broken model just papers over the cracks.
    </P>

    <P>
      Finite state machines fix the model. Impossible states become unrepresentable. Transitions become explicit
      and testable. Components become functions of a single, unambiguous status value rather than a maze of
      interconnected boolean flags. The exhaustive switch is not boilerplate — it is the compiler enforcing
      completeness on your behalf.
    </P>

    <Callout type="info">
      You do not need XState to start. Pick the next component you write that has loading, error, and success
      states, replace the three booleans with a discriminated union, and write the reducer. The reduction in
      bug surface area will be immediately apparent — and you will not go back.
    </Callout>
  </ArticleLayout>
);

export default FiniteStateMachinesReact;
