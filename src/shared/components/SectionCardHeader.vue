<template>
  <div class="flex justify-between items-start gap-x-4">
    <div class="flex flex-col">
      <span class="text-3xs font-extrabold uppercase text-secondary">{{ label }}</span>
      <h2 class="text-lg font-bold text-gray-900 mt-0.5">{{ title }}</h2>
    </div>
    <slot name="right" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  title: string;
}>();
</script>
