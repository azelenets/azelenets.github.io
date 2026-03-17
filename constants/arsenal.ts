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
  link?: string;
}

export const stackColumns: StackColumnData[] = [
  {
    type: '01_LANG',
    title: 'Languages_Src',
    id: 'LANG-99',
    desc: 'Core languages powering system integration.',
    items: [
      { name: 'Ruby', version: 'v4.0.1.', status: 'DEPLOY_READY', isCritical: true },
      { name: 'JavaScript', version: 'ES2026', status: 'CONCURRENCY_OP' },
      { name: 'TypeScript', version: 'v5.4', status: 'TYPED_INTERFACE' },
      { name: 'Bash', version: 'v5.2', status: 'SHELL_OPS' },
    ],
  },
  {
    type: '02_BKN',
    title: 'Backend_Frameworks',
    id: 'BKN-33',
    desc: 'Server-side frameworks for high-throughput APIs.',
    items: [
      { name: 'Ruby_on_Rails', version: 'v8.0', status: 'CORE_COMMAND', isCritical: true },
      { name: 'NestJS', version: 'v10.0', status: 'API_FORTRESS' },
      { name: 'Grape', version: 'v3.1.0', status: 'API_FORTRESS' },
      { name: 'Sinatra', version: 'v4.2.1', status: 'LIGHTWEIGHT' },
      { name: 'ExpressJS', version: 'v5.x', status: 'LIGHTWEIGHT' },
      { name: 'NextJS', version: 'v15.x', status: 'FULLSTACK_PRIME' },
      { name: 'GraphQL / Apollo', version: 'v4.x', status: 'QUERY_LAYER' },
    ],
  },
  {
    type: '03_UI',
    title: 'Frontend/UI_Frameworks',
    id: 'UI-44',
    desc: 'Reactive UI construction and design system command.',
    items: [
      { name: 'React', version: 'v19.0', status: 'RENDER_PRIME', isCritical: true },
      { name: 'Tailwind_CSS', version: 'v4.0', status: 'STYLE_ENGINE' },
      { name: 'shadcn/ui', version: 'v2.0', status: 'COMPONENT_GRID' },
      { name: 'Material_UI', version: 'v6.x', status: 'COMPONENT_GRID' },
      { name: 'Ant_Design', version: 'v5.x', status: 'COMPONENT_GRID' },
      { name: 'Chakra_UI', version: 'v3.x', status: 'COMPONENT_GRID' },
      { name: 'Vite', version: 'v6.x', status: 'BUILD_ENGINE' },
      { name: 'Webpack', version: 'v5.x', status: 'BUILD_ENGINE' },
      { name: 'HighchartsJS', version: 'v12.x', status: 'DATA_VIZ' },
      { name: 'D3.js', version: 'v7.x', status: 'DATA_VIZ' },
    ],
  },
  {
    type: '04_DB',
    title: 'DB_Clusters',
    id: 'DB-77',
    desc: 'Relational, document, and in-memory persistence layers.',
    items: [
      { name: 'PostgreSQL', version: 'v16.2', status: 'PERSISTENCE_LAYER', isCritical: true },
      { name: 'MySQL', version: 'v8.4.8', status: 'PERSISTENCE_LAYER' },
      { name: 'Redshift', version: 'v1.0.148169', status: 'PERSISTENCE_LAYER' },
      { name: 'MongoDB', version: 'v8.0', status: 'PERSISTENCE_LAYER' },
      { name: 'Redis_Cache', version: 'v7.0', status: 'MEMORY_BUFFER' },
      { name: 'SQLite', version: 'v3.x', status: 'PERSISTENCE_LAYER' },
    ],
  },
  {
    type: '05_ORM',
    title: 'ORM_Layer',
    id: 'ORM-09',
    desc: 'Type-safe database abstraction and schema management.',
    items: [
      { name: 'ActiveRecord', version: 'v8.0', status: 'CORE_ORM', isCritical: true },
      { name: 'TypeORM', version: 'v0.3.x', status: 'ENTITY_MAPPER' },
      { name: 'Prisma', version: 'v5.x', status: 'SCHEMA_FORGE' },
      { name: 'Sequel', version: 'v5.x', status: 'QUERY_BUILDER' },
      { name: 'Arel', version: 'v9.x', status: 'QUERY_BUILDER' },
      { name: 'Ruby Object Mapper', version: 'v5.x', status: 'ENTITY_MAPPER' },
      { name: 'Hanami::Model', version: 'v2.x', status: 'ENTITY_MAPPER' },
      { name: 'Mongoid', version: 'v9.x', status: 'ENTITY_MAPPER' },
    ],
  },
  {
    type: '06_BG',
    title: 'Background_Ops',
    id: 'BG-76',
    desc: 'Async job execution and queue management.',
    items: [
      { name: 'Sidekiq', version: 'v7.0', status: 'JOB_PROCESSOR', isCritical: true },
      { name: 'Resque', version: 'v3.0.0', status: 'JOB_PROCESSOR' },
      { name: 'BullMQ', version: 'v5.70.1', status: 'JOB_PROCESSOR' },
    ],
  },
  {
    type: '07_MSG',
    title: 'Message_Brokers',
    id: 'MSG-08',
    desc: 'Event-driven transport for distributed microservices.',
    items: [
      { name: 'Apache_Kafka', version: 'v3.x', status: 'STREAM_CORE', isMaster: true },
      { name: 'RabbitMQ', version: 'v3.x', status: 'QUEUE_NODE' },
      { name: 'NATS', version: 'v2.x', status: 'LIGHTWEIGHT_BUS' },
      { name: 'Redis', version: 'v7.0', status: 'QUEUE_NODE' },
    ],
  },
  {
    type: '08_AUTH',
    title: 'Auth_Protocols',
    id: 'AUTH-11',
    desc: 'Identity verification and access control.',
    items: [
      { name: 'Devise', version: 'v4.9', status: 'IDENTITY_CORE', isCritical: true },
      { name: 'JWT', version: 'RFC_7519', status: 'TOKEN_FORGE' },
      { name: 'OAuth_2.0', version: 'RFC_6749', status: 'DELEGATED_ACCESS' },
      { name: 'Pundit', version: 'v2.3', status: 'POLICY_GATE' },
      { name: 'Auth0', version: 'v4.x', status: 'IDENTITY_CORE' },
      { name: 'Clerk', version: 'v5.x', status: 'IDENTITY_CORE' },
      { name: 'Passport.js', version: 'v0.7', status: 'AUTH_STRATEGY' },
      { name: 'Doorkeeper', version: 'v5.x', status: 'OAUTH_GATEWAY' },
      { name: 'Social Providers', version: 'X', status: 'OAUTH_GATEWAY' },
    ],
  },
  {
    type: '09_PAY',
    title: 'Payments_Stack',
    id: 'PAY-00',
    desc: 'Multi-gateway transaction infrastructure.',
    items: [
      { name: 'Stripe', version: 'v13.x', status: 'PRIME_GATEWAY', isCritical: true },
      { name: 'Braintree', version: 'v6.x', status: 'VAULT_LAYER' },
      { name: 'PayPal', version: 'REST_v2', status: 'GLOBAL_REACH' },
      { name: 'Zuora', version: 'v1.x', status: 'BILLING_ENGINE' },
    ],
  },
  {
    type: '10_ORCH',
    title: 'Infra_Systems',
    id: 'CLOUD-88',
    desc: 'Cloud-native infrastructure and container orchestration.',
    items: [
      { name: 'Docker', version: 'v27.0', status: 'CONTAINER_OPS', isMaster: true },
      { name: 'AWS_Solutions', version: 'GLOBAL_EXP', status: 'PROD_SCALE' },
      { name: 'Heroku', version: 'v24.x', status: 'PROD_SCALE' },
      { name: 'DigitalOcean', version: 'v2.x', status: 'PROD_SCALE' },
      { name: 'Vercel', version: 'v40.x', status: 'EDGE_DEPLOY' },
      { name: 'Netlify', version: 'v19.x', status: 'EDGE_DEPLOY' },
      { name: 'Kubernetes', version: 'v1.30', status: 'ORCHESTRATION' },
      { name: 'Terraform', version: 'v1.9', status: 'INFRA_AS_CODE' },
      { name: 'Nginx', version: 'v1.27', status: 'REVERSE_PROXY' },
    ],
  },
  {
    type: '11_CICD',
    title: 'CI_CD_Pipelines',
    id: 'CICD-87',
    desc: 'Automated build, test, and deploy pipelines.',
    items: [
      { name: 'GitHub_Actions', version: 'v3.x', status: 'CI_CD_PIPELINE', isCritical: true },
      { name: 'GitLab_CI', version: 'v17.x', status: 'CI_CD_PIPELINE' },
      { name: 'Jenkins', version: 'v2.x', status: 'CI_CD_PIPELINE' },
      { name: 'CircleCI', version: 'v2.x', status: 'CI_CD_PIPELINE' },
      { name: 'DroneCI', version: 'v2.x', status: 'CI_CD_PIPELINE' },
      { name: 'Travis_CI', version: 'v3.x', status: 'CI_CD_PIPELINE' },
    ],
  },
  {
    type: '12_TEST',
    title: 'Test_Ops',
    id: 'TEST-55',
    desc: 'Validation across unit, integration, and E2E layers.',
    items: [
      { name: 'RSpec', version: 'v3.13', status: 'UNIT_STRIKE', isCritical: true },
      { name: 'MiniTest', version: 'v5.x', status: 'UNIT_STRIKE' },
      { name: 'FactoryBot', version: 'v6.4', status: 'FIXTURE_FORGE' },
      { name: 'Jest', version: 'v29.x', status: 'UNIT_STRIKE' },
      { name: 'Vitest', version: 'v2.0', status: 'COMPONENT_SCAN' },
      { name: 'Playwright', version: 'v1.48', status: 'E2E_SWEEP' },
    ],
  },
  {
    type: '13_QA',
    title: 'Code_Quality',
    id: 'QA-07',
    desc: 'Static analysis, linting, and security scanning.',
    items: [
      { name: 'RuboCop', version: 'v1.65', status: 'STYLE_ENFORCER', isCritical: true },
      { name: 'ESLint', version: 'v9.x', status: 'LINT_PATROL' },
      { name: 'Prettier', version: 'v3.x', status: 'FORMAT_ENGINE' },
      { name: 'Brakeman', version: 'v6.x', status: 'SEC_SCANNER' },
      { name: 'Reek', version: 'v6.x', status: 'SMELL_DETECTOR' },
      { name: 'RubyCritic', version: 'v4.x', status: 'QUALITY_REPORT' },
      { name: 'SimpleCov', version: 'v0.22', status: 'COVERAGE_MAP' },
      { name: 'Bullet', version: 'v7.x', status: 'QUERY_PATROL' },
    ],
  },
  {
    type: '14_OBS',
    title: 'Observability',
    id: 'OBS-10',
    desc: 'Traces, metrics, logs, and error intelligence.',
    items: [
      { name: 'Datadog', version: 'APM_v2', status: 'TELEMETRY_HUB', isMaster: true },
      { name: 'New_Relic', version: 'v10.x', status: 'PERF_SENTINEL' },
      { name: 'OpenTelemetry', version: 'v1.x', status: 'TRACE_PROTOCOL' },
      { name: 'Sentry', version: 'v24.x', status: 'ERROR_TRACKING' },
      { name: 'Rollbar', version: 'v3.x', status: 'ERROR_TRACKING' },
      { name: 'LogRocket', version: 'v8.x', status: 'SESSION_REPLAY' },
      { name: 'AppSignal', version: 'v4.x', status: 'PERF_SENTINEL' },
      { name: 'Honeybadger', version: 'v5.x', status: 'ERROR_TRACKING' },
      { name: 'Prometheus', version: 'v2.x', status: 'METRICS_ENGINE' },
      { name: 'Grafana', version: 'v11.x', status: 'TELEMETRY_HUB' },
    ],
  },
  {
    type: '15_DOCS',
    title: 'Documentation',
    id: 'DOCS-22',
    desc: 'API docs, schemas, and component knowledge systems.',
    items: [
      { name: 'Swagger / OpenAPI', version: 'v3.1', status: 'API_MANIFEST', isCritical: true },
      { name: 'Storybook', version: 'v8.0', status: 'COMPONENT_LOG' },
      { name: 'RDoc', version: 'v6.x', status: 'API_MANIFEST' },
      { name: 'YARD', version: 'v0.9', status: 'API_MANIFEST' },
      { name: 'Apipie', version: 'v1.x', status: 'API_MANIFEST' },
      { name: 'Annotate', version: 'v3.x', status: 'SCHEMA_LOG' },
      { name: 'Docuwriter.ai', version: 'v1.x', status: 'AI_CODEGEN' },
      { name: 'Compodoc', version: 'v1.x', status: 'COMPONENT_LOG' },
    ],
  },
  {
    type: '16_SEARCH',
    title: 'Search',
    id: 'SRCH-05',
    desc: 'Full-text and vector search infrastructure.',
    items: [
      { name: 'Elasticsearch', version: 'v8.x', status: 'SEARCH_CORE', isMaster: true },
      { name: 'OpenSearch', version: 'v2.x', status: 'SEARCH_CORE' },
      { name: 'Typesense', version: 'v27.x', status: 'SEARCH_CORE' },
      { name: 'Searchkick', version: 'v5.x', status: 'SEARCH_ADAPTER' },
      { name: 'pg_search', version: 'v2.x', status: 'SEARCH_ADAPTER' },
    ],
  },
  {
    type: '17_STOR',
    title: 'File_Storage',
    id: 'STOR-04',
    desc: 'Asset storage, CDN delivery, and file processing.',
    items: [
      { name: 'AWS_S3', version: 'REST_v4', status: 'OBJECT_STORE', isCritical: true },
      { name: 'Cloudinary', version: 'v2.x', status: 'MEDIA_CDN' },
      { name: 'ActiveStorage', version: 'v8.0', status: 'UPLOAD_LAYER' },
      { name: 'Shrine', version: 'v3.x', status: 'UPLOAD_LAYER' },
      { name: 'CarrierWave', version: 'v3.x', status: 'UPLOAD_LAYER' },
    ],
  },
  {
    type: '18_EMAIL',
    title: 'Email_Notifications',
    id: 'EMAIL-03',
    desc: 'Transactional email, SMS, and push notifications.',
    items: [
      { name: 'SendGrid', version: 'v8.x', status: 'MAIL_GATEWAY', isCritical: true },
      { name: 'Postmark', version: 'v5.x', status: 'MAIL_GATEWAY' },
      { name: 'Mailgun', version: 'v1.x', status: 'MAIL_GATEWAY' },
      { name: 'Action_Mailer', version: 'v8.0', status: 'MAIL_COMPOSER' },
      { name: 'Twilio', version: 'v7.x', status: 'SMS_DISPATCH' },
    ],
  },
  {
    type: '19_RT',
    title: 'Real_Time',
    id: 'RT-02',
    desc: 'WebSocket and event-driven real-time communication.',
    items: [
      { name: 'Action_Cable', version: 'v8.0', status: 'WS_CORE', isCritical: true },
      { name: 'AnyCable', version: 'v1.x', status: 'WS_CORE' },
      { name: 'Socket.io', version: 'v4.x', status: 'WS_CORE' },
      { name: 'Ably', version: 'v2.x', status: 'WS_MANAGED' },
    ],
  },
  {
    type: '20_STATE',
    title: 'State_Management',
    id: 'STATE-01',
    desc: 'Client-side state orchestration for reactive UIs.',
    items: [
      { name: 'Redux', version: 'v5.x', status: 'STATE_CORE', isCritical: true },
      { name: 'Zustand', version: 'v5.x', status: 'STATE_CORE' },
      { name: 'MobX', version: 'v6.x', status: 'REACTIVE_STATE' },
    ],
  },
  {
    type: '21_AI',
    title: 'AI_Tools',
    id: 'AI-66',
    desc: 'Intelligence augmentation and LLM integration.',
    items: [
      { name: 'Claude Code', version: 'claude-sonnet-4-6', status: 'PRIME_DIRECTIVE', isCritical: true },
      { name: 'Codex', version: 'GPT-4o', status: 'NEURAL_INTERFACE' },
      { name: 'Cursor', version: 'v0.45', status: 'CODE_AUGMENT' },
      { name: 'Gemini_Code_Assist', version: '2.0_Flash', status: 'CODE_AUGMENT' },
      { name: 'GitHub_Copilot', version: 'v2.x', status: 'CODE_AUGMENT' },
    ],
  },
];

export const specCards: SpecCardData[] = [
  {
    title: 'DISTRIBUTED_NODES',
    subtitle: 'HIGH_AVAILABILITY_PROTOCOLS',
    img: './images/articles/distributed-nodes.webp',
    link: '/distributed-nodes',
  },
  {
    title: 'CLOUD_NATIVE',
    subtitle: 'K8S_SERVERLESS_INFRA',
    img: './images/articles/cloud-native-web.png',
    link: '/cloud-native',
  },
  {
    title: 'DATA_FORGE',
    subtitle: 'ETL_REALTIME_STREAMING',
    img: './images/articles/realtime.jpg',
    link: '/data-forge',
  },
  {
    title: 'TACTICAL_UI',
    subtitle: 'DESIGN_SYSTEMS_VX',
    img: './images/articles/uiux.png',
    link: '/tactical-ui',
  },
];
