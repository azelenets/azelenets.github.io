import type { Meta, StoryObj } from '@storybook/react-vite';
import MissionItem from './MissionItem';

const sharedArgs = {
  date: '2023 — 2025',
  title: 'Operation Blacksite',
  role: 'Lead Engineer',
  scanId: 'SC-4891',
  objective: 'Architect and ship a zero-downtime microservices migration for a high-traffic SaaS platform serving 1.2 M daily users.',
  tactics: [
    'Decomposed Rails monolith into 6 NestJS services',
    'Implemented Kafka-based event bus for async communication',
    'Blue/green deployment with feature-flagged rollout',
  ],
  tools: ['NestJS', 'Kafka', 'Kubernetes', 'AWS', 'Terraform'],
  outcome: 'MISSION_SUCCESS',
  status: 'COMPLETED',
  statusColor: 'text-primary bg-primary/10',
};

const meta: Meta<typeof MissionItem> = {
  title: 'MissionLog/MissionItem',
  component: MissionItem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Timeline entry for the Mission Log page. Each item contains a visual panel (shield placeholder, ghost scanner, or real image) and a tactical briefing panel. Items alternate left/right alignment on desktop.',
      },
    },
  },
  argTypes: {
    align: {
      description: 'Desktop alignment — "left" puts meta on the left, "right" puts it on the right',
      control: 'radio',
      options: ['left', 'right'],
    },
    isShield: { description: 'Renders a locked-shield placeholder instead of an image' },
    isGhost: { description: 'Renders an animated ghost/scan-line placeholder' },
    imageUrl: { description: 'Real image URL (used when isShield and isGhost are false)' },
  },
};

export default meta;
type Story = StoryObj<typeof MissionItem>;

export const WithImage: Story = {
  decorators: [(Story) => <div className="p-10 max-w-4xl mx-auto"><Story /></div>],
  args: {
    ...sharedArgs,
    align: 'left',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&q=80',
  },
};

export const ShieldPlaceholder: Story = {
  decorators: [(Story) => <div className="p-10 max-w-4xl mx-auto"><Story /></div>],
  args: {
    ...sharedArgs,
    align: 'right',
    isShield: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Used for classified missions where imagery cannot be disclosed.',
      },
    },
  },
};

export const GhostPlaceholder: Story = {
  decorators: [(Story) => <div className="p-10 max-w-4xl mx-auto"><Story /></div>],
  args: {
    ...sharedArgs,
    align: 'left',
    isGhost: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated scan-line effect for redacted or pending entries.',
      },
    },
  },
};
