<template>
  <div
    class="flex flex-col items-center gap-y-5"
  >
    <span
      class="rounded-full bg-gray-100 size-16 flex items-center justify-center border border-gray-300"
    >
      <component :is="icon" class="size-8 text-text-muted/50" />
    </span>
    <p class="text-lg font-semibold">{{ title }}</p>
    <span class="w-56 text-center text-md text-text-muted">{{ description }}</span>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  icon: Component;
  title: string;
  description: string;
}>();
</script>
