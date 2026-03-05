export interface NavItem {
  label: string;
  num: string;
  path: string;
}

export const navItems: NavItem[] = [
  { label: 'OVERVIEW',    num: '01', path: '/' },
  { label: 'MISSION_LOG', num: '02', path: '/mission' },
  { label: 'TECH_STACK',  num: '03', path: '/arsenal' },
  { label: 'R&D_LAB',     num: '04', path: '/lab' },
  { label: 'PROTOCOLS',   num: '05', path: '/protocols' },
  { label: 'DOSSIER',     num: '06', path: '/credentials' },
];
