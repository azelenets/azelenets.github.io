import React from 'react';
import ArticleLayout from '../ArticleLayout';
import { P, H2, H3, Callout, Code } from '../ArticlePrimitives';

/* ─── Prose primitives ────────────────────────────────────────────────────── */


const MythCard: React.FC<{ myth: string; reality: string }> = ({ myth, reality }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-primary/10 border border-primary/10 my-5">
    <div className="bg-red-400/5 p-4">
      <p className="text-[9px] font-bold font-mono text-red-400/60 tracking-widest mb-2">MYTH</p>
      <p className="text-xs font-mono text-slate-400 leading-5">{myth}</p>
    </div>
    <div className="bg-primary/5 p-4">
      <p className="text-[9px] font-bold font-mono text-primary/60 tracking-widest mb-2">REALITY</p>
      <p className="text-xs font-mono text-slate-400 leading-5">{reality}</p>
    </div>
  </div>
);

const PrincipleCard: React.FC<{ num: string; title: string; children: React.ReactNode }> = ({ num, title, children }) => (
  <div className="border border-primary/15 bg-primary/5 p-5 my-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-[9px] font-bold font-mono text-primary/50 border border-primary/20 px-1.5 py-0.5">P_{num}</span>
      <span className="text-primary font-bold text-xs uppercase tracking-widest">{title}</span>
    </div>
    <p className="text-xs font-mono text-slate-500 leading-6">{children}</p>
  </div>
);

/* ─── Article ─────────────────────────────────────────────────────────────── */

