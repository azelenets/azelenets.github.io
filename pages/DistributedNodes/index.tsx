import React from 'react';
import PageHeader from '@/components/layout/PageHeader';

interface Practice {
  id: string;
  icon: string;
  title: string;
  tag: string;
  points: string[];
}

const practices: Practice[] = [
  {
    id: 'cap',
    icon: 'hub',
    title: 'CAP_THEOREM & TRADE-OFFS',
    tag: 'FOUNDATION',
    points: [
      'A distributed system can guarantee only two of three: Consistency, Availability, Partition Tolerance.',
      'Prefer CP systems (strong consistency) for financial transactions, user auth, and inventory.',
      'Prefer AP systems (eventual consistency) for feeds, analytics, and non-critical caches.',
      'Document your CAP stance per service — never leave it implicit.',
      'Use CRDT data structures to achieve AP with eventual convergence where possible.',
    ],
  },
  {
    id: 'resilience',
    icon: 'security',
    title: 'RESILIENCE_PATTERNS',
    tag: 'FAULT_TOLERANCE',
    points: [
      'Circuit Breaker: fail fast when a downstream service is degraded; auto-recover with half-open probing.',
      'Bulkhead: isolate thread pools / connection pools per dependency to prevent cascade failures.',
      'Timeout + Retry with exponential back-off and jitter — never retry immediately at full rate.',
      'Retry budget: cap total retry volume to ≤ 10 % of traffic to avoid retry storms.',
      'Fallback strategy: serve stale cache, degraded response, or static default on failure.',
    ],
  },
  {
    id: 'data',
    icon: 'storage',
    title: 'DATA_CONSISTENCY_PATTERNS',
    tag: 'STATE_MANAGEMENT',
    points: [
      'Saga Pattern: coordinate long-running transactions across services with compensating actions.',
      'CQRS: separate read and write models — scale each path independently.',
      'Event Sourcing: store state as an immutable event log; derive current state by replay.',
      'Outbox Pattern: write domain events to an outbox table atomically with business data, then publish asynchronously.',
      'Two-Phase Commit should be a last resort — prefer eventual consistency + idempotent consumers.',
    ],
  },
  {
    id: 'communication',
    icon: 'swap_horiz',
    title: 'COMMUNICATION_PROTOCOLS',
    tag: 'INTER_SERVICE',
    points: [
      'Async messaging (Kafka, RabbitMQ) decouples producers from consumers and absorbs traffic spikes.',
      'Use gRPC for low-latency internal RPC; REST/GraphQL for external or developer-facing APIs.',
      'Define and version your contracts (Protobuf, AsyncAPI, OpenAPI) before writing implementations.',
      'Implement idempotent consumers: processing the same message twice must yield the same result.',
      'Dead-letter queues (DLQ) for poison-pill messages — monitor and alert on DLQ depth.',
    ],
  },
  {
    id: 'observability',
    icon: 'monitoring',
    title: 'OBSERVABILITY_STACK',
    tag: 'TELEMETRY',
    points: [
      'Structured logs with correlation IDs propagated through every request and async message.',
      'Distributed tracing (OpenTelemetry) across all service boundaries — trace sampling at ≥ 1 %.',
      'RED metrics per service: Rate, Errors, Duration — alert on deviations from baseline.',
      'Health endpoints: /health/live and /health/ready; liveness ≠ readiness.',
      'Chaos engineering (Chaos Monkey, Toxiproxy) to validate resilience assumptions in staging.',
    ],
  },
  {
    id: 'partitioning',
    icon: 'grid_view',
    title: 'DATA_PARTITIONING & REPLICATION',
    tag: 'SCALABILITY',
    points: [
      'Choose partition keys that distribute load evenly — avoid hotspot keys (e.g. timestamp-only shards).',
      'Consistent hashing minimises data rebalancing during shard additions/removals.',
      'Replication factor ≥ 3 for fault tolerance; quorum writes (W > N/2) for durability.',
      'Read replicas for read-heavy workloads; route long-running analytics queries away from primaries.',
      'Cross-region replication: account for replication lag in SLA definitions and client expectations.',
    ],
  },
  {
    id: 'service-mesh',
    icon: 'lan',
    title: 'SERVICE_MESH & DISCOVERY',
    tag: 'INFRASTRUCTURE',
    points: [
      'Service mesh (Istio, Linkerd) offloads mTLS, retries, load balancing, and observability from app code.',
      'Service registry (Consul, Kubernetes DNS) keeps service locations dynamic — never hardcode IPs.',
      'Sidecar proxy pattern separates operational concerns from business logic.',
      'Traffic splitting enables canary deployments and blue/green rollouts at the mesh layer.',
      'Mutual TLS (mTLS) for all east-west traffic — zero-trust by default.',
    ],
  },
  {
    id: 'consensus',
    icon: 'verified',
    title: 'CONSENSUS & LEADER_ELECTION',
    tag: 'COORDINATION',
    points: [
      'Use proven algorithms (Raft, Paxos) — never roll your own consensus protocol.',
      'Leverage managed solutions (etcd, ZooKeeper, Consul) for leader election and distributed locks.',
      'Distributed locks must have a TTL — guard against lock holder crashes leaving locks permanently held.',
      'Fencing tokens prevent split-brain: include monotonically increasing token in write requests.',
      'Design for split-brain scenarios — decide whether to sacrifice availability or consistency explicitly.',
    ],
  },
];

