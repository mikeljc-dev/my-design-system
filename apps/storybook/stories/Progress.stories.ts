import type { Meta, StoryObj } from '@storybook/vue3';
import { DsProgress } from '@my-ds/ui';

const meta: Meta<typeof DsProgress> = {
  title: 'Feedback/Progress',
  component: DsProgress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    variant: { control: 'select', options: ['primary', 'success', 'warning', 'danger'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    indeterminate: { control: 'boolean' },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof DsProgress>;

export const Default: Story = {
  args: { value: 60, label: 'Cargando archivos' },
  render: (args) => ({
    components: { DsProgress },
    setup: () => ({ args }),
    template: '<div class="w-80"><DsProgress v-bind="args" /></div>',
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { DsProgress },
    template: `
      <div class="w-80 flex flex-col gap-4">
        <DsProgress :value="70" variant="primary"  label="Primary" />
        <DsProgress :value="85" variant="success"  label="Success" />
        <DsProgress :value="45" variant="warning"  label="Warning" />
        <DsProgress :value="30" variant="danger"   label="Danger" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { DsProgress },
    template: `
      <div class="w-80 flex flex-col gap-4">
        <DsProgress :value="60" size="sm" label="Small" />
        <DsProgress :value="60" size="md" label="Medium" />
        <DsProgress :value="60" size="lg" label="Large" />
      </div>
    `,
  }),
};

export const WithValue: Story = {
  args: { value: 72, showValue: true, label: 'Subiendo archivo' },
  render: (args) => ({
    components: { DsProgress },
    setup: () => ({ args }),
    template: '<div class="w-80"><DsProgress v-bind="args" /></div>',
  }),
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Procesando...' },
  render: (args) => ({
    components: { DsProgress },
    setup: () => ({ args }),
    template: '<div class="w-80"><DsProgress v-bind="args" /></div>',
  }),
};
