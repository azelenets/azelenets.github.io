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
    date: '2022.Q2 — 2026.Q1',
    title: 'Operation: TW-BSCI',
    role: 'Software Engineer, Full-Stack',
    scanId: 'TW-BSCI-24',
    objective:
      'Operate mission-critical 24/7 systems powering a proprietary DNA ordering platform for life science researchers across medicine, drug discovery, genetic engineering, and ultra long-term data storage. Every order is unique — the platform must handle one-of-a-kind production configurations at precision and scale otherwise unavailable in the industry.',
    tactics: [
      'Delivered full-stack features on a React/Redux SPA (S3 + CloudFront), extending order configurators for custom genes, oligo pools, and NGS enrichment panels.',
      'Architected Ruby on Rails API extensions and public endpoints to power a highly customized, per-order production pipeline across 24x7 operations.',
      'Optimized MongoDB query layers and Sidekiq job orchestration to sustain throughput under variable, high-complexity order loads.',
      'Partnered with DevOps on K8s deployment hardening and CI/CD pipeline improvements, reducing incident surface and release friction.',
    ],
    outcome: '-50% TECH DEBT',
    status: 'COMPLETED',
    statusColor: 'text-white/40 bg-white/5',
    align: 'right',
    imageUrl: 'images/tw-bsci-01.webp',
  },
  {
    date: '2021.Q3 — 2025.Q1',
    title: 'Operation: Seeking Alpha',
    role: 'Sr. Software Engineer, Back-End',
    scanId: 'SA-OPS-22',
    objective:
      'Engineer and optimize server-side systems for a market-leading financial media platform serving millions of active investors. Primary directive: deliver seamless, high-performance access to exclusive research, real-time market data, and advanced analytical tools for a growing paid subscriber base — with zero tolerance for downtime or latency.',
    tactics: [
      'Built RESTful Ruby on Rails API for a cross-platform SPA, implementing OAuth authentication and granular role-based access control for tiered subscriber plans.',
      'Optimized MySQL and ElasticSearch query strategies to achieve low-latency delivery of financial data and editorial content at peak traffic loads.',
      'Integrated Redis caching layers across hot content endpoints, significantly reducing database pressure under concurrent subscriber sessions.',
      'Hardened server-side architecture on AWS — applying horizontal scaling patterns and HTTP-level optimizations to sustain reliability at scale.',
    ],
    outcome: 'MILLIONS UNITS SERVED',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'left',
    // isShield: true,
    imageUrl: 'images/seeking-alpha.jpg',
  },
  {
    date: '2021.Q1 — 2022.Q3',
    title: 'Operation: Payment Modals',
    role: 'Founding Partner, Full-Stack Engineer',
    scanId: 'PM-OPS-20',
    objective:
      'Co-found and architect a self-serve SaaS platform enabling businesses to design fully branded Stripe payment modals and embed them on any website via a single script tag — no backend, no friction. Sole technical architect and engineer, responsible for end-to-end delivery of the product, admin infrastructure, and marketing surface. Go-live target: five minutes from signup to first payment collected.',
    tactics: [
      'Engineered an interactive modal designer with live preview — allowing non-technical users to configure branding, copy, colors, and imagery without writing a single line of code.',
      'Built a visual Stripe checkout form builder with full support for custom images, bespoke copy, and both recurring and one-time payment modes.',
      'Delivered a zero-friction embed model: businesses inject a single generated script tag to activate a fully hosted, production-ready payment modal on any website in under five minutes.',
      'Implemented end-to-end encryption of sensitive Stripe credentials and configuration data to meet security compliance requirements across all tenants.',
      'Architected and shipped the complete product surface — marketing site, admin panel, and REST API — from concept to live product as founding technical partner.',
      'Integrated GPay, ApplePay and PayPal payment methods — enabling businesses to accept payments through these popular payment methods without requiring additional technical expertise.',
    ],
    outcome: '5 MIN TO REVENUE',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'right',
    imageUrl: 'images/pm1.jpg',
  },
  {
    date: '2019.Q1 — 2022.Q1',
    title: 'Operation: The Skills',
    role: 'Lead Solution Engineer',
    scanId: 'SK-OPS-19',
    objective:
      'Architect and ship a video-based sports education platform from the ground up — enabling world-class athletes (Phelps, Rapinoe, Sharapova, White and more) to deliver elite coaching at scale to youth and amateur athletes globally. Operating as lead engineer in a fully remote team of four, with end-to-end ownership across API, admin panel, customer SPA, marketing site, and mobile payment flows.',
    tactics: [
      'Designed modular system architecture (Rails REST API, ActiveAdmin panel, NextJS marketing site, React customer app) — cutting maintenance time and cost by 27%.',
      'Built JWT-based auth with OAuth integrations for Google, Facebook, and Apple across web and mobile; integrated Brightcove for scalable video content delivery.',
      'Integrated Stripe, PayPal, and native Apple/Android In-App purchase pipelines — increasing paid conversion funnel by 7%.',
      'Delivered Postgres + Redis data storage architecture; achieved 83% test coverage and 100% Swagger API documentation across all endpoints.',
    ],
    outcome: '+7% FUNNEL GAIN',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'left',
    imageUrl: 'images/theskills.webp',
  },
  {
    date: '2019.Q3 — 2020.Q2',
    title: 'Operation: 123',
    role: 'Full-Stack Engineer',
    scanId: 'VC-OPS-19',
    objective:
      'Engineer a subscription-driven vanity URL management platform for the Swiss market — enabling businesses and individuals to register memorable keywords that redirect to destination URLs. Own end-to-end technical delivery: keyword lifecycle engine, payment pipeline, Angular SPA, and production infrastructure — with zero tolerance for redirect downtime or stale state.',
    tactics: [
      'Architected a hybrid Rails JSON API + Angular 5 SPA — Rails serves the application shell and exposes typed endpoints; Angular handles all modal-driven user flows with real-time keyword availability checking, including pending-payment collision detection.',
      'Built a full keyword lifecycle engine (inactive → pending → active → expired) across eight subscription tiers from 1-day to 10-year — with Delayed Job handling async expiration and auto-cleanup of stale pending records within 2-minute SLA windows.',
      'Integrated ThriveCart webhook pipeline to drive atomic payment state transitions — covering approval, refund, cancellation, and renewal events — with a dedicated PaymentProcessor/ThriveProcessor service layer abstracting all gateway logic.',
      'Implemented Devise + Petergate RBAC for tiered user/admin access; wired Mandrill transactional email across the full subscription lifecycle; instrumented per-keyword click analytics with bot filtering.',
      'Deployed via Capistrano + Docker to an Apache/Puma stack with SSL termination, Zurich-timezone business logic, and environment-scoped secrets for Mandrill, ThriveCart, and MySQL credentials.',
    ],
    outcome: '8 TIERS LIVE',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'right',
    imageUrl: 'images/123.jpg',
  },
  {
    date: '2020.Q1 — 2020.Q3',
    title: 'Operation: BVP',
    role: 'Full-Stack Engineer',
    scanId: 'BAV-OPS-19',
    objective:
      'Architect and deliver a compliant, multi-portal corporate pension management system connecting three distinct user groups — DUK employees, AUPU employees, and HR managers — each operating on isolated subdomains with purpose-built access patterns. Primary directives: eliminate credential storage through passwordless auth, enforce postal identity verification, and synchronize bulk insurance records from an external Prequity system without disrupting live operations.',
    tactics: [
      'Architected a domain-constrained multi-portal Rails 5.2 application — three independent SPA surfaces (DUK employee, AUPU employee, Employer) routed via subdomain constraints at the routing layer, each with fully isolated auth flows and access controls.',
      'Implemented passwordless employee authentication via email sign-in tokens backed by a three-stage registration state machine (STARTED → EMAIL_CONFIRMED → COMPLETED) — eliminating credential storage entirely across the employee-facing portals.',
      'Built a postal identity verification pipeline — activation codes generated as print-ready PDF letters via Prawn and physically mailed to employees, required before account activation can complete.',
      'Engineered Prequity bulk synchronization: ~2,000-record CSV batches of insurance holders, contracts, and documents imported via SmartCSV + ActiveRecord::Import with batch-safe upsert logic and staging email interception to prevent environment bleed.',
      'Delivered React 16 + Apollo GraphQL registration flows with Formik validation — contract numbers, email, and DOB validated via GraphQL before submission; PostgreSQL full-text search (PgSearch) powering HR manager employee lookup with Pagy pagination.',
    ],
    outcome: '3 PORTALS DEPLOYED',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'left',
    imageUrl: 'images/bv.jpeg',
  },
  {
    date: '2020.Q3 — 2021.Q2',
    title: 'Operation: KEFIR',
    role: 'Full-Stack Engineer',
    scanId: 'KP-OPS-20',
    objective:
      'Design and deliver a field operations management system for — a major construction and insulation contractor — bridging internal staff and Gunvor subcontractors through structured order tracking, measurement recording, and financial reporting. Mandate: replace manual billing workflows with a role-enforced digital pipeline capable of generating audit-grade SAR and GAR financial reports on demand.',
    tactics: [
      'Architected a Rails 5.2 + React 16/Stimulus hybrid — Turbolinks-backed server rendering for core navigation with React components handling flexible measurement forms and part lists backed by PostgreSQL hstore and JSONB for schema-free field data.',
      'Built a real-time budget utilization engine — orders tracked against defined spend thresholds with 80% warning and 90% critical indicators, giving project managers continuous visibility over active construction budgets.',
      'Implemented Pundit role-based authorization across four access tiers (admin, staff, gunvor, sophisticates_admin) — enforcing granular resource policies on all order, measurement, collection, and reporting actions.',
      'Delivered a dual-format export pipeline: SAR and GAR financial reports generated as print-ready PDFs via Prawn/Prawn-Table; Excel exports via rubyXL — covering the full invoicing and audit trail for construction billing cycles.',
      'Integrated iScala ERP product catalog with JSONB-tracked historical article pricing and measurement-level surcharge calculations; deployed via GitLab CI/CD with parallel RSpec + Capybara test stages and auto-deploy to Kubernetes review environments on feature branches.',
    ],
    outcome: 'SAR + GAR AUTOMATED',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'right',
    imageUrl: 'images/kfr.jpg',
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
    align: 'right',
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
