import React from 'react';
import ArticleLayout from '../ArticleLayout';
import { P, H2, H3, Callout, Code } from '../ArticlePrimitives';

/* ─── Prose primitives ────────────────────────────────────────────────────── */


const GuaranteeCard: React.FC<{
  tier: string; label: string; what: string; how: string;
  cost: string; color: string; labelCls: string;
}> = ({ tier, label, what, how, cost, color, labelCls }) => (
  <div className={`border p-5 ${color}`}>
    <div className="flex items-center gap-2 mb-3">
      <span className={`text-[9px] font-bold font-mono border px-1.5 py-0.5 ${labelCls}`}>{tier}</span>
      <span className={`font-bold text-xs uppercase tracking-widest ${labelCls.replace('border-', 'text-').replace('/30', '/90')}`}>{label}</span>
    </div>
    <div className="grid grid-cols-1 gap-2 text-xs font-mono">
      <div><span className="text-slate-600">WHAT: </span><span className="text-slate-400">{what}</span></div>
      <div><span className="text-slate-600">HOW:  </span><span className="text-slate-400">{how}</span></div>
      <div><span className="text-slate-600">COST: </span><span className="text-slate-400">{cost}</span></div>
    </div>
  </div>
);

const LayerRow: React.FC<{ layer: string; mechanism: string; scope: string; owned: string }> = ({ layer, mechanism, scope, owned }) => (
  <div className="grid grid-cols-4 gap-px bg-primary/10 text-xs font-mono border-t border-primary/5 first:border-t-0">
    <div className="bg-bg-dark px-4 py-3 text-white font-bold">{layer}</div>
    <div className="bg-primary/5 px-4 py-3 text-primary/70">{mechanism}</div>
    <div className="bg-bg-dark px-4 py-3 text-slate-500">{scope}</div>
    <div className="bg-bg-dark px-4 py-3 text-slate-500">{owned}</div>
  </div>
);

/* ─── Article ─────────────────────────────────────────────────────────────── */

