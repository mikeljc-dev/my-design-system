<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md';
  dot?: boolean;
}

withDefaults(defineProps<Props>(), { variant: 'default', size: 'md' });
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1 rounded-full font-medium',
      size === 'md' ? 'text-xs px-2 py-0.5'   : 'text-[11px] px-1.5 py-0.5',
      {
        'bg-gray-100 text-gray-900':              variant === 'default',
        'bg-primary/15 text-primary-dark':        variant === 'primary',
        'bg-success/15 text-success-dark':        variant === 'success',
        'bg-danger/15 text-danger-dark':          variant === 'danger',
        'bg-amber-100 text-amber-700':            variant === 'warning',
      },
    ]"
  >
    <span v-if="dot" aria-hidden="true" class="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
    <slot />
  </span>
</template>
