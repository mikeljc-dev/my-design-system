import type { Meta, StoryObj } from '@storybook/vue3';
import { DsCard, DsButton, DsBadge } from '@my-ds/ui';

const meta: Meta<typeof DsCard> = {
  title: 'Primitivos/Card',
  component: DsCard,
  tags: ['autodocs'],
  argTypes: {
    shadow:  { control: 'radio',   options: ['none', 'sm', 'md', 'lg'] },
    padding: { control: 'radio',   options: ['none', 'sm', 'md', 'lg'] },
    bordered: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof DsCard>;

export const Simple: Story = {
  render: () => ({
    components: { DsCard },
    template: `
      <DsCard style="max-width:360px">
        <h3 style="margin:0 0 8px;font-size:18px">Título de la card</h3>
        <p style="margin:0;color:#6b7280;font-size:14px">
          Contenido de ejemplo para mostrar cómo queda una card con padding normal.
        </p>
      </DsCard>
    `,
  }),
};

export const ConHeaderYFooter: Story = {
  render: () => ({
    components: { DsCard, DsButton, DsBadge },
    template: `
      <DsCard style="max-width:380px">
        <template #header>
          <div style="display:flex;align-items:center;justify-content:space-between">
            <span>Resumen del proyecto</span>
            <DsBadge variant="success">Activo</DsBadge>
          </div>
        </template>
        <p style="margin:0;color:#6b7280;font-size:14px">
          Este proyecto está en fase de desarrollo y tiene 3 tareas pendientes.
        </p>
        <template #footer>
          <div style="display:flex;gap:8px">
            <DsButton variant="primary" size="sm">Ver detalles</DsButton>
            <DsButton variant="ghost" size="sm">Archivar</DsButton>
          </div>
        </template>
      </DsCard>
    `,
  }),
};

export const TodasLasSombras: Story = {
  render: () => ({
    components: { DsCard },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px;padding:24px;background:#f9fafb">
        <DsCard shadow="none"  style="min-width:150px"><p style="margin:0;font-size:14px">Sin sombra</p></DsCard>
        <DsCard shadow="sm"   style="min-width:150px"><p style="margin:0;font-size:14px">Sombra sm</p></DsCard>
        <DsCard shadow="md"   style="min-width:150px"><p style="margin:0;font-size:14px">Sombra md</p></DsCard>
        <DsCard shadow="lg"   style="min-width:150px"><p style="margin:0;font-size:14px">Sombra lg</p></DsCard>
      </div>
    `,
  }),
};
