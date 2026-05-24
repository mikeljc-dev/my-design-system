<script setup lang="ts">
interface Props {
  type?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  dismissible?: boolean;
}

withDefaults(defineProps<Props>(), { type: 'info' });
const emit = defineEmits<{ dismiss: [] }>();

const styles = {
  info:    { wrap: 'bg-primary/10 border-primary/30 text-primary-dark',   icon: 'ℹ' },
  success: { wrap: 'bg-success/10 border-success/30 text-success-dark',   icon: '✓' },
  warning: { wrap: 'bg-amber-50 border-amber-300 text-amber-800',         icon: '⚠' },
  danger:  { wrap: 'bg-danger/10 border-danger/30 text-danger-dark',      icon: '✕' },
};
</script>

<template>
  <div
    :class="['flex gap-3 p-4 border rounded-md text-sm', styles[type!].wrap]"
    role="alert"
    aria-live="polite"
  >
    <span class="text-base flex-shrink-0 mt-0.5" aria-hidden="true">{{ styles[type!].icon }}</span>

    <div class="flex-1 min-w-0">
      <p v-if="title" class="font-semibold mb-1">{{ title }}</p>
      <div><slot /></div>
    </div>

    <button
      v-if="dismissible"
      class="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer text-lg leading-none text-current self-start"
      aria-label="Cerrar alerta"
      @click="emit('dismiss')"
    >
      ×
    </button>
  </div>
</template>
