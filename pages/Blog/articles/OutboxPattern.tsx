import React from 'react';
import ArticleLayout from '../ArticleLayout';
import { P, H2, H3, Callout, Code } from '../ArticlePrimitives';

/* ─── Prose primitives ────────────────────────────────────────────────────── */


const DiagramBox: React.FC<{ label: string; color?: 'primary' | 'warn' | 'danger' }> = ({
  label,
  color = 'primary',
}) => {
  const cls = {
    primary: 'border-primary/30 text-primary/70 bg-primary/5',
    warn:    'border-yellow-400/30 text-yellow-400/70 bg-yellow-400/5',
    danger:  'border-red-400/30 text-red-400/70 bg-red-400/5',
  }[color];
  return (
    <div className={`border px-3 py-2 text-[10px] font-bold font-mono tracking-widest text-center ${cls}`}>
      {label}
    </div>
  );
};

const Arrow: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex flex-col items-center justify-center text-slate-400 shrink-0">
    <span className="text-xs font-mono">→</span>
    {label && <span className="text-[8px] font-mono text-slate-700 mt-0.5 whitespace-nowrap">{label}</span>}
  </div>
);

/* ─── Article ─────────────────────────────────────────────────────────────── */

const OutboxPattern: React.FC = () => (
  <ArticleLayout
    id="POST_002"
    title="The Outbox Pattern: Guaranteed Event Publishing Without Two-Phase Commit"
    category="DISTRIBUTED_SYSTEMS"
    date="2026-03-17"
    readTime={11}
    tags={['KAFKA', 'CDC', 'POSTGRES', 'RELIABILITY']}
  >
    <P>
      Every event-driven system eventually faces the same problem: you need to update a database record
      <em className="text-slate-300"> and</em> publish a message to a broker — atomically. Either both happen or
      neither does. This sounds like a solved problem. It is not.
    </P>

    <P>
      Two-phase commit (2PC) is the textbook answer. It is also fragile, slow, and operationally miserable at scale.
      The Outbox Pattern solves the same problem using only your existing relational database, a CDC pipeline, and
      the assumption that at-least-once delivery with idempotent consumers is acceptable — which, for the vast
      majority of workloads, it is.
    </P>

    {/* ── Section 1 ── */}
    <H2 num="01">The Dual Write Problem</H2>

    <P>
      Consider an order service that must persist a new order to PostgreSQL and publish an{' '}
      <code className="text-primary text-xs">OrderPlaced</code> event to Kafka so downstream services can react.
      The naive implementation looks like this:
    </P>

    <Code label="The naive dual write — a ticking time bomb">
{`async function placeOrder(order: Order): Promise<void> {
  // Step 1: persist to the database
  await db.query(
    'INSERT INTO orders (id, user_id, total, status) VALUES ($1, $2, $3, $4)',
    [order.id, order.userId, order.total, 'pending'],
  );

  // Step 2: publish to Kafka
  await kafka.producer.send({
    topic: 'order.placed',
    messages: [{ key: order.id, value: JSON.stringify(order) }],
  });
}`}
    </Code>

    <P>
      This looks fine until you consider failure modes. What happens if the process crashes between step 1 and
      step 2? The order is saved, but the event is never published. Inventory never reserves stock. The
      confirmation email never sends. The order silently stalls.
    </P>

    <P>
      What if Kafka is temporarily unavailable and the publish call throws? Same result: database write succeeds,
      event lost. You could reverse the order — publish first, then persist — but now a database failure after
      the publish leaves you with a phantom event for an order that does not exist.
    </P>

    <Callout type="danger">
      There is no safe ordering for a dual write. Either sequence leaves a window where one side commits and the
      other does not. At sufficient scale, that window will be hit in production — guaranteed.
    </Callout>

    {/* ── Section 2 ── */}
    <H2 num="02">Why Two-Phase Commit Is Not the Answer</H2>

    <P>
      2PC coordinates a distributed transaction across two resource managers — in this case, PostgreSQL and the
      Kafka broker — so that both commit or both roll back together. It is a real solution to the dual write
      problem. It is also one that most teams should avoid.
    </P>

    <H3>The problems with 2PC in practice</H3>

    <P>
      <strong className="text-white">Blocking protocol.</strong> During the "prepare" phase, both participants hold
      locks. If the coordinator crashes after participants have voted to commit but before sending the final commit
      message, the participants are stuck holding locks indefinitely, waiting for a coordinator that may never
      recover. This is the 2PC blocking problem — it cannot be solved without a separate recovery mechanism.
    </P>

    <P>
      <strong className="text-white">Kafka does not natively support XA.</strong> 2PC relies on the XA protocol.
      Kafka's transactional API provides exactly-once semantics within the Kafka ecosystem — producer to consumer —
      but it does not participate in XA transactions with external databases. You cannot coordinate a Kafka publish
      and a Postgres commit inside a single 2PC transaction without a custom XA-capable bridge that very few teams
      have the operational capacity to run reliably.
    </P>

    <P>
      <strong className="text-white">Operational cost.</strong> Even where XA bridges are available, they add latency
      to every write, require careful coordinator sizing, and become a single point of failure. The teams that
      operate them successfully are the exception, not the rule.
    </P>

    <Callout type="warn">
      2PC trades one class of failure (dual write inconsistency) for another (blocking under coordinator failure)
      while adding significant operational complexity. The Outbox Pattern achieves the same consistency guarantee
      with a simpler failure model and no external coordinator.
    </Callout>

    {/* ── Section 3 ── */}
    <H2 num="03">The Outbox Pattern</H2>

    <P>
      The core insight is simple: <strong className="text-white">your database already supports atomic writes
      across multiple tables within a single transaction</strong>. Instead of writing to the database and
      publishing to Kafka as two separate operations, write to the database and an outbox table in a single
      transaction. A separate process reads the outbox and publishes to Kafka.
    </P>

    <H3>The flow</H3>

    <div className="flex flex-wrap items-center gap-2 my-7 p-4 border border-primary/10 bg-black/30">
      <DiagramBox label="APPLICATION" />
      <Arrow label="single TX" />
      <div className="flex flex-col gap-1">
        <DiagramBox label="orders table" />
        <DiagramBox label="outbox table" color="warn" />
      </div>
      <Arrow />
      <DiagramBox label="CDC / RELAY" color="warn" />
      <Arrow label="at-least-once" />
      <DiagramBox label="KAFKA" />
      <Arrow />
      <DiagramBox label="CONSUMERS" />
    </div>

    <P>
      The application writes its domain record and the outbox event in one database transaction. Either both commit
      or both roll back — there is no window for inconsistency. A relay process (CDC connector or polling
      publisher) reads committed outbox rows and publishes them to Kafka. Consumers process events idempotently.
    </P>

    {/* ── Section 4 ── */}
    <H2 num="04">Implementation — The Outbox Table</H2>

    <P>
      The outbox table is simple. It holds serialised events that have been committed to the database but not yet
      published to the broker. The schema varies by implementation, but the essentials are always the same:
    </P>

    <Code label="PostgreSQL — outbox table schema">
{`CREATE TABLE outbox_events (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  aggregate_type TEXT        NOT NULL,          -- e.g. 'Order'
  aggregate_id   TEXT        NOT NULL,          -- e.g. order UUID
  event_type     TEXT        NOT NULL,          -- e.g. 'OrderPlaced'
  payload        JSONB       NOT NULL,          -- full event body
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at   TIMESTAMPTZ,                   -- NULL = not yet published
  idempotency_key TEXT       NOT NULL UNIQUE    -- prevents duplicate inserts
);

CREATE INDEX idx_outbox_unpublished ON outbox_events (created_at)
  WHERE published_at IS NULL;`}
    </Code>

    <P>
      The application writes its business record and the outbox row inside a single transaction. The key discipline:
      the outbox row is written by the same code path that writes the domain record — never in a separate call,
      never in a background job, never conditionally.
    </P>

    <Code label="TypeScript — atomic write: domain record + outbox row in one transaction">
{`async function placeOrder(order: Order): Promise<void> {
  await db.transaction(async (tx) => {
    // 1. Persist the domain record
    await tx.query(
      'INSERT INTO orders (id, user_id, total, status) VALUES ($1, $2, $3, $4)',
      [order.id, order.userId, order.total, 'pending'],
    );

    // 2. Write the outbox event — same transaction, same commit
    await tx.query(
      \`INSERT INTO outbox_events
         (aggregate_type, aggregate_id, event_type, payload, idempotency_key)
       VALUES ($1, $2, $3, $4, $5)\`,
      [
        'Order',
        order.id,
        'OrderPlaced',
        JSON.stringify({
          orderId:  order.id,
          userId:   order.userId,
          total:    order.total,
          occurredAt: new Date().toISOString(),
        }),
        \`OrderPlaced-\${order.id}\`,  // idempotency key
      ],
    );
  });
  // If the transaction commits: both rows exist. No publish yet.
  // If it rolls back: neither row exists. No phantom event.
}`}
    </Code>

    <Callout type="info">
      The application's job ends at the transaction commit. Publishing to Kafka is now the relay's responsibility,
      not the application's. This separation is what makes the pattern reliable — the relay can retry indefinitely
      without any risk of double-writing the domain record.
    </Callout>

    {/* ── Section 5 ── */}
    <H2 num="05">The Relay — CDC vs Polling Publisher</H2>

    <P>
      There are two ways to move events from the outbox table to Kafka. The choice depends on your operational
      maturity and latency requirements.
    </P>

    <H3>Option A — Change Data Capture with Debezium</H3>

    <P>
      Debezium tails PostgreSQL's Write-Ahead Log (WAL) via logical replication. Every INSERT committed to the
      outbox table is captured as a change event and forwarded to Kafka with sub-second latency. The WAL offset is
      the Debezium connector's progress marker — on restart, it resumes from exactly where it left off.
    </P>

    <Code label="Debezium connector configuration for PostgreSQL outbox">
{`{
  "name": "outbox-connector",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "database.hostname": "postgres",
    "database.port": "5432",
    "database.user": "replication_user",
    "database.password": "${"$"}{DB_PASSWORD}",
    "database.dbname": "orders_db",
    "table.include.list": "public.outbox_events",

    // Outbox Event Router SMT — routes each row to its own Kafka topic
    // based on aggregate_type and maps payload as the message value
    "transforms": "outbox",
    "transforms.outbox.type":
      "io.debezium.transforms.outbox.EventRouter",
    "transforms.outbox.table.field.event.id":     "id",
    "transforms.outbox.table.field.event.key":    "aggregate_id",
    "transforms.outbox.table.field.event.type":   "event_type",
    "transforms.outbox.table.field.event.payload": "payload",
    "transforms.outbox.route.by.field":           "aggregate_type",
    "transforms.outbox.route.topic.replacement":  "outbox.$1"
    // Routes to topics: outbox.Order, outbox.Payment, etc.
  }
}`}
    </Code>

    <P>
      Debezium's Outbox Event Router Single Message Transform (SMT) handles the routing automatically — each
      outbox row becomes a Kafka message on a topic derived from <code className="text-primary text-xs">aggregate_type</code>.
      The <code className="text-primary text-xs">published_at</code> column does not need to be updated; the WAL
      offset serves as the progress marker.
    </P>

    <H3>Option B — Polling Publisher</H3>

    <P>
      If you cannot run Debezium, a polling publisher is a valid alternative. A background process periodically
      queries the outbox for unpublished rows, publishes them to Kafka, and marks them as published.
    </P>

    <Code label="Polling publisher — TypeScript">
{`async function pollAndPublish(): Promise<void> {
  const rows = await db.query<OutboxEvent>(
    \`SELECT * FROM outbox_events
     WHERE published_at IS NULL
     ORDER BY created_at ASC
     LIMIT 100
     FOR UPDATE SKIP LOCKED\`,  // prevents concurrent relay instances colliding
  );

  for (const event of rows) {
    await kafka.producer.send({
      topic: \`outbox.\${event.aggregateType.toLowerCase()}\`,
      messages: [{
        key:   event.aggregateId,
        value: JSON.stringify(event.payload),
        headers: {
          'event-type':     event.eventType,
          'idempotency-key': event.idempotencyKey,
        },
      }],
    });

    await db.query(
      'UPDATE outbox_events SET published_at = NOW() WHERE id = $1',
      [event.id],
    );
  }
}

// Run every 500ms
setInterval(pollAndPublish, 500);`}
    </Code>

    <Callout type="warn">
      The polling publisher introduces polling latency (up to the poll interval) and adds write load on the
      outbox table. FOR UPDATE SKIP LOCKED is essential when running multiple relay instances — without it,
      two instances can publish the same event concurrently. CDC with Debezium is preferred for
      latency-sensitive or high-throughput workloads.
    </Callout>

    {/* ── Section 6 ── */}
    <H2 num="06">Idempotent Consumers — The Other Half</H2>

    <P>
      The relay delivers events at-least-once. Network retries, connector restarts, and WAL re-reads can all result
      in a consumer receiving the same event more than once. Exactly-once processing is the consumer's
      responsibility, not the broker's.
    </P>

    <P>
      The pattern is straightforward: record processed event IDs in a table. Check for existence before processing.
      Wrap the check and the domain logic in a transaction so the idempotency record and the domain side effect
      are committed atomically.
    </P>

    <Code label="Idempotent consumer — PostgreSQL deduplication table">
{`-- Deduplication table: one row per processed event
CREATE TABLE processed_events (
  idempotency_key TEXT        PRIMARY KEY,
  processed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}
    </Code>

    <Code label="Idempotent consumer handler — TypeScript">
{`async function onOrderPlaced(event: KafkaMessage): Promise<void> {
  const key = event.headers['idempotency-key']?.toString();
  if (!key) throw new Error('Missing idempotency-key header');

  await db.transaction(async (tx) => {
    // Attempt to claim this event — fails silently if already processed
    const result = await tx.query(
      \`INSERT INTO processed_events (idempotency_key)
       VALUES ($1)
       ON CONFLICT (idempotency_key) DO NOTHING\`,
      [key],
    );

    // rowCount === 0 means we've seen this event before
    if (result.rowCount === 0) {
      console.log(\`Skipping duplicate event: \${key}\`);
      return;
    }

    // Safe to process — this is the first time we've seen this event
    const order = JSON.parse(event.value!.toString());
    await tx.query(
      'INSERT INTO inventory_reservations (order_id, items) VALUES ($1, $2)',
      [order.orderId, JSON.stringify(order.items)],
    );
  });
}`}
    </Code>

    <Callout type="info">
      The deduplication check and domain write happen inside the same transaction. If anything fails after
      the INSERT into processed_events but before the domain write commits, the transaction rolls back —
      the event will be redelivered and processed successfully on the next attempt.
    </Callout>

    {/* ── Section 7 ── */}
    <H2 num="07">Outbox Table Housekeeping</H2>

    <P>
      The outbox table will grow indefinitely without pruning. Published events have no operational value once
      they are confirmed in Kafka — retain them only as long as your audit or replay requirements demand.
    </P>

    <Code label="PostgreSQL — scheduled cleanup of published events older than 7 days">
{`-- Run via pg_cron, a scheduled job, or a maintenance service
DELETE FROM outbox_events
WHERE published_at IS NOT NULL
  AND published_at < NOW() - INTERVAL '7 days';

-- For high-throughput tables, partition by created_at and drop old partitions
-- instead of row-level deletes to avoid table bloat and autovacuum pressure:

CREATE TABLE outbox_events (
  -- ... columns ...
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (created_at);

CREATE TABLE outbox_events_2025_10
  PARTITION OF outbox_events
  FOR VALUES FROM ('2025-10-01') TO ('2025-11-01');

-- Drop the partition to purge an entire month with zero table bloat:
DROP TABLE outbox_events_2025_10;`}
    </Code>

    {/* ── Section 8 ── */}
    <H2 num="08">Trade-offs and When to Use It</H2>

    <P>
      The Outbox Pattern is not free. You are adding a table, a relay process, and an idempotency check to your
      architecture. That is worthwhile when the cost of a lost or duplicated event exceeds the operational overhead.
    </P>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-primary/10 border border-primary/10 my-7">
      {[
        { label: 'USE IT WHEN', color: 'text-primary', items: [
          'Downstream side effects must not be lost (inventory, billing, email)',
          'You cannot afford 2PC complexity or Kafka XA bridges',
          'You need a reliable audit trail of all domain events',
          'At-least-once delivery with idempotent consumers is acceptable',
        ]},
        { label: 'SKIP IT WHEN', color: 'text-yellow-400', items: [
          'Events are advisory only and loss is tolerable (analytics, logging)',
          'Your write throughput makes an extra table write prohibitively expensive',
          'You already have exactly-once semantics via a different mechanism',
          'Your message broker and database share a native transaction coordinator',
        ]},
      ].map(col => (
        <div key={col.label} className="bg-bg-dark p-5">
          <p className={`text-[9px] font-bold font-mono tracking-widest mb-3 ${col.color}`}>{col.label}</p>
          <ul className="space-y-2">
            {col.items.map(item => (
              <li key={item} className="flex gap-2 text-xs font-mono text-slate-500 leading-5">
                <span className={`shrink-0 ${col.color}`}>▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* ── Conclusion ── */}
    <H2 num="09">Conclusion</H2>

    <P>
      The Outbox Pattern resolves the dual write problem elegantly: write to the database atomically, let a relay
      forward events asynchronously, and make consumers idempotent. No distributed transaction coordinator. No XA
      bridges. No new failure modes beyond what your existing database and message broker already surface.
    </P>

    <P>
      The pattern does demand discipline. The outbox write must be colocated with the domain write — always, not
      just in the happy path. Idempotency keys must be generated deterministically and carried through to consumers.
      The relay must be monitored and its lag alerted on. None of these are hard. They are just non-negotiable.
    </P>

    <Callout type="info">
      Reliability is not a feature you add later. The Outbox Pattern is a structural commitment to making event
      publishing a first-class concern — as durable as the data it describes.
    </Callout>
  </ArticleLayout>
);

export default OutboxPattern;
