<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: number;
  total: number;
  perPage?: number;
  siblings?: number;
}

const props = withDefaults(defineProps<Props>(), { perPage: 10, siblings: 1 });
const emit  = defineEmits<{ 'update:modelValue': [page: number] }>();

const totalPages = computed(() => Math.ceil(props.total / props.perPage));

const pages = computed(() => {
  const cur   = props.modelValue;
  const total = totalPages.value;
  const sib   = props.siblings;
  const range = (from: number, to: number) =>
    Array.from({ length: to - from + 1 }, (_, i) => from + i);

  if (total <= 5 + sib * 2) return range(1, total);

  const left  = Math.max(2, cur - sib);
  const right = Math.min(total - 1, cur + sib);
  const showLeft  = left > 2;
  const showRight = right < total - 1;

  return [
    1,
    ...(showLeft ? ['...'] : []),
    ...range(left, right),
    ...(showRight ? ['...'] : []),
    total,
  ] as (number | '...')[];
});

function go(page: number) {
  if (page < 1 || page > totalPages.value || page === props.modelValue) return;
  emit('update:modelValue', page);
}
</script>

<template>
  <nav aria-label="Paginación" class="flex items-center gap-1">
    <!-- Anterior -->
    <button
      :disabled="modelValue === 1"
      :aria-label="`Página anterior`"
      :class="[
        'flex items-center justify-center w-9 h-9 rounded-md text-sm border border-border transition-colors duration-150 cursor-pointer',
        modelValue === 1
          ? 'opacity-40 cursor-not-allowed bg-white text-gray-400'
          : 'bg-white text-gray-700 hover:bg-gray-50',
      ]"
      @click="go(modelValue - 1)"
    >
      <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Páginas -->
    <template v-for="page in pages" :key="String(page)">
      <span v-if="page === '...'" class="flex items-center justify-center w-9 h-9 text-sm text-gray-400 select-none">…</span>
      <button
        v-else
        :aria-label="`Página ${page}`"
        :aria-current="page === modelValue ? 'page' : undefined"
        :class="[
          'flex items-center justify-center w-9 h-9 rounded-md text-sm border transition-colors duration-150 cursor-pointer font-medium',
          page === modelValue
            ? 'bg-primary text-white border-primary'
            : 'bg-white text-gray-700 border-border hover:bg-gray-50',
        ]"
        @click="go(page as number)"
      >
        {{ page }}
      </button>
    </template>

    <!-- Siguiente -->
    <button
      :disabled="modelValue === totalPages"
      :aria-label="`Página siguiente`"
      :class="[
        'flex items-center justify-center w-9 h-9 rounded-md text-sm border border-border transition-colors duration-150 cursor-pointer',
        modelValue === totalPages
          ? 'opacity-40 cursor-not-allowed bg-white text-gray-400'
          : 'bg-white text-gray-700 hover:bg-gray-50',
      ]"
      @click="go(modelValue + 1)"
    >
      <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </nav>
</template>
