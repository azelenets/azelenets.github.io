import type { Meta, StoryObj } from '@storybook/react-vite';
import StatBlock from './StatBlock';

const meta: Meta<typeof StatBlock> = {
  title: 'Hero/StatBlock',
  component: StatBlock,
  parameters: {
    docs: {
      description: {
        component: 'Compact stat display used in the hero section sidebar. Shows a label, a large value, and a coloured progress bar. Pass Tailwind background-colour classes via `barColor` and a CSS `width` string via `width`.',
      },
    },
  },
  argTypes: {
    label: { description: 'Small uppercase descriptor above the value' },
    value: { description: 'Large display value' },
    barColor: { description: 'Tailwind background class for the progress bar (e.g. "bg-primary", "bg-hazard")' },
    width: { description: 'CSS width for the bar fill (e.g. "75%")' },
  },
};

export default meta;
type Story = StoryObj<typeof StatBlock>;

export const Default: Story = {
  args: {
    label: 'Ops Completed',
    value: '200+',
    barColor: 'bg-primary',
    width: '75%',
  },
};

export const Hazard: Story = {
  args: {
    label: 'Incidents Resolved',
    value: '99.9%',
    barColor: 'bg-hazard',
    width: '99%',
  },
};

export const Alert: Story = {
  args: {
    label: 'Critical Patches',
    value: '0',
    barColor: 'bg-alert',
    width: '5%',
  },
};

export const HeroRow: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-xs">
      <StatBlock label="Years Experience" value="8+ YRS" barColor="bg-primary" width="80%" />
      <StatBlock label="Projects Shipped" value="200+" barColor="bg-hazard" width="70%" />
      <StatBlock label="Uptime SLA" value="99.9%" barColor="bg-primary" width="99%" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three StatBlocks stacked vertically, mirroring the hero sidebar layout.',
      },
    },
  },
};