const GitOpsCultureShift: React.FC = () => (
  <ArticleLayout
    id="POST_003"
    title="GitOps Is Not Just Argo — It Is a Culture Shift"
    category="CLOUD_NATIVE"
    date="2026-03-17"
    readTime={7}
    tags={['GITOPS', 'ARGOCD', 'KUBERNETES', 'DEVOPS']}
  >
    <P>
      There is a pattern that repeats itself across engineering organisations every few years. A new tool arrives
      with a compelling value proposition. Teams adopt the tool. They declare the problem solved. The problems
      persist, just wearing different clothes.
    </P>

    <P>
      GitOps is going through this cycle right now. Teams install ArgoCD, point it at a Helm chart repository,
      watch the dashboards turn green, and call it GitOps. Then an incident hits at 2am, an engineer runs{' '}
      <code className="text-primary text-xs">kubectl apply -f hotfix.yaml</code> directly on the cluster, and the
      GitOps model silently breaks. The tool is in place. The culture is not.
    </P>

    <Callout type="warn">
      GitOps is not a tool. ArgoCD and Flux are implementations of GitOps — they are not GitOps itself. GitOps is a
      set of operating principles that change how teams think about infrastructure, deployment, and incident response.
      The tool without the principles is just a fancier CI/CD pipeline.
    </Callout>

    {/* ── Section 1 ── */}
    <H2 num="01">What GitOps Actually Is</H2>

    <P>
      GitOps was coined by Weaveworks in 2017 and can be distilled into four operating principles, originally
      articulated by OpenGitOps:
    </P>

    <PrincipleCard num="01" title="Declarative">
      The entire desired state of a system must be expressed declaratively. Not scripts, not runbooks, not
      imperative API calls — YAML, JSON, or any format that describes what the system should look like, not how
      to get there.
    </PrincipleCard>

    <PrincipleCard num="02" title="Versioned and Immutable">
      The desired state is stored in a version control system that provides immutability and a complete audit
      trail. Git is the canonical choice. Every change has an author, a timestamp, a commit hash, and a diff.
    </PrincipleCard>

    <PrincipleCard num="03" title="Pulled Automatically">
      Software agents — not CI pipelines — continuously pull the desired state and apply it to the system. The
      cluster reconciles itself toward the declared state. Nothing is pushed from outside.
    </PrincipleCard>

    <PrincipleCard num="04" title="Continuously Reconciled">
      The software agents continuously compare actual state to desired state and correct any drift. If someone
      manually edits a resource in the cluster, the agent reverts it. The Git repo always wins.
    </PrincipleCard>

    <P>
      Notice that none of these four principles mention ArgoCD, Flux, Helm, or Kubernetes. The principles describe
      a <strong className="text-white">way of working</strong> — a relationship between a team, a version control
      system, and a runtime environment. The tooling is an implementation detail.
    </P>

    {/* ── Section 2 ── */}
    <H2 num="02">The Myths Teams Believe</H2>

    <MythCard
      myth="We installed ArgoCD, so we have GitOps."
      reality="You have a synchronisation tool. GitOps requires that Git is the only way to change cluster state. If engineers can still kubectl apply, you have ArgoCD alongside GitOps, not GitOps itself."
    />

    <MythCard
      myth="GitOps is for Kubernetes. We use a different platform."
      reality="The principles apply to any system that can be declared and continuously reconciled — VMs via Terraform + Atlantis, serverless via Pulumi, database schemas via SchemaHero. Kubernetes is the most common target, not the only one."
    />

    <MythCard
      myth="GitOps slows us down during incidents — we need to bypass it."
      reality="Bypassing Git during incidents is the symptom of a GitOps implementation that has not been hardened for operational reality. The fix is better tooling (break-glass procedures, fast PR automation), not abandoning the model when it is most needed."
    />

    <MythCard
      myth="GitOps replaces CI/CD."
      reality="CI/CD builds and tests artefacts; GitOps deploys and reconciles them. They are complementary. CI writes the desired state to Git; the GitOps operator reads from Git and applies it to the cluster. CI pushes, GitOps pulls."
    />

    {/* ── Section 3 ── */}
    <H2 num="03">The Reconciliation Loop — The Heart of GitOps</H2>

    <P>
      The continuous reconciliation loop is what separates GitOps from a deploy-on-merge CI pipeline. A CI pipeline
      applies state once, at deploy time, then forgets. A GitOps operator applies state continuously — every few
      seconds — and corrects any deviation it finds.
    </P>

    <Code label="ArgoCD Application — declarative sync policy with self-healing enabled">
{`apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: payments-service
  namespace: argocd
spec:
  project: production

  source:
    repoURL: https://github.com/org/k8s-config
    targetRevision: main
    path: apps/payments-service/overlays/production

  destination:
    server: https://kubernetes.default.svc
    namespace: payments

  syncPolicy:
    automated:
      prune: true       # delete resources removed from Git
      selfHeal: true    # revert manual changes to the cluster
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        maxDuration: 3m
        factor: 2`}
    </Code>

    <P>
      With <code className="text-primary text-xs">selfHeal: true</code>, any manual{' '}
      <code className="text-primary text-xs">kubectl edit</code> or <code className="text-primary text-xs">kubectl apply</code>{' '}
      directly on the cluster will be reverted within the sync interval (default: 3 minutes in ArgoCD, every 30
      seconds in Flux). This is not a restriction — it is the enforcement mechanism that makes Git the single
      source of truth.
    </P>

    <Callout type="info">
      The reconciliation loop also protects against configuration drift from other sources: a Helm controller
      upgrade that mutates a value, a PodDisruptionBudget updated by a different team, a ConfigMap edited by an
      automated script. GitOps reverts all of it. What is in Git is what runs in production.
    </Callout>

    {/* ── Section 4 ── */}
    <H2 num="04">Repository Structure — The Decisions That Matter</H2>

    <P>
      How you structure your Git repositories has a direct impact on team autonomy, blast radius, and how clearly
      the audit trail reads when something goes wrong.
    </P>

    <H3>Mono-repo vs poly-repo</H3>

    <P>
      A single config repository for all services gives you a unified change history and makes cross-service
      dependency changes atomic. It works well for small-to-medium organisations. At scale, it creates contention
      — every team's deploy touches the same repository, merge queues slow down, and a mis-merge in one service's
      config can block another team's release.
    </P>

    <P>
      A repository per service (or per bounded context) gives teams full autonomy and eliminates contention, at
      the cost of cross-repo visibility. The pragmatic approach for most organisations is a hybrid: one
      repository per team, with a separate root infrastructure repository for cluster-level concerns.
    </P>

    <Code label="Recommended GitOps repository layout — team-scoped config repos">
{`# Root infrastructure repo (platform team owns this)
k8s-platform/
  clusters/
    production/          # ArgoCD App of Apps root
    staging/
  base/
    namespaces/
    rbac/
    network-policies/

# Per-team config repos (each team owns their own)
k8s-config-payments/
  apps/
    payments-service/
      base/              # Kustomize base (shared across envs)
        deployment.yaml
        service.yaml
        kustomization.yaml
      overlays/
        staging/         # staging-specific patches
        production/      # production-specific patches
  charts/                # Pinned Helm chart versions

k8s-config-orders/
  apps/
    orders-service/
      ...`}
    </Code>

    <H3>App of Apps pattern</H3>

    <P>
      At scale, managing individual ArgoCD Applications becomes unwieldy. The App of Apps pattern uses a root
      ArgoCD Application that manages other Applications declaratively — giving you a single entry point for
      bootstrapping an entire cluster from Git.
    </P>

    <Code label="App of Apps — root application that manages team application sets">
{`# k8s-platform/clusters/production/root-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: root
  namespace: argocd
spec:
  source:
    repoURL: https://github.com/org/k8s-platform
    path: clusters/production
    targetRevision: main
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true

---
# clusters/production/payments-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: payments-service
spec:
  source:
    repoURL: https://github.com/org/k8s-config-payments
    path: apps/payments-service/overlays/production
    targetRevision: main
  # ...`}
    </Code>

    {/* ── Section 5 ── */}
    <H2 num="05">The Incident Problem — Break-Glass Without Breaking the Model</H2>

    <P>
      The most common objection to GitOps is the incident scenario. A production service is down. The fix is a
      one-line environment variable change. Opening a PR, waiting for CI, getting a review, and waiting for the
      sync interval feels unconscionable when customers cannot check out.
    </P>

    <P>
      This is a solved problem — but the solution requires intentional design before the incident, not improvisation
      during it.
    </P>

    <H3>The wrong answer: disable selfHeal during incidents</H3>

    <P>
      Some teams respond to incident pressure by pausing ArgoCD sync or temporarily disabling self-healing. This
      works once. The second time, the pause is forgotten. Manual changes accumulate. Two weeks later, the
      Git repo no longer reflects production. You are back to the pre-GitOps world, with extra tooling.
    </P>

    <H3>The right answer: make Git changes fast, not bypassed</H3>

    <Code label="GitHub Actions — auto-approve and merge GitOps PRs tagged as emergency hotfixes">
{`# .github/workflows/gitops-hotfix.yaml
name: GitOps Emergency Merge

on:
  pull_request:
    types: [labeled]

jobs:
  auto-merge:
    if: contains(github.event.label.name, 'gitops-hotfix')
    runs-on: ubuntu-latest
    steps:
      - name: Approve PR
        uses: hmarr/auto-approve-action@v3
        with:
          github-token: ${"$"}{{ secrets.BOT_TOKEN }}

      - name: Enable auto-merge
        run: gh pr merge ${"$"}{{ github.event.pull_request.number }} --squash --auto
        env:
          GITHUB_TOKEN: ${"$"}{{ secrets.BOT_TOKEN }}`}
    </Code>

    <P>
      With an auto-merge workflow on a <code className="text-primary text-xs">gitops-hotfix</code> label, an
      engineer can open a PR, apply the label, and have the change merged and synced to the cluster in under 90
      seconds — without bypassing Git, without manual cluster access, and with a full audit trail.
    </P>

    <Callout type="info">
      The goal is not to make Git changes slow — it is to make all cluster changes go through Git. Invest in
      tooling that makes the GitOps path fast enough that bypassing it is never tempting.
    </Callout>

    {/* ── Section 6 ── */}
    <H2 num="06">Drift Detection — Knowing Before It Matters</H2>

    <P>
      Even with self-healing enabled, drift can accumulate in resources that ArgoCD does not manage, in annotation
      mutations by admission webhooks, or in resources excluded from sync. Proactive drift detection surfaces these
      discrepancies before they cause an incident.
    </P>

    <Code label="ArgoCD CLI — check for out-of-sync applications across all clusters">
{`# List all applications that are out of sync
argocd app list --output wide | grep -v Synced

# Get detailed diff for a specific application
argocd app diff payments-service --local

# Example output showing a replicas drift:
# ===== apps/Deployment payments-service/payments ======
# 6c6
# <   replicas: 3      # what Git says
# ---
# >   replicas: 5      # what is actually running (manual scale)

# Trigger immediate sync with pruning
argocd app sync payments-service --prune --force`}
    </Code>

    <P>
      Automated drift detection should be part of your monitoring stack. Expose ArgoCD's sync status as a metric,
      alert when any application has been out of sync for more than N minutes, and route that alert to the
      owning team — not just the platform team.
    </P>

    {/* ── Section 7 ── */}
    <H2 num="07">The Culture Shift — What Actually Changes</H2>

    <P>
      Tooling adoption is the easy part. The hard part is changing the habits and reflexes that engineers built
      over years of direct cluster access.
    </P>

    <H3>The cluster is read-only to humans</H3>
    <P>
      In a mature GitOps organisation, engineers do not have write access to production cluster resources —
      or if they do, the expectation is that they never use it except in a declared break-glass scenario that gets
      reviewed in the post-mortem. The cluster is infrastructure run by a computer, not a terminal environment
      managed by humans.
    </P>

    <H3>kubectl apply is not a deployment strategy</H3>
    <P>
      Production deployments happen via pull requests. Full stop. Not via <code className="text-primary text-xs">helm upgrade</code>{' '}
      run locally. Not via a script that calls the Kubernetes API directly. If it is not in Git, it does not exist.
      This is the discipline that makes rollback instantaneous — revert the commit, the cluster follows.
    </P>

    <H3>The Git history is your deployment log</H3>
    <P>
      When GitOps is working correctly, the answer to "what changed in production at 14:32 on Tuesday?" is a
      <code className="text-primary text-xs"> git log</code> command with a timestamp filter. No deployment tool
      dashboards to cross-reference. No Slack search. The commit history is the authoritative deployment record,
      and it is immutable.
    </P>

    <Callout type="warn">
      The teams that fail at GitOps do not fail because of the tooling. They fail because they implement the
      tool but keep the old habits — direct cluster access for "just this once", Helm releases triggered from
      engineer laptops, config changes made via the Kubernetes dashboard. Every exception to the model is a
      crack in the foundation.
    </Callout>

    {/* ── Conclusion ── */}
    <H2 num="08">Conclusion</H2>

    <P>
      ArgoCD and Flux are excellent tools. They make the GitOps operating model practical and observable. But
      installing them is not the finish line — it is the starting line. The finish line is the moment an engineer's
      first instinct during an incident is to open a PR, not to open a terminal.
    </P>

    <P>
      That instinct takes time to build. It takes tooling investments to make Git changes fast enough that
      bypassing the model is never the path of least resistance. It takes leadership that holds the line on
      break-glass discipline even when the post-mortem conversation is uncomfortable. And it takes a shared
      understanding that the constraints of GitOps are not bureaucratic obstacles — they are what make the
      system auditable, reversible, and trustworthy.
    </P>

    <Callout type="info">
      GitOps is not a deployment tool. It is a promise your team makes to itself: that the system's state is
      always knowable, always in Git, and always recoverable from it. The tool just enforces the promise.
    </Callout>
  </ArticleLayout>
);

export default GitOpsCultureShift;
