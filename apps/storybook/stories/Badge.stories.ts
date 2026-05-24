import type { Meta, StoryObj } from '@storybook/vue3';
import { DsBadge } from '@my-ds/ui';

const meta: Meta<typeof DsBadge> = {
  title: 'Primitivos/Badge',
  component: DsBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'danger', 'warning'],
    },
    size: { control: 'radio', options: ['sm', 'md'] },
    dot:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof DsBadge>;

export const AllVariants: Story = {
  render: () => ({
    components: { DsBadge },
    template: `
      <div style="display:flex;gap:8px;flex-wrap:wrap;padding:16px">
        <DsBadge variant="default">Default</DsBadge>
        <DsBadge variant="primary">Primary</DsBadge>
        <DsBadge variant="success">Success</DsBadge>
        <DsBadge variant="danger">Danger</DsBadge>
        <DsBadge variant="warning">Warning</DsBadge>
      </div>
    `,
  }),
};

export const WithDot: Story = {
  render: () => ({
    components: { DsBadge },
    template: `
      <div style="display:flex;gap:8px;padding:16px">
        <DsBadge variant="success" :dot="true">Online</DsBadge>
        <DsBadge variant="danger"  :dot="true">Error</DsBadge>
      </div>
    `,
  }),
};
