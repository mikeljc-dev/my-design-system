import type { Meta, StoryObj } from '@storybook/vue3';
import { DsTextarea } from '@my-ds/ui';

const meta: Meta<typeof DsTextarea> = {
  title: 'Formularios/Textarea',
  component: DsTextarea,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    rows: { control: 'number' },
    maxlength: { control: 'number' },
    resize: { control: 'radio', options: ['none', 'vertical', 'horizontal', 'both'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof DsTextarea>;

export const Default: Story = {
  args: { label: 'Descripción', placeholder: 'Escribe aquí...', modelValue: '' },
  render: (args) => ({
    components: { DsTextarea },
    setup: () => ({ args }),
    template: '<DsTextarea v-bind="args" />',
  }),
};

export const WithCharCount: Story = {
  args: { label: 'Bio', maxlength: 160, modelValue: '', hint: 'Aparece en tu perfil público' },
  render: (args) => ({
    components: { DsTextarea },
    setup: () => ({ args }),
    template: '<DsTextarea v-bind="args" />',
  }),
};

export const WithError: Story = {
  args: { label: 'Comentario', error: 'El comentario no puede estar vacío', modelValue: '' },
  render: (args) => ({
    components: { DsTextarea },
    setup: () => ({ args }),
    template: '<DsTextarea v-bind="args" />',
  }),
};

export const Disabled: Story = {
  args: { label: 'Notas internas', modelValue: 'Contenido de solo lectura', disabled: true },
  render: (args) => ({
    components: { DsTextarea },
    setup: () => ({ args }),
    template: '<DsTextarea v-bind="args" />',
  }),
};
