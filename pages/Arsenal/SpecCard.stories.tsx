import type { Meta, StoryObj } from '@storybook/react-vite';
import SpecCard from './SpecCard';

const meta: Meta<typeof SpecCard> = {
  title: 'Arsenal/SpecCard',
  component: SpecCard,
  parameters: {
    docs: {
      description: {
        component: 'Image card used in the Arsenal gallery. Displays a full-bleed background image with a title and subtitle overlay. Starts in grayscale and transitions to colour on hover.',
      },
    },
  },
  argTypes: {
    title: { description: 'Bold white title shown at the bottom of the card' },
    subtitle: { description: 'Monospace subtitle in primary colour beneath the title' },
    img: { description: 'URL of the background image' },
  },
};

export default meta;
type Story = StoryObj<typeof SpecCard>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Distributed Systems',
    subtitle: 'ARCH_CLASS :: EVENT_DRIVEN',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&q=80',
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[640px]">
      {[
        { title: 'Cloud Native', subtitle: 'AWS :: K8S :: TERRAFORM', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=640&q=80' },
        { title: 'AI Engineering', subtitle: 'LLM :: AGENTS :: RAG', img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=640&q=80' },
        { title: 'Full-Stack React', subtitle: 'REACT_19 :: VITE :: TS', img: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=640&q=80' },
        { title: 'Security Ops', subtitle: 'OSCP :: PENTEST :: ZERO_TRUST', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=640&q=80' },
      ].map((card) => (
        <SpecCard key={card.title} {...card} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid layout showing multiple SpecCards — hover each to see the grayscale-to-colour transition.',
      },
    },
  },
};
