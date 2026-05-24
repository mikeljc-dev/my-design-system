import type { Meta, StoryObj } from '@storybook/vue3';
import { DsSkeleton } from '@my-ds/ui';

const meta: Meta<typeof DsSkeleton> = {
  title: 'Feedback/Skeleton',
  component: DsSkeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['text', 'circle', 'rect'] },
    lines: { control: 'number' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof DsSkeleton>;

export const Text: Story = {
  args: { variant: 'text', lines: 3 },
  render: (args) => ({
    components: { DsSkeleton },
    setup: () => ({ args }),
    template: '<div class="w-80"><DsSkeleton v-bind="args" /></div>',
  }),
};

export const Circle: Story = {
  args: { variant: 'circle', width: '48px', height: '48px' },
  render: (args) => ({
    components: { DsSkeleton },
    setup: () => ({ args }),
    template: '<DsSkeleton v-bind="args" />',
  }),
};

export const Rect: Story = {
  args: { variant: 'rect', width: '100%', height: '200px' },
  render: (args) => ({
    components: { DsSkeleton },
    setup: () => ({ args }),
    template: '<div class="w-80"><DsSkeleton v-bind="args" /></div>',
  }),
};

export const CardPlaceholder: Story = {
  render: () => ({
    components: { DsSkeleton },
    template: `
      <div class="w-72 p-4 border border-border rounded-xl flex flex-col gap-3">
        <DsSkeleton variant="rect" height="160px" />
        <div class="flex items-center gap-3">
          <DsSkeleton variant="circle" width="40px" height="40px" />
          <div class="flex-1">
            <DsSkeleton variant="text" :lines="2" />
          </div>
        </div>
      </div>
    `,
  }),
};
