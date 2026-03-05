export interface TechItemData {
  name: string;
  version: string;
  status: string;
  isCritical?: boolean;
  isMaster?: boolean;
}

export interface StackColumnData {
  type: string;
  title: string;
  id: string;
  desc: string;
  items: TechItemData[];
}

export interface SpecCardData {
  title: string;
  subtitle: string;
  img: string;
}

export const filterLabels: string[] = [
  'ALL_ASSETS',
  'LANGUAGES_SRC',
  'INFRA_ORCHESTRATION',
  'BACKGROUND_OPS',
  'UI_RECON',
  'DB_CLUSTERS',
  'SEC_PROTOCOLS',
  'AI_TOOLS',
  'TEST_OPS',
  'UI_FRAMEWORKS',
  'BACKEND_FRAMEWORKS',
  'DOCUMENTATION',
  'AUTH_PROTOCOLS',
  'PAYMENTS_STACK',
  'OBSERVABILITY',
];

export const stackColumns: StackColumnData[] = [
  {
    type: '01_CORE',
    title: 'Languages_Src',
    id: 'LANG-99',
    desc: 'High-performance low-level system integration focus.',
    items: [
      { name: 'Ruby', version: 'v4.0.1.', status: 'DEPLOY_READY', isCritical: true },
      { name: 'JavaScript', version: 'ES2026', status: 'CONCURRENCY_OP' },
      { name: 'TypeScript', version: 'v5.4', status: 'TYPED_INTERFACE' },
    ],
  },
  {
    type: '02_ORCH',
    title: 'Infra_Systems',
    id: 'CLOUD-88',
    desc: 'Orchestrating large-scale autonomous deployments.',
    items: [
      { name: 'Docker', version: 'v27.0', status: 'CONTAINER_OPS', isMaster: true },
      { name: 'AWS_Solutions', version: 'GLOBAL_EXP', status: 'PROD_SCALE' },
      { name: 'GitHub_Actions', version: 'v3.x', status: 'CI_CD_PIPELINE' },
    ],
  },
  {
    type: '03_SERV',
    title: 'Backend_Forge',
    id: 'SERV-77',
    desc: 'Distributed microservice architecture specialists.',
    items: [
      { name: 'MySQL', version: 'v8.4.8', status: 'PERSISTENCE_LAYER' },
      { name: 'PostgreSQL', version: 'v16.2', status: 'PERSISTENCE_LAYER' },
      { name: 'MongoDB', version: 'v8.0', status: 'PERSISTENCE_LAYER' },
      { name: 'Redis_Cache', version: 'v7.0', status: 'MEMORY_BUFFER' },
    ],
  },
  {
    type: '04_BACKGROUND',
    title: 'BACKGROUND_OPS',
    id: 'SERV-77',
    desc: 'Async job execution and queue management for workloads.',
    items: [
      { name: 'Sidekiq', version: 'v7.0', status: 'JOB_PROCESSOR' },
      { name: 'Resque', version: 'v3.0.0', status: 'JOB_PROCESSOR' },
      { name: 'BullMQ', version: 'v5.70.1', status: 'JOB_PROCESSOR' },
    ],
  },
  {
    type: '04_AI',
    title: 'AI_Tools',
    id: 'AI-66',
    desc: 'Autonomous intelligence augmentation and LLM integration.',
    items: [
      { name: 'Claude', version: 'claude-sonnet-4-6', status: 'PRIME_DIRECTIVE', isCritical: true },
      { name: 'Codex', version: 'GPT-4o', status: 'NEURAL_INTERFACE' },
      { name: 'Cursor', version: 'v0.45', status: 'CODE_AUGMENT' },
    ],
  },
  {
    type: '07_BKN',
    title: 'Backend_Frameworks',
    id: 'BKN-33',
    desc: 'Server-side command structures powering high-throughput operations.',
    items: [
      { name: 'Ruby_on_Rails', version: 'v8.0', status: 'CORE_COMMAND', isCritical: true },
      { name: 'NestJS', version: 'v10.0', status: 'API_FORTRESS' },
      { name: 'Grape', version: 'v3.1.0', status: 'API_FORTRESS' },
      { name: 'Sinatra', version: 'v4.2.1', status: 'LIGHTWEIGHT' },
    ],
  },
  {
    type: '06_UI',
    title: 'UI_Frameworks',
    id: 'UI-44',
    desc: 'Reactive interface construction and design system command.',
    items: [
      { name: 'React', version: 'v19.0', status: 'RENDER_PRIME', isCritical: true },
      { name: 'Tailwind_CSS', version: 'v4.0', status: 'STYLE_ENGINE' },
      { name: 'shadcn/ui', version: 'v2.0', status: 'COMPONENT_GRID' },
    ],
  },
  {
    type: '05_TEST',
    title: 'Test_Ops',
    id: 'TEST-55',
    desc: 'Precision strike validation across unit, integration, and E2E layers.',
    items: [
      { name: 'RSpec', version: 'v3.13', status: 'UNIT_STRIKE', isCritical: true },
      { name: 'Playwright', version: 'v1.48', status: 'E2E_SWEEP' },
      { name: 'Vitest', version: 'v2.0', status: 'COMPONENT_SCAN' },
    ],
  },
  {
    type: '08_DOCS',
    title: 'Documentation',
    id: 'DOCS-22',
    desc: 'Structured knowledge systems for team alignment and API clarity.',
    items: [
      { name: 'Swagger / OpenAPI', version: 'v3.1', status: 'API_MANIFEST', isCritical: true },
      { name: 'Storybook', version: 'v8.0', status: 'COMPONENT_LOG' },
      { name: 'Sentry', version: 'v24.x', status: 'ERROR_TRACKING' },
    ],
  },
  {
    type: '09_AUTH',
    title: 'Auth_Protocols',
    id: 'AUTH-11',
    desc: 'Identity verification and access control across every surface.',
    items: [
      { name: 'Devise', version: 'v4.9', status: 'IDENTITY_CORE', isCritical: true },
      { name: 'JWT', version: 'RFC_7519', status: 'TOKEN_FORGE' },
      { name: 'OAuth_2.0', version: 'RFC_6749', status: 'DELEGATED_ACCESS' },
      { name: 'Pundit', version: 'v2.3', status: 'POLICY_GATE' },
    ],
  },
  {
    type: '10_PAY',
    title: 'Payments_Stack',
    id: 'PAY-00',
    desc: 'Multi-gateway transaction infrastructure with global payment reach.',
    items: [
      { name: 'Stripe', version: 'v13.x', status: 'PRIME_GATEWAY', isCritical: true },
      { name: 'Braintree', version: 'v6.x', status: 'VAULT_LAYER' },
      { name: 'PayPal', version: 'REST_v2', status: 'GLOBAL_REACH' },
    ],
  },
  {
    type: '11_OBS',
    title: 'Observability',
    id: 'OBS-10',
    desc: 'Full-stack telemetry — traces, metrics, and error intelligence at scale.',
    items: [
      { name: 'Datadog', version: 'APM_v2', status: 'TELEMETRY_HUB', isMaster: true },
      { name: 'New_Relic', version: 'v10.x', status: 'PERF_SENTINEL' },
      { name: 'OpenTelemetry', version: 'v1.x', status: 'TRACE_PROTOCOL' },
    ],
  },
];

