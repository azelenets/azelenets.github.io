import React from 'react';
import ArticleLayout from '../ArticleLayout';
import { P, H2, H3, Callout, Code } from '../ArticlePrimitives';

/* ─── Article-specific components ────────────────────────────────────────── */

const KillerCard: React.FC<{
  num: string;
  title: string;
  symptom: string;
  impact: 'critical' | 'high' | 'medium';
  children: React.ReactNode;
}> = ({ num, title, symptom, impact, children }) => {
  const palette = {
    critical: { border: 'border-red-400/20',    bg: 'bg-red-400/5',    label: 'border-red-400/25 text-red-400/80',    badge: 'bg-red-400/15 text-red-400'    },
    high:     { border: 'border-orange-400/20', bg: 'bg-orange-400/5', label: 'border-orange-400/25 text-orange-400/80', badge: 'bg-orange-400/15 text-orange-400' },
    medium:   { border: 'border-yellow-400/20', bg: 'bg-yellow-400/5', label: 'border-yellow-400/25 text-yellow-400/80', badge: 'bg-yellow-400/15 text-yellow-400' },
  }[impact];

  return (
    <div className={`border ${palette.border} ${palette.bg} p-5 my-5`}>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className={`text-[9px] font-bold font-mono border px-1.5 py-0.5 ${palette.label}`}>
          KILLER_{num}
        </span>
        <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-sm ${palette.badge}`}>
          {impact.toUpperCase()}
        </span>
        <span className={`font-bold text-xs uppercase tracking-widest ${palette.label.split(' ')[1]}`}>
          {title}
        </span>
      </div>
      <p className={`text-[9px] font-mono font-bold tracking-widest mb-3 ${palette.label.split(' ')[1]}`}>
        SYMPTOM: {symptom}
      </p>
      <div className="text-xs font-mono text-slate-500 leading-6 space-y-1">{children}</div>
    </div>
  );
};

const CompareBar: React.FC<{ label: string; ms: number; max: number; variant?: 'bad' | 'good' }> = ({
  label, ms, max, variant = 'bad',
}) => {
  const pct = Math.min(Math.round((ms / max) * 100), 100);
  const color = variant === 'bad' ? 'bg-red-400/50' : 'bg-primary/50';
  const textColor = variant === 'bad' ? 'text-red-400' : 'text-primary';
  return (
    <div className="mb-3">
      <div className="flex justify-between text-[9px] font-mono mb-1">
        <span className="text-slate-500">{label}</span>
        <span className={textColor}>{ms.toLocaleString()} ms</span>
      </div>
      <div className="h-3 bg-black/40 border border-primary/10 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

/* ─── Article ─────────────────────────────────────────────────────────────── */

const DbPerformanceKillers: React.FC = () => (
  <ArticleLayout
    id="POST_011"
    title="Top Database Performance Killers and How to Fix Them"
    category="DISTRIBUTED_SYSTEMS"
    date="2025-12-10"
    readTime={14}
    tags={['POSTGRES', 'PERFORMANCE', 'SQL', 'INDEXING', 'RELIABILITY']}
  >
    <P>
      Most application performance problems are database problems in disguise. The profiler points to a
      controller action taking 800ms. The controller action does almost nothing. The database query underneath
      it runs 312 times.
    </P>

    <P>
      Database performance antipatterns are remarkably consistent across stacks, languages, and decades.
      The same six killers appear in Rails monoliths, NestJS microservices, and Django APIs alike — because
      they are not language problems. They are problems of how application code interacts with a relational
      database: how it fetches rows, how it uses indexes, how it holds locks, and how it manages connections.
      This article covers the most common killers, their symptoms, and practical fixes with real query examples.
    </P>

    <Callout type="info">
      All examples use PostgreSQL syntax. The concepts apply equally to MySQL and other relational databases,
      though specific system views (<code className="text-primary text-xs">pg_stat_statements</code>,{' '}
      <code className="text-primary text-xs">pg_locks</code>) are PostgreSQL-specific.
    </Callout>

    {/* ── Section 1 ── */}
    <H2 num="01">N+1 Queries</H2>

    <P>
      The N+1 problem is the single most common database performance killer in ORM-heavy applications.
      It occurs when code fetches a list of N records and then issues one additional query per record to
      load associated data — producing N+1 round trips to the database instead of one or two.
    </P>

    <KillerCard
      num="01"
      title="N+1 Query Problem"
      symptom="Endpoint is slow; database shows hundreds of identical queries with different WHERE clause values in a single request trace"
      impact="critical"
    >
      <p>
        Root cause: eager iteration over a collection without pre-loading associations. The ORM issues one
        SELECT per iteration instead of a single JOIN or batch fetch. At small scale this is invisible —
        10 records means 11 queries, which is fast. At production scale, 500 orders means 501 queries,
        each with network round-trip overhead. At 1ms per query, that is 500ms added to every response.
      </p>
    </KillerCard>

    <Code label="The N+1 pattern — one query per loop iteration (TypeORM / Node.js example)">
{`// Fetches orders — 1 query
const orders = await orderRepository.find({ where: { status: 'pending' } });

// For each order, fetches the user — N queries (one per order)
for (const order of orders) {
  const user = await userRepository.findOne({ where: { id: order.userId } });
  console.log(\`\${user.email}: \${order.total}\`);
}

// With 200 pending orders: 201 queries, each ~2ms = 402ms minimum
// Plus connection overhead, this regularly exceeds 1s in production`}
    </Code>

    <Code label="Fix — eager load with a JOIN, eliminating N round trips">
{`// Single query with JOIN — fetches orders and users together
const orders = await orderRepository.find({
  where:    { status: 'pending' },
  relations: ['user'],            // TypeORM: LEFT JOIN users ON orders.user_id = users.id
});

// No additional queries in the loop
for (const order of orders) {
  console.log(\`\${order.user.email}: \${order.total}\`);
}

// 1 query regardless of result size. At 200 orders: ~3ms instead of 402ms.`}
    </Code>

    <P>
      When a JOIN is not appropriate — for instance when the association is optional or the related table
      is in a different service — use a batch fetch: collect all foreign key IDs, fetch all related records
      in one <code className="text-primary text-xs">WHERE id = ANY($1)</code> query, then build an in-memory
      map. This reduces N queries to exactly 2.
    </P>

    <Code label="Batch fetch pattern — 2 queries regardless of collection size">
{`const orders = await orderRepository.find({ where: { status: 'pending' } });

// Collect all user IDs in one pass
const userIds = [...new Set(orders.map(o => o.userId))];

// Single query with an IN clause — fetches all needed users at once
const users = await userRepository.findBy({ id: In(userIds) });

// Build an O(1) lookup map
const userMap = new Map(users.map(u => [u.id, u]));

// No database calls inside the loop
for (const order of orders) {
  const user = userMap.get(order.userId);
  console.log(\`\${user?.email}: \${order.total}\`);
}`}
    </Code>

    <Callout type="warn">
      Enable query logging in development and test environments. N+1 problems are invisible without
      it — the application behaves correctly, just slowly. Most frameworks provide a query count assertion
      for tests: use it on any endpoint that touches a collection.
    </Callout>

    {/* ── Section 2 ── */}
    <H2 num="02">Missing and Misused Indexes</H2>

    <P>
      A sequential scan on a 10-million-row table examining every row to find 3 records is one of the most
      expensive operations a database can perform. Indexes eliminate sequential scans for selective queries
      — but only if the query is written in a way that allows the planner to use them.
    </P>

    <KillerCard
      num="02"
      title="Sequential Scan on Large Table"
      symptom="Slow queries on filtered columns; EXPLAIN shows Seq Scan with high row estimates; pg_stat_user_tables shows high seq_scan count"
      impact="critical"
    >
      <p>
        Either the index does not exist, the query prevents index use (function on the column, implicit cast,
        leading wildcard in LIKE), or the planner estimates a sequential scan is cheaper than an index scan
        because table statistics are stale. Each case has a different fix.
      </p>
    </KillerCard>

    <Code label="EXPLAIN ANALYZE — identifying a sequential scan that should be an index scan">
{`EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT id, email, created_at
FROM   users
WHERE  email = 'alice@example.com';

-- Without index:
-- Seq Scan on users  (cost=0.00..28450.00 rows=1 width=52)
--                    (actual time=94.221..234.832 rows=1 loops=1)
--   Filter: ((email)::text = 'alice@example.com')
--   Rows Removed by Filter: 1849999
--   Buffers: shared hit=8163 read=2214
-- Planning Time: 0.8 ms
-- Execution Time: 234.9 ms  ← 234ms to find 1 row in 1.85M rows

-- After: CREATE INDEX CONCURRENTLY idx_users_email ON users (email);
-- Index Scan using idx_users_email on users  (cost=0.42..8.44 rows=1 width=52)
--                                             (actual time=0.038..0.040 rows=1 loops=1)
-- Planning Time: 0.4 ms
-- Execution Time: 0.1 ms   ← 0.1ms with the index`}
    </Code>

    <div className="my-7 p-5 border border-primary/10 bg-black/30">
      <p className="text-[9px] font-bold font-mono text-primary/50 tracking-widest mb-4">
        QUERY EXECUTION TIME — users table, 1.85M rows, WHERE email = ?
      </p>
      <CompareBar label="Seq Scan  (no index)" ms={234}  max={250} variant="bad" />
      <CompareBar label="Index Scan (with index)" ms={0.1} max={250} variant="good" />
      <p className="text-[9px] font-mono text-slate-700 mt-2">2,340× improvement from a single index.</p>
    </div>

    <H3>The implicit cast trap</H3>

    <P>
      A column with an index can still trigger a sequential scan if the query applies a function to the
      indexed column or introduces an implicit type cast. PostgreSQL cannot use a B-tree index on{' '}
      <code className="text-primary text-xs">lower(email)</code> unless a functional index on{' '}
      <code className="text-primary text-xs">lower(email)</code> exists.
    </P>

    <Code label="Index-defeating patterns and their fixes">
{`-- BAD: function on the indexed column — forces a sequential scan
SELECT * FROM users WHERE lower(email) = lower($1);
SELECT * FROM orders WHERE DATE(created_at) = '2025-11-01';
SELECT * FROM products WHERE CAST(price AS text) LIKE '19%';

-- BAD: implicit type cast — varchar column compared to integer literal
--      PostgreSQL casts every row value to integer to compare
SELECT * FROM sessions WHERE token = 12345;   -- token is varchar

-- GOOD: move the function to the parameter, not the column
SELECT * FROM users WHERE email = lower($1);        -- index on email still works
SELECT * FROM orders
WHERE  created_at >= '2025-11-01'
AND    created_at <  '2025-11-02';                  -- range scan on timestamp index

-- GOOD: if case-insensitive search is required, use a functional index
CREATE INDEX idx_users_email_lower ON users (lower(email));
SELECT * FROM users WHERE lower(email) = lower($1); -- now uses the index

-- GOOD: match the parameter type to the column type
SELECT * FROM sessions WHERE token = $1;            -- $1 is text/varchar`}
    </Code>

    <H3>Composite index column order</H3>

    <Code label="Composite index — column order determines which queries benefit">
{`-- Table: orders(user_id, status, created_at)
-- Index: CREATE INDEX idx_orders_user_status ON orders (user_id, status);

-- Uses the index (leftmost prefix match)
SELECT * FROM orders WHERE user_id = $1;
SELECT * FROM orders WHERE user_id = $1 AND status = 'pending';

-- Does NOT use this index (skips user_id, the leading column)
SELECT * FROM orders WHERE status = 'pending';

-- Rule: the leftmost column(s) of a composite index must appear in the
-- WHERE clause for the index to be used. Design indexes for your actual
-- query patterns, not for the columns that happen to be joined together.`}
    </Code>

    {/* ── Section 3 ── */}
    <H2 num="03">Over-fetching with SELECT *</H2>

    <KillerCard
      num="03"
      title="SELECT * and Column Over-fetching"
      symptom="Queries transfer large row sizes; high shared buffer reads; slow queries on tables with TEXT, JSONB, or BYTEA columns even when filtering is fast"
      impact="high"
    >
      <p>
        Fetching all columns transfers data that the application never uses, forces PostgreSQL to read
        TOAST pages for large column values even when the filter column is indexed, and prevents
        index-only scans — which avoid heap reads entirely by satisfying the query from the index alone.
      </p>
    </KillerCard>

    <Code label="From SELECT * to a covering index-only scan">
{`-- BAD: fetches all columns including body (TEXT, potentially 50KB per row)
-- Forces heap access even though the filter is satisfied by the index
SELECT * FROM articles WHERE author_id = $1 ORDER BY published_at DESC LIMIT 20;

-- GOOD: fetch only what the UI needs
SELECT id, title, slug, published_at, read_time
FROM   articles
WHERE  author_id = $1
ORDER BY published_at DESC
LIMIT 20;

-- BETTER: create a covering index that includes the projected columns
-- PostgreSQL can answer this query entirely from the index — zero heap reads
CREATE INDEX idx_articles_author_covering
  ON articles (author_id, published_at DESC)
  INCLUDE (id, title, slug, read_time);

-- EXPLAIN now shows "Index Only Scan" — no heap access at all
-- Heap Fetches: 0`}
    </Code>

    <Callout type="info">
      Index-only scans require that the table's visibility map is up to date. Run{' '}
      <code className="text-primary text-xs">VACUUM</code> regularly (autovacuum handles this in steady
      state) to maximise index-only scan eligibility. A freshly-created covering index on a table that has
      not been vacuumed recently will still fall back to heap accesses.
    </Callout>

    {/* ── Section 4 ── */}
    <H2 num="04">Unbounded Queries and Missing Pagination</H2>

    <KillerCard
      num="04"
      title="Unbounded Result Sets"
      symptom="Periodic query timeouts; memory spikes on the application server; queries that return 10 rows in dev return 500,000 rows in production"
      impact="critical"
    >
      <p>
        Queries without LIMIT clauses return all matching rows. In development the table has 100 rows.
        In production it has 2 million. The query that took 2ms in tests takes 18 seconds in production —
        and transfers hundreds of megabytes over the network. The application then attempts to
        deserialise and hold all of it in memory at once.
      </p>
    </KillerCard>

    <P>
      Offset-based pagination (<code className="text-primary text-xs">LIMIT n OFFSET k</code>) is the
      intuitive fix but has a well-known scaling problem: to return page 1000 of 20 results, PostgreSQL
      must still read and discard the first 19,980 rows. Deep pagination on large tables is a sequential
      scan in disguise. Keyset pagination eliminates this entirely.
    </P>

    <Code label="Offset pagination vs keyset (cursor) pagination — the scalability difference">
{`-- OFFSET PAGINATION — O(offset) cost, grows linearly with page depth
-- Page 1: fast (scans 20 rows)
SELECT id, title, created_at FROM posts ORDER BY created_at DESC LIMIT 20 OFFSET 0;

-- Page 1000: slow (scans and discards 19,980 rows, then returns 20)
SELECT id, title, created_at FROM posts ORDER BY created_at DESC LIMIT 20 OFFSET 19980;

-- EXPLAIN at deep offset:
-- Sort  (cost=18432.09..18482.09 rows=20000 width=...)  ← sorts entire result set
--   -> Seq Scan on posts ...


-- KEYSET (CURSOR) PAGINATION — O(1) cost at any depth
-- First page
SELECT id, title, created_at
FROM   posts
ORDER BY created_at DESC, id DESC
LIMIT  20;

-- Next page: pass last row's (created_at, id) as cursor
SELECT id, title, created_at
FROM   posts
WHERE  (created_at, id) < ($last_created_at, $last_id)   -- composite comparison
ORDER BY created_at DESC, id DESC
LIMIT  20;

-- Required index — covers the ORDER BY and WHERE clause
CREATE INDEX idx_posts_created_id ON posts (created_at DESC, id DESC);

-- EXPLAIN: Index Scan using idx_posts_created_id
-- Rows: exactly 20 regardless of page depth`}
    </Code>

    <Callout type="warn">
      Keyset pagination cannot jump to an arbitrary page number — it only supports next/previous
      navigation. For admin interfaces that genuinely need arbitrary page access, use offset pagination
      with a hard cap (e.g., <code className="text-yellow-400/80 text-xs">OFFSET</code> max 10,000) and
      accept the performance trade-off consciously, or pre-materialise page boundaries.
    </Callout>

    {/* ── Section 5 ── */}
    <H2 num="05">Lock Contention and Long Transactions</H2>

    <KillerCard
      num="05"
      title="Lock Contention"
      symptom="Queries pile up waiting; pg_locks shows many waiting entries; p99 latency spikes correlate with write-heavy operations; ALTER TABLE or schema migrations block all reads"
      impact="critical"
    >
      <p>
        PostgreSQL uses MVCC for reads, but writes still acquire row-level locks, and DDL operations
        acquire AccessExclusiveLock — which blocks all reads and writes on the table for the duration of
        the lock. A long-running transaction holding a lock starves every other query waiting for that
        resource.
      </p>
    </KillerCard>

    <H3>Detecting lock contention in production</H3>

    <Code label="pg_locks + pg_stat_activity — identify blocking queries and their victims">
{`-- Find blocking queries and what they are blocking
SELECT
  blocked.pid                  AS blocked_pid,
  blocked_activity.query       AS blocked_query,
  blocker.pid                  AS blocker_pid,
  blocker_activity.query       AS blocker_query,
  blocker_activity.state       AS blocker_state,
  now() - blocker_activity.query_start AS blocker_duration
FROM pg_locks AS blocked
JOIN pg_locks AS blocker
  ON blocker.granted = true
 AND blocker.locktype = blocked.locktype
 AND blocker.relation = blocked.relation
JOIN pg_stat_activity AS blocked_activity
  ON blocked_activity.pid = blocked.pid
JOIN pg_stat_activity AS blocker_activity
  ON blocker_activity.pid = blocker.pid
WHERE blocked.granted = false
ORDER BY blocker_duration DESC;

-- Terminate a long-running blocker (replace PID)
-- SELECT pg_terminate_backend(12345);`}
    </Code>

    <H3>Safe schema migrations without downtime</H3>

    <P>
      Adding a column with a default value, building an index, or adding a constraint all require
      table-level locks in naive form. PostgreSQL provides safer alternatives for each operation that
      avoid or minimise lock hold time.
    </P>

    <Code label="Zero-downtime schema changes — safe patterns for production">
{`-- BAD: Adding a column with a DEFAULT acquires AccessExclusiveLock
--      and rewrites the entire table in Postgres < 11
ALTER TABLE orders ADD COLUMN priority integer DEFAULT 0 NOT NULL;

-- GOOD (Postgres 11+): stored defaults avoid the table rewrite
--      Lock is brief (metadata change only)
ALTER TABLE orders ADD COLUMN priority integer NOT NULL DEFAULT 0;


-- BAD: CREATE INDEX locks writes for the duration of the index build
CREATE INDEX idx_orders_user_id ON orders (user_id);

-- GOOD: CONCURRENTLY builds without blocking writes
--       Takes longer but does not hold a lock
CREATE INDEX CONCURRENTLY idx_orders_user_id ON orders (user_id);


-- BAD: Adding a NOT NULL constraint validates all rows under lock
ALTER TABLE orders ALTER COLUMN notes SET NOT NULL;

-- GOOD: validate in two steps — constraint is NOT VALID first,
--       then validate separately (does not block reads)
ALTER TABLE orders ADD CONSTRAINT orders_notes_not_null
  CHECK (notes IS NOT NULL) NOT VALID;

ALTER TABLE orders VALIDATE CONSTRAINT orders_notes_not_null;`}
    </Code>

    <H3>Keep transactions short</H3>

    <Code label="Long transaction anti-pattern — holding a lock while doing application work">
{`// BAD: transaction wraps a slow HTTP call
// The row lock on 'orders' is held for the entire duration of the API call
await db.transaction(async (trx) => {
  const order = await trx('orders')
    .where({ id: orderId })
    .forUpdate()         // acquires row lock
    .first();

  // HTTP call to payment provider — could take 2–5 seconds
  // The lock on this order row is held for the entire duration
  const result = await paymentProvider.charge(order);

  await trx('orders')
    .where({ id: orderId })
    .update({ status: result.status });
});


// GOOD: do external work outside the transaction, then update atomically
const order = await db('orders').where({ id: orderId }).first();

// HTTP call is outside any transaction — no lock held
const result = await paymentProvider.charge(order);

// Brief transaction for the write only
await db.transaction(async (trx) => {
  await trx('orders')
    .where({ id: orderId, status: 'pending' }) // optimistic check
    .update({ status: result.status });
});`}
    </Code>

    {/* ── Section 6 ── */}
    <H2 num="06">Connection Pool Misconfiguration</H2>

    <KillerCard
      num="06"
      title="Connection Pool Exhaustion"
      symptom="Requests timeout waiting for a connection; error logs show 'connection pool timeout' or 'remaining connection slots are reserved'; database CPU is low while the application is slow"
      impact="high"
    >
      <p>
        PostgreSQL has a hard ceiling on concurrent connections (default: 100). Each connection consumes
        ~10MB of server memory and a backend process. Applications with a poorly sized pool either
        exhaust the database's connection limit (causing errors for new requests) or hold open far more
        connections than needed (wasting memory and increasing context-switch overhead on the database server).
      </p>
    </KillerCard>

    <P>
      The correct pool size is not "as large as possible". It is determined by the database server's
      available CPU cores and the ratio of I/O-bound to CPU-bound queries. A database server with
      8 cores running primarily I/O-bound queries performs best with a total connection count in the range
      of 8–32. Beyond that, connection overhead and context switching reduce throughput.
    </P>

    <Code label="PgBouncer — connection pooler configuration for a high-concurrency application">
{`# pgbouncer.ini — transaction-mode pooling (recommended for most applications)

[databases]
# All connections to 'appdb' are pooled through PgBouncer
appdb = host=postgres-primary port=5432 dbname=appdb

[pgbouncer]
pool_mode = transaction     # Pool connections per transaction, not per session
                            # Sessions that use SET, advisory locks, or LISTEN
                            # require session mode — check your usage first

# Maximum connections PgBouncer opens to the actual PostgreSQL server
# Rule of thumb: 2–4× CPU count of the DB server
# DB server has 8 CPUs → max 32 server connections
server_pool_size = 30
max_db_connections = 30

# Maximum client connections PgBouncer accepts from applications
# Can be much higher than server_pool_size — clients queue, not error
max_client_conn = 1000

# Client timeout — return an error rather than queue forever
query_wait_timeout = 15     # seconds

# Connection lifetime — recycle connections to avoid stale state
server_lifetime = 3600      # seconds
server_idle_timeout = 600`}
    </Code>

    <Code label="Application-side pool configuration (Knex.js / pg)">
{`// knexfile.ts
export default {
  client: 'postgresql',
  connection: { /* ... */ },
  pool: {
    // min: keep a minimum number of idle connections ready
    // Too low: cold-start latency on traffic spikes
    // Recommended: 2–5 for most services
    min: 2,

    // max: hard ceiling on connections this instance opens
    // Formula: (DB_max_connections / num_app_instances) * 0.8
    // e.g. 30 DB connections / 3 instances * 0.8 = 8 per instance
    max: 8,

    // idleTimeoutMillis: release connections idle longer than this
    idleTimeoutMillis: 30_000,

    // acquireTimeoutMillis: fail fast rather than queue indefinitely
    // Prevents cascading slowdowns under load
    acquireTimeoutMillis: 5_000,

    // propagateCreateError: if the initial connection fails, propagate
    // the error to the caller rather than silently retrying
    propagateCreateError: false,
  },
};`}
    </Code>

    {/* ── Section 7 ── */}
    <H2 num="07">How to Find What is Actually Slow</H2>

    <H3>pg_stat_statements — the ground truth for query performance</H3>

    <P>
      <code className="text-primary text-xs">pg_stat_statements</code> tracks execution statistics for
      every distinct query shape that runs against the database. It is the most reliable source of
      information about which queries are consuming the most time in aggregate — far more useful than
      profiling individual requests.
    </P>

    <Code label="pg_stat_statements — find the queries consuming the most total time">
{`-- Enable the extension (requires superuser, add to shared_preload_libraries)
-- shared_preload_libraries = 'pg_stat_statements'  in postgresql.conf
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Top 10 queries by total execution time
SELECT
  round(total_exec_time::numeric, 2)              AS total_ms,
  calls,
  round(mean_exec_time::numeric, 2)               AS mean_ms,
  round(stddev_exec_time::numeric, 2)             AS stddev_ms,
  round((total_exec_time / sum(total_exec_time)
    OVER () * 100)::numeric, 2)                   AS pct_total,
  left(query, 120)                                AS query_preview
FROM   pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT  10;

-- Top queries by call count (frequent, cheap queries still add up)
SELECT
  calls,
  round(mean_exec_time::numeric, 2) AS mean_ms,
  left(query, 120)                  AS query_preview
FROM   pg_stat_statements
ORDER BY calls DESC
LIMIT  10;

-- Queries with high variance (stddev > 2× mean — intermittently slow)
SELECT
  round(mean_exec_time::numeric, 2)   AS mean_ms,
  round(stddev_exec_time::numeric, 2) AS stddev_ms,
  left(query, 120)                    AS query_preview
FROM   pg_stat_statements
WHERE  stddev_exec_time > mean_exec_time * 2
  AND  calls > 100
ORDER BY stddev_exec_time DESC
LIMIT  10;`}
    </Code>

    <H3>EXPLAIN ANALYZE — understanding the query plan</H3>

    <Code label="Reading EXPLAIN ANALYZE output — the key nodes and what they mean">
{`EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT o.id, o.total, u.email
FROM   orders o
JOIN   users u ON u.id = o.user_id
WHERE  o.status = 'pending'
  AND  o.created_at > now() - interval '7 days'
ORDER BY o.created_at DESC
LIMIT  50;

-- Key things to look for in the output:

-- 1. Seq Scan on a large table → missing index
--    Solution: CREATE INDEX CONCURRENTLY on the filter columns

-- 2. rows= estimate wildly off from actual rows
--    e.g. (rows=3 actual rows=48291)
--    Solution: ANALYZE orders; — updates table statistics

-- 3. Hash Join with large hash batch count
--    (Batches: 8 means it spilled to disk)
--    Solution: increase work_mem for this session:
--              SET work_mem = '64MB';  (or per-query via SET LOCAL)

-- 4. Sort Method: external merge Disk  → sort spilled to disk
--    Solution: increase work_mem, or add an index that pre-sorts the data

-- 5. Buffers: shared read=48291 hit=12
--    → most data read from disk, not cache (low cache hit rate)
--    Solution: increase shared_buffers in postgresql.conf,
--              or investigate why this data is not in the buffer pool`}
    </Code>

    <Callout type="info">
      Always run <code className="text-primary text-xs">EXPLAIN ANALYZE</code> on production data or
      a production-size clone. The query planner uses table statistics to choose plans — on a dev
      database with 1,000 rows, the planner may choose an index scan that it would correctly reject
      on a production table with 10 million rows, or vice versa.
    </Callout>

    <H3>Autovacuum and stale statistics</H3>

    <P>
      PostgreSQL's query planner relies on table statistics collected by{' '}
      <code className="text-primary text-xs">ANALYZE</code> to estimate row counts and choose optimal
      plans. On tables with high write volume, autovacuum may not run frequently enough to keep statistics
      current. A plan chosen on the assumption of 1,000 rows in a partition that actually contains
      8 million rows will be catastrophically wrong.
    </P>

    <Code label="Diagnosing stale statistics and autovacuum lag">
{`-- Tables with the most dead rows (autovacuum debt)
SELECT
  schemaname,
  relname,
  n_dead_tup,
  n_live_tup,
  round(n_dead_tup::numeric / nullif(n_live_tup + n_dead_tup, 0) * 100, 1) AS dead_pct,
  last_autovacuum,
  last_autoanalyze
FROM   pg_stat_user_tables
ORDER BY n_dead_tup DESC
LIMIT  20;

-- Tables where planner estimates are furthest from reality
-- (requires pg_stats — compare n_distinct estimates to actuals)
SELECT
  tablename,
  attname,
  n_distinct,
  correlation
FROM   pg_stats
WHERE  tablename = 'orders'
ORDER BY attname;

-- Force immediate statistics update on a specific table
ANALYZE VERBOSE orders;

-- Tune autovacuum for a high-write table (per-table setting)
ALTER TABLE orders SET (
  autovacuum_vacuum_scale_factor  = 0.01,   -- vacuum after 1% of rows change (default: 20%)
  autovacuum_analyze_scale_factor = 0.005,  -- analyze after 0.5% change (default: 10%)
  autovacuum_vacuum_cost_delay    = 2       -- ms — reduce throttling on busy tables
);`}
    </Code>

    {/* ── Conclusion ── */}
    <H2 num="08">Putting It Together</H2>

    <P>
      These six killers account for the overwhelming majority of database performance problems in
      production applications. They are not exotic edge cases — they are the default outcome of
      application code that was not written with the database planner in mind.
    </P>

    <P>
      The diagnostic order matters. Start with{' '}
      <code className="text-primary text-xs">pg_stat_statements</code> to find the highest-cost queries
      by total time, not by individual execution time. Run <code className="text-primary text-xs">EXPLAIN ANALYZE</code>{' '}
      on each to identify sequential scans, bad row estimates, and sort spills. Fix indexes before
      rewriting queries. Fix queries before scaling hardware. Most performance problems can be resolved
      with an index and a query rewrite that does not require any infrastructure changes.
    </P>

    <Callout type="warn">
      The order of operations for schema migrations matters as much as the migration itself.{' '}
      <code className="text-yellow-400/80 text-xs">CREATE INDEX CONCURRENTLY</code>,{' '}
      <code className="text-yellow-400/80 text-xs">NOT VALID</code> constraints, and
      multi-step column additions are not optional performance niceties — they are the difference
      between a zero-downtime deployment and a production outage that takes down all queries on a table
      for minutes while the table rewrites.
    </Callout>

    <P>
      Enable <code className="text-primary text-xs">pg_stat_statements</code> in every environment.
      Log slow queries with <code className="text-primary text-xs">log_min_duration_statement = 100</code>{' '}
      (milliseconds). Review the top 10 queries by total time every sprint. These three practices surface
      database performance problems before they become production incidents rather than after.
    </P>
  </ArticleLayout>
);

export default DbPerformanceKillers;
