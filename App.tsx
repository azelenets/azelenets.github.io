import { Suspense, lazy, useEffect, type ComponentType } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PrivacyBanner from '@/components/layout/PrivacyBanner';
import Hero from '@/pages/Hero';
import { initializeAnalytics, readConsentChoice, setupClickTracking, trackVirtualPageView } from '@/lib/analytics';
import { loadKnownRouteModule } from '@/lib/routeModules';

const SITE_URL = 'https://azelenets.github.io';

interface PageMeta { title: string; description: string; date?: string; tags?: string[]; image?: string; }

const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'Andrii Zelenets // Tactical Software Engineering Unit',
    description: 'Andrii Zelenets — AI-powered full-stack software engineer specialising in distributed systems, Ruby on Rails, React, NestJS, and cloud-native architecture.',
  },
  '/mission': {
    title: 'Mission Log // Andrii Zelenets',
    description: 'Engineering mission log — a timeline of Andrii Zelenets\'s key engagements across startups, scale-ups, and enterprise organisations.',
  },
  '/arsenal': {
    title: 'Tech Stack Arsenal // Andrii Zelenets',
    description: 'Full-stack tech arsenal spanning 20+ categories: Ruby on Rails, React, NestJS, PostgreSQL, Kafka, Docker, AWS, and more.',
  },
  '/lab': {
    title: 'R&D Lab // Andrii Zelenets',
    description: 'Experimental R&D projects and technical explorations by Andrii Zelenets — side projects, prototypes, and open-source work.',
  },
  '/protocols': {
    title: 'Protocols // Andrii Zelenets',
    description: 'Delivery protocols and working model of Andrii Zelenets — how engagements are structured, communicated, and executed.',
  },
  '/credentials': {
    title: 'Credentials // Andrii Zelenets',
    description: 'Education, certifications, courses, and skill dossier of Andrii Zelenets.',
  },
  '/distributed-nodes': {
    title: 'Distributed Systems // Andrii Zelenets',
    description: 'Best practices and battle-tested patterns for designing high-availability distributed systems.',
  },
  '/cloud-native': {
    title: 'Cloud Native Web App // Andrii Zelenets',
    description: 'Production-grade principles and patterns for building cloud-native web applications with Kubernetes, containers, and GitOps.',
  },
  '/tactical-ui': {
    title: 'UI/UX Development // Andrii Zelenets',
    description: 'Best practices for building accessible, performant, and maintainable web interfaces with solid design systems.',
  },
  '/data-forge': {
    title: 'Realtime Streaming // Andrii Zelenets',
    description: 'Best practices for building low-latency, high-throughput realtime data pipelines and streaming applications.',
  },
  '/blog': {
    title: 'Intel Briefings // Andrii Zelenets',
    description: 'Long-form engineering articles on distributed systems, cloud-native architecture, frontend craft, and team culture.',
  },
  '/blog/why-microservices-are-still-a-monolith': {
    title: 'Why Your Microservices Are Still a Monolith in Disguise // Andrii Zelenets',
    description: 'Shared databases, synchronous call chains, and implicit coupling keep teams locked in a monolith mindset — even when running on Kubernetes.',
    date: '2025-11-12',
    tags: ['MICROSERVICES', 'DDD', 'ARCHITECTURE'],
    image: '/images/articles/monolith-in-disguise-og.png',
  },
  '/blog/the-senior-engineers-guide-to-saying-no': {
    title: "The Senior Engineer's Guide to Saying No // Andrii Zelenets",
    description: 'The most valuable engineering skill is knowing which work not to do. Scope creep and gold-plating are symptoms of teams that lack the vocabulary and safety to push back constructively.',
    date: '2026-03-17',
    tags: ['LEADERSHIP', 'SOFT_SKILLS', 'CULTURE'],
  },
  '/blog/top-database-performance-killers': {
    title: 'Top Database Performance Killers and How to Fix Them // Andrii Zelenets',
    description: 'N+1 queries, missing indexes, unbounded result sets, lock contention, and connection pool exhaustion — the six most common database performance killers and how to diagnose and fix each one.',
    date: '2026-03-17',
    tags: ['POSTGRES', 'PERFORMANCE', 'SQL', 'INDEXING', 'RELIABILITY'],
  },
  '/blog/on-call-rota-is-a-design-problem-not-a-people-problem': {
    title: 'On-Call Rota Is a Design Problem, Not a People Problem // Andrii Zelenets',
    description: 'High alert volume and 3am pages are symptoms of systems not designed for operability. Fixing on-call requires SLO-driven alerting, runbooks, and automation — not more headcount.',
    date: '2026-03-17',
    tags: ['ONCALL', 'SRE', 'OBSERVABILITY', 'CULTURE'],
  },
  '/blog/exactly-once-semantics-what-it-actually-means': {
    title: 'Exactly-Once Semantics: What It Actually Means and When You Need It // Andrii Zelenets',
    description: 'Exactly-once is not a flag you flip — it is a composite of three guarantees at three layers. Here is what each means, how Kafka implements it, and what remains your responsibility.',
    date: '2026-03-17',
    tags: ['KAFKA', 'STREAMING', 'RELIABILITY', 'TRANSACTIONS'],
  },
  '/blog/kafka-consumer-lag-is-a-symptom-not-the-disease': {
    title: 'Kafka Consumer Lag Is a Symptom, Not the Disease // Andrii Zelenets',
    description: 'Lag is downstream of throughput, partition count, serialisation overhead, and processing logic — treating the symptom without the diagnosis compounds the issue.',
    date: '2026-03-17',
    tags: ['KAFKA', 'STREAMING', 'OBSERVABILITY'],
  },
  '/blog/core-web-vitals-inp-is-the-new-lcp': {
    title: 'Core Web Vitals in the Real World: INP Is the New LCP // Andrii Zelenets',
    description: 'Interaction to Next Paint replaced FID and is far harder to optimise. Long tasks, scheduler pressure, and third-party scripts are the main culprits — here is how to find and fix them systematically.',
    date: '2026-03-17',
    tags: ['PERFORMANCE', 'WEB_VITALS', 'INP', 'CHROME'],
  },
  '/blog/rethinking-component-state-finite-state-machines-react': {
    title: 'Rethinking Component State: Finite State Machines in React // Andrii Zelenets',
    description: 'Loading, error, success, empty — most UI bugs live in the transitions between states. XState and explicit state machines eliminate entire categories of impossible-to-reproduce bugs.',
    date: '2026-03-17',
    tags: ['REACT', 'STATE_MACHINES', 'UX', 'XSTATE'],
  },
  '/blog/kubernetes-resource-requests-vs-limits': {
    title: 'Kubernetes Resource Requests vs Limits: The Misunderstood Contract // Andrii Zelenets',
    description: 'Understanding the actual scheduling and throttling behaviour of Kubernetes resource requests and limits to eliminate OOMKills, CPU throttling, and stranded cluster capacity.',
    date: '2026-03-17',
    tags: ['KUBERNETES', 'PERFORMANCE', 'FINOPS'],
  },
  '/blog/gitops-is-not-just-argo-it-is-a-culture-shift': {
    title: 'GitOps Is Not Just Argo — It Is a Culture Shift // Andrii Zelenets',
    description: 'Real GitOps means reconciliation loops, drift detection, and treating Git as the only source of truth — even during incidents when engineers want to kubectl apply.',
    date: '2026-03-17',
    tags: ['GITOPS', 'ARGOCD', 'KUBERNETES', 'DEVOPS'],
    image: '/images/articles/gitops-culture-shift-og.png',
  },
  '/blog/outbox-pattern-guaranteed-event-publishing': {
    title: 'The Outbox Pattern: Guaranteed Event Publishing Without Two-Phase Commit // Andrii Zelenets',
    description: 'Atomic writes and reliable event publishing using only your existing relational database and a CDC pipeline — no distributed transaction coordinator needed.',
    date: '2026-03-17',
    tags: ['KAFKA', 'CDC', 'POSTGRES', 'RELIABILITY'],
    image: '/images/articles/outbox-pattern-og.png',
  },
};

