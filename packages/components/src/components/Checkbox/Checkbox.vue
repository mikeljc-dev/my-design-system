<script setup lang="ts">
import { computed, useId } from 'vue';

interface Props {
  modelValue?: boolean;
  indeterminate?: boolean;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), { modelValue: false, indeterminate: false });
const emit  = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const inputId = props.id ?? useId();

const ariaChecked = computed(() => {
  if (props.indeterminate) return 'mixed';
  return props.modelValue;
});

function toggle() {
  if (props.disabled) return;
  emit('update:modelValue', !props.modelValue);
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex items-start gap-3">
      <div class="relative flex items-center justify-center mt-0.5">
        <button
          type="button"
          role="checkbox"
          :aria-checked="ariaChecked"
          :aria-labelledby="label ? `${inputId}-label` : undefined"
          :aria-describedby="error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined"
          :aria-disabled="disabled"
          :class="[
            'w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none',
            modelValue || indeterminate
              ? error ? 'bg-danger border-danger' : 'bg-primary border-primary'
              : error ? 'bg-white border-danger' : 'bg-white border-border hover:border-primary',
            disabled && 'opacity-50 cursor-not-allowed',
          ]"
          @click="toggle"
          @keydown.space.prevent="toggle"
          @keydown.enter.prevent="toggle"
        >
          <svg v-if="modelValue && !indeterminate" class="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span v-else-if="indeterminate" class="w-2.5 h-0.5 bg-white rounded-full" aria-hidden="true" />
        </button>
      </div>

      <div v-if="label" class="flex flex-col gap-0.5">
        <label
          :id="`${inputId}-label`"
          :class="['text-sm font-medium text-gray-900 cursor-pointer select-none', disabled && 'opacity-50 cursor-not-allowed']"
          @click="toggle"
        >
          {{ label }}
          <span v-if="required" aria-hidden="true" class="text-danger ml-0.5">*</span>
        </label>
      </div>
    </div>

    <p v-if="error" :id="`${inputId}-error`" class="text-xs text-danger ml-8" role="alert">{{ error }}</p>
    <p v-else-if="hint" :id="`${inputId}-hint`" class="text-xs text-gray-500 ml-8">{{ hint }}</p>
  </div>
</template>
