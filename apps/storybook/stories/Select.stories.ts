import type { Meta, StoryObj } from '@storybook/vue3';
import { DsSelect } from '@my-ds/ui';

const countryOptions = [
  { value: 'es', label: 'España' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' },
  { value: 'co', label: 'Colombia' },
];

const meta: Meta<typeof DsSelect> = {
  title: 'Formularios/Select',
  component: DsSelect,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof DsSelect>;

export const Default: Story = {
  args: { label: 'País', placeholder: 'Selecciona un país', modelValue: '' },
  render: (args) => ({
    components: { DsSelect },
    setup: () => ({ args, options: countryOptions }),
    template: '<DsSelect v-bind="args" :options="options" />',
  }),
};

export const WithValue: Story = {
  args: { label: 'País', modelValue: 'mx' },
  render: (args) => ({
    components: { DsSelect },
    setup: () => ({ args, options: countryOptions }),
    template: '<DsSelect v-bind="args" :options="options" />',
  }),
};

export const WithHint: Story = {
  args: { label: 'Zona horaria', hint: 'Esto afectará los horarios mostrados', modelValue: '' },
  render: (args) => ({
    components: { DsSelect },
    setup: () => ({ args, options: countryOptions }),
    template: '<DsSelect v-bind="args" :options="options" />',
  }),
};

export const WithError: Story = {
  args: { label: 'País', error: 'Selecciona un país para continuar', modelValue: '' },
  render: (args) => ({
    components: { DsSelect },
    setup: () => ({ args, options: countryOptions }),
    template: '<DsSelect v-bind="args" :options="options" />',
  }),
};

export const Disabled: Story = {
  args: { label: 'Región (no disponible)', modelValue: '', disabled: true },
  render: (args) => ({
    components: { DsSelect },
    setup: () => ({ args, options: countryOptions }),
    template: '<DsSelect v-bind="args" :options="options" />',
  }),
};
