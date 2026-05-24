import type { Meta, StoryObj } from '@storybook/vue3';
import { DsSpinner } from '@my-ds/ui';

const meta: Meta<typeof DsSpinner> = {
  title: 'Feedback/Spinner',
  component: DsSpinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['xs', 'sm', 'md', 'lg'] },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof DsSpinner>;

export const Default: Story = {
  args: { size: 'md' },
  render: (args) => ({
    components: { DsSpinner },
    setup: () => ({ args }),
    template: '<DsSpinner v-bind="args" />',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { DsSpinner },
    template: `
      <div class="flex items-center gap-6">
        <DsSpinner size="xs" />
        <DsSpinner size="sm" />
        <DsSpinner size="md" />
        <DsSpinner size="lg" />
      </div>
    `,
  }),
};

export const WithLabel: Story = {
  args: { size: 'md', label: 'Cargando datos...' },
  render: (args) => ({
    components: { DsSpinner },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center gap-2">
        <DsSpinner v-bind="args" />
        <span class="text-sm text-gray-600">{{ args.label }}</span>
      </div>
    `,
  }),
};
