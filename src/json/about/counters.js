import moment from 'moment/moment';

const counters = [
  {
    id: 1,
    title: 'Projects completed',
    count: 64,
    icon: 'icon-magic-wand',
  },
  {
    id: 2,
    title: 'Years of experience',
    count: moment().diff([2012, 6, 1], 'years'),
    icon: 'icon-briefcase',
  },
  {
    id: 3,
    title: 'Satisfied clients',
    count: 42,
    icon: 'icon-people',
  },
  {
    id: 4,
    title: 'Licenses & Certifications',
    count: 23,
    icon: 'icon-badge',
  },
];

export default counters;
