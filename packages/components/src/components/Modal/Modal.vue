<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';

interface Props {
  modelValue: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  closeOnBackdrop?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closeOnBackdrop: true,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  close: [];
}>();

const dialogRef = ref<HTMLElement | null>(null);

function close() {
  emit('update:modelValue', false);
  emit('close');
}

function onBackdropClick(e: MouseEvent) {
  if (props.closeOnBackdrop && e.target === e.currentTarget) close();
}

function onKeydown(e: KeyboardEvent) {
  if (!props.modelValue) return;
  if (e.key === 'Escape') close();
  if (e.key === 'Tab' && dialogRef.value) {
    const focusable = dialogRef.value.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
      e.preventDefault();
      (e.shiftKey ? last : first)?.focus();
    }
  }
}

watch(() => props.modelValue, async (open) => {
  if (open) {
    document.body.style.overflow = 'hidden';
    await nextTick();
    dialogRef.value?.focus();
  } else {
    document.body.style.overflow = '';
  }
});

onMounted(()  => document.addEventListener('keydown', onKeydown));
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[1000]"
        @click="onBackdropClick"
      >
        <Transition
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95 -translate-y-2"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="modelValue"
            ref="dialogRef"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="title ? 'ds-modal-title' : undefined"
            :class="[
              'bg-white rounded-xl shadow-xl w-full max-h-[90vh] overflow-y-auto outline-none',
              {
                'max-w-sm':  size === 'sm',
                'max-w-lg':  size === 'md',
                'max-w-3xl': size === 'lg',
              },
            ]"
            tabindex="-1"
          >
            <div class="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 v-if="title" id="ds-modal-title" class="text-lg font-semibold m-0">{{ title }}</h2>
              <slot name="header" />
              <button
                class="ml-auto text-gray-400 hover:text-gray-900 p-1 rounded-md transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center"
                aria-label="Cerrar modal"
                @click="close"
              >
                <svg class="w-5 h-5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8"/>
                </svg>
              </button>
            </div>

            <div class="p-6">
              <slot />
            </div>

            <div v-if="$slots.footer" class="flex justify-end gap-3 px-6 py-4 border-t border-border bg-surface">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
