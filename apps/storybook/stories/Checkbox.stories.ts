import type { Meta, StoryObj } from '@storybook/vue3';
import { DsCheckbox } from '@my-ds/ui';

const meta: Meta<typeof DsCheckbox> = {
  title: 'Formularios/Checkbox',
  component: DsCheckbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof DsCheckbox>;

export const Default: Story = {
  args: { label: 'Acepto los términos y condiciones', modelValue: false },
  render: (args) => ({
    components: { DsCheckbox },
    setup: () => ({ args }),
    template: '<DsCheckbox v-bind="args" />',
  }),
};

export const Checked: Story = {
  args: { label: 'Opción seleccionada', modelValue: true },
  render: (args) => ({
    components: { DsCheckbox },
    setup: () => ({ args }),
    template: '<DsCheckbox v-bind="args" />',
  }),
};

export const Indeterminate: Story = {
  args: { label: 'Selección parcial', modelValue: false, indeterminate: true },
  render: (args) => ({
    components: { DsCheckbox },
    setup: () => ({ args }),
    template: '<DsCheckbox v-bind="args" />',
  }),
};

export const WithHint: Story = {
  args: { label: 'Suscribirse al newsletter', hint: 'Recibirás novedades cada semana', modelValue: false },
  render: (args) => ({
    components: { DsCheckbox },
    setup: () => ({ args }),
    template: '<DsCheckbox v-bind="args" />',
  }),
};

export const WithError: Story = {
  args: { label: 'Acepto los términos', error: 'Debes aceptar los términos para continuar', modelValue: false },
  render: (args) => ({
    components: { DsCheckbox },
    setup: () => ({ args }),
    template: '<DsCheckbox v-bind="args" />',
  }),
};

export const Disabled: Story = {
  args: { label: 'Opción deshabilitada', modelValue: false, disabled: true },
  render: (args) => ({
    components: { DsCheckbox },
    setup: () => ({ args }),
    template: '<DsCheckbox v-bind="args" />',
  }),
};
