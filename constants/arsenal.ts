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
  'UI_RECON',
  'DB_CLUSTERS',
  'SEC_PROTOCOLS',
];

export const stackColumns: StackColumnData[] = [
  {
    type: '01_CORE',
    title: 'Languages_Src',
    id: 'LANG-99',
    desc: 'High-performance low-level system integration focus.',
    items: [
      { name: 'Rust', version: 'v1.75.0', status: 'DEPLOY_READY', isCritical: true },
      { name: 'Go (Golang)', version: 'v1.22', status: 'CONCURRENCY_OP' },
      { name: 'TypeScript', version: 'v5.4', status: 'TYPED_INTERFACE' },
    ],
  },
  {
    type: '02_ORCH',
    title: 'Infra_Systems',
    id: 'CLOUD-88',
    desc: 'Orchestrating large-scale autonomous deployments.',
    items: [
      { name: 'Kubernetes', version: 'K8s_v1.29', status: 'GRID_CONTROL', isMaster: true },
      { name: 'AWS_Solutions', version: 'GLOBAL_EXP', status: 'PROD_SCALE' },
      { name: 'Terraform', version: 'v1.7.0', status: 'I_A_C_PROTOCOL' },
    ],
  },
  {
    type: '03_SERV',
    title: 'Backend_Forge',
    id: 'SERV-77',
    desc: 'Distributed microservice architecture specialists.',
    items: [
      { name: 'PostgreSQL', version: 'v16.2', status: 'PERSISTENCE_LAYER' },
      { name: 'Redis_Cache', version: 'v7.0', status: 'MEMORY_BUFFER' },
      { name: 'gRPC / Protobuf', version: 'PROTO_v3', status: 'RPC_TRANSPORT' },
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
