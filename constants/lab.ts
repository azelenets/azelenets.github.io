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
}

export const labCards: LabCardData[] = [
  {
    id: 'PRJ_0442',
    codename: 'NEURAL_NET',
    title: 'SYNAPSE-CORE',
    desc: 'Autonomous load balancer using genetic algorithms for distributed microservices.',
    status: 'STABLE',
    statusColor: 'bg-primary text-black',
    color: 'primary',
    stats: 'THROUGHPUT: 4.2GB/s',
    action: 'ACCESS_SOURCE',
    icon: 'terminal',
  },
  {
    id: 'PRJ_0819',
    codename: 'CRYPTO',
    title: 'VOID-CRYPT',
    desc: 'Post-quantum encryption layer for peer-to-peer tactical communications.',
    status: 'EXPERIMENTAL',
    statusColor: 'bg-hazard text-black',
    color: 'hazard',
    stats: 'ENTROPY: 0.99998',
    action: 'DECRYPT_LOGS',
    icon: 'lock',
  },
  {
    id: 'PRJ_1105',
    codename: 'KERNEL',
    title: 'GHOST-OS',
    desc: 'Zero-footprint hypervisor designed for ephemeral stealth computation.',
    status: 'ALPHA_DEK',
    statusColor: 'bg-alert text-white',
    color: 'alert',
    stats: 'STABILITY: CRITICAL',
    action: 'EMERGENCY_STOP',
    icon: 'emergency_home',
  },
  {
    id: 'PRJ_0291',
    codename: 'TELEMETRY',
    title: 'PULSE-MONITOR',
    desc: 'Real-time visualization engine for global infrastructure health metrics.',
    status: 'STABLE',
    statusColor: 'bg-primary text-black',
    color: 'primary',
    stats: 'NODES: 1,402 ACTIVE',
    action: 'VIEW_DASH',
    icon: 'monitoring',
  },
];
