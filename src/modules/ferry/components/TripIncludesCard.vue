<template>
  <div class="flex border-2 border-gray-200 bg-white rounded-md shadow-sm p-5 items-start gap-x-2">
    <component :is="icon" class="size-5 font-semibold" />
    <div class="flex flex-col">
      <span class="text-base text-primary font-semibold">{{ title }}</span>
      <BaseIconLabel v-for="item in items" :key="item.text" :prefix-icon="item.icon" icon-class="size-4">
        <span class="text-xs text-text-secondary font-medium">{{ item.text }}</span>
      </BaseIconLabel>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import BaseIconLabel from '@/shared/components/ui/BaseIconLabel.vue';

interface IncludeItem {
  icon: Component;
  text: string;
}

defineProps<{
  title: string;
  icon: Component;
  items: IncludeItem[];
}>();
</script>
