<template>
  <div class="flex w-full items-center gap-x-5">
    <span class="text-2xs text-ink-500 font-bold uppercase">Incluido en el precio:</span>
    <BaseIconLabel v-for="item in items" :key="item.text" :prefix-icon="item.icon" icon-class="size-4 text-ink-500">
      <p class="text-2xs font-bold text-ink-500 leading-none">{{ item.text }}</p>
    </BaseIconLabel>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import BaseIconLabel from '@/shared/components/ui/BaseIconLabel.vue';

defineProps<{
  items: Array<{ icon: Component; text: string }>;
}>();
</script>
