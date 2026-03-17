import React from 'react';
import ArticleLayout from '../ArticleLayout';
import { P, H2, H3, Callout, Code } from '../ArticlePrimitives';

/* ─── Prose primitives ────────────────────────────────────────────────────── */


const SymptomCard: React.FC<{ symptom: string; diagnosis: string; color: string; labelCls: string }> = ({
  symptom, diagnosis, color, labelCls,
}) => (
  <div className={`border p-5 ${color}`}>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
      <div>
        <p className={`text-[9px] font-bold tracking-widest mb-1.5 ${labelCls}`}>SYMPTOM</p>
        <p className="text-slate-300 font-bold leading-5">{symptom}</p>
      </div>
      <div>
        <p className={`text-[9px] font-bold tracking-widest mb-1.5 ${labelCls}`}>ROOT CAUSE</p>
        <p className="text-slate-500 leading-5">{diagnosis}</p>
      </div>
    </div>
  </div>
);

const PrincipleRow: React.FC<{ num: string; title: string; children: React.ReactNode }> = ({ num, title, children }) => (
  <div className="border border-primary/10 bg-surface-terminal p-5 my-3">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-[9px] font-bold font-mono text-primary/40 border border-primary/15 px-1.5 py-0.5">{num}</span>
      <span className="text-white font-bold text-xs uppercase tracking-widest">{title}</span>
    </div>
    <p className="text-xs font-mono text-slate-500 leading-6">{children}</p>
  </div>
);

/* ─── Article ─────────────────────────────────────────────────────────────── */

