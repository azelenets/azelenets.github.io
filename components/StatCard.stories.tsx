import type { Meta, StoryObj } from '@storybook/react-vite';
import StatCard from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  parameters: {
    docs: {
      description: {
        component: 'Displays a labeled metric with a value, progress bar, and optional segmented mode. Used on the hero and dashboard sections.',
      },
    },
  },
  argTypes: {
    id: { description: 'Short identifier displayed in the top-right corner (e.g. "01")' },
    label: { description: 'Uppercase category label shown above the value' },
    value: { description: 'Primary display value (e.g. "8+ YRS")' },
    progress: {
      description: 'Progress bar fill percentage (0–100). Ignored when segmented is true.',
      control: { type: 'range', min: 0, max: 100 },
    },
    segmented: { description: 'Renders three fixed segments instead of a continuous bar' },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    id: '01',
    label: 'Years Experience',
    value: '8+ YRS',
    progress: 80,
  },
};

export const LowProgress: Story = {
  args: {
    id: '02',
    label: 'Projects Shipped',
    value: '42',
    progress: 30,
  },
};

export const FullProgress: Story = {
  args: {
    id: '03',
    label: 'Uptime SLA',
    value: '99.9%',
    progress: 100,
  },
};

export const Segmented: Story = {
  args: {
    id: '04',
    label: 'Clearance Level',
    value: 'ALPHA-2',
    progress: 0,
    segmented: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'When `segmented` is true the progress bar is split into three fixed-width blocks. The third block is dimmed to indicate partial access.',
      },
    },
  },
};
