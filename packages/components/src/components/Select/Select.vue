<script setup lang="ts">
import { useId } from '../../composables/useId';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface Props {
  modelValue?: string | number;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
  required?: boolean;
  id?: string;
}

const props = defineProps<Props>();
const emit  = defineEmits<{ 'update:modelValue': [value: string | number] }>();

const inputId = props.id ?? useId('ds-select');
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="inputId" class="text-sm font-medium text-gray-900">
      {{ label }}
      <span v-if="required" aria-hidden="true" class="text-danger ml-0.5">*</span>
    </label>

    <div class="relative">
      <select
        :id="inputId"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :aria-describedby="(error || hint) ? `${inputId}-desc` : undefined"
        :aria-invalid="!!error"
        :class="[
          'w-full pl-3 pr-10 py-2 text-sm text-gray-900 bg-white border rounded-md appearance-none cursor-pointer transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
          error ? 'border-danger' : 'border-border',
          disabled && 'opacity-50 cursor-not-allowed bg-surface',
          !modelValue && 'text-gray-400',
        ]"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option v-if="placeholder" value="" disabled :selected="!modelValue">{{ placeholder }}</option>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          :disabled="opt.disabled"
        >
          {{ opt.label }}
        </option>
      </select>

      <!-- Chevron icon -->
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
        <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <p
      v-if="error || hint"
      :id="`${inputId}-desc`"
      :class="['text-xs', error ? 'text-danger' : 'text-gray-500']"
      :role="error ? 'alert' : undefined"
    >
      {{ error || hint }}
    </p>
  </div>
</template>