const DEFAULT_META = PAGE_META['/'];

const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.png`;

function setMeta(pathname: string) {
  const meta = PAGE_META[pathname] ?? DEFAULT_META;
  const isArticle = pathname.startsWith('/blog/') && meta.date !== undefined;
  const ogImage = meta.image ? `${SITE_URL}${meta.image}` : DEFAULT_OG_IMAGE;

  document.title = meta.title;

  const setTag = (sel: string, attr: string, val: string) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  };

  setTag('meta[name="description"]',        'content', meta.description);
  setTag('meta[property="og:type"]',        'content', isArticle ? 'article' : 'website');
  setTag('meta[property="og:title"]',       'content', meta.title);
  setTag('meta[property="og:description"]', 'content', meta.description);
  setTag('meta[property="og:url"]',         'content', `${SITE_URL}${pathname}`);
  setTag('meta[property="og:image"]',       'content', ogImage);
  setTag('meta[property="og:image:secure_url"]', 'content', ogImage);
  setTag('meta[property="og:image:alt"]',   'content', meta.title);
  setTag('meta[name="twitter:title"]',      'content', meta.title);
  setTag('meta[name="twitter:description"]','content', meta.description);
  setTag('meta[name="twitter:image"]',      'content', ogImage);
  setTag('link[rel="canonical"]',           'href',    `${SITE_URL}${pathname}`);

  setTag('meta[property="article:published_time"]', 'content', isArticle ? `${meta.date}T00:00:00Z` : '');
  setTag('meta[property="article:tag"]',            'content', isArticle && meta.tags ? meta.tags.join(', ') : '');
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    setMeta(pathname);
    trackVirtualPageView(pathname);
  }, [pathname]);
  return null;
};

const AnalyticsBindings = () => {
  useEffect(() => {
    initializeAnalytics(readConsentChoice());
    return setupClickTracking();
  }, []);

  return null;
};

const lazyRoute = (path: Parameters<typeof loadKnownRouteModule>[0]) =>
  lazy<ComponentType<object>>(() => loadKnownRouteModule(path));

const MissionLog = lazyRoute('/mission');
const Arsenal = lazyRoute('/arsenal');
const Laboratory = lazyRoute('/lab');
const Protocols = lazyRoute('/protocols');
const Credentials = lazyRoute('/credentials');
const DistributedNodes = lazyRoute('/distributed-nodes');
const CloudNative = lazyRoute('/cloud-native');
const TacticalUI = lazyRoute('/tactical-ui');
const DataForge = lazyRoute('/data-forge');
const Blog = lazyRoute('/blog');
const MonolithInDisguise = lazyRoute('/blog/why-microservices-are-still-a-monolith');
const OutboxPattern = lazyRoute('/blog/outbox-pattern-guaranteed-event-publishing');
const GitOpsCultureShift = lazyRoute('/blog/gitops-is-not-just-argo-it-is-a-culture-shift');
const K8sResourceLimits = lazyRoute('/blog/kubernetes-resource-requests-vs-limits');
const FiniteStateMachinesReact = lazyRoute('/blog/rethinking-component-state-finite-state-machines-react');
const CoreWebVitalsINP = lazyRoute('/blog/core-web-vitals-inp-is-the-new-lcp');
const KafkaConsumerLag = lazyRoute('/blog/kafka-consumer-lag-is-a-symptom-not-the-disease');
const ExactlyOnceSemantics = lazyRoute('/blog/exactly-once-semantics-what-it-actually-means');
const OnCallDesignProblem = lazyRoute('/blog/on-call-rota-is-a-design-problem-not-a-people-problem');
const SeniorEngineerSayingNo = lazyRoute('/blog/the-senior-engineers-guide-to-saying-no');
const DbPerformanceKillers = lazyRoute('/blog/top-database-performance-killers');
const NotFound = lazyRoute('*');

const App = () => (
  <div className="min-h-screen flex flex-col font-mono selection:bg-primary selection:text-black">
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,243,255,0.05)_0%,_transparent_60%)]" />
    </div>

    <ScrollToTop />
    <AnalyticsBindings />
    <Navigation />

    <main className="flex-grow relative z-10 w-full">
      <Suspense fallback={<div className="px-6 py-16 text-primary/70 text-sm uppercase text-center">Loading tactical module...</div>}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/mission" element={<MissionLog />} />
          <Route path="/arsenal" element={<Arsenal />} />
          <Route path="/lab" element={<Laboratory />} />
          <Route path="/protocols" element={<Protocols />} />
          <Route path="/credentials" element={<Credentials />} />
          <Route path="/distributed-nodes" element={<DistributedNodes />} />
          <Route path="/cloud-native" element={<CloudNative />} />
          <Route path="/tactical-ui" element={<TacticalUI />} />
          <Route path="/data-forge" element={<DataForge />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/why-microservices-are-still-a-monolith" element={<MonolithInDisguise />} />
          <Route path="/blog/outbox-pattern-guaranteed-event-publishing" element={<OutboxPattern />} />
          <Route path="/blog/gitops-is-not-just-argo-it-is-a-culture-shift" element={<GitOpsCultureShift />} />
          <Route path="/blog/kubernetes-resource-requests-vs-limits" element={<K8sResourceLimits />} />
          <Route path="/blog/rethinking-component-state-finite-state-machines-react" element={<FiniteStateMachinesReact />} />
          <Route path="/blog/core-web-vitals-inp-is-the-new-lcp" element={<CoreWebVitalsINP />} />
          <Route path="/blog/kafka-consumer-lag-is-a-symptom-not-the-disease" element={<KafkaConsumerLag />} />
          <Route path="/blog/exactly-once-semantics-what-it-actually-means" element={<ExactlyOnceSemantics />} />
          <Route path="/blog/on-call-rota-is-a-design-problem-not-a-people-problem" element={<OnCallDesignProblem />} />
          <Route path="/blog/the-senior-engineers-guide-to-saying-no" element={<SeniorEngineerSayingNo />} />
          <Route path="/blog/top-database-performance-killers" element={<DbPerformanceKillers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>

    <Footer />
    <PrivacyBanner />
  </div>
);

export default App;