const OnCallDesignProblem: React.FC = () => (
  <ArticleLayout
    id="POST_009"
    title="On-Call Rota Is a Design Problem, Not a People Problem"
    category="ENGINEERING_CULTURE"
    date="2025-05-08"
    readTime={8}
    tags={['ONCALL', 'SRE', 'OBSERVABILITY', 'CULTURE']}
  >
    <P>
      When an on-call rotation is painful — frequent overnight pages, alert fatigue, engineers dreading
      their shift — organisations almost always respond the same way. They hire more people to spread
      the load, mandate on-call training, or ask engineers to "be more resilient." The rotation stays
      painful. The engineers stay burned out. The attrition rate quietly climbs.
    </P>

    <P>
      The diagnosis is wrong. Painful on-call is not a people problem. It is a system design problem
      that manifests as a people problem. The alerts that page at 3am exist because someone built a
      system that creates those conditions and then left the humans holding the pager to compensate
      for it. No amount of staffing, training, or cultural expectation-setting fixes a system that was
      not designed for operability.
    </P>

    <Callout type="warn">
      If your on-call engineers are spending more than 25% of their shift on reactive work — responding
      to alerts, writing incident tickets, investigating noise — your alerting and system design need
      attention, not your staffing levels.
    </Callout>

    {/* ── Section 1 ── */}
    <H2 num="01">Reading the Symptoms</H2>

    <P>
      Before you can fix an on-call rotation, you need to read its symptoms correctly. Each failure
      mode has a distinct root cause and a distinct fix.
    </P>

    <div className="grid grid-cols-1 gap-px bg-primary/10 border border-primary/10 my-7">
      <SymptomCard
        symptom="High alert volume with most resolving themselves"
        diagnosis="Alerts not tied to SLOs. Thresholds set on metric spikes rather than user-visible impact. Alerting on causes instead of symptoms."
        color="border-red-400/10 bg-red-400/5"
        labelCls="text-red-400/60"
      />
      <SymptomCard
        symptom="Same alert fires repeatedly for the same service"
        diagnosis="Known issue without a remediation path. Either a permanent architectural problem being tolerated, or a runbook action that should be automated."
        color="border-yellow-400/10 bg-yellow-400/5"
        labelCls="text-yellow-400/60"
      />
      <SymptomCard
        symptom="On-call engineer cannot diagnose the incident without calling another engineer"
        diagnosis="Runbooks are missing, out of date, or incomplete. Observability dashboards are not linked from alerts. System knowledge is concentrated in a few people."
        color="border-orange-400/10 bg-orange-400/5"
        labelCls="text-orange-400/60"
      />
      <SymptomCard
        symptom="Incidents cluster around deployments"
        diagnosis="Insufficient pre-production testing, no canary or blue/green deployment, missing automated rollback on failed health checks."
        color="border-blue-400/10 bg-blue-400/5"
        labelCls="text-blue-400/60"
      />
      <SymptomCard
        symptom="Pages during off-hours that can wait until morning"
        diagnosis="Alert severity not calibrated to actual urgency. P1 alerts firing for P3 conditions. No tiered escalation policy."
        color="border-purple-400/10 bg-purple-400/5"
        labelCls="text-purple-400/60"
      />
    </div>

    {/* ── Section 2 ── */}
    <H2 num="02">SLO-Driven Alerting — The Foundation</H2>

    <P>
      The root cause of alert noise in most systems is the same: alerts were written to fire when
      something looks wrong to an engineer, not when something is wrong for a user. CPU at 80%,
      error rate above 0.1%, p99 latency above 500ms — these are internal metrics, not user
      experience signals. A user does not care that your CPU is at 80% if their request completed
      in 200ms.
    </P>

    <P>
      SLO-driven alerting inverts this. You define a Service Level Objective — a target for
      user-visible behaviour — and alert only when you are burning through your error budget at
      a rate that threatens to breach it. Everything else is a dashboard, not a page.
    </P>

    <H3>Defining an SLO</H3>

    <Code label="Example SLO definition — checkout service">
{`# Service: checkout-service
# SLI (what we measure): proportion of HTTP requests that succeed
#   in under 2 seconds, as measured from the load balancer

# SLO: 99.5% of requests meet the SLI over a rolling 30-day window
# Error budget: 0.5% of requests may fail or be slow
#   = ~3.6 hours of 100% outage equivalent per 30 days
#   = ~21,600 failing requests per day at 1,000 req/s

# Prometheus SLO recording rules
- record: job:checkout_request_success:rate5m
  expr: |
    sum(rate(http_requests_total{
      job="checkout", status=~"2..|3.."
    }[5m]))
    /
    sum(rate(http_requests_total{job="checkout"}[5m]))

- record: job:checkout_slo_error_rate:rate5m
  expr: 1 - job:checkout_request_success:rate5m`}
    </Code>

    <H3>Alerting on error budget burn rate, not raw error rate</H3>

    <P>
      The key insight of Google's SRE book: alert on how fast you are consuming your error budget,
      not on whether any errors exist. A 1% error rate that lasts 5 minutes consumes a negligible
      fraction of a monthly budget. A 1% error rate sustained for 3 days is a crisis. They look
      identical in a raw error rate alert.
    </P>

    <Code label="Prometheus — multi-window burn rate alert (Google SRE recommended pattern)">
{`# Multi-window burn rate: fires when error budget is being consumed
# fast enough to exhaust the monthly budget within a meaningful window.
# Two windows prevent both false positives (short spikes) and slow burns.

groups:
  - name: checkout-slo
    rules:

      # CRITICAL: consuming 14.4× budget — monthly budget gone in 2 hours
      # Requires immediate response — wake someone up
      - alert: CheckoutSLOBudgetBurnCritical
        expr: |
          (
            job:checkout_slo_error_rate:rate1h > (14.4 * 0.005)
            and
            job:checkout_slo_error_rate:rate5m > (14.4 * 0.005)
          )
        for: 2m
        labels:
          severity: critical
          team: checkout
        annotations:
          summary: "Checkout SLO burn rate critical — budget exhausted in ~2h"
          runbook: "https://wiki.internal/runbooks/checkout-slo-burn"

      # WARNING: consuming 6× budget — monthly budget gone in ~5 days
      # Route to Slack, not pager. Investigate during business hours.
      - alert: CheckoutSLOBudgetBurnWarning
        expr: |
          (
            job:checkout_slo_error_rate:rate6h > (6 * 0.005)
            and
            job:checkout_slo_error_rate:rate30m > (6 * 0.005)
          )
        for: 15m
        labels:
          severity: warning
          team: checkout
        annotations:
          summary: "Checkout SLO burn rate elevated — monitor and investigate"`}
    </Code>

    <Callout type="info">
      With multi-window burn rate alerting, a transient 5-minute spike in errors does not page anyone.
      Only sustained elevated error rates that genuinely threaten the monthly SLO trigger the critical
      alert. This is the single change that reduces overnight page volume most dramatically for most teams.
    </Callout>

    {/* ── Section 3 ── */}
    <H2 num="03">Runbooks — Not a Formality, a First-Class Deliverable</H2>

    <P>
      A runbook that takes 20 minutes to find, is written for the engineer who built the service,
      and has not been updated since the last architecture change is not a runbook — it is a liability.
      When a runbook fails the on-call engineer, the failure is not the engineer's: it is the team's
      for not treating the runbook as a first-class engineering deliverable.
    </P>

    <PrincipleRow num="R-01" title="Every alert links directly to its runbook">
      The runbook URL belongs in the alert annotation, not in a wiki that requires navigating three
      levels of hierarchy during an incident. The on-call engineer should have the relevant runbook
      open within 30 seconds of the page firing.
    </PrincipleRow>

    <PrincipleRow num="R-02" title="Runbooks are written for a stranger at 3am">
      The author knows the system. The on-call engineer at 3am may not. Write every runbook assuming
      the reader has zero prior context about this specific service. If a runbook requires internal
      knowledge to execute, that knowledge needs to be in the runbook.
    </PrincipleRow>

    <PrincipleRow num="R-03" title="Runbooks are tested in staging, not discovered in production">
      Every runbook action — restart a service, scale a deployment, flush a cache, roll back a
      migration — should be executed in a non-production environment at least once before it is
      needed in an incident. Untested runbooks contain errors. Those errors surface at the worst
      possible moment.
    </PrincipleRow>

    <PrincipleRow num="R-04" title="Runbooks have a last-verified date and an owner">
      A runbook without a maintenance owner is a runbook that will drift out of date. Assign
      ownership. Review runbooks quarterly or after every incident where the runbook was used.
      Archive runbooks for decommissioned services rather than leaving them to mislead.
    </PrincipleRow>

    <Code label="Runbook template — minimum viable structure for every alert">
{`# Alert: CheckoutSLOBudgetBurnCritical
# Owner: checkout-team
# Last verified: 2025-04-10

## What this alert means
The checkout service is consuming its monthly error budget at 14.4× the sustainable
rate. At this rate, the monthly SLO will be breached within approximately 2 hours.

## Immediate triage (do these first, in order)
1. Open the Checkout SLO dashboard:
   https://grafana.internal/d/checkout-slo

2. Check the error rate breakdown by endpoint:
   Top failing endpoints will be visible in the "Error Rate by Path" panel.

3. Check recent deployments:
   kubectl rollout history deployment/checkout-service -n payments

4. Check downstream dependency health:
   - Payment gateway status: https://status.payment-provider.com
   - Inventory service health: https://grafana.internal/d/inventory-health

## Common causes and fixes
| Cause                    | Signal                          | Fix                                      |
|--------------------------|--------------------------------------|------------------------------------------|
| Bad deployment           | Errors started after deploy timestamp | kubectl rollout undo deployment/checkout |
| Payment gateway outage   | Errors on /checkout/pay only          | Enable maintenance mode (see step below) |
| Database connection pool | "too many connections" in logs        | Restart checkout pods (rolling)          |
| High traffic spike       | Errors across all endpoints           | Scale deployment to 10 replicas          |

## Escalation
If not resolved in 30 minutes: page the checkout team lead via PagerDuty escalation policy.
If payment gateway is confirmed down: notify @checkout-oncall in #incidents Slack.

## Post-incident
File an incident ticket in Linear (CHECKOUT project) before closing this alert.`}
    </Code>

    {/* ── Section 4 ── */}
    <H2 num="04">Automating the Toil Away</H2>

    <P>
      Toil is repetitive, manual, automatable operational work that scales with service load. Restarting
      pods that OOMKill under traffic spikes, flushing a cache that fills up every Tuesday morning,
      scaling a deployment ahead of a known traffic pattern — these are not incidents. They are
      automation opportunities dressed up as incidents.
    </P>

    <P>
      The test: if an on-call engineer responds to the same page with the same sequence of actions
      more than twice, that sequence should become an automated remediation action. Every manual
      remediation that could be automated is a tax on every future on-call engineer for as long as
      the system runs.
    </P>

    <H3>Kubernetes — automated remediation with restart policies and VPA</H3>

    <Code label="Kubernetes — liveness probe auto-restart and VPA for OOMKill prevention">
{`# Liveness probe: Kubernetes restarts the pod automatically when
# the application is in a broken state — no manual intervention needed.
livenessProbe:
  httpGet:
    path: /health/live
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  failureThreshold: 3        # restart after 3 consecutive failures
  timeoutSeconds: 5

# Readiness probe: removes the pod from load balancer rotation
# during startup and temporary unavailability — no traffic to a broken pod.
readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 5
  failureThreshold: 3

# VPA in Auto mode: adjusts memory limits based on actual usage,
# preventing OOMKills caused by systematically undersized memory limits.
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: checkout-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: checkout-service
  updatePolicy:
    updateMode: "Auto"      # automatically applies recommendations
  resourcePolicy:
    containerPolicies:
      - containerName: checkout-service
        maxAllowed:
          memory: 2Gi       # safety ceiling — prevent unbounded growth`}
    </Code>

    <H3>PagerDuty / Opsgenie — event rules for automatic alert suppression</H3>

    <Code label="PagerDuty Event Rules — suppress known-noisy alerts during maintenance windows">
{`# PagerDuty Event Rule (JSON) — suppress alerts for a service
# during a scheduled maintenance window.
# Prevents on-call pages for expected downtime.

{
  "name": "Suppress checkout during maintenance",
  "conditions": {
    "operator": "and",
    "subconditions": [
      {
        "operator": "contains",
        "parameters": {
          "value": "checkout",
          "path": "payload.source"
        }
      },
      {
        "operator": "between",
        "parameters": {
          "value": ["2025-06-01T02:00:00Z", "2025-06-01T04:00:00Z"]
        }
      }
    ]
  },
  "actions": [{ "type": "suppress" }]
}

# For recurring windows (e.g. weekly batch job that always spikes):
# Use a recurring maintenance window in PagerDuty UI or
# the /maintenance_windows API endpoint.`}
    </Code>

    {/* ── Section 5 ── */}
    <H2 num="05">The Post-Incident Review — Where the Design Improves</H2>

    <P>
      Post-incident reviews (PIRs) are the feedback loop that converts incidents into system
      improvements. Done correctly, they are the mechanism by which on-call pain decreases over
      time. Done incorrectly — as a blame assignment exercise or a bureaucratic checkbox — they
      produce reports that gather dust while the same incidents recur.
    </P>

    <H3>Blameless by design, not by policy</H3>

    <P>
      Blameless post-mortems are not about protecting individuals from consequences — they are about
      accurate diagnosis. When a human is identified as the root cause ("the engineer misread the
      runbook"), the investigation stops before it reaches the actual root cause (the runbook was
      ambiguous, the deployment tooling had no confirmation step, the alert fired 30 minutes too
      late to allow a safe rollback). Blame terminates the causal chain prematurely.
    </P>

    <H3>The five action item categories</H3>

    <P>
      A PIR without action items is an essay, not an improvement. Action items should address
      the root causes identified in the review, not the symptoms. There are five categories:
    </P>

    <div className="grid grid-cols-1 gap-3 my-7">
      {[
        { cat: 'DETECTION',      color: 'text-primary/70',       item: 'Was the alert too slow, too noisy, or missing entirely? Fix the alerting.' },
        { cat: 'DIAGNOSIS',      color: 'text-blue-400/70',      item: 'Did the runbook lead the on-call engineer to the root cause efficiently? Fix the runbook.' },
        { cat: 'MITIGATION',     color: 'text-yellow-400/70',    item: 'Was the remediation action manual and repeatable? Automate it.' },
        { cat: 'PREVENTION',     color: 'text-green-400/70',     item: 'What system change would have prevented this incident? Prioritise it in the next sprint.' },
        { cat: 'COMMUNICATION',  color: 'text-purple-400/70',    item: 'Were stakeholders informed appropriately? Update the incident communication playbook.' },
      ].map(row => (
        <div key={row.cat} className="border border-primary/10 bg-surface-terminal flex items-start gap-4 px-5 py-4">
          <span className={`text-[9px] font-bold font-mono border border-current/30 px-1.5 py-0.5 shrink-0 mt-0.5 ${row.color}`}>
            {row.cat}
          </span>
          <p className="text-xs font-mono text-slate-500 leading-5">{row.item}</p>
        </div>
      ))}
    </div>

    <Code label="PIR template — minimum viable structure">
{`# Incident: Checkout SLO Breach
# Date: 2025-05-06 | Duration: 47 minutes | Severity: P1
# Author: @oncall-engineer | Reviewed by: @checkout-lead

## Timeline (UTC)
02:14 — Alert fires: CheckoutSLOBudgetBurnCritical
02:18 — On-call engineer acknowledges, opens runbook
02:24 — Root cause identified: payment gateway returning 503s
02:31 — Maintenance mode enabled, checkout gracefully degraded
02:51 — Payment gateway recovered, maintenance mode disabled
03:01 — SLO error budget burn rate returned to normal, alert resolved

## Root Cause
Payment gateway external dependency returned HTTP 503 for 37 minutes following
their infrastructure upgrade at 02:10 UTC. Checkout had no circuit breaker —
every request to the gateway timed out at 10s, blocking all checkout completions.

## Contributing Factors
1. No circuit breaker on the payment gateway client (primary cause of blast radius)
2. Timeout was 10s — users experienced 10s hang before error, not immediate feedback
3. Maintenance mode runbook required SSH access — on-call engineer spent 8 minutes
   getting credentials rather than mitigating

## Action Items
| ID   | Category    | Action                                           | Owner        | Due        |
|------|-------------|--------------------------------------------------|--------------|------------|
| AI-1 | PREVENTION  | Implement circuit breaker on payment gateway client | @backend-eng | 2025-05-20 |
| AI-2 | PREVENTION  | Reduce gateway timeout from 10s to 2s            | @backend-eng | 2025-05-15 |
| AI-3 | MITIGATION  | Add maintenance mode toggle to kubectl plugin    | @platform    | 2025-05-30 |
| AI-4 | DIAGNOSIS   | Update runbook: remove SSH requirement for maint mode | @checkout | 2025-05-12 |
| AI-5 | DETECTION   | Add payment gateway health to checkout dashboard | @observability | 2025-05-22 |`}
    </Code>

    {/* ── Section 6 ── */}
    <H2 num="06">Making On-Call a First-Class Engineering Concern</H2>

    <P>
      The ultimate cause of sustained on-call pain is not technical — it is prioritisation. Systems
      remain unoperatable because operability work never makes it into the sprint. Every incident
      produces action items; the action items sit in the backlog; the backlog is deprioritised in
      favour of feature work; the incidents recur.
    </P>

    <H3>The 25% rule</H3>
    <P>
      Google SRE's guidance is direct: if a team is spending more than 25% of its time on operational
      work (toil, incidents, on-call response), engineering time must be redirected from feature
      development to reliability improvements until that figure drops below 25%. This is not a soft
      recommendation — it is a capacity allocation rule enforced at the management level.
    </P>

    <H3>On-call shadowing for new engineers</H3>
    <P>
      Never put an engineer on primary on-call before they have shadowed at least two full on-call
      rotations. Shadowing means being woken up alongside the primary, watching the diagnosis
      process, and executing runbook actions under supervision. Engineers who are thrown onto
      primary on-call without shadowing are set up to fail — and the system pays for it in
      prolonged incidents and eroded confidence.
    </P>

    <H3>On-call compensation</H3>
    <P>
      On-call outside business hours is a material imposition on an engineer's personal time and
      should be compensated as such. The specific mechanism varies — time off in lieu, financial
      compensation, reduced sprint commitments during the following week. The wrong answer is to
      treat it as a professional obligation that requires no acknowledgement. Engineers who feel
      their on-call burden is invisible will eventually make it visible by leaving.
    </P>

    <Callout type="info">
      Track on-call health as an engineering metric: alert volume per shift, time to acknowledge,
      time to resolve, number of overnight pages, ratio of actionable to noisy alerts. Review it
      monthly at the team level. If it is not measured, it cannot be improved — and it will not
      be prioritised.
    </Callout>

    {/* ── Conclusion ── */}
    <H2 num="07">Conclusion</H2>

    <P>
      A painful on-call rotation is a signal — not about the people on it, but about the systems
      they are operating. Noisy alerts mean untuned observability. Missing runbooks mean knowledge
      was never externalised. Repeated manual remediations mean automation was never prioritised.
      Frequent overnight pages mean SLOs were never defined and enforced.
    </P>

    <P>
      Each of those is a design decision — or an absence of one. They were made, implicitly or
      explicitly, by the engineering team that built and shipped the system. The on-call engineer
      at 3am is not responsible for those decisions. They are responsible for surviving them.
      The team is responsible for not making the next engineer survive the same ones.
    </P>

    <Callout type="info">
      Start with one thing: audit last month's alerts. For each alert that fired, answer three
      questions — Was it actionable? Did it require waking someone up, or could it have waited
      until morning? Has it fired before for the same reason? The answers will tell you exactly
      where to start.
    </Callout>
  </ArticleLayout>
);

export default OnCallDesignProblem;
