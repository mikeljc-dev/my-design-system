<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
}

withDefaults(defineProps<Props>(), { size: 'md', label: 'Cargando...' });
</script>

<template>
  <span role="status" class="inline-flex items-center gap-2">
    <svg
      :class="[
        'animate-spin text-primary flex-shrink-0',
        { 'w-4 h-4': size === 'sm', 'w-6 h-6': size === 'md', 'w-8 h-8': size === 'lg', 'w-12 h-12': size === 'xl' },
      ]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    <span class="sr-only">{{ label }}</span>
    <span v-if="$slots.default" class="text-sm text-gray-500"><slot /></span>
  </span>
</template>
