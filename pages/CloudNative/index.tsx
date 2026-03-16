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
    id: 'containers',
    icon: 'deployed_code',
    title: 'CONTAINERISATION_STANDARDS',
    tag: 'PACKAGING',
    points: [
      'One process per container — avoid running multiple services inside a single image.',
      'Use distroless or minimal base images (alpine, scratch) to reduce attack surface and image size.',
      'Never run containers as root; set a non-root USER in your Dockerfile.',
      'Pin base image versions with digest hashes, not just tags, for reproducible builds.',
      'Multi-stage builds: compile/test in a builder stage, copy only the binary/assets to the final image.',
    ],
  },
  {
    id: 'kubernetes',
    icon: 'hub',
    title: 'KUBERNETES_OPERATIONS',
    tag: 'ORCHESTRATION',
    points: [
      'Set resource requests and limits on every container — unset limits cause noisy-neighbour failures.',
      'Liveness probes restart stuck processes; readiness probes gate traffic — never conflate them.',
      'Use Horizontal Pod Autoscaler (HPA) on CPU/memory and KEDA for event-driven scaling.',
      'Pod Disruption Budgets (PDB) ensure a minimum number of replicas survive voluntary disruptions.',
      'Namespaces + RBAC: grant least-privilege service accounts; avoid cluster-admin in workloads.',
    ],
  },
  {
    id: 'twelve-factor',
    icon: 'rule',
    title: '12-FACTOR_APP_PRINCIPLES',
    tag: 'FOUNDATION',
    points: [
      'Config in the environment — no hardcoded secrets or environment-specific values in code.',
      'Stateless processes: store session state externally (Redis, DB); any instance serves any request.',
      'Treat backing services (DB, queue, cache) as attached resources swappable by config alone.',
      'Logs as event streams: write to stdout/stderr; let the platform aggregate and route them.',
      'Dev/prod parity: keep environments as similar as possible to catch environment-specific bugs early.',
    ],
  },
  {
    id: 'gitops',
    icon: 'merge',
    title: 'GITOPS_&_CI/CD',
    tag: 'DELIVERY',
    points: [
      'Declarative infrastructure: the Git repository is the single source of truth for cluster state.',
      'GitOps controllers (ArgoCD, Flux) continuously reconcile desired vs actual state automatically.',
      'Separate application code repos from infrastructure/config repos to control blast radius.',
      'Immutable artefacts: every commit produces a versioned, tagged container image — never mutate latest.',
      'Canary and blue/green deployments with automated rollback on failed health checks or SLO breaches.',
    ],
  },
  {
    id: 'observability',
    icon: 'monitoring',
    title: 'CLOUD_NATIVE_OBSERVABILITY',
    tag: 'TELEMETRY',
    points: [
      'OpenTelemetry as the single instrumentation standard — vendor-agnostic traces, metrics, and logs.',
      'Export metrics in Prometheus format; use Grafana dashboards for operational visibility.',
      'Centralised log aggregation (Loki, ELK, CloudWatch) with structured JSON logs and correlation IDs.',
      'SLO-driven alerting: alert on error budget burn rate, not raw error counts or CPU thresholds.',
      'Continuous profiling (Pyroscope, Cloud Profiler) to identify CPU and memory hotspots in production.',
    ],
  },
  {
    id: 'security',
    icon: 'security',
    title: 'CLOUD_NATIVE_SECURITY',
    tag: 'ZERO_TRUST',
    points: [
      'Secrets management via Vault, AWS Secrets Manager, or Kubernetes External Secrets — never in env vars committed to Git.',
      'mTLS for all service-to-service traffic; network policies to enforce east-west traffic rules.',
      'Image scanning in CI (Trivy, Snyk) and admission controllers (OPA Gatekeeper) to block non-compliant workloads.',
      'Supply-chain security: sign images with Cosign, verify signatures at admission time.',
      'Regular CIS Kubernetes Benchmark audits and automated compliance checks in pipelines.',
    ],
  },
  {
    id: 'service-design',
    icon: 'architecture',
    title: 'MICROSERVICE_DESIGN',
    tag: 'ARCHITECTURE',
    points: [
      'Design around business capabilities (Domain-Driven Design) — one bounded context per service.',
      'API-first design: define contracts (OpenAPI, Protobuf) before writing implementation code.',
      'Backend-for-Frontend (BFF) pattern: tailored API gateways per client type reduce over-fetching.',
      'Avoid synchronous chains longer than 2 hops; use async messaging to decouple deep call trees.',
      'Strangler Fig pattern for migrating monoliths: route traffic incrementally to new services.',
    ],
  },
  {
    id: 'cost',
    icon: 'savings',
    title: 'COST_OPTIMISATION',
    tag: 'FINOPS',
    points: [
      'Right-size workloads using VPA recommendations before setting permanent resource requests/limits.',
      'Spot/preemptible instances for stateless, fault-tolerant workloads to cut compute costs by 60–80 %.',
      'Cluster autoscaler removes idle nodes; combine with bin-packing schedulers to maximise utilisation.',
      'Use managed services (RDS, Cloud SQL, Pub/Sub) for undifferentiated heavy lifting — operational overhead has a cost.',
      'Tag all cloud resources with team, environment, and cost-centre labels for granular chargeback reporting.',
    ],
  },
];

const tagColors: Record<string, string> = {
  PACKAGING: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  ORCHESTRATION: 'text-primary border-primary/30 bg-primary/5',
  FOUNDATION: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  DELIVERY: 'text-green-400 border-green-400/30 bg-green-400/5',
  TELEMETRY: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
  ZERO_TRUST: 'text-red-400 border-red-400/30 bg-red-400/5',
  ARCHITECTURE: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
  FINOPS: 'text-pink-400 border-pink-400/30 bg-pink-400/5',
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

const CloudNative: React.FC = () => (
  <section className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">
    <PageHeader
      eyebrow="K8s · Serverless · Infra"
      titleMain="Cloud"
      titleAccent="Native"
      description="Production-grade principles and patterns for building, deploying, and operating cloud-native web applications at scale."
    />

    {/* Stats bar */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary/10 border border-primary/10">
      {[
        { label: 'PATTERNS', value: '8' },
        { label: 'PRINCIPLES', value: '40+' },
        { label: 'TARGET_ENV', value: 'K8S' },
        { label: 'DEPLOY_FREQ', value: 'ON_DEMAND' },
      ].map(stat => (
        <div key={stat.label} className="bg-bg-dark px-6 py-4 flex flex-col gap-1">
          <span className="text-primary text-2xl font-black font-display">{stat.value}</span>
          <span className="text-slate-600 text-[9px] font-bold tracking-[0.3em] uppercase">{stat.label}</span>
        </div>
      ))}
    </div>

    {/* Info banner */}
    <div className="border border-primary/20 bg-primary/5 px-4 py-3 flex items-start gap-3">
      <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">info</span>
      <p className="text-primary/70 text-[10px] font-mono leading-relaxed uppercase tracking-wider">
        Cloud native is not just about containers — it is a mindset: design for failure, automate everything, observe continuously, and deploy frequently with confidence.
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

export default CloudNative;
