import React from 'react';
import ArticleLayout from '../ArticleLayout';
import { P, H2, H3, Callout, Code } from '../ArticlePrimitives';

/* ─── Prose primitives ────────────────────────────────────────────────────── */


const CompareRow: React.FC<{ aspect: string; requests: string; limits: string }> = ({ aspect, requests, limits }) => (
  <div className="grid grid-cols-3 gap-px bg-primary/10 text-xs font-mono">
    <div className="bg-bg-dark px-4 py-3 text-slate-500 font-bold">{aspect}</div>
    <div className="bg-primary/5 px-4 py-3 text-primary/70">{requests}</div>
    <div className="bg-yellow-400/5 px-4 py-3 text-yellow-400/70">{limits}</div>
  </div>
);

const QoSCard: React.FC<{ tier: string; condition: string; risk: string; color: string }> = ({ tier, condition, risk, color }) => (
  <div className={`border p-4 ${color}`}>
    <p className="text-[9px] font-bold font-mono tracking-widest mb-1 opacity-60">{tier}</p>
    <p className="text-xs font-mono text-slate-400 leading-5 mb-2">{condition}</p>
    <p className="text-[10px] font-bold font-mono opacity-70">EVICTION RISK: {risk}</p>
  </div>
);

/* ─── Article ─────────────────────────────────────────────────────────────── */

