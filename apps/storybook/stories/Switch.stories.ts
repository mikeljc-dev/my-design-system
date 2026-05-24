import type { Meta, StoryObj } from '@storybook/vue3';
import { DsSwitch } from '@my-ds/ui';

const meta: Meta<typeof DsSwitch> = {
  title: 'Formularios/Switch',
  component: DsSwitch,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof DsSwitch>;

export const Default: Story = {
  args: { label: 'Notificaciones activas', modelValue: false },
  render: (args) => ({
    components: { DsSwitch },
    setup: () => ({ args }),
    template: '<DsSwitch v-bind="args" />',
  }),
};

export const On: Story = {
  args: { label: 'Modo oscuro', modelValue: true },
  render: (args) => ({
    components: { DsSwitch },
    setup: () => ({ args }),
    template: '<DsSwitch v-bind="args" />',
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { DsSwitch },
    template: `
      <div class="flex flex-col gap-4">
        <DsSwitch label="Small" size="sm" :model-value="true" />
        <DsSwitch label="Medium" size="md" :model-value="true" />
        <DsSwitch label="Large" size="lg" :model-value="true" />
      </div>
    `,
  }),
};

export const WithHint: Story = {
  args: { label: 'Recibir emails', hint: 'Te enviaremos un resumen semanal', modelValue: false },
  render: (args) => ({
    components: { DsSwitch },
    setup: () => ({ args }),
    template: '<DsSwitch v-bind="args" />',
  }),
};

export const Disabled: Story = {
  args: { label: 'Función premium', modelValue: false, disabled: true },
  render: (args) => ({
    components: { DsSwitch },
    setup: () => ({ args }),
    template: '<DsSwitch v-bind="args" />',
  }),
};
