import type { Preview } from '@storybook/react';
import '../index.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#050505' },
        { name: 'panel', value: '#0a0a0a' },
        { name: 'terminal', value: '#0d1117' },
      ],
    },
    layout: 'padded',
  },
};

export default preview;
