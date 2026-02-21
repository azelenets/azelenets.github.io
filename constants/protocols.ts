export interface ProtocolCardData {
  id: string;
  icon: string;
  title: string;
  status: string;
  dots: number;
  description: string;
}

export const protocolCards: ProtocolCardData[] = [
  {
    id: 'DIR_EXCELLENCE_01',
    icon: 'precision_manufacturing',
    title: 'Engineering Excellence',
    status: 'MODULE_LOADED_OK',
    dots: 3,
    description: 'Engineering is not just implementation; it is tactical warfare against technical debt. Every line of code is a structural asset designed for maximum stability under fire.',
  },
  {
    id: 'DIR_COMMAND_02',
    icon: 'radar',
    title: 'Strategic Leadership',
    status: 'UPLINK_STABLE',
    dots: 2,
    description: 'Leadership is tactical positioning. Ensuring that engineering velocity is directed toward high-impact business objectives with zero deviation.',
  },
  {
    id: 'DIR_INTEGRATION_03',
    icon: 'hub',
    title: 'Mission Collaboration',
    status: 'NODES_SYNCED',
    dots: 1,
    description: 'Fostering technical mentorship and team cohesion. High-performance units are built on trust, clear communication, and shared tactical awareness.',
  },
  {
    id: 'DIR_DEPLOY_04',
    icon: 'deployed_code',
    title: 'User-Centric Targeting',
    status: 'TARGET_LOCKED',
    dots: 3,
    description: 'Engineering is the bridge between abstraction and utility. If the end-user objective is not met, the mission is a failure.',
  },
];
