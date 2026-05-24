<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, useId } from 'vue';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
}

interface Props {
  items: DropdownItem[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  disabled?: boolean;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), { placement: 'bottom-start', disabled: false });
const emit  = defineEmits<{ select: [item: DropdownItem] }>();

const open        = ref(false);
const menuRef     = ref<HTMLElement | null>(null);
const triggerRef  = ref<HTMLElement | null>(null);
const activeIndex = ref(-1);

const menuId = useId();

const enabledItems = computed(() => props.items.filter(i => !i.separator && !i.disabled));

const positionClasses = computed(() => ({
  'bottom-start': 'top-full left-0 mt-1',
  'bottom-end':   'top-full right-0 mt-1',
  'top-start':    'bottom-full left-0 mb-1',
  'top-end':      'bottom-full right-0 mb-1',
}[props.placement]));

async function toggle() {
  if (props.disabled) return;
  open.value = !open.value;
  if (open.value) {
    activeIndex.value = -1;
    await nextTick();
    menuRef.value?.focus();
  }
}

function close() {
  open.value = false;
  activeIndex.value = -1;
  triggerRef.value?.focus();
}

function select(item: DropdownItem) {
  if (item.disabled || item.separator) return;
  emit('select', item);
  close();
}

function onKeydown(e: KeyboardEvent) {
  if (!open.value) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      toggle();
    }
    return;
  }

  const selectable = props.items.filter(i => !i.separator && !i.disabled);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const cur = selectable.findIndex(item => props.items.indexOf(item) === activeIndex.value);
    const nextIdx = (cur + 1) % selectable.length;
    activeIndex.value = props.items.indexOf(selectable[nextIdx]);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const cur = selectable.findIndex(item => props.items.indexOf(item) === activeIndex.value);
    const prevIdx = (cur - 1 + selectable.length) % selectable.length;
    activeIndex.value = props.items.indexOf(selectable[prevIdx]);
  } else if (e.key === 'Home') {
    e.preventDefault();
    activeIndex.value = props.items.indexOf(selectable[0]);
  } else if (e.key === 'End') {
    e.preventDefault();
    activeIndex.value = props.items.indexOf(selectable[selectable.length - 1]);
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const item = props.items[activeIndex.value];
    if (item) select(item);
  } else if (e.key === 'Escape' || e.key === 'Tab') {
    close();
  }
}

function onClickOutside(e: MouseEvent) {
  const el = (e.target as Node);
  if (!menuRef.value?.contains(el) && !triggerRef.value?.contains(el)) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside));
onBeforeUnmount(() => document.removeEventListener('mousedown', onClickOutside));
</script>

<template>
  <div class="relative inline-block">
    <!-- Trigger -->
    <div
      ref="triggerRef"
      :aria-haspopup="'menu'"
      :aria-expanded="open"
      :aria-controls="menuId"
      :aria-disabled="disabled"
      :aria-label="label"
      role="button"
      tabindex="0"
      @click="toggle"
      @keydown="onKeydown"
    >
      <slot :open="open">
        <button
          type="button"
          :disabled="disabled"
          :class="[
            'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-border bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer',
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          ]"
        >
          Options
          <svg
            :class="['w-4 h-4 text-gray-400 transition-transform duration-200', open && 'rotate-180']"
            viewBox="0 0 16 16" fill="none" aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </slot>
    </div>

    <!-- Menu -->
    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      leave-active-class="transition-all duration-100 ease-in"
      enter-from-class="opacity-0 scale-95"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        :id="menuId"
        ref="menuRef"
        role="menu"
        tabindex="-1"
        :class="[
          'absolute z-50 min-w-[160px] bg-white border border-border rounded-lg shadow-lg py-1 focus:outline-none origin-top-left',
          positionClasses,
        ]"
        @keydown="onKeydown"
      >
        <template v-for="(item, index) in items" :key="item.id">
          <div v-if="item.separator" class="my-1 border-t border-border" role="separator" />
          <button
            v-else
            role="menuitem"
            :aria-disabled="item.disabled"
            :class="[
              'w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors duration-100 cursor-pointer border-none bg-transparent',
              activeIndex === index ? 'bg-gray-100' : 'hover:bg-gray-50',
              item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
              item.danger ? 'text-danger' : 'text-gray-700',
            ]"
            @click="select(item)"
            @mouseenter="activeIndex = index"
          >
            <span v-if="item.icon" class="w-4 h-4 flex-shrink-0" aria-hidden="true" v-html="item.icon" />
            {{ item.label }}
          </button>
        </template>
      </div>
    </Transition>
  </div>
</template>
