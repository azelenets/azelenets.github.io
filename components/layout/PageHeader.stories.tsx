import type { Meta, StoryObj } from '@storybook/react-vite';
import PageHeader from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  parameters: {
    docs: {
      description: {
        component: 'Shared page-level heading used at the top of every section. Supports an optional eyebrow label, a primary title, an accented suffix, and a description line.',
      },
    },
  },
  argTypes: {
    eyebrow: { description: 'Small uppercase label displayed above the title (optional)' },
    titleMain: { description: 'Primary heading text' },
    titleAccent: { description: 'Accented suffix appended after // separator (optional)' },
    description: { description: 'Secondary paragraph shown beneath the title (optional)' },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    eyebrow: 'SECTION_01',
    titleMain: 'MISSION',
    titleAccent: 'LOG',
    description: 'A record of completed operations and tactical deployments.',
  },
};

export const NoAccent: Story = {
  args: {
    titleMain: 'ARSENAL',
    description: 'Full inventory of active tools and frameworks.',
  },
};

export const MinimalTitle: Story = {
  args: {
    titleMain: 'PROTOCOLS',
  },
};
