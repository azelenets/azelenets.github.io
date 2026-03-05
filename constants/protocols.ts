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
    description: 'Every system I deliver is production-ready from day one. Rigorous testing, clean architecture, and zero shortcuts — so your team inherits code they\'re proud to maintain, not afraid to touch.',
  },
  {
    id: 'DIR_COMMAND_02',
    icon: 'radar',
    title: 'Strategic Leadership',
    status: 'UPLINK_STABLE',
    dots: 2,
    description: 'I\'ve led engineering efforts that shipped on time and scaled beyond expectations. Technical decisions stay aligned with business goals — keeping stakeholders informed and delivery on track.',
  },
  {
    id: 'DIR_INTEGRATION_03',
    icon: 'hub',
    title: 'Seamless Collaboration',
    status: 'NODES_SYNCED',
    dots: 1,
    description: 'I integrate into teams fast — remote or on-site. Whether you need an independent contributor or a senior voice in architecture discussions, I bring clarity and momentum, not friction.',
  },
  {
    id: 'DIR_DEPLOY_04',
    icon: 'deployed_code',
    title: 'Customer Orientation',
    status: 'TARGET_LOCKED',
    dots: 3,
    description: 'Before writing a line of code, I understand the problem. The result: features your users actually want, delivered without expensive rework cycles or missed requirements.',
  },
  {
    id: 'DIR_MANAGE_05',
    icon: 'checklist',
    title: 'Execution Under Pressure',
    status: 'OPS_ACTIVE',
    dots: 2,
    description: 'Tight deadlines, shifting scope, and legacy codebases don\'t derail me — they\'re where I thrive. I coordinate pipelines, manage priorities, and keep delivery moving when it matters most.',
  },
  {
    id: 'DIR_VISION_06',
    icon: 'public',
    title: 'Engineering Philosophy',
    status: 'VISION_LOCKED',
    dots: 1,
    description: 'Software should create real value for real people. After 13+ years across e-commerce, logistics, education, and SaaS — that conviction drives every technical decision I make.',
  },
];
