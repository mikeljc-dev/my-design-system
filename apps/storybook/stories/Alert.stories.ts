import type { Meta, StoryObj } from '@storybook/vue3';
import { DsAlert } from '@my-ds/ui';

const meta: Meta<typeof DsAlert> = {
  title: 'Feedback/Alert',
  component: DsAlert,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    title: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof DsAlert>;

export const Info: Story = {
  args: { type: 'info', title: 'Información' },
  render: (args) => ({
    components: { DsAlert },
    setup: () => ({ args }),
    template: '<DsAlert v-bind="args">Tu cuenta ha sido actualizada correctamente.</DsAlert>',
  }),
};

export const Success: Story = {
  args: { type: 'success', title: '¡Éxito!' },
  render: (args) => ({
    components: { DsAlert },
    setup: () => ({ args }),
    template: '<DsAlert v-bind="args">Los cambios se han guardado correctamente.</DsAlert>',
  }),
};

export const Warning: Story = {
  args: { type: 'warning', title: 'Advertencia' },
  render: (args) => ({
    components: { DsAlert },
    setup: () => ({ args }),
    template: '<DsAlert v-bind="args">Tu suscripción expira en 3 días.</DsAlert>',
  }),
};

export const Danger: Story = {
  args: { type: 'danger', title: 'Error' },
  render: (args) => ({
    components: { DsAlert },
    setup: () => ({ args }),
    template: '<DsAlert v-bind="args">No se pudo procesar el pago. Verifica tus datos.</DsAlert>',
  }),
};

export const Dismissible: Story = {
  args: { type: 'info', title: 'Nuevo mensaje', dismissible: true },
  render: (args) => ({
    components: { DsAlert },
    setup: () => ({ args }),
    template: '<DsAlert v-bind="args">Tienes 3 mensajes sin leer en tu bandeja.</DsAlert>',
  }),
};

export const NoTitle: Story = {
  args: { type: 'success' },
  render: (args) => ({
    components: { DsAlert },
    setup: () => ({ args }),
    template: '<DsAlert v-bind="args">Perfil guardado correctamente.</DsAlert>',
  }),
};
