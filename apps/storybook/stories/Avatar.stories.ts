import type { Meta, StoryObj } from '@storybook/vue3';
import { DsAvatar } from '@my-ds/ui';

const meta: Meta<typeof DsAvatar> = {
  title: 'Primitivos/Avatar',
  component: DsAvatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'xl'] },
  },
};
export default meta;
type Story = StoryObj<typeof DsAvatar>;

export const ConImagen: Story = {
  args: { src: 'https://i.pravatar.cc/150?img=3', alt: 'Usuario', size: 'md' },
  render: (args) => ({
    components: { DsAvatar },
    setup: () => ({ args }),
    template: '<DsAvatar v-bind="args" />',
  }),
};

export const ConIniciales: Story = {
  args: { name: 'Mikel Jauregui', size: 'md' },
  render: (args) => ({
    components: { DsAvatar },
    setup: () => ({ args }),
    template: '<DsAvatar v-bind="args" />',
  }),
};

export const SinDatos: Story = {
  args: { size: 'md' },
  render: (args) => ({
    components: { DsAvatar },
    setup: () => ({ args }),
    template: '<DsAvatar v-bind="args" />',
  }),
};

export const TodosLosTamaños: Story = {
  render: () => ({
    components: { DsAvatar },
    template: `
      <div style="display:flex;gap:16px;align-items:center;padding:16px">
        <DsAvatar name="Ana García" size="sm" />
        <DsAvatar name="Ana García" size="md" />
        <DsAvatar name="Ana García" size="lg" />
        <DsAvatar name="Ana García" size="xl" />
      </div>
    `,
  }),
};