const K8sResourceLimits: React.FC = () => (
  <ArticleLayout
    id="POST_004"
    title="Kubernetes Resource Requests vs Limits: The Misunderstood Contract"
    category="CLOUD_NATIVE"
    date="2025-08-29"
    readTime={9}
    tags={['KUBERNETES', 'PERFORMANCE', 'FINOPS']}
  >
    <P>
      Ask most engineers to explain the difference between a Kubernetes resource request and a resource limit and
      you will hear something like: "requests are what you ask for, limits are the maximum you can use." That is
      technically accurate and practically useless. It does not explain why setting them equal causes CPU
      throttling, why OOMKills happen even when memory usage looks fine, or why your cluster is at 80% allocated
      but 30% actually utilised.
    </P>

    <P>
      Requests and limits are not just numbers in a YAML file. They are a contract between your workload and the
      Kubernetes scheduler, the Linux kernel's CFS bandwidth controller, and the kubelet's eviction manager.
      Understanding each counterparty's role is what turns mysterious restarts and poor utilisation into
      predictable, optimised infrastructure.
    </P>

    <Callout type="warn">
      The most common mistake: setting <code>requests == limits</code> on every container. This maximises
      predictability at the cost of utilisation. It also causes CPU throttling at the limit, not just at
      saturation — a behaviour that surprises almost everyone the first time they encounter it.
    </Callout>

    {/* ── Section 1 ── */}
    <H2 num="01">The Two Contracts</H2>

    <P>
      Requests and limits govern two completely different things with two completely different enforcement
      mechanisms. Treating them as "minimum and maximum" obscures this.
    </P>

    <div className="my-7 border border-primary/10 overflow-hidden">
      <div className="grid grid-cols-3 gap-px bg-primary/10 text-[9px] font-bold font-mono tracking-widest">
        <div className="bg-bg-dark px-4 py-2 text-slate-600">ASPECT</div>
        <div className="bg-primary/10 px-4 py-2 text-primary/60">REQUESTS</div>
        <div className="bg-yellow-400/10 px-4 py-2 text-yellow-400/60">LIMITS</div>
      </div>
      <CompareRow aspect="Enforced by"      requests="kube-scheduler"           limits="kubelet + Linux kernel" />
      <CompareRow aspect="When it applies"  requests="At scheduling time"       limits="At runtime, continuously" />
      <CompareRow aspect="CPU enforcement"  requests="Proportional CPU shares"  limits="CFS bandwidth throttle" />
      <CompareRow aspect="Memory enforce."  requests="Soft guarantee"           limits="OOMKill if exceeded" />
      <CompareRow aspect="Affects"          requests="Node selection + QoS tier" limits="Process execution" />
      <CompareRow aspect="Overcommit?"      requests="Yes — sum can exceed node" limits="Hard ceiling per container" />
    </div>

    {/* ── Section 2 ── */}
    <H2 num="02">Requests — The Scheduler's Promise</H2>

    <P>
      When you set a resource request, you are telling the scheduler: "this container needs at least this much
      to run correctly." The scheduler uses requests — not limits, never limits — to decide which node a pod
      can land on. A node is considered eligible only if its <strong className="text-white">allocatable
      resources minus already-requested resources</strong> can accommodate the new pod's requests.
    </P>

    <Code label="How the scheduler sees node capacity — allocatable vs requested">
{`# Node: 4 CPU cores, 16Gi memory
# Allocatable (after OS + kubelet overhead): 3.8 CPU, 14.5Gi

# Currently scheduled pods on this node:
# pod-a: requests 500m CPU, 512Mi memory
# pod-b: requests 1000m CPU, 2Gi memory
# pod-c: requests 800m CPU, 1Gi memory

# Already requested: 2300m CPU, 3.5Gi memory
# Remaining allocatable: 1500m CPU, 11Gi memory

# New pod with requests: 2000m CPU, 4Gi memory
# Result: UNSCHEDULABLE — not enough CPU headroom
#         (even if the node is actually at 20% CPU usage)

# This is why you see Pending pods on a "mostly idle" cluster:
# the cluster is resource-saturated at the request level,
# not at the actual usage level.`}
    </Code>

    <P>
      This is the root cause of the cluster utilisation paradox many teams experience: a cluster reporting 85%
      CPU requested but only 25% CPU actually used. Requests are a scheduling reservation, not a usage
      measurement. Oversized requests lead to stranded capacity — nodes that cannot accept new pods because
      their request budget is exhausted, even though their processors are idle.
    </P>

    <H3>CPU requests and time-sharing</H3>

    <P>
      At runtime, CPU requests translate into Linux CFS (Completely Fair Scheduler){' '}
      <em className="text-slate-300">shares</em>. These shares determine how CPU time is divided between
      containers when the node is under contention. A container with a 1000m request gets twice the CPU time
      of a container with a 500m request — proportionally, when both are competing for a busy core.
    </P>

    <P>
      When the node is not under contention, a container can use as much CPU as it wants — up to its limit,
      or unbounded if no limit is set. Requests only constrain behaviour under pressure.
    </P>

    {/* ── Section 3 ── */}
    <H2 num="03">Limits — The Kernel's Hard Ceiling</H2>

    <P>
      Limits are enforced at runtime by the Linux kernel, not by Kubernetes. The kubelet configures kernel
      cgroups when it starts a container, and the kernel enforces those cgroups continuously, every CPU
      scheduling period. This is a fundamentally different enforcement mechanism from scheduling, and it
      produces fundamentally different failure modes.
    </P>

    <H3>CPU limits and CFS throttling</H3>

    <P>
      CPU limits are implemented via CFS bandwidth control. The kernel divides time into periods (default:
      100ms). Each period, a container is allocated a quota proportional to its CPU limit. If the container
      exhausts its quota before the period ends, it is <strong className="text-white">throttled</strong> —
      suspended until the next period — even if other CPU cores on the node are completely idle.
    </P>

    <Code label="Observing CPU throttling — the metric that reveals hidden latency">
{`# Prometheus query: throttled CPU time as a percentage of total CPU time
# Values above 25% indicate a workload constrained by CPU limits

rate(container_cpu_cfs_throttled_periods_total[5m])
  /
rate(container_cpu_cfs_periods_total[5m])

# Per-container view in a namespace
sum by (pod, container) (
  rate(container_cpu_cfs_throttled_periods_total{namespace="payments"}[5m])
  /
  rate(container_cpu_cfs_periods_total{namespace="payments"}[5m])
)

# Alert: any container throttled more than 25% of the time
- alert: HighCpuThrottling
  expr: |
    sum by (pod, container, namespace) (
      rate(container_cpu_cfs_throttled_periods_total[5m])
      / rate(container_cpu_cfs_periods_total[5m])
    ) > 0.25
  for: 10m
  annotations:
    summary: "CPU throttling above 25% — consider raising the CPU limit"`}
    </Code>

    <P>
      CPU throttling is invisible in standard dashboards. A container can show 300m average CPU usage against a
      500m limit and still be throttled 40% of the time — because its workload is bursty, saturating the CFS
      quota during request spikes even though its average is well under the limit. This is the single most common
      unexplained latency source in Kubernetes workloads.
    </P>

    <Callout type="danger">
      Setting <code>cpu.requests == cpu.limits</code> eliminates burstability entirely. A container capped
      at exactly what it requests cannot absorb any traffic spike without throttling. For latency-sensitive
      services, consider setting no CPU limit at all and relying on requests for scheduling, with node-level
      autoscaling to protect neighbour workloads.
    </Callout>

    <H3>Memory limits and OOMKill</H3>

    <P>
      Memory limits are simpler and more brutal. When a container's memory usage reaches its limit, the Linux
      kernel's OOM (Out of Memory) killer terminates the process. No grace period. No SIGTERM. The process is
      killed immediately with SIGKILL, and Kubernetes restarts the container, incrementing its restart counter.
    </P>

    <Code label="Diagnosing OOMKill — events, metrics, and the kernel log">
{`# Check for OOMKilled containers in recent events
kubectl get events --field-selector reason=OOMKilling -A

# Describe a pod to see its last termination reason
kubectl describe pod payments-service-7d9f8b-xk2pq -n payments
# Look for:
# Last State: Terminated
#   Reason: OOMKilled
#   Exit Code: 137        ← 128 + SIGKILL(9)

# Prometheus: memory usage as a % of limit — alert before OOMKill
(
  container_memory_working_set_bytes{container!=""}
  /
  container_spec_memory_limit_bytes{container!=""}
) * 100

# Alert at 85% — gives time to react before the kill happens
- alert: ContainerMemoryNearLimit
  expr: |
    (container_memory_working_set_bytes / container_spec_memory_limit_bytes)
    * 100 > 85
  for: 5m`}
    </Code>

    <P>
      A critical nuance: Kubernetes uses <code className="text-primary text-xs">container_memory_working_set_bytes</code>{' '}
      for OOM decisions, not <code className="text-primary text-xs">container_memory_usage_bytes</code>. The
      working set excludes reclaimable page cache. A container can report high{' '}
      <code className="text-primary text-xs">memory_usage_bytes</code> due to file cache while its working set —
      and therefore its OOM risk — is actually low. Always use working set in your alerts.
    </P>

    {/* ── Section 4 ── */}
    <H2 num="04">Quality of Service Classes</H2>

    <P>
      Kubernetes assigns every pod a QoS class based on its requests and limits configuration. This class
      determines eviction priority when a node is under memory pressure — which pods get killed first to
      reclaim memory for critical workloads.
    </P>

    <div className="grid grid-cols-1 gap-px bg-primary/10 border border-primary/10 my-7">
      <QoSCard
        tier="GUARANTEED"
        condition="requests == limits for ALL containers (both CPU and memory). No burstability."
        risk="LOWEST — evicted last"
        color="border-green-400/20 bg-green-400/5"
      />
      <QoSCard
        tier="BURSTABLE"
        condition="At least one container has requests < limits, or limits are not set. Can burst above requests."
        risk="MEDIUM — evicted before Guaranteed"
        color="border-yellow-400/20 bg-yellow-400/5"
      />
      <QoSCard
        tier="BESTEFFORT"
        condition="No requests or limits set on any container. Scheduler ignores resource availability."
        risk="HIGHEST — evicted first, always"
        color="border-red-400/20 bg-red-400/5"
      />
    </div>

    <Code label="Check the QoS class of a running pod">
{`kubectl get pod payments-service-7d9f8b-xk2pq \
  -o jsonpath='{.status.qosClass}'

# Output: Burstable

# Or see all pods and their QoS class in a namespace
kubectl get pods -n payments \
  -o custom-columns='NAME:.metadata.name,QOS:.status.qosClass'`}
    </Code>

    <Callout type="info">
      Production critical services (databases, payment processors, auth services) should target Guaranteed QoS.
      Stateless, easily restartable services (workers, batch jobs) can safely be Burstable. BestEffort should
      only be used for truly non-critical workloads where eviction and restart is acceptable at any time.
    </Callout>

    {/* ── Section 5 ── */}
    <H2 num="05">The Right Way to Set Values</H2>

    <P>
      The answer is not "set requests equal to limits" (the Guaranteed tax) nor "do not set limits" (the noisy
      neighbour risk). The answer is to measure first, then configure deliberately.
    </P>

    <H3>Step 1 — measure actual usage with VPA in recommendation mode</H3>

    <Code label="VerticalPodAutoscaler in Off mode — recommendations without enforcement">
{`apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: payments-service-vpa
  namespace: payments
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: payments-service
  updatePolicy:
    updateMode: "Off"   # recommend only, do not touch the pod

---
# After a few days of traffic, read the recommendations:
kubectl describe vpa payments-service-vpa -n payments

# Output:
# Recommendation:
#   Container Recommendations:
#     Container Name: payments-service
#       Lower Bound:
#         cpu: 120m
#         memory: 256Mi
#       Target:
#         cpu: 250m        ← use this as your request
#         memory: 512Mi
#       Upper Bound:
#         cpu: 800m        ← use this as your limit ceiling
#         memory: 1Gi`}
    </Code>

    <H3>Step 2 — set requests from VPA target, limits with headroom</H3>

    <Code label="Deployment — requests from VPA, CPU limit with burst headroom, memory limit firm">
{`resources:
  requests:
    cpu: 250m       # VPA target — scheduler uses this
    memory: 512Mi   # VPA target — also determines QoS class
  limits:
    cpu: 1000m      # 4× request — allows burst without throttle
    memory: 768Mi   # 1.5× request — firm ceiling, tune carefully

# CPU limit = 4× request rationale:
# - Allows traffic spikes to burst up to 1 full core
# - Prevents one pod from monopolising a node under sustained load
# - Throttling only kicks in if the pod sustains > 1 CPU for > 100ms

# Memory limit = 1.5× request rationale:
# - Headroom for JVM/GC spikes, caches, connection pool growth
# - OOMKill if memory genuinely leaks past this point
# - Alert at 85% of limit to catch leaks before the kill`}
    </Code>

    <H3>Step 3 — set a namespace LimitRange as a safety net</H3>

    <P>
      LimitRange provides default requests and limits for containers that do not specify their own. This prevents
      BestEffort pods from accidentally landing in production namespaces and protects against missing resource
      specs in new deployments.
    </P>

    <Code label="LimitRange — namespace defaults and maximum ceilings">
{`apiVersion: v1
kind: LimitRange
metadata:
  name: payments-limits
  namespace: payments
spec:
  limits:
    - type: Container
      default:           # applied when limits are not specified
        cpu: 500m
        memory: 512Mi
      defaultRequest:    # applied when requests are not specified
        cpu: 100m
        memory: 128Mi
      max:               # hard ceiling — no container can exceed this
        cpu: "4"
        memory: 4Gi
      min:               # floor — prevents zero-resource containers
        cpu: 50m
        memory: 64Mi`}
    </Code>

    {/* ── Section 6 ── */}
    <H2 num="06">ResourceQuota — Cluster-Wide Governance</H2>

    <P>
      LimitRange governs individual containers. ResourceQuota governs total consumption across a namespace. It
      prevents a single team or tenant from consuming a disproportionate share of cluster resources and is
      essential in multi-tenant clusters.
    </P>

    <Code label="ResourceQuota — namespace-level total request and limit ceilings">
{`apiVersion: v1
kind: ResourceQuota
metadata:
  name: payments-quota
  namespace: payments
spec:
  hard:
    requests.cpu: "8"          # total CPU requested across all pods
    requests.memory: 16Gi      # total memory requested
    limits.cpu: "32"           # total CPU limits
    limits.memory: 64Gi        # total memory limits
    pods: "50"                 # max pods in this namespace
    persistentvolumeclaims: "20"

# Check current usage against quota:
kubectl describe resourcequota payments-quota -n payments`}
    </Code>

    {/* ── Section 7 ── */}
    <H2 num="07">Common Failure Patterns and Their Fixes</H2>

    <div className="grid grid-cols-1 gap-4 my-7">
      {[
        {
          symptom: 'Pod restarts with exit code 137',
          cause: 'OOMKill — memory limit exceeded',
          fix: 'Increase memory limit; add memory leak alert at 85% of limit; profile for leaks',
          color: 'border-red-400/20 bg-red-400/5',
          label: 'text-red-400/60',
        },
        {
          symptom: 'Elevated p99 latency, average CPU looks fine',
          cause: 'CPU throttling — bursty workload hitting CFS quota',
          fix: 'Raise CPU limit or remove it; add container_cpu_cfs_throttled_periods alert',
          color: 'border-yellow-400/20 bg-yellow-400/5',
          label: 'text-yellow-400/60',
        },
        {
          symptom: 'Pods stuck Pending despite idle-looking cluster',
          cause: 'Request budget exhausted — requests sum exceeds allocatable',
          fix: 'Right-size requests using VPA recommendations; enable cluster autoscaler',
          color: 'border-orange-400/20 bg-orange-400/5',
          label: 'text-orange-400/60',
        },
        {
          symptom: 'Random pod evictions during traffic spikes',
          cause: 'BestEffort or low-priority Burstable pods evicted under node memory pressure',
          fix: 'Set meaningful requests on all containers; assign PriorityClass to critical pods',
          color: 'border-blue-400/20 bg-blue-400/5',
          label: 'text-blue-400/60',
        },
      ].map(item => (
        <div key={item.symptom} className={`border p-5 ${item.color}`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div>
              <p className={`text-[9px] font-bold tracking-widest mb-1 ${item.label}`}>SYMPTOM</p>
              <p className="text-slate-300">{item.symptom}</p>
            </div>
            <div>
              <p className={`text-[9px] font-bold tracking-widest mb-1 ${item.label}`}>ROOT CAUSE</p>
              <p className="text-slate-400">{item.cause}</p>
            </div>
            <div>
              <p className={`text-[9px] font-bold tracking-widest mb-1 ${item.label}`}>FIX</p>
              <p className="text-slate-400">{item.fix}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* ── Conclusion ── */}
    <H2 num="08">Conclusion</H2>

    <P>
      Resource requests and limits are not a configuration chore — they are the primary mechanism through which
      your workloads negotiate with the scheduler, the kernel, and the eviction manager. Setting them
      thoughtfully is one of the highest-leverage infrastructure improvements available to most teams.
    </P>

    <P>
      The workflow is repeatable: run VPA in recommendation mode for a week of representative traffic, set
      requests from the VPA target, set CPU limits with burst headroom and memory limits with leak headroom,
      instrument CFS throttling and working set memory in your dashboards, and let LimitRange and ResourceQuota
      protect you from regressions.
    </P>

    <Callout type="info">
      The goal is not to maximise utilisation at all costs or to guarantee every container a private island of
      resources. It is to make the contract between your workload and the cluster explicit, measurable, and
      tuned to the actual behaviour of your application under real traffic — not to the instinct of the
      engineer who wrote the first Helm chart.
    </Callout>
  </ArticleLayout>
);

export default K8sResourceLimits;
