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
    description: 'Discipline, precision, and a drive for innovation — built into every solution. Each system I deliver is architecturally sound, rigorously tested, and designed to remain reliable under pressure.',
  },
  {
    id: 'DIR_COMMAND_02',
    icon: 'radar',
    title: 'Strategic Leadership',
    status: 'UPLINK_STABLE',
    dots: 2,
    description: 'Extensive background steering engineering efforts across large-scale ecosystems — from technical design and proof-of-concepts to stakeholder alignment and successful delivery.',
  },
  {
    id: 'DIR_INTEGRATION_03',
    icon: 'hub',
    title: 'Mission Collaboration',
    status: 'NODES_SYNCED',
    dots: 1,
    description: 'I harness each team member\'s perspective to produce outcomes greater than the sum of their parts. Clear workflows, strong communication, and mutual trust — whether remote or in-person.',
  },
  {
    id: 'DIR_DEPLOY_04',
    icon: 'deployed_code',
    title: 'Customer Orientation',
    status: 'TARGET_LOCKED',
    dots: 3,
    description: 'Understanding customer needs is not a step — it is the foundation. I deliver tailored solutions that drive business success and ensure technology genuinely enriches the lives of its users.',
  },
  {
    id: 'DIR_MANAGE_05',
    icon: 'checklist',
    title: 'Execution & Management',
    status: 'OPS_ACTIVE',
    dots: 2,
    description: 'Proven execution across the full IT spectrum — coordinating pipelines, managing priorities, and keeping technical teams and business stakeholders aligned from scoping through deployment.',
  },
  {
    id: 'DIR_VISION_06',
    icon: 'public',
    title: 'Engineering Philosophy',
    status: 'VISION_LOCKED',
    dots: 1,
    description: 'Software has the potential to shape a better world. Across 13+ years and industries — e-commerce, logistics, education, entertainment, and beyond — I remain committed to that positive evolution.',
  },
];
