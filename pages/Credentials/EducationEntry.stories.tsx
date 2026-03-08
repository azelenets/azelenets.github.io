import type { Meta, StoryObj } from '@storybook/react-vite';
import EducationEntry from './EducationEntry';

const meta: Meta<typeof EducationEntry> = {
  title: 'Credentials/EducationEntry',
  component: EducationEntry,
  parameters: {
    docs: {
      description: {
        component: 'Timeline entry for academic qualifications. Shows clearance level, title, institution, year range, and optional "Diploma with Honour" badge. Field rows are rendered in a two-column grid below the header.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EducationEntry>;

export const Default: Story = {
  decorators: [(Story) => <div className="max-w-xl"><Story /></div>],
  args: {
    level: 'LEVEL-4',
    title: 'Bachelor of Computer Science',
    institution: 'National Technical University of Ukraine "KPI"',
    years: '2012 — 2016',
    withHonor: false,
    fields: [
      { label: 'Specialisation', value: 'Software Engineering' },
      { label: 'Thesis', value: 'Distributed Load Balancing in Cloud Environments' },
      { label: 'GPA', value: '4.8 / 5.0' },
      { label: 'Format', value: 'Full-time' },
    ],
  },
};

export const WithHonor: Story = {
  decorators: [(Story) => <div className="max-w-xl"><Story /></div>],
  args: {
    level: 'LEVEL-6',
    title: 'Master of Information Security',
    institution: 'National Technical University of Ukraine "KPI"',
    years: '2016 — 2018',
    withHonor: true,
    fields: [
      { label: 'Specialisation', value: 'Cybersecurity & Cryptography' },
      { label: 'Thesis', value: 'Zero-Trust Architecture in Distributed Systems' },
      { label: 'GPA', value: '5.0 / 5.0' },
      { label: 'Format', value: 'Full-time' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'When `withHonor` is true a gold "Diploma with Honor" badge is rendered next to the title.',
      },
    },
  },
};
