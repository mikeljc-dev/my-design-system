<script setup lang="ts">
interface Props {
  as?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
}

withDefaults(defineProps<Props>(), {
  as: 'div',
  shadow: 'sm',
  padding: 'md',
  bordered: true,
});
</script>

<template>
  <component
    :is="as"
    :class="[
      'bg-white rounded-xl overflow-hidden',
      bordered && 'border border-border',
      {
        'shadow-none': shadow === 'none',
        'shadow-sm':   shadow === 'sm',
        'shadow-md':   shadow === 'md',
        'shadow-lg':   shadow === 'lg',
      },
    ]"
  >
    <div v-if="$slots.header" class="px-6 py-4 border-b border-border font-semibold">
      <slot name="header" />
    </div>

    <div
      :class="{
        'p-0':  padding === 'none',
        'p-3':  padding === 'sm',
        'p-6':  padding === 'md',
        'p-8':  padding === 'lg',
      }"
    >
      <slot />
    </div>

    <div v-if="$slots.footer" class="px-6 py-4 border-t border-border bg-surface flex justify-end gap-3">
      <slot name="footer" />
    </div>
  </component>
</template>
