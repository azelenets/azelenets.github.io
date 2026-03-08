import type { Meta, StoryObj } from '@storybook/react-vite';
import CertCard from './CertCard';

const meta: Meta<typeof CertCard> = {
  title: 'Credentials/CertCard',
  component: CertCard,
  parameters: {
    docs: {
      description: {
        component: 'Certification tile in the Credentials section. Displays a key-hash badge, title, and a validated indicator bar. When `full` is set, the card spans the full grid width.',
      },
    },
  },
  argTypes: {
    id: { description: 'Numeric identifier (shown faintly in the top-right corner)' },
    hash: { description: 'Certification key hash label (e.g. "AWS_CSA_PRO")' },
    title: { description: 'Full certification title' },
    full: { description: 'When true the card spans the full row in a CSS grid' },
  },
};

export default meta;
type Story = StoryObj<typeof CertCard>;

export const Default: Story = {
  decorators: [(Story) => <div className="max-w-xs"><Story /></div>],
  args: {
    id: '01',
    hash: 'AWS_CSA_PRO',
    title: 'AWS Solutions Architect Professional',
  },
};

export const FullWidth: Story = {
  decorators: [(Story) => <div className="max-w-xl"><Story /></div>],
  args: {
    id: '03',
    hash: 'OFF_SEC',
    title: 'OSCP – Offensive Security Certified Professional',
    full: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'When `full` is true the card renders with `col-span-full` — best shown inside a CSS grid container.',
      },
    },
  },
};

export const CertGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 max-w-xl">
      <CertCard id="01" hash="AWS_CSA_PRO" title="AWS Solutions Architect Prof." />
      <CertCard id="02" hash="C_K_AD" title="Certified Kubernetes Application Dev" />
      <CertCard id="03" hash="OFF_SEC" title="OSCP – Offensive Security Certified" full />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid layout matching the actual Credentials page — two columns with the last card spanning full width.',
      },
    },
  },
};
