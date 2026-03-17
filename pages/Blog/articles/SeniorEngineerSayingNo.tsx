import React from 'react';
import ArticleLayout from '../ArticleLayout';
import { P, H2, H3, Callout } from '../ArticlePrimitives';

/* ─── Prose primitives ────────────────────────────────────────────────────── */


const DialogBox: React.FC<{
  label: string; color: string; labelCls: string; children: React.ReactNode;
}> = ({ label, color, labelCls, children }) => (
  <div className={`border p-4 my-3 ${color}`}>
    <p className={`text-[9px] font-bold font-mono tracking-widest mb-2 ${labelCls}`}>{label}</p>
    <p className="text-xs font-mono text-slate-400 leading-6 italic">{children}</p>
  </div>
);

const ScenarioBlock: React.FC<{
  situation: string;
  bad: string;
  good: string;
  why: string;
}> = ({ situation, bad, good, why }) => (
  <div className="border border-primary/10 my-6 overflow-hidden">
    <div className="bg-primary/5 px-5 py-3 border-b border-primary/10">
      <p className="text-[9px] font-bold font-mono text-primary/50 tracking-widest">SCENARIO</p>
      <p className="text-xs font-bold text-white mt-1">{situation}</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-primary/10">
      <div className="bg-red-400/5 px-5 py-4">
        <p className="text-[9px] font-bold font-mono text-red-400/60 tracking-widest mb-2">INSTEAD OF</p>
        <p className="text-xs font-mono text-slate-500 leading-6 italic">"{bad}"</p>
      </div>
      <div className="bg-primary/5 px-5 py-4">
        <p className="text-[9px] font-bold font-mono text-primary/60 tracking-widest mb-2">TRY</p>
        <p className="text-xs font-mono text-slate-400 leading-6 italic">"{good}"</p>
      </div>
    </div>
    <div className="px-5 py-3 border-t border-primary/10 bg-bg-dark">
      <p className="text-[9px] font-bold font-mono text-slate-600 tracking-widest mb-1">WHY IT WORKS</p>
      <p className="text-xs font-mono text-slate-600 leading-5">{why}</p>
    </div>
  </div>
);

const CostRow: React.FC<{ type: string; cost: string; example: string; color: string }> = ({ type, cost, example, color }) => (
  <div className="grid grid-cols-3 gap-px bg-primary/10 text-xs font-mono border-t border-primary/5 first:border-t-0">
    <div className={`px-4 py-3 font-bold ${color}`}>{type}</div>
    <div className="bg-bg-dark px-4 py-3 text-slate-500">{cost}</div>
    <div className="bg-bg-dark px-4 py-3 text-slate-600">{example}</div>
  </div>
);

/* ─── Article ─────────────────────────────────────────────────────────────── */

