import type { Meta, StoryObj } from '@storybook/react-vite';
import ProtocolCard from './ProtocolCard';

const meta: Meta<typeof ProtocolCard> = {
  title: 'Protocols/ProtocolCard',
  component: ProtocolCard,
  parameters: {
    docs: {
      description: {
        component: 'Service offering card in the Protocols (services) section. Displays a Material icon, section ID, title, red accent line, an objective description, and a dot-based experience indicator in the footer.',
      },
    },
  },
  argTypes: {
    id: { description: 'Short reference code displayed in the top-right corner (e.g. "P-01")' },
    icon: { description: 'Material Symbols icon name (e.g. "memory", "cloud_sync")' },
    title: { description: 'Protocol/service title' },
    status: { description: 'Status text displayed in the footer next to the dot indicators' },
    dots: {
      description: 'Number of filled square dots shown in the footer — represents experience depth',
      control: { type: 'range', min: 1, max: 8 },
    },
    children: { description: 'Objective description string shown as the card body' },
  },
};

export default meta;
type Story = StoryObj<typeof ProtocolCard>;

export const Default: Story = {
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
  args: {
    id: 'P-01',
    icon: 'memory',
    title: 'BACKEND SYSTEMS',
    status: 'ACTIVE_PROTOCOL',
    dots: 5,
    children: 'Design and build high-throughput APIs, event-driven microservices, and data pipelines capable of handling millions of requests per day.',
  },
};

export const DevOps: Story = {
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
  args: {
    id: 'P-03',
    icon: 'cloud_sync',
    title: 'CLOUD & DEVOPS',
    status: 'CONTINUOUS_DEPLOYMENT',
    dots: 4,
    children: 'Provision and manage cloud infrastructure with Terraform, orchestrate workloads on Kubernetes, and automate CI/CD pipelines from commit to production.',
  },
};

export const ProtocolGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-4xl">
      <ProtocolCard id="P-01" icon="memory" title="BACKEND SYSTEMS" status="ACTIVE" dots={5}>
        Design and build high-throughput APIs and event-driven microservices.
      </ProtocolCard>
      <ProtocolCard id="P-02" icon="code" title="FRONTEND ENGINEERING" status="ACTIVE" dots={4}>
        Build performant React applications with clean state management and accessibility standards.
      </ProtocolCard>
      <ProtocolCard id="P-03" icon="cloud_sync" title="CLOUD & DEVOPS" status="ACTIVE" dots={4}>
        Provision cloud infrastructure with Terraform and orchestrate on Kubernetes.
      </ProtocolCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three cards in a grid, mirroring the Protocols page layout.',
      },
    },
  },
};
