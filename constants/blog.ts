export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  tags: string[];
  slug?: string;  // internal route: /blog/<slug>
  link?: string;  // external URL
}

export const blogCategories = [
  'ALL',
  'DISTRIBUTED_SYSTEMS',
  'CLOUD_NATIVE',
  'FRONTEND',
  'DATA_ENGINEERING',
  'ENGINEERING_CULTURE',
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export const blogPosts: BlogPost[] = [
  {
    id: 'POST_001',
    title: 'Why Your Microservices Are Still a Monolith in Disguise',
    excerpt:
      'Splitting a codebase into services does not automatically make it distributed. Shared databases, synchronous call chains, and implicit coupling keep teams locked in a monolith mindset — even when running on Kubernetes.',
    category: 'DISTRIBUTED_SYSTEMS',
    date: '2025-11-12',
    readTime: 8,
    tags: ['MICROSERVICES', 'DDD', 'ARCHITECTURE'],
    slug: 'why-microservices-are-still-a-monolith',
  },
  {
    id: 'POST_002',
    title: 'The Outbox Pattern: Guaranteed Event Publishing Without Two-Phase Commit',
    excerpt:
      'Two-phase commit is fragile, slow, and hard to operate. The Outbox Pattern gives you atomic writes and reliable event publishing using only your existing relational database and a change-data-capture pipeline.',
    category: 'DISTRIBUTED_SYSTEMS',
    date: '2025-10-03',
    readTime: 11,
    tags: ['KAFKA', 'CDC', 'POSTGRES', 'RELIABILITY'],
    slug: 'outbox-pattern-guaranteed-event-publishing',
  },
  {
    id: 'POST_003',
    title: 'GitOps Is Not Just Argo — It Is a Culture Shift',
    excerpt:
      'Teams adopt ArgoCD and think they have GitOps. Real GitOps means reconciliation loops, drift detection, and treating the Git repo as the only source of truth — even during incidents when engineers want to kubectl apply.',
    category: 'CLOUD_NATIVE',
    date: '2025-09-18',
    readTime: 7,
    tags: ['GITOPS', 'ARGOCD', 'KUBERNETES', 'DEVOPS'],
    slug: 'gitops-is-not-just-argo-it-is-a-culture-shift',
  },
  {
    id: 'POST_004',
    title: 'Kubernetes Resource Requests vs Limits: The Misunderstood Contract',
    excerpt:
      'Most engineers set limits and requests to the same value and call it done. Understanding the actual scheduling and throttling behaviour unlocks better cluster utilisation and eliminates mysterious OOMKills.',
    category: 'CLOUD_NATIVE',
    date: '2025-08-29',
    readTime: 9,
    tags: ['KUBERNETES', 'PERFORMANCE', 'FINOPS'],
    slug: 'kubernetes-resource-requests-vs-limits',
  },
  {
    id: 'POST_005',
    title: 'Rethinking Component State: Finite State Machines in React',
    excerpt:
      'Loading, error, success, empty — most UI bugs live in the transitions between states, not in the states themselves. XState and explicit state machines eliminate entire categories of impossible-to-reproduce bugs.',
    category: 'FRONTEND',
    date: '2025-08-05',
    readTime: 10,
    tags: ['REACT', 'STATE_MACHINES', 'UX', 'XSTATE'],
    slug: 'rethinking-component-state-finite-state-machines-react',
  },
  {
    id: 'POST_006',
    title: 'Core Web Vitals in the Real World: INP Is the New LCP',
    excerpt:
      'Interaction to Next Paint replaced FID and it is far harder to optimize. Long tasks, scheduler pressure, and third-party scripts are the main culprits — here is how to find and fix them systematically.',
    category: 'FRONTEND',
    date: '2025-07-14',
    readTime: 12,
    tags: ['PERFORMANCE', 'WEB_VITALS', 'INP', 'CHROME'],
    slug: 'core-web-vitals-inp-is-the-new-lcp',
  },
  {
    id: 'POST_007',
    title: 'Kafka Consumer Lag Is a Symptom, Not the Disease',
    excerpt:
      'Teams alert on lag and throw more consumer replicas at the problem. But lag is downstream of throughput, partition count, serialisation overhead, and processing logic — treating the symptom without the diagnosis compounds the issue.',
    category: 'DATA_ENGINEERING',
    date: '2025-06-22',
    readTime: 9,
    tags: ['KAFKA', 'STREAMING', 'OBSERVABILITY'],
    slug: 'kafka-consumer-lag-is-a-symptom-not-the-disease',
  },
  {
    id: 'POST_008',
    title: 'Exactly-Once Semantics: What It Actually Means and When You Need It',
    excerpt:
      'Exactly-once is one of the most misunderstood guarantees in distributed systems. It does not mean a message is processed once — it means the visible side effects appear exactly once, which requires careful co-design of producer, broker, and consumer.',
    category: 'DATA_ENGINEERING',
    date: '2025-05-30',
    readTime: 13,
    tags: ['KAFKA', 'STREAMING', 'RELIABILITY', 'TRANSACTIONS'],
    slug: 'exactly-once-semantics-what-it-actually-means',
  },
  {
    id: 'POST_009',
    title: 'On-Call Rota Is a Design Problem, Not a People Problem',
    excerpt:
      'High alert volume, frequent 3am pages, and burnout are symptoms of systems that were not designed for operability. Reducing on-call pain requires runbooks, SLO-driven alerting, and making the on-call experience a first-class engineering concern.',
    category: 'ENGINEERING_CULTURE',
    date: '2025-05-08',
    readTime: 8,
    tags: ['ONCALL', 'SRE', 'OBSERVABILITY', 'CULTURE'],
    slug: 'on-call-rota-is-a-design-problem-not-a-people-problem',
  },
  {
    id: 'POST_011',
    title: 'Top Database Performance Killers and How to Fix Them',
    excerpt:
      'N+1 queries, missing indexes, unbounded result sets, lock contention, connection pool exhaustion — the same six killers appear in every stack. Here is how to diagnose each one and fix it without a rewrite.',
    category: 'DISTRIBUTED_SYSTEMS',
    date: '2025-12-10',
    readTime: 14,
    tags: ['POSTGRES', 'PERFORMANCE', 'SQL', 'INDEXING', 'RELIABILITY'],
    slug: 'top-database-performance-killers',
  },
  {
    id: 'POST_010',
    title: "The Senior Engineer's Guide to Saying No",
    excerpt:
      'The most valuable engineering skill is knowing which work not to do. Scope creep, premature optimisation, and gold-plating are symptoms of teams that lack the vocabulary and the safety to push back constructively.',
    category: 'ENGINEERING_CULTURE',
    date: '2025-04-17',
    readTime: 6,
    tags: ['LEADERSHIP', 'SOFT_SKILLS', 'CULTURE'],
    slug: 'the-senior-engineers-guide-to-saying-no',
  },
];
