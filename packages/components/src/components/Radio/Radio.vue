<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: string | number;
  value: string | number;
  label?: string;
  description?: string;
  disabled?: boolean;
  name?: string;
}

const props = defineProps<Props>();
const emit  = defineEmits<{ 'update:modelValue': [value: string | number] }>();

const isChecked = computed(() => props.modelValue === props.value);

function select() {
  if (!props.disabled) emit('update:modelValue', props.value);
}
</script>

<template>
  <div class="flex items-start gap-3">
    <div class="relative flex items-center justify-center mt-0.5">
      <button
        type="button"
        role="radio"
        :aria-checked="isChecked"
        :aria-disabled="disabled"
        :name="name"
        :class="[
          'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none',
          isChecked ? 'border-primary' : 'border-border hover:border-primary bg-white',
          disabled && 'opacity-50 cursor-not-allowed',
        ]"
        @click="select"
        @keydown.space.prevent="select"
        @keydown.enter.prevent="select"
      >
        <span v-if="isChecked" class="w-2.5 h-2.5 rounded-full bg-primary" aria-hidden="true" />
      </button>
    </div>

    <div v-if="label || description" class="flex flex-col gap-0.5">
      <span
        v-if="label"
        :class="['text-sm font-medium text-gray-900 cursor-pointer select-none', disabled && 'opacity-50']"
        @click="select"
      >
        {{ label }}
      </span>
      <span v-if="description" class="text-xs text-gray-500">{{ description }}</span>
    </div>
  </div>
</template>
