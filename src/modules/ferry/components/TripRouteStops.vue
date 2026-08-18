<template>
  <div class="flex flex-col w-full">
    <h2 class="text-4xl font-bold text-gray-900">{{ origin.time }}</h2>
    <p class="text-sm font-semibold text-gray-900 mt-1">{{ origin.island }}</p>
    <p class="text-2xs text-text-secondary font-semibold">{{ origin.description }}</p>

    <div class="flex items-center gap-x-1 my-5 text-xs text-primary font-semibold">
      <span>●</span>
      <span>{{ $t('ferry.tripRouteStops.direct', { duration }) }}</span>
    </div>

    <h2 class="text-4xl font-bold text-gray-900">{{ destination.time }}</h2>
    <p class="text-sm font-semibold text-gray-900 mt-1">{{ destination.island }}</p>
    <p class="text-2xs text-text-secondary font-semibold">{{ destination.description }}</p>
  </div>
</template>

<script setup lang="ts">
export interface Stop {
  time: string;
  island: string;
  description: string
}

defineProps<{
  origin: Stop;
  destination: Stop;
  duration: string;
}>();
</script>
