import type { Meta, StoryObj } from '@storybook/vue3';
import { DsRadio } from '@my-ds/ui';
import { ref } from 'vue';

const meta: Meta<typeof DsRadio> = {
  title: 'Formularios/Radio',
  component: DsRadio,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof DsRadio>;

export const Default: Story = {
  args: { label: 'Opción A', value: 'a', modelValue: '' },
  render: (args) => ({
    components: { DsRadio },
    setup: () => ({ args }),
    template: '<DsRadio v-bind="args" />',
  }),
};

export const Group: Story = {
  render: () => ({
    components: { DsRadio },
    setup() {
      const selected = ref('monthly');
      return { selected };
    },
    template: `
      <div class="flex flex-col gap-3">
        <DsRadio v-model="selected" value="monthly" label="Facturación mensual" description="$12/mes" />
        <DsRadio v-model="selected" value="yearly"  label="Facturación anual"   description="$100/año — ahorra 2 meses" />
        <DsRadio v-model="selected" value="lifetime" label="Licencia vitalicia"  description="$299 pago único" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { label: 'Opción no disponible', value: 'x', modelValue: '', disabled: true },
  render: (args) => ({
    components: { DsRadio },
    setup: () => ({ args }),
    template: '<DsRadio v-bind="args" />',
  }),
};
