import type { Meta, StoryObj } from '@storybook/react-vite';
import SkillGroup from './SkillGroup';

const meta: Meta<typeof SkillGroup> = {
  title: 'Credentials/SkillGroup',
  component: SkillGroup,
  parameters: {
    docs: {
      description: {
        component: 'Grouped skill tag block used in the Credentials section. Renders a labelled collection of plain-text technology badges.',
      },
    },
  },
  argTypes: {
    title: { description: 'Group category label (e.g. "LANGUAGES", "CLOUD & INFRA")' },
    items: { description: 'Array of skill strings to display as individual tags' },
  },
};

export default meta;
type Story = StoryObj<typeof SkillGroup>;

export const Default: Story = {
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
  args: {
    title: 'LANGUAGES',
    items: ['Ruby', 'TypeScript', 'Python', 'Go', 'SQL', 'Bash'],
  },
};

export const CloudInfra: Story = {
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
  args: {
    title: 'CLOUD & INFRA',
    items: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Docker', 'GitHub Actions'],
  },
};

export const AllGroups: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
      <SkillGroup title="LANGUAGES" items={['Ruby', 'TypeScript', 'Python', 'Go', 'SQL']} />
      <SkillGroup title="FRAMEWORKS" items={['Rails', 'NestJS', 'React', 'Next.js', 'Sinatra']} />
      <SkillGroup title="CLOUD & INFRA" items={['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Docker']} />
      <SkillGroup title="DATABASES" items={['PostgreSQL', 'Redis', 'MongoDB', 'Elasticsearch']} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Four groups laid out in a two-column grid, matching the Credentials page layout.',
      },
    },
  },
};