const SeniorEngineerSayingNo: React.FC = () => (
  <ArticleLayout
    id="POST_010"
    title="The Senior Engineer's Guide to Saying No"
    category="ENGINEERING_CULTURE"
    date="2025-04-17"
    readTime={6}
    tags={['LEADERSHIP', 'SOFT_SKILLS', 'CULTURE']}
  >
    <P>
      There is a version of seniority that looks like always having an answer. The senior engineer who
      can implement any request, estimate any feature, unblock any team. The one who never pushes back,
      never questions the brief, never says "I don't think we should do this." They are seen as reliable,
      collaborative, easy to work with.
    </P>

    <P>
      They are also, quietly, one of the most expensive engineers in the organisation. Because every
      request they execute without scrutiny, every scope they accept without challenge, every feature
      they build when the correct answer was "not yet" or "not at all" — each one compounds. The
      codebase grows in directions that do not serve the product. The architecture accumulates
      complexity that nobody owns. The team spends 40% of its time maintaining work that should never
      have been built.
    </P>

    <P>
      Saying no is not obstruction. When done correctly, it is one of the most valuable things a
      senior engineer does. This article is about how to do it correctly.
    </P>

    <Callout type="info">
      The goal is not to say no more often. The goal is to say no to the right things — the work
      that costs more than it delivers — and to say it in a way that is heard as collaboration,
      not resistance.
    </Callout>

    {/* ── Section 1 ── */}
    <H2 num="01">The Hidden Cost of Yes</H2>

    <P>
      Every yes has a cost beyond the implementation time. Features that get built need to be tested,
      documented, supported, and maintained. Abstractions created for a single use case need to be
      extended when a second use case arrives — usually in a direction the original author did not
      anticipate. Code written to accommodate a requirement that was later dropped does not disappear;
      it stays in the codebase as confusion for the next engineer.
    </P>

    <div className="my-7 border border-primary/10 overflow-hidden">
      <div className="grid grid-cols-3 text-[9px] font-bold font-mono tracking-widest bg-primary/10">
        <div className="px-4 py-2 text-primary/50">WHAT WAS BUILT</div>
        <div className="px-4 py-2 text-primary/50">THE REAL COST</div>
        <div className="px-4 py-2 text-primary/50">WHAT IT LOOKED LIKE</div>
      </div>
      <CostRow
        type="A feature flag for one customer"
        cost="Every subsequent feature needs to consider both states. Test matrix doubles."
        example="'It's just one if statement'"
        color="bg-red-400/5 text-red-400/70"
      />
      <CostRow
        type="A generic abstraction for two use cases"
        cost="Third use case breaks the abstraction. Rewrite or fork. Original author long gone."
        example="'We might need this later'"
        color="bg-yellow-400/5 text-yellow-400/70"
      />
      <CostRow
        type="An early performance optimisation"
        cost="Code is harder to read, test, and modify. Performance problem may never materialise."
        example="'While we're here'"
        color="bg-orange-400/5 text-orange-400/70"
      />
      <CostRow
        type="A framework migration mid-project"
        cost="Two systems run in parallel. Migration drags for 18 months. Neither is fully committed."
        example="'The new framework is better'"
        color="bg-blue-400/5 text-blue-400/70"
      />
    </div>

    <P>
      The engineers who built these things were not making bad decisions. They were making decisions
      without a full accounting of costs. The yes felt cheap at the time. It was not.
    </P>

    <Callout type="warn">
      The best code is code that was never written. Every line in production is a line that needs
      to be read, understood, tested, and maintained by every engineer who follows. Deletion and
      deferral are underrated engineering acts.
    </Callout>

    {/* ── Section 2 ── */}
    <H2 num="02">The Three Things You Are Actually Saying No To</H2>

    <P>
      Most pushback situations fall into one of three categories. Identifying which one you are in
      changes how you frame the conversation.
    </P>

    <H3>1. Scope that does not serve the goal</H3>

    <P>
      Someone asks for a feature that solves a real problem in a more complex way than necessary,
      or solves a problem adjacent to the actual goal. The issue is not the goal — it is the scope
      of the proposed solution.
    </P>

    <DialogBox label="THE REQUEST" color="border-slate-700/30 bg-slate-800/20" labelCls="text-slate-500/70">
      "We need full multi-tenancy with per-tenant configuration, custom domains, and isolated
      databases before we launch. Our enterprise customers will expect it."
    </DialogBox>
    <DialogBox label="THE REALITY" color="border-yellow-400/15 bg-yellow-400/5" labelCls="text-yellow-400/60">
      You have zero enterprise customers. You have three design partners who have not asked for
      any of this. Building multi-tenancy for a product that has not validated its core loop is
      solving problems you do not have yet.
    </DialogBox>

    <P>
      The pushback here is not "no" — it is "not yet, and here is why." The goal (enterprise
      readiness) is legitimate. The timing and scope are premature.
    </P>

    <H3>2. Technical choices with unaccounted cost</H3>

    <P>
      A colleague or stakeholder proposes a technical approach that will work, but at a cost
      that has not been surfaced. Introducing a new dependency, choosing a technology the team
      does not know, or making a design decision that forecloses future options.
    </P>

    <DialogBox label="THE REQUEST" color="border-slate-700/30 bg-slate-800/20" labelCls="text-slate-500/70">
      "Let's use a graph database for this. The data is naturally graph-shaped."
    </DialogBox>
    <DialogBox label="THE REALITY" color="border-yellow-400/15 bg-yellow-400/5" labelCls="text-yellow-400/60">
      Nobody on the team has operated a graph database in production. The data might be
      graph-shaped but the access patterns are almost entirely key-based lookups. The
      operational overhead and learning curve are real costs not in the proposal.
    </DialogBox>

    <P>
      The pushback here is not "no" — it is "let's make the full cost visible before we decide."
      You are not blocking the idea; you are surfacing information that changes the trade-off.
    </P>

    <H3>3. Work that conflicts with a higher priority</H3>

    <P>
      A request arrives that is legitimate and worthwhile — but executing it now means not
      executing something more important. This is the hardest category because both things
      are genuinely good. The no is not about quality; it is about sequencing and opportunity cost.
    </P>

    {/* ── Section 3 ── */}
    <H2 num="03">How to Say It — Scripts That Work</H2>

    <P>
      The mechanics matter as much as the substance. A technically correct no delivered badly
      creates defensiveness, damages relationships, and gets overridden by seniority. A
      well-framed no creates alignment, surfaces information, and often leads to a better outcome
      than the original request.
    </P>

    <ScenarioBlock
      situation="Stakeholder requests a large feature for a specific customer"
      bad="That's going to be too expensive to build and maintain."
      good="I want to make sure we're solving the right problem — can you help me understand what outcome the customer is actually trying to achieve? There may be a simpler path."
      why="Redirects from the solution to the problem. Opens space to find a cheaper solution rather than just blocking the expensive one. Signals curiosity, not obstruction."
    />

    <ScenarioBlock
      situation="PM adds scope to a sprint mid-cycle"
      bad="We can't take on more work. The sprint is full."
      good="We can pick this up — what would you like us to defer to make room for it? Here's what's currently in flight and what each item is blocking."
      why="Accepts the request conditionally. Makes the trade-off visible and puts the prioritisation decision where it belongs — with the person who owns the roadmap. You are not refusing; you are informing."
    />

    <ScenarioBlock
      situation="A junior engineer proposes a technically risky approach"
      bad="That won't work. We should do it this way instead."
      good="I like where you're going. I want to flag one risk I've seen bite us before — if we go this route, here's what happens when X occurs. Does that change how you're thinking about it?"
      why="Preserves the engineer's agency and contribution. Surfaces the risk without dismissing the proposal. Invites reconsideration rather than imposing a different answer."
    />

    <ScenarioBlock
      situation="Leadership requests an estimate for something clearly underscoped"
      bad="There's no way we can do that in two weeks."
      good="I can give you a range. A version that does X and Y is about two weeks. A version that also does Z is closer to six. Which outcome matters more for the decision you're trying to make?"
      why="Converts an impossibility into a scope conversation. Gives leadership information they can actually use. Avoids the binary yes/no that makes engineers seem obstructive."
    />

    {/* ── Section 4 ── */}
    <H2 num="04">When to Escalate vs When to Defer</H2>

    <P>
      Not every pushback is worth fighting for. Some decisions belong to other people, and the
      senior engineer's job is to surface the information, state the concern clearly, and then
      execute the decision even if it is not the one they would have made. Others are worth
      holding firm on because the stakes — security, data integrity, architectural coherence —
      are high enough that reversing course later is far more expensive than the friction of
      the argument now.
    </P>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-primary/10 border border-primary/10 my-7">
      {[
        {
          label: 'DEFER — STATE YOUR CONCERN, THEN EXECUTE',
          color: 'text-primary/70',
          items: [
            'Technology choice that is suboptimal but not harmful — your preference, not a constraint.',
            'UX or product decisions that are outside your domain — you have an opinion, they have the context.',
            'Prioritisation calls that are reversible — if it is wrong, it will become clear and can be changed.',
            'Style and convention decisions where the team has reached consensus against your preference.',
          ],
        },
        {
          label: 'HOLD FIRM — ESCALATE IF OVERRIDDEN',
          color: 'text-red-400/70',
          items: [
            'Security vulnerabilities being shipped to save time — the cost of a breach exceeds any delivery speed benefit.',
            'Data loss risks: irreversible schema migrations, destructive operations without backup verification.',
            'Legal or compliance violations: GDPR data handling, payment card scope creep, IP issues.',
            'Architectural decisions that permanently foreclose important future options at prohibitive reversal cost.',
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

    <P>
      The distinction is reversibility. Defer on reversible decisions where the cost of being
      wrong is low. Hold firm on irreversible decisions where the cost of being wrong is
      structural or legal. Most decisions are more reversible than they feel in the moment.
    </P>

    {/* ── Section 5 ── */}
    <H2 num="05">Building the Organisational Safety to Push Back</H2>

    <P>
      Individual technique only takes you so far. If the organisation's culture treats pushback
      as disloyalty, interprets "no" as a performance problem, or consistently overrides engineers
      without engaging with their concerns, no amount of framing skill will make dissent safe or
      effective. That is a leadership problem, not an individual one.
    </P>

    <P>
      But engineers — especially senior engineers — have more influence on culture than they
      typically exercise. Some of the most effective changes are structural:
    </P>

    <H3>Normalise cost visibility in planning</H3>

    <P>
      If every feature request in planning includes a section for "what does this cost to own
      long-term" alongside "what does this cost to build," the conversation about whether to
      build it becomes natural. When the maintenance cost is invisible in planning, every
      pushback sounds like obstruction. When it is visible, it sounds like information.
    </P>

    <H3>Create a decision log</H3>

    <P>
      When a technical decision is made — especially one where there was meaningful dissent —
      record it: what was decided, what alternatives were considered, what information the
      decision was based on, and who owns it. This does two things. It validates that the
      dissenting perspective was heard and engaged with. And it creates a record that makes
      it easier to revisit the decision when circumstances change, without it feeling like
      an admission of fault.
    </P>

    <H3>Separate the idea from the timing</H3>

    <P>
      One of the most effective reframes: "I think this is the right direction — I am not sure
      this is the right moment." It preserves the idea, surfaces the timing concern, and avoids
      the binary good/bad judgment that makes pushback feel personal. A backlog of "good ideas
      at the wrong time" is a legitimate planning tool, not a graveyard.
    </P>

    <Callout type="info">
      The senior engineers who have the most influence are not the ones who win every argument.
      They are the ones whose concerns consistently turn out to be worth engaging with — because
      they surface them clearly, at the right level of abstraction, with the costs and trade-offs
      made visible. Trust is built through track record, not volume.
    </Callout>

    {/* ── Section 6 ── */}
    <H2 num="06">The Things Worth Fighting For</H2>

    <P>
      After all this, there is a risk of the opposite error: becoming the engineer who pushes
      back on everything, whose default is caution, who is never quite ready to commit. That
      is its own kind of failure, and it is just as costly as the engineer who never says no.
    </P>

    <P>
      Productive pushback is selective. It is worth spending capital on things that will still
      matter in two years. A naming convention argument is not worth a fractured relationship
      with a PM. An architectural decision that will force a complete rewrite of the payment
      system in eighteen months is.
    </P>

    <P>
      The question to ask before every pushback: "If this goes the way I'm concerned about, what
      is the actual cost — and is that cost high enough to justify the friction of this
      conversation?" Most of the time, the answer is yes for architectural decisions and no for
      implementation preferences. The senior engineer who can reliably tell the difference is
      the one who gets listened to when it matters.
    </P>

    <Callout type="info">
      Saying no is a skill, not a personality trait. It improves with practice, with clarity
      about what actually matters, and with a track record of being right about the things you
      pushed back on. The goal is not fewer yeses — it is better ones.
    </Callout>
  </ArticleLayout>
);

export default SeniorEngineerSayingNo;
