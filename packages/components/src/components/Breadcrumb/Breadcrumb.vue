<script setup lang="ts">
export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface Props {
  items: BreadcrumbItem[];
  separator?: string;
}

withDefaults(defineProps<Props>(), { separator: '/' });
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-1.5 text-sm">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-1.5"
      >
        <span v-if="index > 0" class="text-gray-400 select-none" aria-hidden="true">{{ separator }}</span>

        <a
          v-if="item.href && !item.current"
          :href="item.href"
          class="text-gray-500 hover:text-gray-900 transition-colors duration-150 underline-offset-2 hover:underline"
        >
          {{ item.label }}
        </a>
        <span
          v-else
          :aria-current="item.current ? 'page' : undefined"
          :class="item.current ? 'text-gray-900 font-medium' : 'text-gray-500'"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
