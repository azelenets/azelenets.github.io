import type { Meta, StoryObj } from '@storybook/react-vite';
import FilterButton from './FilterButton';

const meta: Meta<typeof FilterButton> = {
  title: 'Arsenal/FilterButton',
  component: FilterButton,
  parameters: {
    docs: {
      description: {
        component: 'Toggle button used in the Arsenal tech-stack filter bar. Active state fills with `primary` color; inactive state shows an outlined style.',
      },
    },
  },
  argTypes: {
    label: { description: 'Button label text' },
    active: { description: 'Whether this filter is currently selected' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof FilterButton>;

export const Inactive: Story = {
  args: {
    label: 'ALL',
    active: false,
  },
};

export const Active: Story = {
  args: {
    label: 'BACKEND',
    active: true,
  },
};

export const FilterBar: Story = {
  render: () => (
    <div className="flex gap-2">
      {['ALL', 'BACKEND', 'FRONTEND', 'DEVOPS', 'AI'].map((label, i) => (
        <FilterButton key={label} label={label} active={i === 0} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A full row of filter buttons showing one active and the rest inactive.',
      },
    },
  },
};
