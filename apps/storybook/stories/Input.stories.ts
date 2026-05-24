import type { Meta, StoryObj } from '@storybook/vue3';
import { DsInput } from '@my-ds/ui';

const meta: Meta<typeof DsInput> = {
  title: 'Primitivos/Input',
  component: DsInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof DsInput>;

export const Default: Story = {
  args: { label: 'Email', placeholder: 'tu@email.com', modelValue: '' },
  render: (args) => ({
    components: { DsInput },
    setup: () => ({ args }),
    template: '<DsInput v-bind="args" style="max-width:320px" />',
  }),
};

export const WithError: Story = {
  args: { label: 'Email', modelValue: 'invalido', error: 'El email no es válido' },
  render: (args) => ({
    components: { DsInput },
    setup: () => ({ args }),
    template: '<DsInput v-bind="args" style="max-width:320px" />',
  }),
};

export const WithHint: Story = {
  args: { label: 'Contraseña', type: 'password', modelValue: '', hint: 'Mínimo 8 caracteres' },
  render: (args) => ({
    components: { DsInput },
    setup: () => ({ args }),
    template: '<DsInput v-bind="args" style="max-width:320px" />',
  }),
};

export const Disabled: Story = {
  args: { label: 'Campo deshabilitado', modelValue: 'No editable', disabled: true },
  render: (args) => ({
    components: { DsInput },
    setup: () => ({ args }),
    template: '<DsInput v-bind="args" style="max-width:320px" />',
  }),
};
