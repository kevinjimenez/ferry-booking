<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full self-start">
    <div v-for="item in items" :key="item.label" class="flex flex-col bg-gray-100 rounded-md px-3 py-3">
      <span class="text-xs text-text-secondary uppercase font-bold tracking-wide mb-1">{{
        item.label
      }}</span>
      <span class="text-sm font-bold text-gray-900">{{ item.value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface InfoGridItem {
  label: string;
  value: string;
}

defineProps<{
  items: InfoGridItem[];
}>();
</script>
