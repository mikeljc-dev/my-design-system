<script setup lang="ts">
import { computed, useId } from 'vue';

interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
  required?: boolean;
  rows?: number;
  maxlength?: number;
  resize?: 'none' | 'vertical' | 'both';
  id?: string;
}

const props = withDefaults(defineProps<Props>(), { rows: 4, resize: 'vertical' });
const emit  = defineEmits<{ 'update:modelValue': [value: string] }>();

const inputId = props.id ?? useId();

const charCount = computed(() => props.modelValue?.length ?? 0);
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex items-center justify-between">
      <label v-if="label" :for="inputId" class="text-sm font-medium text-gray-900">
        {{ label }}
        <span v-if="required" aria-hidden="true" class="text-danger ml-0.5">*</span>
      </label>
      <span v-if="maxlength" class="text-xs text-gray-400" aria-live="polite">
        {{ charCount }}/{{ maxlength }}
      </span>
    </div>

    <textarea
      :id="inputId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      :maxlength="maxlength"
      :aria-describedby="(error || hint) ? `${inputId}-desc` : undefined"
      :aria-invalid="!!error"
      :style="{ resize }"
      :class="[
        'w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary',
        'placeholder:text-gray-400',
        error ? 'border-danger focus:border-danger focus:ring-danger/30' : 'border-border',
        disabled && 'opacity-50 cursor-not-allowed bg-surface',
      ]"
      @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
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
