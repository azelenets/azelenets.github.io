export interface CertData {
  id: string;
  hash: string;
  title: string;
  full?: boolean;
}

export const certifications: CertData[] = [
  { id: '01', hash: 'AWS_CSA_PRO', title: 'AWS Solutions Architect Prof.' },
  { id: '02', hash: 'C_K_AD', title: 'Certified Kubernetes Application Dev' },
  { id: '03', hash: 'OFF_SEC', title: 'OSCP - Offensive Security Certified', full: true },
];

export interface CourseData {
  id: string;
  title: string;
  platform: 'Udemy' | 'Coursera';
  instructor: string;
  description: string;
  topics: string[];
  url: string;
}

export const courses: CourseData[] = [
  {
    id: 'ms-001',
    title: 'Microservices with Node JS and React',
    platform: 'Udemy',
    instructor: 'Stephen Grider',
    description: 'Build a large-scale microservices application with Node, React, Docker, and Kubernetes from scratch.',
    topics: ['Microservices architecture & design', 'Docker & Kubernetes orchestration', 'Event-driven communication with NATS Streaming', 'Authentication & authorization across services', 'CI/CD with GitHub Actions & DigitalOcean'],
    url: 'https://www.udemy.com/course/microservices-with-node-js-and-react/',
  },
  {
    id: 'pm-005',
    title: 'Become a Product Manager',
    platform: 'Udemy',
    instructor: 'Cole Mercer & Evan Kimbrell',
    description: 'End-to-end product management training from ideation and UX to metrics and leadership.',
    topics: ['Product ideation & market research', 'UX wireframing & prototyping', 'Metrics & data-driven decisions', 'User stories & scoping', 'PM interview preparation'],
    url: 'https://www.udemy.com/course/become-a-product-manager-learn-the-skills-get-a-job/',
  },
  {
    id: 'mfe-003',
    title: 'Microfrontends with React: A Complete Developer\'s Guide',
    platform: 'Udemy',
    instructor: 'Stephen Grider',
    description: 'Learn to split React monoliths into independently deployable microfrontend applications.',
    topics: ['Microfrontend architecture patterns', 'Webpack Module Federation', 'Build-time vs run-time integration', 'Auth across microfrontends', 'Multi-framework composition'],
    url: 'https://www.udemy.com/course/microfrontend-course/',
  },
  {
    id: 'ts-002',
    title: 'Understanding TypeScript',
    platform: 'Udemy',
    instructor: 'Maximilian Schwarzmüller',
    description: 'Master TypeScript from core basics to advanced features with React and Node integration.',
    topics: ['Types, interfaces & generics', 'Classes & ES6 modules', 'Decorators & advanced types', 'TypeScript with React', 'TypeScript with Node/Express'],
    url: 'https://www.udemy.com/course/understanding-typescript/',
  },
  {
    id: 'js-004',
    title: 'JavaScript — The Complete Guide 2025',
    platform: 'Udemy',
    instructor: 'Maximilian Schwarzmüller',
    description: 'Deep-dive into JavaScript from core syntax to expert topics like performance and testing.',
    topics: ['Variables, functions, objects & arrays', 'DOM manipulation & events', 'Async JS & HTTP requests', 'OOP & prototypes', 'Performance, security & testing'],
    url: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/',
  },
  {
    id: 'es6-005',
    title: 'Accelerated ES6 JavaScript Training',
    platform: 'Udemy',
    instructor: 'Maximilian Schwarzmüller',
    description: 'Fast-paced coverage of all key ES6 features for developers familiar with ES5.',
    topics: ['let, const & arrow functions', 'Rest & spread operators', 'Promises & async patterns', 'Maps, Sets & new built-ins', 'Reflect & Proxy API'],
    url: 'https://www.udemy.com/course/es6-bootcamp-next-generation-javascript/',
  },
  {
    id: 'ml-006',
    title: 'Machine Learning Specialization',
    platform: 'Coursera',
    instructor: 'Andrew Ng — DeepLearning.AI / Stanford',
    description: 'Build and train supervised ML models in Python using NumPy and scikit-learn.',
    topics: ['Linear & logistic regression', 'Supervised vs unsupervised learning', 'Classification algorithms', 'Model evaluation & feature engineering', 'Practical ML with NumPy & scikit-learn'],
    url: 'https://www.coursera.org/learn/machine-learning',
  },
];

export const combatLanguages: string[] = ['RUBY', 'TYPESCRIPT', 'JAVASCRIPT'];

export const tacticalFrameworks: string[] = ['RAILS', 'NESTJS', 'GRAPE', 'SINATRA'];

export interface DetailField {
  label: string;
  value: string;
}

export interface EducationData {
  level: string;
  title: string;
  institution: string;
  years: string;
  withHonor?: boolean;
  fields: DetailField[];
}

export const education: EducationData[] = [
  {
    level: 'MASTER',
    title: 'M.Eng. — Control and Automation',
    institution: 'Dnipro Polytech | Dept. of Automation & Computer Systems',
    years: '2011 — 2012',
    withHonor: true,
    fields: [
      { label: 'Specialization', value: 'Computerized systems, control and automation' },
      { label: 'Qualification', value: 'Computer systems engineer, researcher' },
      { label: 'Thesis_Project', value: 'Directed movement of a tunnel boring machine along a laser beam + Photovoltaic matrix development, MatLab/MathCad model' },
    ],
  },
  {
    level: 'BACHELOR',
    title: 'B.Sc. Information Technology',
    institution: 'Dnipro Polytech | Dept. of Automation & Computer Systems',
    years: '2009 — 2011',
    fields: [
      { label: 'Specialization', value: 'Industry Automation & Control Systems Engineering' },
      { label: 'Qualification', value: 'Specialist in automation and control systems' },
    ],
  },
  {
    level: 'SPECIALIST',
    title: 'Automated Control Systems Specialist',
    institution: 'Dnipro Polytech College',
    years: '2005 — 2009',
    withHonor: true,
    fields: [
      { label: 'Specialization', value: 'Installation and maintenance of technological production automation equipment and systems' },
      { label: 'Qualification', value: 'Electromechanical technician for installation and commissioning of technological production automation equipment and systems' },
      { label: 'Thesis_Project', value: 'Automated control system for air heaters in steel production' },
    ],
  },
];
