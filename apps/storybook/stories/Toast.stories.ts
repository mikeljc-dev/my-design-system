import type { Meta, StoryObj } from '@storybook/vue3';
import { DsToast, DsButton } from '@my-ds/ui';
import { useToast } from '@my-ds/ui';

const meta: Meta<typeof DsToast> = {
  title: 'Primitivos/Toast',
  component: DsToast,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['info', 'success', 'danger', 'warning'] },
  },
};
export default meta;
type Story = StoryObj<typeof DsToast>;

export const TodasLasVariantes: Story = {
  render: () => ({
    components: { DsToast },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;padding:16px">
        <DsToast type="info"    message="Información: tu sesión expira en 5 minutos." />
        <DsToast type="success" message="¡Éxito! Los cambios se han guardado correctamente." />
        <DsToast type="warning" message="Atención: estás usando una versión de prueba." />
        <DsToast type="danger"  message="Error: no se pudo conectar con el servidor." />
      </div>
    `,
  }),
};

export const ConComposable: Story = {
  render: () => ({
    components: { DsToast, DsButton },
    setup() {
      const toast = useToast();
      return { toast };
    },
    template: `
      <div style="padding:16px">
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px">
          <DsButton variant="primary"   size="sm" @click="toast.success('¡Guardado correctamente!')">Success</DsButton>
          <DsButton variant="danger"    size="sm" @click="toast.danger('Error al conectar')">Danger</DsButton>
          <DsButton variant="secondary" size="sm" @click="toast.warning('Acción irreversible')">Warning</DsButton>
          <DsButton variant="ghost"     size="sm" @click="toast.info('Sesión expira pronto')">Info</DsButton>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <DsToast
            v-for="t in toast.toasts"
            :key="t.id"
            :message="t.message"
            :type="t.type"
            @close="toast.remove(t.id)"
          />
        </div>
      </div>
    `,
  }),
};
