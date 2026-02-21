import { View } from '@/types';

export interface NavItem {
  id: View;
  label: string;
  num: string;
}

export const navItems: NavItem[] = [
  { id: View.HOME, label: 'OVERVIEW', num: '01' },
  { id: View.MISSION, label: 'MISSION_LOG', num: '02' },
  { id: View.ARSENAL, label: 'TECH_STACK', num: '03' },
  { id: View.LAB, label: 'R&D_LAB', num: '04' },
  { id: View.PROTOCOLS, label: 'PROTOCOLS', num: '05' },
  { id: View.CREDENTIALS, label: 'DOSSIER', num: '06' },
];
