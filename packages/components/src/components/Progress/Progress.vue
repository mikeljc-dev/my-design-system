<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'success' | 'danger' | 'warning';
  indeterminate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
  size: 'md',
  variant: 'primary',
});

const percentage = computed(() => {
  if (props.indeterminate) return null;
  return Math.min(100, Math.max(0, ((props.value ?? 0) / (props.max ?? 100)) * 100));
});

const trackColors: Record<string, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  danger:  'bg-danger',
  warning: 'bg-amber-500',
};
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <div v-if="label || showValue" class="flex items-center justify-between">
      <span v-if="label" class="text-sm font-medium text-gray-700">{{ label }}</span>
      <span v-if="showValue && !indeterminate" class="text-xs text-gray-500 tabular-nums">
        {{ Math.round(percentage!) }}%
      </span>
    </div>

    <div
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : value"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :aria-label="label"
      :aria-valuetext="indeterminate ? 'Cargando...' : `${Math.round(percentage!)}%`"
      :class="[
        'w-full overflow-hidden rounded-full bg-gray-200',
        { 'h-1': size === 'sm', 'h-2.5': size === 'md', 'h-4': size === 'lg' },
      ]"
    >
      <div
        :class="[
          'h-full rounded-full transition-all duration-500 ease-out',
          trackColors[variant!],
          indeterminate && 'animate-[indeterminate_1.5s_ease-in-out_infinite] w-1/3',
        ]"
        :style="!indeterminate ? { width: `${percentage}%` } : {}"
      />
    </div>
  </div>
</template>

<style>
@keyframes indeterminate {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
</style>
