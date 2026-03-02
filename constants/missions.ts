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
    date: '2024.Q3 — 2025.Q1',
    title: 'Operation: Prague.Wedding',
    role: 'Software Engineer, Front-End',
    scanId: 'PW-OPS-24',
    objective:
      'Design and deliver a professional marketing and booking website for a Prague-based wedding coordinator — enabling couples across four language markets to discover service packages, explore a gallery, and submit inquiries. Built as a zero-backend React SPA with version-controlled multilingual content, serverless form handling, and a full international SEO layer including hreflang routing and geolocation metadata.',
    tactics: [
      'Built a React 19 + TypeScript SPA with React Router 7 and Vite 6 — delivering a rich single-page experience across home, blog listing, and dynamic blog post routes with a sticky collapsing header and mobile hamburger menu with body scroll lock.',
      'Implemented a four-language i18n system (Ukrainian, English, Czech, Russian) — all content version-controlled in a single translations.ts, language persisted via localStorage and URL query param, with dynamic SEO meta/OG/hreflang tag updates on every language switch.',
      'Crafted interactive service tier cards with tab-style navigation and scale/translate animations; built a multi-state contact form (idle → submitting → success/error with 5s auto-close) powered by Web3Forms API for serverless submission — zero backend or server infrastructure required.',
      'Delivered a comprehensive SEO layer: Open Graph, Twitter Card, geolocation tags with Prague coordinates, sitemap, and robots.txt — targeting international couples searching for Prague wedding services in four languages.',
      'Built a version-controlled blog system with multilingual post content and slug-based routing — no external CMS, no database, no API; bundled GDPR cookie consent modal and Privacy Policy overlay for EU compliance.',
    ],
    outcome: '4-LOCALE ZERO-BACKEND',
    status: 'ONGOING',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'left',
    imageUrl: 'images/pwc.jpg',
  },
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
    role: 'Software Engineer, Full-Stack',
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
    role: 'Software Engineer, Full-Stack',
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
    role: 'Software Engineer, Full-Stack',
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
    date: '2018.Q3 — 2019.Q2',
    title: 'Operation: M-Power',
    role: 'Software Engineer, Full-Stack',
    scanId: 'MP-OPS-18',
    objective:
      'Architect and deliver a competition lifecycle management platform for trade chambers — orchestrating browser-based game competitions across a four-tier organizational hierarchy, from chamber setup through live game session tracking to certificate generation. Bridge between hierarchical school and chamber management and an external game client, with cryptographically validated scoring to eliminate result tampering.',
    tactics: [
      'Designed a four-tier STI group hierarchy (Admin → Chamber → Institution → Cohort) using Rails Single Table Inheritance — with Pundit policies enforcing role-specific visibility and management rights at every organizational boundary.',
      'Built a game session API (POST /api/attempts to initialize, PUT /api/attempts/:token to submit) with MD5 checksum validation on every score submission, preventing client-side manipulation across all active contests.',
      'Implemented team token/password authentication for game client access; integrated Devise Invitable for teacher-to-student invitation flows and cohort self-enrollment via shared registration tokens.',
      'Delivered PDF certificate generation per team via Prawn and Excel statistics exports via RubyXL, covering leaderboards aggregated by chamber, institution, and level — with teacher test mode enabling out-of-competition trial runs even when a contest is inactive.',
      'Containerized with Docker + Docker Compose; deployed via Capistrano + Ansible; instrumented with Sentry and AppSignal for production error tracking and APM across the full competition lifecycle.',
    ],
    outcome: 'TAMPER-PROOF SCORING',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'left',
    imageUrl: 'images/mp.jpg',
  },
  {
    date: '2018.Q1 — 2018.Q4',
    title: 'Operation: MN-Desk',
    role: 'Software Engineer, Full-Stack',
    scanId: 'MND-OPS-18',
    objective:
      'Operate as a contributing engineer on a large-scale, multi-tenant SaaS news distribution platform — serving press offices, journalists, and organizations across 16 language markets and international subdomains. Navigate and extend a battle-hardened Rails monolith (167 models, 53 background workers, 71 service objects) with microservice extensions, high-throughput async pipelines, and integrations spanning social networks, CRMs, analytics platforms, and CDNs.',
    tactics: [
      'Delivered features across the publish, network, analyze, and report namespaces of the Rails 5.2 monolith — contributing to press release management, multi-tenant hosted newsrooms, and audience analytics surfaces used by media organizations globally.',
      'Built and maintained Grape REST API endpoints powering third-party newsroom integrations; extended multi-channel social distribution pipelines across Twitter, Facebook, LinkedIn, Instagram, and YouTube with consistent delivery guarantees.',
      'Worked within the Sidekiq Pro ecosystem (53 background job types, sidekiq-cron) to sustain async press release distribution, media monitoring ingestion from Twingly and GNIP, and SendGrid email delivery under high-volume publishing loads.',
      'Drove Elasticsearch 6.5 query improvements as part of the ongoing migration from deprecated Solr 4.10 — optimizing content search across multi-locale newsroom content at scale, with Redis and Memcache as layered caching layers.',
      'Shipped within a Buildkite CI/CD pipeline with Heroku review apps and an RSpec + VCR + Percy visual regression test suite; integrated across Stripe, Salesforce, HubSpot, Segment, S3, and Cloudinary.',
    ],
    outcome: '16 MARKETS SERVED',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'right',
    imageUrl: 'images/mnd.webp',
  },
  {
    date: '2019.Q1 — 2019.Q4',
    title: 'Operation: NJ-SIGN',
    role: 'Software Engineer, Full-Stack',
    scanId: 'NS-OPS-19',
    objective:
      'Extend and harden a Japanese-market digital signature and contract management platform — delivering secure multi-party document workflows from template creation through blockchain-anchored approval. Scope covers a full document lifecycle state machine, KMS-encrypted S3 storage, polymorphic digital signature placement, and multi-OAuth integrations with Google, Slack, and Auth0.',
    tactics: [
      'Engineered a document lifecycle state machine (init → draft → in_progress → approved/rejected → trashed) across multi-user team workspaces — with owner/signer role-based access, subscription plan gating (free/lite/pro) on max contracts and workflow features, and hierarchical folder structures per team.',
      'Implemented polymorphic digital signature placement on both DocumentItem and TemplateItem models; built guest signer access via time-limited tokens and per-document password protection for secure external signing flows.',
      'Built a multi-stage PDF processing pipeline — document generation via Prawn, merging via CombinePDF, Word-to-PDF conversion via LibreOffice — and executed live S3 migration from Google Drive with AWS KMS encryption for document-at-rest security.',
      'Wired Sidekiq + Redis background workers across document mailers (creation, approval, confirmation), blockchain hash recording for finalized contracts, Google Docs processing, and document sharing notifications — sustaining async reliability across all lifecycle events.',
      'Integrated multi-provider OAuth (Google Drive import/export + native Docs support, Slack channel document sharing, Auth0) via OmniAuth; instrumented the ShareLog audit trail for full document distribution history and Sentry APM for production monitoring.',
    ],
    outcome: 'BLOCKCHAIN-ANCHORED',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'left',
    imageUrl: 'images/njs.png',
  },
  {
    date: '2018.Q4 — 2019.Q2',
    title: 'Operation: Sophisticate',
    role: 'Software Engineer, Front-End',
    scanId: 'SOPH-OPS-19',
    objective:
      'Design and deliver a high-performance static marketing and portfolio site for a digital strategy consultancy — showcasing services, team, and client case studies. Built on Gatsby v2 with a file-based content model, animated transitions, and PWA offline support; containerized and deployed to Kubernetes via GitLab CI/CD with zero CMS or database dependency.',
    tactics: [
      'Built a Gatsby v2 static site with React 16 — GraphQL data layer querying Markdown/YAML frontmatter for all content, gatsby-image + Sharp for responsive optimized image delivery, and Reactstrap/Bootstrap 4 for UI scaffolding.',
      'Implemented animated page transitions with direction tracking and keyboard navigation between project pages (← / → arrow keys) — enabling fluid, app-like case study browsing on a static site.',
      'Authored custom Markdown components (<reco>, <left>/<right>, <process>) allowing editors to compose rich testimonial, two-column, and step-list layouts within flat Markdown files — eliminating any CMS or database dependency.',
      'Delivered a project theming system with radial gradient color palettes (rot, orange, grün, türkis, markenblau) applied dynamically to case study cards; wired PWA offline caching for instant repeat visits.',
      'Containerized via multi-stage Docker build (Node 10 build → Nginx Alpine) and deployed to staging and production Kubernetes environments via Helm through GitLab CI/CD.',
    ],
    outcome: 'ZERO-CMS DELIVERED',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'right',
    imageUrl: 'images/sfts.jpg',
  },
  {
    date: '2019.Q3 — 2020.Q2',
    title: 'Operation: Volt',
    role: 'Software Engineer, Full-Stack',
    scanId: 'VLT-OPS-19',
    objective:
      'Deliver features and integrations across a multi-application fintech monorepo — spanning a Rails JSON API backend, Ember.js borrower portal, and React admin dashboard — serving student loan borrowers, employer partners, and platform administrators. Navigate complex financial domain models: loan lifecycle state machines, SOAP payroll integrations, double-entry accounting via a general ledger, and enterprise SAML SSO for institutional partners.',
    tactics: [
      'Extended the sl-pay Rails 5.2 backend across dual versioned APIs (/api/v1, /api/v2) — implementing Devise + JWT auth, SAML SSO for enterprise partners (Citizens, John Hancock, Prudential), and AASM state machines for loan and payment lifecycle with Paper Trail audit logging.',
      'Built SOAP-based payroll system connectors (JH/EPS/iPay) and Finicity financial data aggregation pipelines — bridging employer payroll data into disbursement workflows alongside NSLDS student loan data synchronization.',
      'Contributed to the Ember.js 3.8 customer portal — implementing loan dashboard features, income-driven repayment flows, PSLF eligibility tools, and document e-signing with partner-specific multi-tenant theming per institutional brand.',
      'Extended the React 16 + Redux/Redux-Saga admin dashboard — delivering employer/employee management surfaces, invoice generation, and bulk operation interfaces built on Material-UI and DevExtreme data grids.',
      'Maintained Sidekiq background job pipelines for email, reports, and batch processing; instrumented Sentry and LogRocket across all three applications; shipped via CircleCI with Docker and S3 + CloudFront deployments.',
    ],
    outcome: '3-APP FINTECH STACK',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'left',
    imageUrl: 'images/vlt.jpg',
  },
  {
    date: '2019.Q4 — 2020.Q3',
    title: 'Operation: SecureAuth',
    role: 'Team Lead | Software Engineer, Full-Stack',
    scanId: 'SAI-OPS-19',
    objective:
      'Operate across a 9-component enterprise Identity and Access Management (IAM) platform — spanning Ruby authentication APIs, React admin portals, Node.js middleware, and a C# .NET Identity Provider core. Deliver features and hardening across authentication, authorization, and federation services with zero tolerance for security regression: adaptive risk policies, multi-factor authentication across seven methods, and federated SSO over SAML, OAuth 2.0, OpenID Connect, CAS, and Kerberos.',
    tactics: [
      'Extended the Ruby/Sinatra+Grape authentication service (rupert) and Admin REST API (twilight) — implementing MFA policy endpoints, HMAC-SHA256 request signing with replay-attack prevention via timestamp validation and memory cache, and Argon2 password hashing.',
      'Maintained adaptive risk-based authentication logic — BehavioSec behavioral biometrics, device fingerprinting, geographic/IP policy enforcement, and threat detection integrations with Exabeam and Cisco pxGrid for configurable conditional auth policies.',
      'Contributed to three React admin portals (spike, coruscant, dagobah) and Node.js middleware (bespin) — delivering realm, application, and data store management surfaces for enterprise administrators with full RBAC and audit logging.',
      'Maintained federated SSO flows across SAML 1.1/2.0, OAuth 2.0, OpenID Connect, CAS, and Kerberos/SPNEGO; secured credentials at rest via CyberArk Vault integration, encrypted fields, and RS256/HS256-signed JWTs with rate limiting and account lockout enforced at the request layer.',
      'Authored Swagger/OpenAPI 3.0 and Protobuf messaging contracts across all nine services; maintained multi-stack CI/CD via Jenkins + Artifactory with Jest/Enzyme, RSpec + Rubocop, and NUnit test coverage across Ruby, React, and C# components.',
    ],
    outcome: 'ZERO-TRUST AUTH DELIVERED',
    status: 'COMPLETED',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'right',
    imageUrl: 'images/sat.jpg',
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
