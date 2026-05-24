import type { Meta, StoryObj } from '@storybook/vue3';
import { DsDropdown, DsButton } from '@my-ds/ui';

const defaultItems = [
  { id: 'edit',    label: 'Editar' },
  { id: 'dup',     label: 'Duplicar' },
  { id: 'sep1',    label: '', separator: true },
  { id: 'archive', label: 'Archivar' },
  { id: 'delete',  label: 'Eliminar', danger: true },
];

const meta: Meta<typeof DsDropdown> = {
  title: 'Overlays/Dropdown',
  component: DsDropdown,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'] },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof DsDropdown>;

export const Default: Story = {
  render: () => ({
    components: { DsDropdown },
    setup: () => ({ items: defaultItems }),
    template: `
      <div class="flex items-start p-8">
        <DsDropdown :items="items" @select="(i) => alert('Seleccionaste: ' + i.label)" />
      </div>
    `,
  }),
};

export const CustomTrigger: Story = {
  render: () => ({
    components: { DsDropdown, DsButton },
    setup: () => ({ items: defaultItems }),
    template: `
      <div class="flex items-start p-8">
        <DsDropdown :items="items">
          <template #default="{ open }">
            <DsButton variant="secondary" size="sm">
              Acciones {{ open ? '▲' : '▼' }}
            </DsButton>
          </template>
        </DsDropdown>
      </div>
    `,
  }),
};

export const EndPlacement: Story = {
  render: () => ({
    components: { DsDropdown },
    setup: () => ({ items: defaultItems }),
    template: `
      <div class="flex justify-end p-8">
        <DsDropdown :items="items" placement="bottom-end" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    components: { DsDropdown },
    setup: () => ({ items: defaultItems }),
    template: `
      <div class="flex items-start p-8">
        <DsDropdown :items="items" :disabled="true" />
      </div>
    `,
  }),
};
