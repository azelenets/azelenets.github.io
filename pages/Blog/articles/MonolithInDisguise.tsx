import React from 'react';
import ArticleLayout from '../ArticleLayout';
import { P, H2, H3, Callout, Code, ArticleImage } from '../ArticlePrimitives';


const SignCard: React.FC<{ num: string; title: string; children: React.ReactNode }> = ({ num, title, children }) => (
  <div className="border border-red-400/15 bg-red-400/5 p-5 my-4">
    <div className="flex items-center gap-2 mb-2">
      <span
        className="text-[9px] font-bold font-mono text-red-400/60 border border-red-400/20 px-1.5 py-0.5">SIGN_{num}</span>
      <span className="text-red-400 font-bold text-xs uppercase tracking-widest">{title}</span>
    </div>
    <p className="text-xs font-mono text-slate-400 leading-6">{children}</p>
  </div>
);

/* ─── Article ─────────────────────────────────────────────────────────────── */

const MonolithInDisguise: React.FC = () => (
  <ArticleLayout
    id="POST_001"
    title="Why Your Microservices Are Still a Monolith in Disguise"
    category="DISTRIBUTED_SYSTEMS"
    date="2026-03-17"
    readTime={8}
    tags={['MICROSERVICES', 'DDD', 'ARCHITECTURE']}
  >
    <P>
      It is 2026, and "microservices" remains one of the most cargo-culted terms in software engineering. Teams migrate
      from a Rails monolith to twelve Node.js services deployed on Kubernetes, declare victory, and wonder why
      deployments are still risky, incidents still cascade, and teams still step on each other's toes. The services are
      new. The monolith is not gone - it just learned to hide.
    </P>

    <Callout type="warn">
      A distributed monolith is worse than a well-structured monolith. You get all the operational complexity of a
      distributed system - network failures, partial outages, distributed tracing overhead - with none of the
      autonomy benefits microservices are supposed to deliver.
    </Callout>

    <ArticleImage
      src="/images/articles/monolith-in-disguise.svg"
      alt="Distributed monolith vs true microservices - architecture coupling diagram"
      caption="Left: distributed monolith - multiple services sharing a database and chained via synchronous HTTP. Right: true microservices - isolated databases, async event-driven communication."
    />

    <P>
      This is not a post arguing against microservices. Used correctly, they are a powerful organisational and
      technical tool. This is a post about the four telltale signs that your "microservices" are still monolithic in
      all the ways that matter, and what to actually do about it.
    </P>

    {/* ── Section 1 ── */}
    <H2 num="01">What Makes a Monolith a Monolith</H2>

    <P>
      The common definition - "a single deployable unit" - is the wrong definition. That is a monolith in deployment
      terms. The kind of monolith that actually hurts is a <strong className="text-white">coupling monolith</strong>:
      a system where components cannot be reasoned about, deployed, or changed independently of each other.
    </P>

    <P>
      Independence is the only thing that matters. If a change to service A requires a coordinated deployment of
      services B and C, you have a monolith. If service A goes down and takes service B with it, you have a monolith.
      If two teams cannot ship to production on the same afternoon without a Slack coordination ceremony, you have a
      monolith.
    </P>

    <P>
      The unit of coupling is not code - it is <strong className="text-white">change, failure, and deployment</strong>.
      Microservices are a means to reduce those couplings. The architecture is only the mechanism.
    </P>

    {/* ── Section 2 ── */}
    <H2 num="02">The Four Signs</H2>

    <SignCard num="01" title="The Shared Database">
      Two or more services read and write to the same tables. Schema changes require co-ordinated deploys. One
      service can observe another's intermediate transaction state. The database is the monolith.
    </SignCard>

    <SignCard num="02" title="The Synchronous Call Chain">
      Service A calls B synchronously, which calls C, which calls D. A single user request fans out into a chain of
      blocking HTTP calls. The p99 latency is the sum of all hops. A timeout anywhere propagates everywhere.
    </SignCard>

    <SignCard num="03" title="The Shared Library Trap">
      A common library package contains domain models, validation logic, or database schemas. When it changes, every
      consumer must update and redeploy simultaneously. The library is the deployment coupling.
    </SignCard>

    <SignCard num="04" title="The Big-Bang Deploy">
      Services must be deployed in a specific sequence. Rollbacks require rolling back multiple services together.
      Feature flags span service boundaries. If you cannot deploy one service without planning the others, they are
      one system.
    </SignCard>

    {/* ── Section 3 ── */}
    <H2 num="03">Sign #1 in Depth - The Shared Database</H2>

    <P>
      Shared databases are the most common and most invisible form of coupling. They often happen organically: it
      starts with "we just need read access to the users table" and ends with three services joining across schema
      boundaries in a single ORM query.
    </P>

    <Code label="The problem - service B reaching directly into service A's schema">
      {`-- In service-b/src/repository/order_repo.go
-- Reading user profile data directly from service-a's schema

SELECT
  o.id,
  o.total,
  u.email,          -- ❌ belongs to service-a's users schema
  u.subscription_tier  -- ❌ service-a's business logic lives here
FROM service_a.orders o
JOIN service_a.users u ON u.id = o.user_id
WHERE o.status = 'pending';`}
    </Code>

    <P>
      The schema is now a shared API - but with none of the versioning, contract testing, or backward-compatibility
      guarantees you would demand of an actual API. When the Users team renames <code
      className="text-primary text-xs">subscription_tier</code> to{' '}
      <code className="text-primary text-xs">plan_id</code>, they break the Orders service at runtime with no
      compile-time warning and no way to roll back independently.
    </P>

    <H3>The fix: own your data, expose an API</H3>

    <P>
      Each service owns its schema exclusively. No other service reads its tables directly. If service B needs user
      data, it calls service A's API or subscribes to domain events that carry the fields it needs.
    </P>

    <Code label="Better - service B owns the data it needs, sourced from events">
      {`// service-b consumes UserSubscriptionUpdated events from Kafka
// and maintains its own local projection of what it needs

type UserProjection struct {
  UserID           string
  SubscriptionPlan string  // local copy, owned by service-b
  UpdatedAt        time.Time
}

// service-b never reads service-a's database
// it reacts to events and stores only what it needs
func (h *Handler) OnUserSubscriptionUpdated(e UserSubscriptionUpdated) {
  h.repo.Upsert(UserProjection{
    UserID:           e.UserID,
    SubscriptionPlan: e.NewPlan,
    UpdatedAt:        e.OccurredAt,
  })
}`}
    </Code>

    <Callout type="info">
      Data duplication is not a bug - it is the price of autonomy. Service B maintains a local, eventually-consistent
      projection of the data it needs. It can deploy, scale, and fail independently of service A.
    </Callout>

    {/* ── Section 4 ── */}
    <H2 num="04">Sign #2 in Depth - The Synchronous Call Chain</H2>

    <P>
      Synchronous HTTP chains are the "death star" architecture. Draw a service diagram and you see a star of arrows
      pointing inward to a few central services. Those central services become your blast radius - their p99 latency
      becomes every caller's p99 latency, and their downtime becomes a platform outage.
    </P>

    <Code label="Death star: checkout depends synchronously on four services">
      {`// CheckoutService.processOrder()

const user    = await userService.getProfile(userId);       // 30ms
const items   = await catalogService.getItems(itemIds);     // 45ms
const stock   = await inventoryService.checkStock(items);   // 60ms
const pricing = await pricingService.calculate(items, user);// 40ms

// Total: ~175ms in the happy path
// Any one service timing out: 500ms+ and a 500 to the customer
// Inventory goes down: checkout is down`}
    </Code>

    <P>
      The compound availability of this chain is brutal. If each service has 99.9% uptime individually, the checkout
      flow has <strong className="text-white">99.9% × 99.9% × 99.9% × 99.9% = 99.6% uptime</strong> - three times
      the downtime, on a critical path.
    </P>

    <H3>The fix: async for side effects, cached projections for reads</H3>

    <P>
      Not every call needs to be synchronous. Break the chain by asking "does the caller need this response
      right now, or can the system react to it asynchronously?" Side effects - sending emails, updating inventory,
      notifying analytics - almost never need to block the primary flow.
    </P>

    <Code label="Checkout publishes an event; downstream services react asynchronously">
      {`// CheckoutService.processOrder()
// Only one synchronous call remains: confirm stock before charging

const stock = await inventoryService.reserveStock(itemIds); // 60ms
if (!stock.reserved) return Result.outOfStock();

await paymentService.charge(userId, total); // 80ms - must be sync

// Everything else is fire-and-forget via Kafka
await eventBus.publish('OrderPlaced', {
  orderId, userId, items, total, occurredAt: new Date(),
});

// InventoryService, NotificationService, AnalyticsService
// all react to OrderPlaced independently - checkout is done`}
    </Code>

    {/* ── Section 5 ── */}
    <H2 num="05">The Root Cause - Wrong Decomposition Axis</H2>

    <P>
      Most distributed monoliths trace back to the same root cause: services were decomposed along
      <strong className="text-white"> technical layers</strong> instead of{' '}
      <strong className="text-white">business capabilities</strong>. Teams created a "User Service", a
      "Database Service", a "Notification Service" - mirroring their existing n-tier architecture instead of their
      business domain.
    </P>

    <Code label="Technical decomposition - every business operation crosses all services">
      {`// Placing an order requires:
UserService     → validate user
DatabaseService → read inventory
OrderService    → create order record
DatabaseService → decrement inventory
NotificationService → send confirmation

// Every feature touches every service.
// Teams must co-ordinate. Deployments must be sequenced.
// This is a distributed monolith.`}
    </Code>

    <P>
      Domain-Driven Design gives us the vocabulary to fix this. A <strong className="text-white">bounded
      context</strong>{' '}
      is a boundary within which a particular model is consistent and self-contained. It maps to a team, a
      subdomain, and ideally a service. The goal is to align service boundaries with business capability boundaries
      - so that a single team can build, deploy, and operate a service end-to-end without needing anyone else.
    </P>

    <Code label="Domain decomposition - each service owns a full vertical slice">
      {`// Bounded contexts aligned to business capabilities:

OrderManagement   → places orders, owns the order lifecycle
                    has its own DB, its own team, its own SLA

InventoryControl  → tracks stock, reserves items
                    emits StockReserved / StockDepleted events

CustomerProfile   → user accounts, subscription management
                    exposes read API + emits UserUpdated events

// Placing an order:
// OrderManagement calls InventoryControl (reserve) → done
// Everything else reacts to OrderPlaced event asynchronously`}
    </Code>

    <Callout type="info">
      The test: can a single team make a meaningful end-to-end business change - schema, logic, API, and deployment —
      without any other team's involvement? If not, your service boundaries are wrong.
    </Callout>

    {/* ── Section 6 ── */}
    <H2 num="06">How to Escape - Without a Rewrite</H2>

    <P>
      The Strangler Fig pattern is the safest path out. Named after the strangler fig tree, which gradually envelops
      its host, the idea is to route traffic incrementally from old coupling points to new, properly-bounded services.
      You never stop the world for a big-bang rewrite.
    </P>

    <H3>Step 1 - identify your bounded contexts</H3>
    <P>
      Run an Event Storming workshop with domain experts and engineers. Map out domain events, commands, and
      aggregates. Natural clustering of events around the same data and team reveals your bounded contexts. This is
      where your service boundaries should be.
    </P>

    <H3>Step 2 - introduce an anti-corruption layer</H3>
    <P>
      Before splitting the database, introduce a thin API layer in front of the tables you intend to migrate. Other
      services call the API, not the database directly. The database is still shared, but the coupling is now
      explicit and can be versioned.
    </P>

    <H3>Step 3 - migrate data ownership one bounded context at a time</H3>
    <P>
      Move one bounded context's tables to its own schema, then its own database. Use CDC (Change Data Capture) with
      a tool like Debezium to publish events from the old tables during migration, so consumers can transition to
      the event stream without a hard cutover.
    </P>

    <H3>Step 4 - replace synchronous chains with events</H3>
    <P>
      For each synchronous call that is a side effect rather than a required response, publish a domain event and
      let the downstream service react. Build the consumer first, run both paths in parallel ("dark launch"), then
      cut over and remove the direct call.
    </P>

    {/* ── Conclusion ── */}
    <H2 num="07">Conclusion</H2>

    <P>
      Microservices are not an architecture - they are an outcome of good domain design and organisational
      alignment. The services themselves are the easy part; a weekend of Dockerfiles and Helm charts. The hard part
      is finding the right boundaries, eliminating the hidden couplings, and aligning teams to own their services
      truly end-to-end.
    </P>

    <P>
      If your deploys are still a co-ordination exercise, your incidents still cascade, and your teams still need a
      RFC to rename a field - the monolith is still there. It is just wearing a Kubernetes cluster as a costume.
    </P>

    <Callout type="info">
      The measure of a good microservices architecture is not the number of services. It is how independently,
      confidently, and quickly each team can ship value to production without fear.
    </Callout>
  </ArticleLayout>
);

export default MonolithInDisguise;
