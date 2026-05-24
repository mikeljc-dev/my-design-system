<script setup lang="ts">
import { useId } from 'vue';

interface Props {
  modelValue: boolean;
  label?: string;
  hint?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
}

const props = withDefaults(defineProps<Props>(), { size: 'md' });
const emit  = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const switchId = props.id ?? useId();
const labelId  = `${switchId}-label`;

function toggle() {
  if (!props.disabled) emit('update:modelValue', !props.modelValue);
}
</script>

<template>
  <div class="flex items-center gap-3">
    <button
      :id="switchId"
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-labelledby="label ? labelId : undefined"
      :aria-disabled="disabled"
      :class="[
        'relative inline-flex flex-shrink-0 rounded-full border-2 border-transparent cursor-pointer transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none',
        {
          'w-8 h-4':  size === 'sm',
          'w-11 h-6': size === 'md',
          'w-14 h-7': size === 'lg',
        },
        modelValue ? 'bg-primary' : 'bg-gray-200',
        disabled && 'opacity-50 cursor-not-allowed',
      ]"
      @click="toggle"
      @keydown.space.prevent="toggle"
    >
      <span
        :class="[
          'pointer-events-none inline-block rounded-full bg-white shadow-sm ring-0 transition-transform duration-200',
          {
            'w-3 h-3': size === 'sm',
            'w-5 h-5': size === 'md',
            'w-6 h-6': size === 'lg',
          },
          {
            'translate-x-0': !modelValue,
            'translate-x-4': modelValue && size === 'sm',
            'translate-x-5': modelValue && size === 'md',
            'translate-x-7': modelValue && size === 'lg',
          },
        ]"
        aria-hidden="true"
      />
    </button>

    <div v-if="label || hint" class="flex flex-col">
      <span
        v-if="label"
        :id="labelId"
        :class="['text-sm font-medium text-gray-900 select-none cursor-pointer', disabled && 'opacity-50']"
        @click="toggle"
      >
        {{ label }}
      </span>
      <span v-if="hint" class="text-xs text-gray-500">{{ hint }}</span>
    </div>
  </div>
</template>