const tagColors: Record<string, string> = {
  FOUNDATION: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  FAULT_TOLERANCE: 'text-red-400 border-red-400/30 bg-red-400/5',
  STATE_MANAGEMENT: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  INTER_SERVICE: 'text-primary border-primary/30 bg-primary/5',
  TELEMETRY: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
  SCALABILITY: 'text-green-400 border-green-400/30 bg-green-400/5',
  INFRASTRUCTURE: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
  COORDINATION: 'text-pink-400 border-pink-400/30 bg-pink-400/5',
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
      <span className={`text-[9px] font-bold font-mono px-2 py-0.5 border tracking-widest shrink-0 ${tagColors[tag] ?? 'text-primary/60 border-primary/20 bg-primary/5'}`}>
        {tag}
      </span>
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

const DistributedNodes: React.FC = () => (
  <section className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">
    <PageHeader
      eyebrow="High Availability Protocols"
      titleMain="Distributed"
      titleAccent="Nodes"
      description="Battle-tested principles and patterns for designing, building, and operating distributed systems at scale."
    />

    {/* Stats bar */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary/10 border border-primary/10">
      {[
        { label: 'PATTERNS', value: '8' },
        { label: 'PRINCIPLES', value: '40+' },
        { label: 'THREAT_LEVEL', value: 'CAP' },
        { label: 'UPTIME_TARGET', value: '99.99%' },
      ].map(stat => (
        <div key={stat.label} className="bg-bg-dark px-6 py-4 flex flex-col gap-1">
          <span className="text-primary text-2xl font-black font-display">{stat.value}</span>
          <span className="text-slate-600 text-[9px] font-bold tracking-[0.3em] uppercase">{stat.label}</span>
        </div>
      ))}
    </div>

    {/* Warning banner */}
    <div className="border border-yellow-400/20 bg-yellow-400/5 px-4 py-3 flex items-start gap-3">
      <span className="material-symbols-outlined text-yellow-400 text-sm mt-0.5 shrink-0">warning</span>
      <p className="text-yellow-400/70 text-[10px] font-mono leading-relaxed uppercase tracking-wider">
        Fallacies alert — the network is not reliable, latency is not zero, bandwidth is not infinite, the network is not secure, topology changes, there is more than one administrator, transport cost is not zero, and the network is not homogeneous.
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

export default DistributedNodes;
