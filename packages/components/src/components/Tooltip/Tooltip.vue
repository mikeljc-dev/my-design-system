<script setup lang="ts">
import { ref, computed, useId } from 'vue';

interface Props {
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const props = withDefaults(defineProps<Props>(), { placement: 'top', delay: 0 });

const visible  = ref(false);
const tooltipId = useId();
let timer: ReturnType<typeof setTimeout>;

function show() {
  clearTimeout(timer);
  timer = setTimeout(() => (visible.value = true), props.delay);
}
function hide() {
  clearTimeout(timer);
  visible.value = false;
}

const positionClasses = computed(() => ({
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2 -translate-y-1/2 mr-2',
  right:  'left-full top-1/2 -translate-y-1/2 ml-2',
}[props.placement]));

const arrowClasses = computed(() => ({
  top:    'top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-x-transparent border-b-transparent border-4',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-x-transparent border-t-transparent border-4',
  left:   'left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-y-transparent border-r-transparent border-4',
  right:  'right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-y-transparent border-l-transparent border-4',
}[props.placement]));
</script>

<template>
  <div class="relative inline-flex" @mouseenter="show" @mouseleave="hide">
    <!-- Trigger -->
    <div
      :aria-describedby="visible ? tooltipId : undefined"
      class="inline-flex"
      @focusin="show"
      @focusout="hide"
    >
      <slot />
    </div>

    <!-- Tooltip -->
    <Transition
      enter-active-class="transition-opacity duration-150"
      leave-active-class="transition-opacity duration-100"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        :id="tooltipId"
        role="tooltip"
        :class="[
          'absolute z-50 px-2.5 py-1.5 text-xs text-white bg-gray-900 rounded-md whitespace-nowrap pointer-events-none shadow-lg',
          positionClasses,
        ]"
      >
        {{ content }}
        <span :class="['absolute w-0 h-0', arrowClasses]" aria-hidden="true" />
      </div>
    </Transition>
  </div>
</template>
