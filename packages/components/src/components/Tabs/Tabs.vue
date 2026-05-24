<script setup lang="ts">
import { provide, computed } from 'vue';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  tabs: TabItem[];
  modelValue?: string;
  variant?: 'line' | 'pill';
}

const props = withDefaults(defineProps<Props>(), { variant: 'line' });
const emit  = defineEmits<{ 'update:modelValue': [id: string] }>();

const active = computed({
  get: () => props.modelValue ?? props.tabs[0]?.id,
  set: (v) => emit('update:modelValue', v),
});

provide('ds-tabs-active', active);

function selectTab(id: string) {
  if (!props.tabs.find(t => t.id === id)?.disabled) active.value = id;
}

function onKeydown(e: KeyboardEvent, currentId: string) {
  const enabled = props.tabs.filter(t => !t.disabled);
  const idx = enabled.findIndex(t => t.id === currentId);
  if (e.key === 'ArrowRight') {
    const next = enabled[(idx + 1) % enabled.length];
    selectTab(next.id);
    (document.getElementById(`tab-${next.id}`) as HTMLElement)?.focus();
  }
  if (e.key === 'ArrowLeft') {
    const prev = enabled[(idx - 1 + enabled.length) % enabled.length];
    selectTab(prev.id);
    (document.getElementById(`tab-${prev.id}`) as HTMLElement)?.focus();
  }
  if (e.key === 'Home') { selectTab(enabled[0].id); }
  if (e.key === 'End')  { selectTab(enabled[enabled.length - 1].id); }
}
</script>

<template>
  <div>
    <!-- Tab list -->
    <div
      role="tablist"
      :class="[
        'flex',
        variant === 'line' ? 'border-b border-border gap-0' : 'gap-1 bg-gray-100 p-1 rounded-lg w-fit',
      ]"
      :aria-label="$attrs['aria-label'] as string"
    >
      <button
        v-for="tab in tabs"
        :id="`tab-${tab.id}`"
        :key="tab.id"
        role="tab"
        :aria-selected="active === tab.id"
        :aria-controls="`panel-${tab.id}`"
        :aria-disabled="tab.disabled"
        :tabindex="active === tab.id ? 0 : -1"
        :class="[
          'px-4 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md',
          tab.disabled && 'opacity-40 cursor-not-allowed',
          variant === 'line'
            ? [
                'rounded-none border-b-2 -mb-px',
                active === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300',
              ]
            : [
                active === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900',
              ],
        ]"
        @click="selectTab(tab.id)"
        @keydown="onKeydown($event, tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab panels -->
    <div
      v-for="tab in tabs"
      :id="`panel-${tab.id}`"
      :key="tab.id"
      role="tabpanel"
      :aria-labelledby="`tab-${tab.id}`"
      :hidden="active !== tab.id"
      class="pt-4 focus:outline-none"
      tabindex="0"
    >
      <slot :name="tab.id" />
    </div>
  </div>
</template>
