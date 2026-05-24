<script setup lang="ts">
interface Props {
  message: string;
  type?: 'info' | 'success' | 'danger' | 'warning';
  duration?: number;
}

withDefaults(defineProps<Props>(), { type: 'info', duration: 4000 });

const emit = defineEmits<{ close: [] }>();

const icons: Record<string, string> = {
  success: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8.5l3.5 3.5 7.5-7.5"/></svg>',
  danger:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>',
  warning: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v3M8 11.5v.5"/><path d="M1.5 13.5L8 2l6.5 11.5H1.5z"/></svg>',
  info:    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="8" cy="8" r="6"/><path d="M8 7v4M8 5.5v.5"/></svg>',
};
</script>

<template>
  <div
    :class="[
      'flex items-center gap-3 px-4 py-3 rounded-md shadow-lg text-white text-sm min-w-[280px] max-w-[400px]',
      {
        'bg-slate-800':      type === 'info',
        'bg-success-dark':   type === 'success',
        'bg-danger-dark':    type === 'danger',
        'bg-amber-700':      type === 'warning',
      },
    ]"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <span class="w-4 h-4 flex-shrink-0" aria-hidden="true" v-html="icons[type!]" />
    <span class="flex-1">{{ message }}</span>
    <button
      class="opacity-70 hover:opacity-100 bg-transparent border-none text-white cursor-pointer flex-shrink-0 transition-opacity p-0 flex items-center justify-center"
      aria-label="Cerrar notificación"
      @click="emit('close')"
    >
      <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <path d="M4 4l8 8M12 4l-8 8"/>
      </svg>
    </button>
  </div>
</template>
