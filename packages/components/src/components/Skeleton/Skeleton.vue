<script setup lang="ts">
interface Props {
  variant?: 'text' | 'circle' | 'rect';
  width?: string;
  height?: string;
  lines?: number;
}

withDefaults(defineProps<Props>(), { variant: 'text', lines: 1 });
</script>

<template>
  <!-- Múltiples líneas de texto -->
  <div v-if="variant === 'text' && lines > 1" class="flex flex-col gap-2" role="status" aria-label="Cargando contenido">
    <div
      v-for="i in lines"
      :key="i"
      :class="['animate-pulse bg-gray-200 rounded h-4', i === lines && lines > 1 ? 'w-3/4' : 'w-full']"
    />
    <span class="sr-only">Cargando...</span>
  </div>

  <!-- Círculo (avatar) -->
  <span
    v-else-if="variant === 'circle'"
    :style="{ width: width ?? '40px', height: height ?? '40px' }"
    class="animate-pulse bg-gray-200 rounded-full inline-block"
    role="status"
    aria-label="Cargando"
  >
    <span class="sr-only">Cargando...</span>
  </span>

  <!-- Rectángulo o línea simple -->
  <span
    v-else
    :style="{ width: width ?? '100%', height: height ?? (variant === 'text' ? '1rem' : '120px') }"
    :class="['animate-pulse bg-gray-200 inline-block', variant === 'text' ? 'rounded' : 'rounded-md']"
    role="status"
    aria-label="Cargando"
  >
    <span class="sr-only">Cargando...</span>
  </span>
</template>
