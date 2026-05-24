<script setup lang="ts">
import { ref } from 'vue';

export interface AccordionItem {
  id: string;
  title: string;
  disabled?: boolean;
}

interface Props {
  items: AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
}

const props = withDefaults(defineProps<Props>(), { multiple: false, defaultOpen: () => [] });

const openIds = ref<Set<string>>(new Set(props.defaultOpen));

function toggle(id: string) {
  if (props.items.find(i => i.id === id)?.disabled) return;
  if (openIds.value.has(id)) {
    openIds.value.delete(id);
  } else {
    if (!props.multiple) openIds.value.clear();
    openIds.value.add(id);
  }
  openIds.value = new Set(openIds.value);
}

function isOpen(id: string) {
  return openIds.value.has(id);
}
</script>

<template>
  <div class="divide-y divide-border border border-border rounded-xl overflow-hidden">
    <div v-for="item in items" :key="item.id">
      <button
        :id="`accordion-btn-${item.id}`"
        :aria-expanded="isOpen(item.id)"
        :aria-controls="`accordion-panel-${item.id}`"
        :aria-disabled="item.disabled"
        :class="[
          'w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-left transition-colors duration-150 cursor-pointer bg-transparent border-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50 focus-visible:outline-none',
          isOpen(item.id) ? 'bg-gray-50 text-gray-900' : 'text-gray-700 hover:bg-gray-50',
          item.disabled && 'opacity-50 cursor-not-allowed',
        ]"
        @click="toggle(item.id)"
      >
        <span>{{ item.title }}</span>
        <svg
          :class="['w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0', isOpen(item.id) && 'rotate-180']"
          viewBox="0 0 16 16" fill="none" aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-1"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div
          v-show="isOpen(item.id)"
          :id="`accordion-panel-${item.id}`"
          role="region"
          :aria-labelledby="`accordion-btn-${item.id}`"
          class="px-5 pb-4 pt-1 text-sm text-gray-600"
        >
          <slot :name="item.id" />
        </div>
      </Transition>
    </div>
  </div>
</template>