const ExactlyOnceSemantics: React.FC = () => (
  <ArticleLayout
    id="POST_008"
    title="Exactly-Once Semantics: What It Actually Means and When You Need It"
    category="DATA_ENGINEERING"
    date="2025-05-30"
    readTime={13}
    tags={['KAFKA', 'STREAMING', 'RELIABILITY', 'TRANSACTIONS']}
  >
    <P>
      "Exactly-once" is one of the most frequently claimed and least understood guarantees in distributed
      systems. Vendors advertise it. Engineers ask for it. Architects design around it. And almost everyone
      means something different when they say it.
    </P>

    <P>
      The confusion runs deep because exactly-once is not a single property — it is a composite of three
      separate guarantees at three separate layers of a streaming pipeline, each with its own mechanism,
      scope, and cost. You can have exactly-once delivery at the broker layer while your application still
      double-charges a customer. You can have exactly-once processing in your stream topology while your
      downstream database receives every write twice.
    </P>

    <P>
      This article is a precise definition of what exactly-once means at each layer, how Kafka implements
      it, what it cannot do, and how to build end-to-end exactly-once behaviour in a real application.
    </P>

    <Callout type="warn">
      There is no such thing as exactly-once delivery in an asynchronous distributed system without
      co-ordination at every layer of the pipeline. Any system that claims it without qualification is
      either lying or scoping the claim much more narrowly than it appears.
    </Callout>

    {/* ── Section 1 ── */}
    <H2 num="01">The Three Delivery Guarantees</H2>

    <P>
      Before exactly-once, you need to understand what it is replacing and why. There are three delivery
      guarantee tiers, and each is a deliberate trade-off between safety, performance, and complexity.
    </P>

    <div className="grid grid-cols-1 gap-px bg-primary/10 border border-primary/10 my-7">
      <GuaranteeCard
        tier="AT-MOST-ONCE"
        label="Fire and Forget"
        what="A message is delivered zero or one times. Delivery is not confirmed."
        how="Producer sends without awaiting acknowledgement. No retries on failure."
        cost="Lowest latency, lowest overhead. Messages can be silently lost."
        color="border-slate-700/30 bg-slate-800/20"
        labelCls="border-slate-500/30 text-slate-400/70"
      />
      <GuaranteeCard
        tier="AT-LEAST-ONCE"
        label="Retry Until Acknowledged"
        what="A message is delivered one or more times. No message is ever lost."
        how="Producer retries until it receives a broker ack. Consumer re-processes on restart."
        cost="Higher latency than at-most-once. Duplicates are possible and must be handled by consumers."
        color="border-yellow-400/15 bg-yellow-400/5"
        labelCls="border-yellow-400/30 text-yellow-400/70"
      />
      <GuaranteeCard
        tier="EXACTLY-ONCE"
        label="Atomic, Deduplicated"
        what="The visible side effects of processing a message appear exactly once, even under failures."
        how="Idempotent producers + transactional APIs + idempotent consumers — all three layers."
        cost="Highest overhead. Requires transaction co-ordinator, fencing tokens, and consumer design discipline."
        color="border-primary/20 bg-primary/5"
        labelCls="border-primary/30 text-primary/70"
      />
    </div>

    <Callout type="info">
      At-least-once with idempotent consumers is the right default for most systems. It is simpler,
      faster, and nearly as safe as exactly-once when consumers are designed correctly. Reserve
      full exactly-once for workloads where duplicates cannot be tolerated even transiently — financial
      transactions, billing events, inventory deductions.
    </Callout>

    {/* ── Section 2 ── */}
    <H2 num="02">Exactly-Once Is a Pipeline Property, Not a Point Property</H2>

    <P>
      The central misunderstanding: engineers enable Kafka's exactly-once producer settings and believe
      they have exactly-once semantics end to end. They do not. Kafka's exactly-once guarantee covers a
      specific, bounded scope. Understanding that scope is the entire game.
    </P>

    <div className="my-7 border border-primary/10 overflow-hidden">
      <div className="grid grid-cols-4 text-[9px] font-bold font-mono tracking-widest bg-primary/10">
        <div className="px-4 py-2 text-primary/50">LAYER</div>
        <div className="px-4 py-2 text-primary/50">MECHANISM</div>
        <div className="px-4 py-2 text-primary/50">SCOPE</div>
        <div className="px-4 py-2 text-primary/50">OWNED BY</div>
      </div>
      <LayerRow
        layer="Producer → Broker"
        mechanism="Idempotent producer + sequence numbers"
        scope="No duplicate messages written to a single topic-partition"
        owned="Kafka (enable.idempotence=true)"
      />
      <LayerRow
        layer="Broker → Broker"
        mechanism="Transactional producer + transaction coordinator"
        scope="Atomic writes across multiple partitions / topics"
        owned="Kafka (transactional.id + isolation.level)"
      />
      <LayerRow
        layer="Consumer → Sink"
        mechanism="Idempotent writes + deduplication table"
        scope="No duplicate side effects in the downstream system"
        owned="Your application code"
      />
    </div>

    <P>
      Kafka's exactly-once guarantee covers the first two layers: no duplicate messages in the log, and
      atomic multi-partition writes. The third layer — preventing duplicate side effects in downstream
      systems (databases, APIs, emails, payment processors) — is always the application's responsibility.
      Kafka cannot know whether your database write or your HTTP call succeeded before a crash.
    </P>

    {/* ── Section 3 ── */}
    <H2 num="03">Layer 1 — Idempotent Producer</H2>

    <P>
      Without idempotence, producer retries create duplicates. The sequence: producer sends a batch,
      the broker writes it, the broker acknowledgement is lost in transit, the producer times out and
      retries, the broker writes the batch again. The consumer sees the message twice.
    </P>

    <P>
      Idempotent producers solve this with sequence numbers. The broker assigns each producer a
      Producer ID (PID) on registration and tracks the latest sequence number it has seen per
      topic-partition per PID. Duplicate sends — same PID, same sequence number — are silently
      deduplicated at the broker.
    </P>

    <Code label="Kafka producer — enabling idempotence (Java / Spring Kafka)">
{`# Producer configuration
enable.idempotence=true          # enables PID assignment and sequence numbers
acks=all                         # required by idempotent producers — wait for all ISR replicas
max.in.flight.requests.per.connection=5  # max 5 for idempotence (ordering guarantee)
retries=Integer.MAX_VALUE        # retry indefinitely — idempotence makes this safe

# In Spring Kafka:
spring:
  kafka:
    producer:
      properties:
        enable.idempotence: true
        acks: all
        max.in.flight.requests.per.connection: 5`}
    </Code>

    <Callout type="info">
      Idempotent producers are scoped to a single topic-partition. They prevent duplicates from retries
      within the same producer session, but they do not survive producer restarts — a new producer
      instance gets a new PID and has no knowledge of messages sent by its predecessor. For
      cross-session deduplication, you need transactional producers.
    </Callout>

    {/* ── Section 4 ── */}
    <H2 num="04">Layer 2 — Transactional Producer</H2>

    <P>
      Transactional producers extend idempotence with two additional guarantees: atomic writes across
      multiple partitions and topics, and cross-session producer identity via a stable
      <code className="text-primary text-xs"> transactional.id</code>. They are the mechanism behind
      Kafka Streams' exactly-once processing mode and the consume-transform-produce pattern.
    </P>

    <H3>The consume-transform-produce loop</H3>

    <P>
      The canonical exactly-once pattern in Kafka: read from an input topic, transform the data,
      write the result to an output topic, and commit the input offsets — all in a single atomic
      transaction. Either all three complete or none do.
    </P>

    <Code label="Java — transactional producer for atomic consume-transform-produce">
{`Properties producerProps = new Properties();
producerProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:9092");
producerProps.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
producerProps.put(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "order-transformer-0");
// transactional.id must be unique per producer instance and stable across restarts
// Convention: "<application-id>-<partition-index>"

KafkaProducer<String, String> producer = new KafkaProducer<>(producerProps);
producer.initTransactions(); // registers with the transaction coordinator

try {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(500));

    producer.beginTransaction();

    for (ConsumerRecord<String, String> record : records) {
        Order order = deserialise(record.value());
        EnrichedOrder enriched = enrich(order);

        // Write to output topic — part of the transaction
        producer.send(new ProducerRecord<>("orders.enriched", order.id, serialise(enriched)));
    }

    // Commit the input offsets atomically WITH the output writes.
    // If the process crashes here, BOTH the output writes AND the
    // offset commit are rolled back — the input is reprocessed on restart.
    Map<TopicPartition, OffsetAndMetadata> offsets = currentOffsets(records);
    producer.sendOffsetsToTransaction(offsets, consumer.groupMetadata());

    producer.commitTransaction(); // atomic commit of outputs + offsets

} catch (ProducerFencedException e) {
    // A newer instance with the same transactional.id has taken over.
    // This instance is fenced — it must not produce any more messages.
    producer.close();
} catch (Exception e) {
    producer.abortTransaction(); // roll back everything in this transaction
    throw e;
}`}
    </Code>

    <H3>The transaction coordinator and fencing</H3>

    <P>
      Kafka's transaction coordinator is a broker-side component (part of the{' '}
      <code className="text-primary text-xs">__transaction_state</code> internal topic) that manages
      transaction lifecycle. When a producer with a given <code className="text-primary text-xs">transactional.id</code>{' '}
      calls <code className="text-primary text-xs">initTransactions()</code>, the coordinator bumps
      the producer epoch for that ID. Any previously registered producer with the same ID receives a
      <code className="text-primary text-xs"> ProducerFencedException</code> on its next write — it is
      fenced out.
    </P>

    <P>
      Fencing is the key to crash recovery. If a producer crashes mid-transaction and a new instance
      starts up with the same <code className="text-primary text-xs">transactional.id</code>, the new
      instance fences the old one (which is now a zombie), rolls back any in-flight transactions from
      the previous epoch, and resumes cleanly from the last committed offset.
    </P>

    <Code label="Consumer — read_committed isolation to exclude in-flight transaction messages">
{`# Consumer must use read_committed isolation level to see only committed messages.
# Without this, consumers read messages from open or aborted transactions —
# violating exactly-once from the consumer's perspective.

isolation.level=read_committed

# In Spring Kafka:
spring:
  kafka:
    consumer:
      properties:
        isolation.level: read_committed`}
    </Code>

    <Callout type="danger">
      <code>isolation.level=read_committed</code> introduces read latency equal to the transaction
      commit latency. Consumers block at the Last Stable Offset (LSO) — they cannot read past
      uncommitted messages from an open transaction. A long-running transaction on a high-throughput
      topic will cause consumer lag to grow even when the consumer is otherwise healthy. Monitor LSO
      lag separately from committed offset lag.
    </Callout>

    {/* ── Section 5 ── */}
    <H2 num="05">Layer 3 — Idempotent Consumers (Your Responsibility)</H2>

    <P>
      Kafka's transactions guarantee that messages appear exactly once in the log. They say nothing
      about what happens when your consumer writes those messages to a database, calls a payment API,
      or sends an email. Those operations live outside the Kafka transaction boundary — and they will
      be executed more than once whenever the consumer restarts, rebalances, or retries a failed batch.
    </P>

    <P>
      This is the layer that matters most for business correctness, and it is entirely the application's
      responsibility to implement.
    </P>

    <H3>Pattern 1 — natural idempotency</H3>

    <P>
      Some operations are naturally idempotent. Setting a value rather than incrementing it, upserting
      a record rather than inserting it, writing a file with a deterministic name. When your side effect
      is naturally idempotent, reprocessing the same message produces the same result with no special
      deduplication logic required.
    </P>

    <Code label="Natural idempotency — upsert instead of insert">
{`// Processing a UserProfileUpdated event
// UPSERT is idempotent — processing the same event twice
// produces the same final state as processing it once

await db.query(
  \`INSERT INTO user_profiles (user_id, display_name, avatar_url, updated_at)
   VALUES ($1, $2, $3, $4)
   ON CONFLICT (user_id)
   DO UPDATE SET
     display_name = EXCLUDED.display_name,
     avatar_url   = EXCLUDED.avatar_url,
     updated_at   = EXCLUDED.updated_at
   WHERE user_profiles.updated_at < EXCLUDED.updated_at\`,
  [event.userId, event.displayName, event.avatarUrl, event.occurredAt],
);
// The WHERE clause on updated_at ensures a late-arriving duplicate
// event doesn't overwrite a newer update.`}
    </Code>

    <H3>Pattern 2 — deduplication table</H3>

    <P>
      For operations that are not naturally idempotent — balance increments, email sends, webhook
      dispatches — the deduplication table is the standard solution. Record the event ID before
      applying the side effect, in the same transaction. On re-delivery, the uniqueness constraint
      on the event ID stops the side effect from running again.
    </P>

    <Code label="Deduplication table — atomic claim + side effect, safe to retry">
{`-- Schema
CREATE TABLE processed_events (
  event_id     TEXT        PRIMARY KEY,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Application
async function onPaymentReceived(event: PaymentEvent): Promise<void> {
  await db.transaction(async (tx) => {
    // Attempt to claim this event atomically
    const { rowCount } = await tx.query(
      \`INSERT INTO processed_events (event_id)
       VALUES ($1)
       ON CONFLICT (event_id) DO NOTHING\`,
      [event.eventId],
    );

    // rowCount === 0 means we have already processed this event
    if (rowCount === 0) {
      console.log(\`Skipping duplicate event: \${event.eventId}\`);
      return;
    }

    // First time seeing this event — apply the side effect
    await tx.query(
      \`UPDATE accounts
       SET balance = balance + $1, version = version + 1
       WHERE account_id = $2\`,
      [event.amount, event.accountId],
    );
    // If this transaction rolls back, the processed_events row
    // also rolls back — the event will be retried safely.
  });
}`}
    </Code>

    <H3>Pattern 3 — outbox for external system calls</H3>

    <P>
      For side effects outside the database — HTTP calls, email sends, push notifications — neither
      natural idempotency nor a deduplication table is enough, because the external call cannot
      participate in the database transaction. This is precisely the problem the Outbox Pattern
      solves (covered in depth in a separate article): write the intent to call the external system
      to the database atomically with the business logic, then have a relay execute the call
      at-least-once with deduplication on the external system's side.
    </P>

    {/* ── Section 6 ── */}
    <H2 num="06">Kafka Streams — Exactly-Once Built In</H2>

    <P>
      If your use case fits the stream-processing model, Kafka Streams implements exactly-once
      internally using the transactional producer pattern described above. You enable it with a
      single configuration property — the framework handles transaction boundaries, offset commits,
      and state store checkpointing.
    </P>

    <Code label="Kafka Streams — enabling exactly-once processing (EOS_V2 is preferred in Kafka 3.x+)">
{`Properties props = new Properties();
props.put(StreamsConfig.APPLICATION_ID_CONFIG, "order-aggregator");
props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka:9092");

// EOS_V2 (KIP-447): uses one transactional producer per StreamTask
// instead of per-partition — lower overhead, same guarantees.
// Use EXACTLY_ONCE_V2 for Kafka 2.6+
props.put(StreamsConfig.PROCESSING_GUARANTEE_CONFIG,
          StreamsConfig.EXACTLY_ONCE_V2);

// commit.interval.ms controls transaction frequency.
// Smaller = lower latency but higher broker overhead.
// Default: 100ms
props.put(StreamsConfig.COMMIT_INTERVAL_MS_CONFIG, 100);

KafkaStreams streams = new KafkaStreams(topology, props);
streams.start();`}
    </Code>

    <P>
      Kafka Streams' exactly-once covers the read-process-write loop within the Kafka ecosystem: input
      offsets committed atomically with output writes, state store updates checkpointed in the same
      transaction. It does not extend to external sinks (databases, REST APIs) — those require the
      same idempotent consumer patterns described above.
    </P>

    {/* ── Section 7 ── */}
    <H2 num="07">The Performance Cost — When Not to Use It</H2>

    <P>
      Exactly-once is not free. The transaction protocol adds latency and broker load that can
      meaningfully impact high-throughput pipelines. Before enabling it, understand the costs.
    </P>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-primary/10 border border-primary/10 my-7">
      {[
        {
          label: 'LATENCY IMPACT',
          color: 'text-yellow-400/70',
          items: [
            'Each transaction requires a round-trip to the transaction coordinator for begin, commit, and abort.',
            'read_committed consumers block at the LSO — any open transaction delays all downstream reads.',
            'Typical overhead: 1–5ms per transaction commit at low throughput; visible at p99 under load.',
          ],
        },
        {
          label: 'THROUGHPUT IMPACT',
          color: 'text-red-400/70',
          items: [
            'Transaction coordinator is a bottleneck at very high transaction rates — partition your transactional.id space.',
            'Larger batches per transaction amortise the overhead — tune commit.interval.ms up for throughput-optimised pipelines.',
            'Benchmark shows 20–40% throughput reduction vs at-least-once at small batch sizes.',
          ],
        },
        {
          label: 'USE EXACTLY-ONCE WHEN',
          color: 'text-primary/70',
          items: [
            'Duplicate side effects cause business harm: double charges, double inventory deductions, duplicate notifications.',
            'Downstream systems cannot implement their own deduplication (e.g. legacy APIs, third-party services).',
            'Aggregate stream computations where double-counting corrupts the aggregate permanently.',
          ],
        },
        {
          label: 'USE AT-LEAST-ONCE WHEN',
          color: 'text-green-400/70',
          items: [
            'Side effects are naturally idempotent: cache invalidations, search index updates, read model projections.',
            'Throughput or latency requirements make the transaction overhead unacceptable.',
            'Your consumer can implement deduplication more efficiently than the Kafka transaction protocol allows.',
          ],
        },
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

    {/* ── Section 8 ── */}
    <H2 num="08">End-to-End Exactly-Once Checklist</H2>

    <P>
      Building end-to-end exactly-once requires all three layers to be correct simultaneously.
      A checklist for production deployments:
    </P>

    <Code label="End-to-end exactly-once — configuration and design checklist">
{`# ── PRODUCER ──────────────────────────────────────────────────────────────
✓ enable.idempotence=true
✓ acks=all
✓ transactional.id set (unique per instance, stable across restarts)
✓ initTransactions() called before any sends
✓ ProducerFencedException handled — shut down the producer instance
✓ abortTransaction() called in all error paths

# ── BROKER ────────────────────────────────────────────────────────────────
✓ transaction.state.log.replication.factor >= 3
✓ transaction.state.log.min.isr >= 2
✓ transaction.timeout.ms tuned to your commit interval + headroom
  (default: 60s — must be > commit.interval.ms)

# ── CONSUMER ──────────────────────────────────────────────────────────────
✓ isolation.level=read_committed
✓ enable.auto.commit=false (manual offset management only)
✓ Offsets committed via sendOffsetsToTransaction(), not commitSync()
✓ LSO lag monitored separately from committed offset lag

# ── APPLICATION (your code) ───────────────────────────────────────────────
✓ Side effects are either:
    (a) naturally idempotent (upserts, set operations), OR
    (b) protected by a deduplication table in the same transaction, OR
    (c) routed through the Outbox Pattern for external system calls
✓ No direct external API calls inside the consumer transaction boundary
✓ Event IDs carried through the pipeline as idempotency keys`}
    </Code>

    {/* ── Conclusion ── */}
    <H2 num="09">Conclusion</H2>

    <P>
      Exactly-once semantics are achievable, but they are a system property — not a flag you flip on
      a producer. The Kafka transaction API handles the broker-layer guarantee reliably. The
      consume-transform-produce pattern handles the intra-Kafka pipeline. Everything outside Kafka —
      every database write, every HTTP call, every email send — is yours to make idempotent.
    </P>

    <P>
      The practical implication: design your consumers as if you will always receive every message at
      least twice. Use natural idempotency where you can, deduplication tables where you cannot, and
      the Outbox Pattern for external systems. With those foundations in place, Kafka's transaction
      API adds the final guarantee that completes the exactly-once contract from broker to sink.
    </P>

    <Callout type="info">
      Exactly-once is not the default — it is an explicit, costly choice. Design for at-least-once
      with idempotent consumers first. You will handle 95% of business requirements with better
      performance and simpler code, and you will have the idempotency foundation that makes
      upgrading to full exactly-once straightforward if you ever need it.
    </Callout>
  </ArticleLayout>
);

export default ExactlyOnceSemantics;
