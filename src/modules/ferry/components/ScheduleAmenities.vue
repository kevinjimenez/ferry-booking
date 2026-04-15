<template>
  <div class="flex w-full items-center gap-x-5">
    <span class="text-md">Incluido en el precio:</span>
    <BaseIconLabel
      v-for="item in items"
      :key="item.text"
      :prefix-icon="item.icon"
      icon-class="size-4"
    >
      <p class="text-md text-text-muted leading-none">{{ item.text }}</p>
    </BaseIconLabel>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import BaseIconLabel from '@/shared/components/base/BaseIconLabel.vue';

defineProps<{
  items: Array<{ icon: Component; text: string }>;
}>();
</script>
