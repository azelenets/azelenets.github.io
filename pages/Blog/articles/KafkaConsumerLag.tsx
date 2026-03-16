import React from 'react';
import ArticleLayout from '../ArticleLayout';
import { P, H2, H3, Callout, Code } from '../ArticlePrimitives';

/* ─── Prose primitives ────────────────────────────────────────────────────── */


const CauseCard: React.FC<{ num: string; title: string; signal: string; color: string; labelColor: string; children: React.ReactNode }> = ({
  num, title, signal, color, labelColor, children,
}) => (
  <div className={`border p-5 my-4 ${color}`}>
    <div className="flex items-center gap-2 mb-2">
      <span className={`text-[9px] font-bold font-mono border px-1.5 py-0.5 ${labelColor}`}>CAUSE_{num}</span>
      <span className={`font-bold text-xs uppercase tracking-widest ${labelColor.replace('border-', 'text-').replace('/20', '/90')}`}>{title}</span>
    </div>
    <p className={`text-[9px] font-mono font-bold tracking-widest mb-2 ${labelColor.replace('border-', 'text-')}`}>
      SIGNAL: {signal}
    </p>
    <p className="text-xs font-mono text-slate-500 leading-6">{children}</p>
  </div>
);

const LagBar: React.FC<{ partition: string; lag: number; max: number; hot?: boolean }> = ({ partition, lag, max, hot }) => {
  const pct = Math.round((lag / max) * 100);
  return (
    <div className="mb-2">
      <div className="flex justify-between text-[9px] font-mono text-slate-600 mb-1">
        <span>{partition}</span>
        <span className={hot ? 'text-red-400' : 'text-slate-500'}>{lag.toLocaleString()} msgs {hot ? '⚠ HOTSPOT' : ''}</span>
      </div>
      <div className="h-4 bg-black/40 border border-primary/10 overflow-hidden">
        <div
          className={`h-full flex items-center px-2 text-[8px] font-bold font-mono transition-all ${hot ? 'bg-red-400/60' : 'bg-primary/40'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

/* ─── Article ─────────────────────────────────────────────────────────────── */

const KafkaConsumerLag: React.FC = () => (
  <ArticleLayout
    id="POST_007"
    title="Kafka Consumer Lag Is a Symptom, Not the Disease"
    category="DATA_ENGINEERING"
    date="2025-06-22"
    readTime={9}
    tags={['KAFKA', 'STREAMING', 'OBSERVABILITY']}
  >
    <P>
      The alert fires at 2am: consumer group lag for <code className="text-primary text-xs">orders-processor</code>{' '}
      has exceeded 100,000 messages. The on-call engineer opens the Kubernetes dashboard, bumps consumer
      replicas from 3 to 6, watches the lag number start to fall, and goes back to sleep. Two nights later,
      the same alert fires again.
    </P>

    <P>
      This is the most common Kafka operational pattern in production — and it solves nothing. Lag is not a
      root cause. It is a measurement of the gap between how fast messages arrive and how fast consumers
      process them. Adding more consumers addresses neither side of that equation if the real constraint
      is processing speed, partition count, message size, external I/O, or a hot partition. The lag falls
      temporarily because the extra replicas drain the backlog — then the same underlying bottleneck
      rebuilds it.
    </P>

    <Callout type="warn">
      Adding consumer replicas beyond the partition count does nothing at all. Kafka assigns at most one
      consumer per partition per consumer group. Extra replicas above that ceiling sit idle, drawing
      resources and contributing zero throughput.
    </Callout>

    {/* ── Section 1 ── */}
    <H2 num="01">What Lag Actually Measures</H2>

    <P>
      Consumer lag for a partition is the difference between the partition's latest offset (the log-end
      offset, written by producers) and the consumer group's committed offset (the last offset the consumer
      has confirmed processing). It is a count of messages, not a duration.
    </P>

    <Code label="Kafka CLI — inspect lag per partition for a consumer group">
{`# Per-partition lag breakdown — the only view that matters for diagnosis
kafka-consumer-groups.sh \
  --bootstrap-server kafka:9092 \
  --group orders-processor \
  --describe

# Output:
# GROUP            TOPIC    PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG
# orders-processor orders   0          4,821,003        4,821,150        147
# orders-processor orders   1          4,799,441        4,801,093       1652
# orders-processor orders   2          4,815,776        4,815,802         26
# orders-processor orders   3          4,810,001        4,923,887      113886  ← hot partition
# orders-processor orders   4          4,822,019        4,822,044         25

# Partition 3 holds almost all the lag.
# Adding more replicas will not help — it already has a consumer assigned.
# The question is: why is partition 3 processing slowly?`}
    </Code>

    <P>
      The per-partition view is the most important diagnostic step and the one most teams skip because their
      monitoring shows only aggregate lag. Aggregate lag hides hotspots: a single slow partition with
      100,000 messages in backlog looks identical in aggregate to five partitions each with 20,000 messages —
      but they have completely different root causes and solutions.
    </P>

    <div className="my-7 p-5 border border-primary/10 bg-black/30">
      <p className="text-[9px] font-bold font-mono text-primary/50 tracking-widest mb-4">PARTITION LAG DISTRIBUTION — AGGREGATE: 115,736 MESSAGES</p>
      <LagBar partition="orders / partition-0" lag={147}    max={115886} />
      <LagBar partition="orders / partition-1" lag={1652}   max={115886} />
      <LagBar partition="orders / partition-2" lag={26}     max={115886} />
      <LagBar partition="orders / partition-3" lag={113886} max={115886} hot />
      <LagBar partition="orders / partition-4" lag={25}     max={115886} />
      <p className="text-[9px] font-mono text-slate-700 mt-3">
        98.4% of lag is concentrated in a single partition. This is a hotspot problem, not a capacity problem.
      </p>
    </div>

    {/* ── Section 2 ── */}
    <H2 num="02">The Six Root Causes</H2>

    <CauseCard
      num="01" title="Hot Partition"
      signal="Lag concentrated in 1–2 partitions; other partitions near zero"
      color="border-red-400/15 bg-red-400/5"
      labelColor="border-red-400/20 text-red-400/70"
    >
      A partition key that produces highly uneven distribution — user ID for a viral account, a timestamp
      key that funnels all traffic to one partition, a tenant ID for your largest customer. The assigned
      consumer for that partition cannot keep up regardless of how many total replicas are running.
      Fix: rekey with a more uniform attribute, add a random suffix to hot keys, or use a custom partitioner.
    </CauseCard>

    <CauseCard
      num="02" title="Slow External I/O"
      signal="Consumer CPU is low but processing rate is well below produce rate; thread pool saturation"
      color="border-yellow-400/15 bg-yellow-400/5"
      labelColor="border-yellow-400/20 text-yellow-400/70"
    >
      The consumer calls a database, HTTP API, or cache for every message — synchronously. If that
      dependency has p99 latency of 50ms and the consumer processes messages one at a time, maximum
      throughput is 20 messages/sec per partition. A produce rate of 100 messages/sec produces lag that
      grows at 80 messages/sec regardless of replica count.
      Fix: batch database writes, parallelise I/O with async processing, or pre-fetch lookups.
    </CauseCard>

    <CauseCard
      num="03" title="Insufficient Partition Count"
      signal="All partitions have high lag; adding replicas does reduce lag proportionally"
      color="border-orange-400/15 bg-orange-400/5"
      labelColor="border-orange-400/20 text-orange-400/70"
    >
      Partition count is the maximum parallelism ceiling for a consumer group. If you have 4 partitions
      and need 8 consumers to keep up with produce rate, 4 of those consumers will always be idle.
      Partition count cannot be reduced without data loss — plan ahead. The rule of thumb: partition
      count should be 2–3× your expected peak consumer count.
      Fix: increase partition count (creates a brief rebalance); coordinate with all consumer groups
      on the topic.
    </CauseCard>

    <CauseCard
      num="04" title="Deserialisation Overhead"
      signal="Consumer CPU is high even for simple processing logic; profiler shows time in deserialise calls"
      color="border-blue-400/15 bg-blue-400/5"
      labelColor="border-blue-400/20 text-blue-400/70"
    >
      Large JSON payloads, deep nested structures, and reflection-heavy deserialisation frameworks add
      per-message CPU cost that compounds at high throughput. A 50ms deserialisation overhead per message
      sets a hard ceiling of 20 messages/sec — no amount of concurrency helps if the CPU is the bottleneck.
      Fix: migrate to Protobuf or Avro with schema registry; compress large payloads; denormalise
      to avoid nested lookups in the consumer.
    </CauseCard>

    <CauseCard
      num="05" title="Consumer Rebalancing Storm"
      signal="Lag spikes every N minutes; consumer group shows frequent rebalance events in logs"
      color="border-purple-400/15 bg-purple-400/5"
      labelColor="border-purple-400/20 text-purple-400/70"
    >
      During a rebalance, all consumers in the group stop processing until partitions are reassigned.
      Frequent rebalances — caused by slow poll loops, GC pauses exceeding max.poll.interval.ms, or
      aggressive health-check restarts — create periodic lag spikes even when average throughput is fine.
      Fix: tune max.poll.interval.ms, reduce poll batch size, switch to the Cooperative Sticky assignor
      to minimise partition movement during rebalances.
    </CauseCard>

    <CauseCard
      num="06" title="Poison Pill Messages"
      signal="Lag grows on a single partition; consumer logs show repeated processing errors on the same offset"
      color="border-slate-600/30 bg-slate-800/30"
      labelColor="border-slate-500/20 text-slate-400/70"
    >
      A malformed or unexpected message that causes the consumer to throw on every processing attempt.
      With automatic retry, the consumer retries the same offset indefinitely — making zero forward
      progress while lag accumulates behind the stuck offset. Fix: implement a dead-letter topic with
      a maximum retry count; never retry indefinitely on deserialization or schema validation failures.
    </CauseCard>

    {/* ── Section 3 ── */}
    <H2 num="03">The Diagnostic Toolkit</H2>

    <H3>Prometheus queries that expose root cause, not just symptoms</H3>

    <Code label="Prometheus — per-partition lag, consumer throughput, and rebalance rate">
{`# Per-partition lag — reveals hotspots hidden in aggregate views
kafka_consumer_group_lag{
  group="orders-processor",
  topic="orders"
}

# Consumer throughput: records processed per second per instance
rate(kafka_consumer_records_consumed_total{
  group="orders-processor"
}[5m])

# Rebalance rate — spikes here explain periodic lag spikes
rate(kafka_consumer_rebalance_total{
  group="orders-processor"
}[10m])

# Fetch latency p99 — high values point to broker or network issues
histogram_quantile(0.99,
  rate(kafka_consumer_fetch_latency_ms_bucket{
    group="orders-processor"
  }[5m])
)

# Commit rate — too-low commit rate means large re-processing on restart
rate(kafka_consumer_commit_total{
  group="orders-processor"
}[5m])`}
    </Code>

    <H3>Alerting on lag rate of change, not absolute lag</H3>

    <P>
      Alerting on absolute lag value produces constant noise during expected traffic spikes — Black Friday
      lag legitimately grows and then drains. What matters is whether lag is growing faster than the
      consumer can drain it, and whether it is growing at all when it should be zero.
    </P>

    <Code label="Prometheus alert rules — lag growth rate and partition-level anomalies">
{`groups:
  - name: kafka-consumer-health
    rules:

      # Alert when lag has grown continuously for 10 minutes
      # (indicates consumers are not keeping up with produce rate)
      - alert: KafkaConsumerLagGrowing
        expr: |
          deriv(kafka_consumer_group_lag{group=~".+"}[10m]) > 0
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Consumer lag growing for {{ $labels.group }}/{{ $labels.topic }}"
          description: "Lag growing at {{ $value | humanize }} messages/sec"

      # Alert on extreme partition skew — hotspot indicator
      - alert: KafkaPartitionLagSkew
        expr: |
          (
            max by (group, topic) (kafka_consumer_group_lag)
            /
            avg by (group, topic) (kafka_consumer_group_lag)
          ) > 10
        for: 5m
        annotations:
          summary: "Partition lag skew > 10× for {{ $labels.group }} — likely hotspot"

      # Alert on stuck consumer — lag not moving for 5 minutes
      - alert: KafkaConsumerStuck
        expr: |
          changes(kafka_consumer_group_lag{group=~".+"}[5m]) == 0
          and kafka_consumer_group_lag > 1000
        for: 5m
        annotations:
          summary: "Consumer {{ $labels.group }} stuck at {{ $value }} messages lag"
          description: "Offset not advancing — check for poison pill or rebalance loop"`}
    </Code>

    {/* ── Section 4 ── */}
    <H2 num="04">Fixing Slow External I/O — the Most Common Real Cause</H2>

    <P>
      Once partition skew is ruled out, slow external I/O is the root cause in the majority of production
      lag incidents. The pattern is always the same: the consumer handler calls a database or downstream
      service per message, synchronously, and the round-trip latency multiplied by message volume exceeds
      what a single thread can sustain.
    </P>

    <H3>From sequential to batched processing</H3>

    <Code label="Before — sequential per-message database write, one round trip per message">
{`// poll() returns up to max.poll.records messages per call (default: 500)
// Processing them one by one: 500 × 15ms DB write = 7.5 seconds per batch
// Meanwhile, the producer may have added 2,000 more messages

consumer.on('message', async (message) => {
  const order = deserialise(message.value);

  // One database round trip per message — the bottleneck
  await db.query(
    'INSERT INTO processed_orders (id, data) VALUES ($1, $2)',
    [order.id, JSON.stringify(order)],
  );

  await consumer.commitOffsets([{
    topic: message.topic,
    partition: message.partition,
    offset: (BigInt(message.offset) + 1n).toString(),
  }]);
});`}
    </Code>

    <Code label="After — batch processing with a single multi-row insert per poll cycle">
{`// Process an entire poll batch in one database round trip.
// 500 messages × 15ms → 1 batch insert ≈ 18ms total.
// Throughput: ~27× improvement for the same DB load.

async function processBatch(messages: KafkaMessage[]): Promise<void> {
  if (messages.length === 0) return;

  const orders = messages.map(m => deserialise(m.value));

  // Single multi-row insert for the entire batch
  const values = orders.map((o, i) => \`($\${i * 2 + 1}, $\${i * 2 + 2})\`).join(', ');
  const params = orders.flatMap(o => [o.id, JSON.stringify(o)]);

  await db.query(
    \`INSERT INTO processed_orders (id, data) VALUES \${values}
     ON CONFLICT (id) DO NOTHING\`,  // idempotent — safe to retry on rebalance
    params,
  );

  // Commit only the highest offset in the batch — one commit per poll cycle
  const lastMessage = messages[messages.length - 1];
  await consumer.commitOffsets([{
    topic:     lastMessage.topic,
    partition: lastMessage.partition,
    offset:    (BigInt(lastMessage.offset) + 1n).toString(),
  }]);
}

// In the consumer loop:
const messages = await consumer.poll({ timeout: 1000 });
await processBatch(messages);`}
    </Code>

    <Callout type="info">
      Batch processing requires idempotent writes. If the consumer crashes after the database insert but
      before the offset commit, the batch will be reprocessed on restart. The{' '}
      <code>ON CONFLICT DO NOTHING</code> clause (or equivalent upsert) ensures reprocessing the same
      messages is safe.
    </Callout>

    {/* ── Section 5 ── */}
    <H2 num="05">Fixing Hot Partitions</H2>

    <P>
      A hot partition is a partitioning strategy problem. The partition key must distribute messages
      uniformly across all partitions — if it does not, no amount of consumer scaling resolves the
      imbalance because Kafka guarantees ordering per partition, meaning a single consumer owns each
      partition.
    </P>

    <Code label="Diagnosing partition key distribution — producer-side message count per partition">
{`# kafka-log-dirs shows message count per partition on the broker
kafka-log-dirs.sh \
  --bootstrap-server kafka:9092 \
  --topic orders \
  --describe \
  | grep -oP '"partition":\d+,"size":\d+' \
  | sort -t: -k2 -n -r

# Example output revealing severe skew:
# "partition":3,"size":4831920128   ← 4.5 GB — hot partition
# "partition":0,"size":102400000
# "partition":1,"size":98304000
# "partition":2,"size":104857600
# "partition":4,"size":97280000`}
    </Code>

    <Code label="Adding a random salt to hot keys — even distribution at the cost of ordering">
{`// If strict per-entity ordering is NOT required, salt the partition key
// to distribute load evenly across all partitions.

const SALT_BUCKETS = 8; // tune to partition count

function getPartitionKey(order: Order): string {
  if (isHighVolumeEntity(order.merchantId)) {
    // Distribute this merchant's orders across SALT_BUCKETS partitions
    // Ordering is per-bucket, not per-merchant — acceptable for most workloads
    const salt = order.orderId.charCodeAt(0) % SALT_BUCKETS;
    return \`\${order.merchantId}-\${salt}\`;
  }
  return order.merchantId;
}

await producer.send({
  topic: 'orders',
  messages: [{
    key:   getPartitionKey(order),
    value: serialise(order),
  }],
});`}
    </Code>

    {/* ── Section 6 ── */}
    <H2 num="06">Fixing the Rebalancing Storm</H2>

    <P>
      Kafka rebalances are necessary but disruptive: all consumers in a group stop processing during
      partition reassignment. In a group with 20 consumers processing 50,000 messages/sec, a 10-second
      rebalance creates a 500,000-message lag spike before processing even resumes. Minimising rebalance
      frequency and duration is a high-leverage operational improvement.
    </P>

    <Code label="Consumer configuration — tuning to reduce rebalance frequency and duration">
{`# server.properties / consumer config
# (KafkaJS / confluent-kafka equivalents in comments)

# Maximum time between poll() calls before the broker considers
# the consumer dead and triggers a rebalance.
# Increase if your processing logic can take longer than 5 minutes per batch.
max.poll.interval.ms=600000   # 10 minutes (default: 5 minutes)

# Reduce poll batch size if processing takes too long per batch
# — gives more frequent poll() calls, reducing rebalance risk
max.poll.records=100           # default: 500

# Session timeout: how long before a silent consumer is evicted.
# Must be within [group.min.session.timeout.ms, group.max.session.timeout.ms]
session.timeout.ms=45000       # default: 45s

# Heartbeat interval: must be < session.timeout.ms / 3
heartbeat.interval.ms=15000    # default: 3s

# CRITICAL: use the Cooperative Sticky assignor.
# Default (Eager) assignor revokes ALL partitions during rebalance.
# Cooperative Sticky only moves partitions that need to change —
# consumers keep their other partitions and continue processing.
partition.assignment.strategy=org.apache.kafka.clients.consumer.CooperativeStickyAssignor`}
    </Code>

    <Callout type="info">
      The Cooperative Sticky assignor is the single most impactful configuration change for high-throughput
      consumer groups. With the default Eager assignor, adding one new consumer replica triggers a full
      group rebalance — all consumers stop processing. With Cooperative Sticky, only the partitions being
      moved are temporarily unassigned.
    </Callout>

    {/* ── Section 7 ── */}
    <H2 num="07">Handling Poison Pills</H2>

    <P>
      A poison pill is a message the consumer cannot process — schema mismatch, corrupt payload, an
      unexpected null that throws a NullPointerException in the handler. With naive retry logic, the
      consumer retries the same offset indefinitely, making zero forward progress while lag accumulates
      behind the stuck message.
    </P>

    <Code label="Dead-letter topic pattern — bounded retries with DLT routing on exhaustion">
{`const MAX_RETRIES = 3;
const retryCount = new Map<string, number>(); // offset → retry count

async function processWithDLT(message: KafkaMessage): Promise<void> {
  const offsetKey = \`\${message.partition}:\${message.offset}\`;
  const attempts  = (retryCount.get(offsetKey) ?? 0) + 1;

  try {
    await processMessage(message);
    retryCount.delete(offsetKey); // success — clear retry state
  } catch (error) {
    if (attempts >= MAX_RETRIES) {
      // Exhausted retries — route to dead-letter topic and move on
      console.error(\`Routing to DLT after \${attempts} attempts:\`, {
        offset: message.offset,
        partition: message.partition,
        error: (error as Error).message,
      });

      await producer.send({
        topic: 'orders.dead-letter',
        messages: [{
          key:   message.key,
          value: message.value,
          headers: {
            'original-topic':     message.topic,
            'original-partition': String(message.partition),
            'original-offset':    message.offset,
            'failure-reason':     (error as Error).message,
            'failed-at':          new Date().toISOString(),
          },
        }],
      });

      retryCount.delete(offsetKey);
      // Commit the offset — we are done with this message
    } else {
      retryCount.set(offsetKey, attempts);
      throw error; // re-throw to trigger retry logic
    }
  }
}`}
    </Code>

    {/* ── Conclusion ── */}
    <H2 num="08">Conclusion</H2>

    <P>
      Consumer lag is a lagging indicator — by the time your alert fires, the root cause has usually been
      active for minutes or hours. The response protocol is always: check per-partition distribution first,
      then consumer throughput metrics, then processing latency, then rebalance events, then application
      logs for repeated errors at the same offset.
    </P>

    <P>
      Adding replicas is a valid short-term mitigation for genuine throughput shortfalls, but it is never
      a diagnosis. The diagnostic question is always: why is the gap between produce rate and consume rate
      growing? Answer that, and the fix is usually one of six things — fix the partition key, batch the
      I/O, add partitions, swap the serialisation format, tune the rebalance configuration, or implement
      a dead-letter topic.
    </P>

    <Callout type="info">
      Monitor per-partition lag, not just aggregate lag. Set up a lag skew alert (max partition lag / avg
      partition lag {'>'} 10×). Alert on lag growth rate, not absolute value. These three changes will
      surface the root cause before the 2am page instead of after it.
    </Callout>
  </ArticleLayout>
);

export default KafkaConsumerLag;
