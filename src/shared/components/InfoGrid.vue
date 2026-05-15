<template>
  <div class="grid grid-cols-2 gap-2 w-full self-start">
    <div
      v-for="item in items"
      :key="item.label"
      class="flex flex-col bg-gray-100 rounded-lg px-3 py-3"
    >
      <span class="text-xs text-gray-400 uppercase font-semibold tracking-wide mb-1">{{
        item.label
      }}</span>
      <span class="text-sm font-medium text-gray-900">{{ item.value }}</span>
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
