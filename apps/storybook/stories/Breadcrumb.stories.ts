import type { Meta, StoryObj } from '@storybook/vue3';
import { DsBreadcrumb } from '@my-ds/ui';

const meta: Meta<typeof DsBreadcrumb> = {
  title: 'Navegación/Breadcrumb',
  component: DsBreadcrumb,
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof DsBreadcrumb>;

export const Default: Story = {
  render: () => ({
    components: { DsBreadcrumb },
    setup: () => ({
      items: [
        { label: 'Inicio', href: '/' },
        { label: 'Productos', href: '/products' },
        { label: 'Camisetas', href: '/products/t-shirts' },
        { label: 'Camiseta azul', current: true },
      ],
    }),
    template: '<DsBreadcrumb :items="items" />',
  }),
};

export const Short: Story = {
  render: () => ({
    components: { DsBreadcrumb },
    setup: () => ({
      items: [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Configuración', current: true },
      ],
    }),
    template: '<DsBreadcrumb :items="items" />',
  }),
};

export const CustomSeparator: Story = {
  render: () => ({
    components: { DsBreadcrumb },
    setup: () => ({
      items: [
        { label: 'Docs', href: '/docs' },
        { label: 'Componentes', href: '/docs/components' },
        { label: 'Button', current: true },
      ],
    }),
    template: '<DsBreadcrumb :items="items" separator="›" />',
  }),
};
