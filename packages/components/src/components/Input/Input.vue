<script setup lang="ts">
import { useId } from '../../composables/useId';

interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  disabled?: boolean;
  error?: string;
  hint?: string;
  required?: boolean;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), { type: 'text' });
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const inputId = props.id ?? useId('ds-input');
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="inputId" class="text-sm font-medium text-gray-900">
      {{ label }}
      <span v-if="required" aria-hidden="true" class="text-danger ml-0.5">*</span>
    </label>

    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-describedby="(error || hint) ? `${inputId}-desc` : undefined"
      :aria-invalid="!!error"
      :class="[
        'w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
        'placeholder:text-gray-400',
        error
          ? 'border-danger focus:border-danger focus:ring-danger/30'
          : 'border-border',
        disabled && 'opacity-50 cursor-not-allowed bg-surface',
      ]"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

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
