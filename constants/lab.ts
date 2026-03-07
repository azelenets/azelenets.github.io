export interface LabCardData {
  id: string;
  codename: string;
  title: string;
  desc: string;
  status: string;
  statusColor: string;
  color: 'primary' | 'hazard' | 'alert';
  stats: string;
  action: string;
  icon: string;
  link?: string;
}

export const labCards: LabCardData[] = [
  {
    id: 'PRJ_0001',
    codename: 'PORTFOLIO',
    title: 'AEGIS-UI',
    desc: 'This tactical interface — a military-grade developer portfolio built with React, Vite, and Tailwind CSS. You are currently inside it.',
    status: 'LIVE',
    statusColor: 'bg-primary text-black',
    color: 'primary',
    stats: 'STACK: REACT + VITE',
    action: 'VIEW_SOURCE',
    icon: 'terminal',
    link: 'https://github.com/azelenets/azelenets.github.io',
  },
  {
    id: 'PRJ_0174',
    codename: 'BOILERPLATE',
    title: 'NEXUS-FORGE',
    desc: 'Production-ready NestJS CQRS monorepo starter with NATS JetStream, BullMQ, TypeORM, and JWT RBAC wired from day one.',
    status: 'CONCEPT',
    statusColor: 'bg-white/10 text-white/60',
    color: 'primary',
    stats: 'MODULES: 12 PLANNED',
    action: 'INIT_DRAFT',
    icon: 'schema',
    link: 'https://github.com/azelenets/nexus-forge',
  },
  {
    id: 'PRJ_0287',
    codename: 'DEVTOOLS',
    title: 'SIGNAL-TRACE',
    desc: 'Browser-based WebSocket traffic inspector for real-time IoT debugging — message timeline, namespace filtering, and latency overlays.',
    status: 'EXPERIMENTAL',
    statusColor: 'bg-hazard text-black',
    color: 'hazard',
    stats: 'LATENCY: <2ms',
    action: 'OPEN_TRACE',
    icon: 'ssid_chart',
    link: 'https://github.com/azelenets/signal-trace',
  },
  {
    id: 'PRJ_0330',
    codename: 'SERVERLESS',
    title: 'PHANTOM-FORM',
    desc: 'Self-hosted serverless form backend — edge-deployable endpoint for contact and lead forms, no third-party services required.',
    status: 'CONCEPT',
    statusColor: 'bg-white/10 text-white/60',
    color: 'hazard',
    stats: 'INTEGRATIONS: TBD',
    action: 'SPEC_DRAFT',
    icon: 'send',
  },
];
