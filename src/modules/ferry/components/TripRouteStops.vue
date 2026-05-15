<template>
  <div class="flex flex-col w-full">
    <h2 class="text-4xl font-bold text-gray-900">{{ origin.time }}</h2>
    <p class="text-sm font-semibold text-gray-900 mt-1">{{ origin.port }}</p>
    <p class="text-xs text-gray-400">{{ origin.island }}</p>

    <div class="flex items-center gap-x-1 my-5 text-xs text-primary font-semibold">
      <span>●</span>
      <span>DIRECTO · {{ duration }}</span>
    </div>

    <h2 class="text-4xl font-bold text-gray-900">{{ destination.time }}</h2>
    <p class="text-sm font-semibold text-gray-900 mt-1">{{ destination.port }}</p>
    <p class="text-xs text-gray-400">{{ destination.island }}</p>
  </div>
</template>

<script setup lang="ts">
export interface Stop {
  time: string;
  port: string;
  island: string;
}

defineProps<{
  origin: Stop;
  destination: Stop;
  duration: string;
}>();
</script>
