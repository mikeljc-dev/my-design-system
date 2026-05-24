<script setup lang="ts">
interface Props {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

withDefaults(defineProps<Props>(), { size: 'md', alt: '' });

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center justify-center rounded-full bg-primary/20 text-primary-dark font-semibold overflow-hidden flex-shrink-0',
      {
        'w-7 h-7 text-[11px]': size === 'sm',
        'w-9 h-9 text-[13px]': size === 'md',
        'w-12 h-12 text-base': size === 'lg',
        'w-16 h-16 text-xl':   size === 'xl',
      },
    ]"
    :aria-label="name || alt"
  >
    <img v-if="src" :src="src" :alt="alt || name" class="w-full h-full object-cover" />
    <span v-else-if="name" aria-hidden="true">{{ getInitials(name) }}</span>
    <span v-else aria-hidden="true" class="text-gray-400 flex items-center justify-center w-full h-full">
      <svg viewBox="0 0 24 24" fill="currentColor" class="w-[60%] h-[60%]">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
      </svg>
    </span>
  </span>
</template>