export const specCards: SpecCardData[] = [
  {
    title: 'DISTRIBUTED_NODES',
    subtitle: 'HIGH_AVAILABILITY_PROTOCOLS',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADWsrwF3hQSZhLi7wNLzFnpifp3LTJKXIrQapqu-2aWRwFuC6RY4WVbAjaml_3puTMZaO2rSoI5cA8pSZw4X8aQxB5HHduXPL0OP50GBIyLbYHEoe2yvTMJ8r8BhwcFM15pznCAF_Vy663jfkf3FcYFxAj3Ya2ymXd6-2i_7yzqIJSXnF6RaIhaALuWDV4LwGqSSApcZISY-J1ddX44kX57uQ-FDfG8V6F3HI3zZFPJibyPCed23KGPMZ9P82ldYPV_oyU83DgPpWq',
  },
  {
    title: 'CLOUD_NATIVE',
    subtitle: 'K8S_SERVERLESS_INFRA',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcu6sG4lqDoN5K-XB_f4gepep4NKPA8CibC4qdyJYuSRm29fBuuv7Mkbvr71SjGy5peaFvpBKRVE89E7gubxlcV2ioLzz8Z9xsqqWLptawt6MpIBrwrwzX533d2EIXN3f65XGtwe6RZSHtH71J2T0J0p-HGZe9vtSz8MNWYTqKH2GEmr8oFdlHr2fUEBOeUUu5gG7XClZ18LOE9H6rwv7qsaw54mD6EgZKQmqQqcvO5qhkRqBr5O4BY-BoupwYx7-DPFzbLBizUP1p',
  },
  {
    title: 'DATA_FORGE',
    subtitle: 'ETL_REALTIME_STREAMING',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5nKuDAa92MBL8Y5QfmwF3C6IaFY4EvV4GbxmnrEJpPOczD_RtMZyfd77PRdnNy8vDm8O4h6BhEPUSeEyGfeWzcWC1w4PErsrkMlJwx8zD2Meacaj3_sbpjE3xdp-sK8w5Mqpq3nTXG67iPkK5eDe-uKGSWOrN6mg27CbMo80ICnn9jdMBO_39-suuiJ-NzyMy2Dud8OTnibeVtFljegTr2P5jOSl851xWECdtQSe7qstBMn4FxqPo0UZHwMLDjt9Dmy_rlMUAQXXi',
  },
  {
    title: 'TACTICAL_UI',
    subtitle: 'DESIGN_SYSTEMS_VX',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfoajEXS99U8OHQb8MvVT6vkyaAoe53Fk8dpsgARIpYc2RnXukmMtMTPJCmmb4ZZC3WhtUVbmSJvwv7FcYEkqVoR6idQFn-S26_-tqBytFVZoH5rJLsWrUwu8UEpJ6eAcPLCmDonkwXKJXLFxeuu-Zi9-xcnUYxx7vKl9T607bz9p8LqjI8m5QEDtlcKO67_DaYcH0MAKn7rS_wT3niuXp3OhNXjacr8oUy5WcDZz5mcmRf1sQhYvnz_oDO2PqHYnC2WwcRjfzyrDC',
  },
];
