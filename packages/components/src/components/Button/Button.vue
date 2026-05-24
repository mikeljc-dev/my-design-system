<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: string;
  iconRight?: string;
  as?: string | object;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
});

const emit = defineEmits<{ click: [e: MouseEvent] }>();
</script>

<template>
  <component
    :is="as"
    :class="[
      'inline-flex items-center gap-2 font-medium cursor-pointer transition-all duration-150 border select-none no-underline',
      {
        'bg-primary text-white border-transparent hover:opacity-90 active:scale-[0.97]':
          variant === 'primary',
        'bg-transparent text-primary border-primary hover:bg-primary/10 active:scale-[0.97]':
          variant === 'secondary',
        'bg-transparent text-gray-900 border-transparent hover:bg-gray-100 active:scale-[0.97]':
          variant === 'ghost',
        'bg-danger text-white border-transparent hover:opacity-90 active:scale-[0.97]':
          variant === 'danger',
        'text-[13px] px-[10px] py-1 rounded-sm': size === 'sm',
        'text-sm px-4 py-2 rounded-md':           size === 'md',
        'text-base px-6 py-3 rounded-md':          size === 'lg',
        'opacity-50 cursor-not-allowed pointer-events-none': disabled || loading,
      },
    ]"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    @click="!disabled && !loading && emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="w-4 h-4 animate-spin"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    <span v-if="iconLeft" aria-hidden="true">{{ iconLeft }}</span>
    <slot />
    <span v-if="iconRight" aria-hidden="true">{{ iconRight }}</span>
  </component>
</template>
