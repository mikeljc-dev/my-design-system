import type { Preview } from '@storybook/vue3';

// CSS de componentes con Tailwind v4 + tokens @theme
import '../../../packages/components/dist/ui.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { config: {} },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f9fafb' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark',  value: '#111827' },
      ],
    },
  },
};

export default preview;
