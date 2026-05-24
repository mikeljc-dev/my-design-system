import type { Meta, StoryObj } from '@storybook/vue3';
import { DsTooltip, DsButton } from '@my-ds/ui';

const meta: Meta<typeof DsTooltip> = {
  title: 'Overlays/Tooltip',
  component: DsTooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    delay: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<typeof DsTooltip>;

export const Default: Story = {
  args: { content: 'Texto de ayuda', placement: 'top' },
  render: (args) => ({
    components: { DsTooltip, DsButton },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center p-16">
        <DsTooltip v-bind="args">
          <DsButton>Pasa el cursor</DsButton>
        </DsTooltip>
      </div>
    `,
  }),
};

export const Placements: Story = {
  render: () => ({
    components: { DsTooltip, DsButton },
    template: `
      <div class="flex flex-wrap items-center justify-center gap-8 p-16">
        <DsTooltip content="Arriba" placement="top">
          <DsButton variant="secondary" size="sm">Top</DsButton>
        </DsTooltip>
        <DsTooltip content="Abajo" placement="bottom">
          <DsButton variant="secondary" size="sm">Bottom</DsButton>
        </DsTooltip>
        <DsTooltip content="Izquierda" placement="left">
          <DsButton variant="secondary" size="sm">Left</DsButton>
        </DsTooltip>
        <DsTooltip content="Derecha" placement="right">
          <DsButton variant="secondary" size="sm">Right</DsButton>
        </DsTooltip>
      </div>
    `,
  }),
};

export const WithDelay: Story = {
  args: { content: 'Aparece con retraso de 500ms', placement: 'top', delay: 500 },
  render: (args) => ({
    components: { DsTooltip, DsButton },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center p-16">
        <DsTooltip v-bind="args">
          <DsButton variant="ghost">Con delay</DsButton>
        </DsTooltip>
      </div>
    `,
  }),
};
