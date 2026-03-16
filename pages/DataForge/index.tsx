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
    id: 'streaming-fundamentals',
    icon: 'stream',
    title: 'STREAMING_FUNDAMENTALS',
    tag: 'FOUNDATION',
    points: [
      'Model data as an unbounded, ordered sequence of immutable events — not mutable state snapshots.',
      'Distinguish event time (when it happened) from processing time (when it arrived) — always reason in event time.',
      'Watermarks define how late data can arrive before a window closes; set them based on observed latency distributions.',
      'At-least-once delivery is the default; achieve exactly-once with idempotent consumers + transactional producers.',
      'Backpressure is a feature, not a bug — propagate it upstream rather than dropping messages silently.',
    ],
  },
  {
    id: 'kafka',
    icon: 'electric_bolt',
    title: 'APACHE_KAFKA_OPERATIONS',
    tag: 'MESSAGE_BROKER',
    points: [
      'Partition by entity ID (user, order) to guarantee ordering per entity without global ordering overhead.',
      'Replication factor ≥ 3 with min.insync.replicas = 2 for durability without sacrificing availability.',
      'Consumer group lag is the primary health signal — alert when lag grows faster than it shrinks.',
      'Compacted topics for changelog streams: retain the latest value per key instead of full history.',
      'Schema Registry (Avro/Protobuf) enforces schema evolution rules; never send raw JSON in high-throughput topics.',
    ],
  },
  {
    id: 'websockets',
    icon: 'sync_alt',
    title: 'WEBSOCKETS_&_SSE',
    tag: 'REALTIME_TRANSPORT',
    points: [
      'WebSockets for bidirectional, low-latency communication (chat, live collaboration, gaming).',
      'Server-Sent Events (SSE) for unidirectional push (dashboards, feeds) — simpler, HTTP/2-friendly, auto-reconnect built in.',
      'Heartbeat/ping frames detect silently dropped connections — default TCP keepalive is too slow for realtime UX.',
      'Authenticate on the initial upgrade handshake, not per-message; revoke via server-side session invalidation.',
      'Behind a load balancer, sticky sessions or a shared pub/sub layer (Redis, Kafka) is required for multi-instance deployments.',
    ],
  },
  {
    id: 'etl',
    icon: 'transform',
    title: 'ETL_&_STREAM_PROCESSING',
    tag: 'PROCESSING',
    points: [
      'Prefer stream processing (Kafka Streams, Flink, Spark Structured Streaming) over batch for latency-sensitive pipelines.',
      'Stateful operations (joins, aggregations) require a state store — size it for your retention window, not just current load.',
      'Windowing strategies: tumbling for periodic snapshots, sliding for rolling metrics, session for activity bursts.',
      'Dead-letter topics for unprocessable records — never silently discard bad data; alert and inspect it.',
      'Exactly-once semantics in Flink/Kafka Streams via checkpointing + transactional sinks — test failure recovery explicitly.',
    ],
  },
  {
    id: 'state-sync',
    icon: 'sync',
    title: 'CLIENT_STATE_SYNCHRONISATION',
    tag: 'CLIENT_PATTERNS',
    points: [
      'Optimistic updates on the client with server confirmation — roll back on conflict, show a clear reconciliation message.',
      'CRDTs (Conflict-free Replicated Data Types) enable offline-first apps that merge without coordination.',
      'Operational Transform (OT) for collaborative text editing — used by Google Docs; choose a mature library, never DIY.',
      'Reconnect with exponential back-off and jitter; replay missed events from a cursor/offset on reconnect.',
      'Version vectors or logical clocks to detect and resolve concurrent edits without a central authority.',
    ],
  },
  {
    id: 'scalability',
    icon: 'trending_up',
    title: 'SCALING_REALTIME_SYSTEMS',
    tag: 'SCALABILITY',
    points: [
      'Fan-out at the edge: push to connected clients from a dedicated gateway tier, not from business logic services.',
      'Horizontal scaling of WebSocket servers requires a shared message bus (Redis Pub/Sub, Kafka) to route cross-instance messages.',
      'Connection pooling and multiplexing: HTTP/2 or QUIC reduces per-connection overhead at scale.',
      'Shed load gracefully: queue depth circuit breakers prevent cascading failures during traffic spikes.',
      'Pre-aggregate hot metrics server-side before pushing; sending raw events to millions of clients is a self-inflicted DDoS.',
    ],
  },
  {
    id: 'observability',
    icon: 'monitoring',
    title: 'STREAMING_OBSERVABILITY',
    tag: 'TELEMETRY',
    points: [
      'Track consumer lag per partition, not just total — a single hot partition can hide in aggregate averages.',
      'End-to-end latency histogram: time from event creation to client delivery across all pipeline stages.',
      'Throughput (events/sec) and error rate per topic/consumer group as the primary SLIs.',
      'Distributed tracing across producer → broker → consumer → client for debugging latency spikes.',
      'Replay from a known good offset is your recovery plan — test it regularly, not only during incidents.',
    ],
  },
  {
    id: 'data-quality',
    icon: 'verified',
    title: 'DATA_QUALITY_&_CONTRACTS',
    tag: 'GOVERNANCE',
    points: [
      'Schema-first: define and register schemas before writing producers — breaking changes require a new topic or version.',
      'Data contracts between producer and consumer teams; treat schema violations as build failures in CI.',
      'Validate events at ingestion using schema registry rules — reject malformed events at the border, not deep in the pipeline.',
      'Lineage tracking: know which upstream events produced each downstream aggregate for debugging and compliance.',
      'Idempotency keys on every event enable safe replay without double-counting side effects.',
    ],
  },
];

const tagColors: Record<string, string> = {
  FOUNDATION: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  MESSAGE_BROKER: 'text-primary border-primary/30 bg-primary/5',
  REALTIME_TRANSPORT: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  PROCESSING: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
  CLIENT_PATTERNS: 'text-green-400 border-green-400/30 bg-green-400/5',
  SCALABILITY: 'text-red-400 border-red-400/30 bg-red-400/5',
  TELEMETRY: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
  GOVERNANCE: 'text-pink-400 border-pink-400/30 bg-pink-400/5',
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

const DataForge: React.FC = () => (
  <section className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">
    <PageHeader
      eyebrow="ETL · Realtime Streaming"
      titleMain="Realtime"
      titleAccent="Data Forge"
      description="Battle-tested principles and patterns for building low-latency, high-throughput realtime data pipelines and streaming applications."
    />

    {/* Stats bar */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary/10 border border-primary/10">
      {[
        { label: 'PATTERNS', value: '8' },
        { label: 'PRINCIPLES', value: '40+' },
        { label: 'DELIVERY', value: 'EXACTLY_ONCE' },
        { label: 'LATENCY_TARGET', value: '<100ms' },
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
        Realtime is a spectrum — "realtime" to a trading system means microseconds; to a chat app it means under a second. Define your latency SLO explicitly before choosing your stack.
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

export default DataForge;
