import type { Meta, StoryObj } from '@storybook/vue3';
import { DsModal, DsButton } from '@my-ds/ui';
import { ref } from 'vue';

const meta: Meta<typeof DsModal> = {
  title: 'Primitivos/Modal',
  component: DsModal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    closeOnBackdrop: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof DsModal>;

export const Default: Story = {
  render: () => ({
    components: { DsModal, DsButton },
    setup() {
      const open = ref(false);
      return { open };
    },
    template: `
      <div style="padding:16px">
        <DsButton @click="open = true">Abrir Modal</DsButton>
        <DsModal v-model="open" title="Confirmación">
          <p style="margin:0;color:#6b7280">¿Estás seguro de que quieres continuar con esta acción?</p>
          <template #footer>
            <DsButton variant="ghost" @click="open = false">Cancelar</DsButton>
            <DsButton variant="primary" @click="open = false">Confirmar</DsButton>
          </template>
        </DsModal>
      </div>
    `,
  }),
};

export const Danger: Story = {
  render: () => ({
    components: { DsModal, DsButton },
    setup() {
      const open = ref(false);
      return { open };
    },
    template: `
      <div style="padding:16px">
        <DsButton variant="danger" @click="open = true">Eliminar cuenta</DsButton>
        <DsModal v-model="open" title="Eliminar cuenta" size="sm">
          <p style="margin:0;color:#6b7280">Esta acción es irreversible. Se eliminarán todos tus datos permanentemente.</p>
          <template #footer>
            <DsButton variant="ghost" @click="open = false">Cancelar</DsButton>
            <DsButton variant="danger" @click="open = false">Sí, eliminar</DsButton>
          </template>
        </DsModal>
      </div>
    `,
  }),
};

export const Grande: Story = {
  render: () => ({
    components: { DsModal, DsButton },
    setup() {
      const open = ref(false);
      return { open };
    },
    template: `
      <div style="padding:16px">
        <DsButton @click="open = true">Modal grande</DsButton>
        <DsModal v-model="open" title="Términos y condiciones" size="lg">
          <p style="color:#6b7280;line-height:1.6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p style="color:#6b7280;line-height:1.6">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
          </p>
          <template #footer>
            <DsButton variant="ghost" @click="open = false">Rechazar</DsButton>
            <DsButton variant="primary" @click="open = false">Aceptar</DsButton>
          </template>
        </DsModal>
      </div>
    `,
  }),
};
