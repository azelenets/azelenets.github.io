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
}

export const missions: MissionData[] = [
  {
    date: '2023.Q3 - PRESENT',
    title: 'Project: Neural Nexus',
    role: 'Lead Systems Architect',
    scanId: '99x-A',
    objective: 'Revolutionize data ingestion for a global satellite array. Current system failing at 2M req/sec. Objective: Implement a resilient, zero-latency pipeline.',
    tactics: [
      'Deployed Distributed Rust-based edge workers across 14 zones.',
      'Engineered custom protocol for telemetry packet deduplication.',
    ],
    outcome: '+400% THRUPUT',
    status: 'S+',
    statusColor: 'text-hazard bg-hazard/10',
    align: 'right',
  },
  {
    date: '2021.Q1 - 2023.Q2',
    title: 'Project: Iron Wall Shield',
    role: 'Cyber-Security Engineer',
    scanId: 'ENCRYPT_LAYER_6',
    objective: 'Secure a legacy financial infrastructure against emerging quantum-decryption threats. Defenses were failing stress tests.',
    tactics: [
      'Lattice-based cryptographic wrappers.',
      'Heuristic behavioral threat detection.',
    ],
    outcome: '0 BREACHES',
    status: 'ACTIVE',
    statusColor: 'text-primary bg-primary/10',
    align: 'left',
    isShield: true,
  },
  {
    date: '2018 - 2021',
    title: 'Project: Ghost Stream',
    role: 'Full Stack Systems Dev',
    scanId: 'BW-OPT',
    objective: 'Minimize bandwidth for HD video feeds across low-orbit satellite links.',
    tactics: [
      'Custom C++ encoding for ARM processors.',
      'Adaptive bitrate logic for orbital velocity.',
    ],
    outcome: '-65% BW',
    status: 'ARCHIVED',
    statusColor: 'text-white/40 bg-white/5',
    align: 'right',
    isGhost: true,
  },
];
