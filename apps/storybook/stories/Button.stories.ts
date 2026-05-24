import type { Meta, StoryObj } from '@storybook/vue3';
import { DsButton } from '@my-ds/ui';

const meta: Meta<typeof DsButton> = {
  title: 'Primitivos/Button',
  component: DsButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof DsButton>;

export const Primary: Story = {
  args: { variant: 'primary' },
  render: (args) => ({
    components: { DsButton },
    setup: () => ({ args }),
    template: '<DsButton v-bind="args">Guardar cambios</DsButton>',
  }),
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
  render: (args) => ({
    components: { DsButton },
    setup: () => ({ args }),
    template: '<DsButton v-bind="args">Cancelar</DsButton>',
  }),
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args) => ({
    components: { DsButton },
    setup: () => ({ args }),
    template: '<DsButton v-bind="args">Ver más</DsButton>',
  }),
};

export const Danger: Story = {
  args: { variant: 'danger' },
  render: (args) => ({
    components: { DsButton },
    setup: () => ({ args }),
    template: '<DsButton v-bind="args">Eliminar cuenta</DsButton>',
  }),
};

export const Loading: Story = {
  args: { loading: true },
  render: (args) => ({
    components: { DsButton },
    setup: () => ({ args }),
    template: '<DsButton v-bind="args">Cargando...</DsButton>',
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    components: { DsButton },
    setup: () => ({ args }),
    template: '<DsButton v-bind="args">Deshabilitado</DsButton>',
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { DsButton },
    template: `
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:16px;background:var(--ds-color-semantic-surface,#f9fafb)">
        <DsButton variant="primary">Primary</DsButton>
        <DsButton variant="secondary">Secondary</DsButton>
        <DsButton variant="ghost">Ghost</DsButton>
        <DsButton variant="danger">Danger</DsButton>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    components: { DsButton },
    template: `
      <div style="display:flex;gap:12px;align-items:center;padding:16px">
        <DsButton size="sm">Small</DsButton>
        <DsButton size="md">Medium</DsButton>
        <DsButton size="lg">Large</DsButton>
      </div>
    `,
  }),
};
