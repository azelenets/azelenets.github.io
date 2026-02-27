export interface MissionData {
  date: string;
  title: string;
  role: string;
  scanId: string;
  objective: string;
  tactics: string[];
  outcome: string;
  status: string;
  statusColor: string;
  align: 'left' | 'right';
  isShield?: boolean;
  isGhost?: boolean;
  imageUrl?: string;
}

export const missions: MissionData[] = [
  {
    date: '2024.Q1 — 2026.Q1',
    title: 'Operation: TW-BSCI',
    role: 'Senior Full-Stack Engineer',
    scanId: 'TW-BSCI-01',
    objective:
      'Operate mission-critical 24/7 systems powering a proprietary DNA ordering platform for life science researchers across medicine, drug discovery, genetic engineering, and ultra long-term data storage. Every order is unique — the platform must handle one-of-a-kind production configurations at precision and scale otherwise unavailable in the industry.',
    tactics: [
      'Delivered full-stack features on a React/Redux SPA (S3 + CloudFront), extending order configurators for custom genes, oligo pools, and NGS enrichment panels.',
      'Architected Ruby on Rails API extensions and public endpoints to power a highly customized, per-order production pipeline across 24x7 operations.',
      'Optimized MongoDB query layers and Sidekiq job orchestration to sustain throughput under variable, high-complexity order loads.',
      'Partnered with DevOps on K8s deployment hardening and CI/CD pipeline improvements, reducing incident surface and release friction.',
    ],
    outcome: '50M+ OPS REACHED',
    status: 'ARCHIVED',
    statusColor: 'text-white/40 bg-white/5',
    align: 'right',
    imageUrl: 'images/tw-bsci-01.webp',
  },
  {
    date: '2022.Q1 — 2024.Q1',
    title: 'Operation: Seeking Alpha',
    role: 'Software Engineer, Back-End',
    scanId: 'SA-OPS-22',
    objective:
      'Engineer and optimize server-side systems for a market-leading financial media platform serving millions of active investors. Primary directive: deliver seamless, high-performance access to exclusive research, real-time market data, and advanced analytical tools for a growing paid subscriber base — with zero tolerance for downtime or latency.',
    tactics: [
      'Built RESTful Ruby on Rails API for a cross-platform SPA, implementing OAuth authentication and granular role-based access control for tiered subscriber plans.',
      'Optimized MySQL and ElasticSearch query strategies to achieve low-latency delivery of financial data and editorial content at peak traffic loads.',
      'Integrated Redis caching layers across hot content endpoints, significantly reducing database pressure under concurrent subscriber sessions.',
      'Hardened server-side architecture on AWS — applying horizontal scaling patterns and HTTP-level optimizations to sustain reliability at scale.',
    ],
    outcome: 'MILLIONS SERVED',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'left',
    // isShield: true,
    imageUrl: 'images/seeking-alpha.jpg',
  },
  {
    date: '2020.Q2 — 2022.Q4',
    title: 'Operation: Data Citadel',
    role: 'Full-Stack Engineer',
    scanId: 'DC-OPS-88',
    objective:
      'Reconstruct fragmented analytics infrastructure for a high-volume SaaS platform. Analysts across product, sales, and operations lacked reliable data pipelines to drive business decisions. Mandate: design a unified, distributed intelligence layer and expose it through clean, cross-team APIs — without disrupting live production.',
    tactics: [
      'Designed distributed event-driven pipelines feeding real-time cross-departmental dashboards, eliminating manual reporting.',
      'Delivered React-based internal tooling surfaces for order metrics, churn signals, and usage intelligence across four business units.',
      'Authored RESTful and GraphQL API contracts with clean, versioned schemas — adopted as the standard integration layer company-wide.',
    ],
    outcome: '4 UNITS UNIFIED',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'left',
    isShield: true,
  },
  {
    date: '2017.Q1 — 2020.Q1',
    title: 'Operation: Foundation Layer',
    role: 'Software Engineer, Full Stack',
    scanId: 'FL-CORE-33',
    objective:
      'Rebuild frontend architecture for a growth-stage B2B platform whose jQuery monolith had become a hard blocker on feature velocity. Objective: migrate to a scalable, OOP-aligned component system with maintainable state management — while preserving shipping cadence.',
    tactics: [
      'Executed full migration from jQuery monolith to React, introducing Redux state management and a reusable component library.',
      'Implemented a CSS-in-JS (Emotion) design system, eliminating cross-squad style conflicts and accelerating UI delivery.',
      'Collaborated with the Rails backend team on shared API schema design, SQL/NoSQL query optimization, and integration test coverage.',
    ],
    outcome: '-70% TECH DEBT',
    status: 'ARCHIVED',
    statusColor: 'text-white/40 bg-white/5',
    align: 'right',
    isGhost: true,
  },
];
