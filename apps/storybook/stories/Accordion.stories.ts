import type { Meta, StoryObj } from '@storybook/vue3';
import { DsAccordion } from '@my-ds/ui';

const items = [
  { id: 'q1', title: '¿Qué incluye el plan gratuito?' },
  { id: 'q2', title: '¿Puedo cancelar en cualquier momento?' },
  { id: 'q3', title: '¿Ofrecen soporte técnico?', disabled: false },
  { id: 'q4', title: 'Opción deshabilitada', disabled: true },
];

const meta: Meta<typeof DsAccordion> = {
  title: 'Navegación/Accordion',
  component: DsAccordion,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof DsAccordion>;

export const Default: Story = {
  render: () => ({
    components: { DsAccordion },
    setup: () => ({ items }),
    template: `
      <div class="w-96">
        <DsAccordion :items="items">
          <template #q1>El plan gratuito incluye hasta 3 proyectos, 1 GB de almacenamiento y acceso a funciones básicas.</template>
          <template #q2>Sí, puedes cancelar tu suscripción en cualquier momento sin penalización. El acceso continúa hasta el fin del período pagado.</template>
          <template #q3>Ofrecemos soporte por email con respuesta en 24 horas para todos los planes, y soporte prioritario 24/7 para planes Business.</template>
          <template #q4>Esta opción está deshabilitada.</template>
        </DsAccordion>
      </div>
    `,
  }),
};

export const Multiple: Story = {
  render: () => ({
    components: { DsAccordion },
    setup: () => ({ items }),
    template: `
      <div class="w-96">
        <DsAccordion :items="items" :multiple="true" :default-open="['q1']">
          <template #q1>El plan gratuito incluye hasta 3 proyectos, 1 GB de almacenamiento y acceso a funciones básicas.</template>
          <template #q2>Sí, puedes cancelar tu suscripción en cualquier momento sin penalización.</template>
          <template #q3>Ofrecemos soporte por email con respuesta en 24 horas para todos los planes.</template>
          <template #q4>Esta opción está deshabilitada.</template>
        </DsAccordion>
      </div>
    `,
  }),
};
