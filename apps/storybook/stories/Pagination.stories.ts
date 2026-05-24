import type { Meta, StoryObj } from '@storybook/vue3';
import { DsPagination } from '@my-ds/ui';
import { ref } from 'vue';

const meta: Meta<typeof DsPagination> = {
  title: 'Navegación/Pagination',
  component: DsPagination,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: { type: 'number', min: 1 } },
    total: { control: 'number' },
    perPage: { control: 'number' },
    siblings: { control: { type: 'number', min: 0, max: 3 } },
  },
};
export default meta;
type Story = StoryObj<typeof DsPagination>;

export const Default: Story = {
  render: () => ({
    components: { DsPagination },
    setup() {
      const page = ref(1);
      return { page };
    },
    template: '<DsPagination v-model="page" :total="100" :per-page="10" />',
  }),
};

export const MiddlePage: Story = {
  render: () => ({
    components: { DsPagination },
    setup() {
      const page = ref(5);
      return { page };
    },
    template: '<DsPagination v-model="page" :total="200" :per-page="10" />',
  }),
};

export const FewPages: Story = {
  render: () => ({
    components: { DsPagination },
    setup() {
      const page = ref(2);
      return { page };
    },
    template: '<DsPagination v-model="page" :total="40" :per-page="10" />',
  }),
};

export const WideSiblings: Story = {
  render: () => ({
    components: { DsPagination },
    setup() {
      const page = ref(10);
      return { page };
    },
    template: '<DsPagination v-model="page" :total="500" :per-page="10" :siblings="2" />',
  }),
};
