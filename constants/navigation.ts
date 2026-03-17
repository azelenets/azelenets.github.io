export interface NavItem {
  label: string;
  num: string;
  path: string;
  hint: string;
}

export const navItems: NavItem[] = [
  { label: 'MAIN',    num: '01', path: '/', hint: 'OVERVIEW' },
  { label: 'HISTORY', num: '02', path: '/mission', hint: 'MISSION_LOG' },
  { label: 'SKILLS',  num: '03', path: '/arsenal', hint: 'TECH_STACK' },
  { label: 'EXPERIMENTS', num: '04', path: '/lab', hint: 'R&D_LAB' },
  { label: 'PHILOSOPHY', num: '05', path: '/protocols', hint: 'PROTOCOLS' },
  { label: 'ABOUT', num: '06', path: '/credentials', hint: 'DOSSIER' },
  { label: 'BLOG', num: '07', path: '/blog', hint: 'BRIEF' },
];
