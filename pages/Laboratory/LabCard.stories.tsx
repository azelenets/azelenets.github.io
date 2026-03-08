import type { Meta, StoryObj } from '@storybook/react-vite';
import LabCard from './LabCard';

const meta: Meta<typeof LabCard> = {
  title: 'Laboratory/LabCard',
  component: LabCard,
  parameters: {
    docs: {
      description: {
        component: 'Project card used in the Laboratory section. Supports three colour themes (`primary`, `hazard`, `alert`) which affect borders, icon tints, and action-link colours on hover. Accepts arbitrary children for tag/badge rows.',
      },
    },
  },
  argTypes: {
    color: {
      description: 'Theme colour — controls hover tint and action link colour',
      control: 'select',
      options: ['primary', 'hazard', 'alert'],
    },
    status: { description: 'Status badge text (e.g. "ACTIVE", "CLASSIFIED")' },
    statusColor: { description: 'Tailwind classes applied to the status badge' },
  },
};

export default meta;
type Story = StoryObj<typeof LabCard>;

const tags = (
  <div className="flex flex-wrap gap-1.5">
    {['React', 'TypeScript', 'NestJS', 'PostgreSQL'].map((t) => (
      <span key={t} className="px-2 py-0.5 bg-primary/5 border border-primary/15 text-primary/60 text-[9px] font-mono tracking-wider">
        {t}
      </span>
    ))}
  </div>
);

export const Primary: Story = {
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
  args: {
    id: 'LAB-001',
    codename: 'SIGNAL_TRACE',
    title: 'Signal Trace',
    desc: 'Real-time distributed tracing dashboard for microservice architectures. Visualises request flows, latency spikes, and failure cascades.',
    status: 'ACTIVE',
    statusColor: 'text-primary border border-primary/30',
    color: 'primary',
    stats: '14 ENDPOINTS MONITORED',
    action: 'VIEW_PROJECT',
    icon: 'open_in_new',
    link: '#',
    children: tags,
  },
};

export const Hazard: Story = {
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
  args: {
    id: 'LAB-002',
    codename: 'AEGIS_AI',
    title: 'Aegis AI Copilot',
    desc: 'Context-aware coding assistant built on top of Claude, specialised for Rails and NestJS codebases.',
    status: 'BETA',
    statusColor: 'text-hazard border border-hazard/30',
    color: 'hazard',
    stats: '2.1K TOKENS/SESSION AVG',
    action: 'EXPLORE',
    icon: 'science',
    children: tags,
  },
};

export const Alert: Story = {
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
  args: {
    id: 'LAB-003',
    codename: 'PHANTOM',
    title: 'Phantom Scanner',
    desc: 'Automated OWASP vulnerability scanner with CI/CD integration. Produces SARIF reports and blocks deploys on critical findings.',
    status: 'CLASSIFIED',
    statusColor: 'text-alert border border-alert/30',
    color: 'alert',
    stats: '37 CVEs DETECTED',
    action: 'RESTRICTED',
    icon: 'lock',
    children: tags,
  },
};
