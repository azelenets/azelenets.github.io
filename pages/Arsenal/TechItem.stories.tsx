import type { Meta, StoryObj } from '@storybook/react-vite';
import TechItem from './TechItem';

const meta: Meta<typeof TechItem> = {
  title: 'Arsenal/TechItem',
  component: TechItem,
  decorators: [
    (Story) => (
      <ul className="max-w-sm">
        <Story />
      </ul>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A single row in the Arsenal tech-stack list. Shows the technology name, version, and operational status. Critical and master-level items render with an alert-coloured badge.',
      },
    },
  },
  argTypes: {
    name: { description: 'Technology name (e.g. "React")' },
    version: { description: 'Version string displayed in the footer row' },
    status: { description: 'Operational status label (e.g. "ACTIVE" or "PRODUCTION")' },
    isCritical: { description: 'Marks this item as a critical asset — renders alert styling and CRITICAL_ASSET badge' },
    isMaster: { description: 'Marks this item as a master-level unit — renders alert styling and MASTER_UNIT badge' },
  },
};

export default meta;
type Story = StoryObj<typeof TechItem>;

export const Standard: Story = {
  args: {
    name: 'TypeScript',
    version: 'v5.x',
    status: 'PRODUCTION',
  },
};

export const Critical: Story = {
  args: {
    name: 'Ruby on Rails',
    version: 'v8.x',
    status: 'PRIMARY_STACK',
    isCritical: true,
  },
};

export const Master: Story = {
  args: {
    name: 'System Design',
    version: 'ARCH_LEVEL_5',
    status: 'MASTER',
    isMaster: true,
  },
};
