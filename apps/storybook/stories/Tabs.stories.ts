import type { Meta, StoryObj } from '@storybook/vue3';
import { DsTabs } from '@my-ds/ui';
import { ref } from 'vue';

const tabs = [
  { id: 'overview', label: 'Resumen' },
  { id: 'activity', label: 'Actividad' },
  { id: 'settings', label: 'Configuración' },
  { id: 'disabled', label: 'Bloqueado', disabled: true },
];

const meta: Meta<typeof DsTabs> = {
  title: 'Navegación/Tabs',
  component: DsTabs,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['line', 'pill'] },
  },
};
export default meta;
type Story = StoryObj<typeof DsTabs>;

export const Line: Story = {
  render: () => ({
    components: { DsTabs },
    setup() {
      const active = ref('overview');
      return { tabs, active };
    },
    template: `
      <DsTabs :tabs="tabs" v-model="active" variant="line">
        <template #overview><p class="text-sm text-gray-600">Contenido de Resumen</p></template>
        <template #activity><p class="text-sm text-gray-600">Contenido de Actividad</p></template>
        <template #settings><p class="text-sm text-gray-600">Contenido de Configuración</p></template>
        <template #disabled><p class="text-sm text-gray-600">No deberías ver esto</p></template>
      </DsTabs>
    `,
  }),
};

export const Pill: Story = {
  render: () => ({
    components: { DsTabs },
    setup() {
      const active = ref('overview');
      return { tabs, active };
    },
    template: `
      <DsTabs :tabs="tabs" v-model="active" variant="pill">
        <template #overview><p class="text-sm text-gray-600">Contenido de Resumen</p></template>
        <template #activity><p class="text-sm text-gray-600">Contenido de Actividad</p></template>
        <template #settings><p class="text-sm text-gray-600">Contenido de Configuración</p></template>
        <template #disabled><p class="text-sm text-gray-600">No deberías ver esto</p></template>
      </DsTabs>
    `,
  }),
};
