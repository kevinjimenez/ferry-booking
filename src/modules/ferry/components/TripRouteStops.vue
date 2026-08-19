<template>
  <div class="flex flex-col w-full">
    <h2 class="text-4xl font-bold text-gray-900">{{ origin.time }}</h2>
    <p class="text-sm font-semibold text-gray-900 mt-1">{{ origin.island }}</p>
    <p v-if="origin.pierName" class="text-2xs text-text-secondary font-semibold">{{ origin.pierName }}</p>
    <p v-if="origin.portAddress" class="text-2xs text-text-secondary">{{ origin.portAddress }}</p>

    <div class="flex items-center gap-x-1 my-5 text-xs text-primary font-semibold">
      <span>●</span>
      <span>{{ $t('ferry.tripRouteStops.direct', { duration }) }}</span>
    </div>

    <h2 class="text-4xl font-bold text-gray-900">{{ destination.time }}</h2>
    <p class="text-sm font-semibold text-gray-900 mt-1">{{ destination.island }}</p>
    <p v-if="destination.pierName" class="text-2xs text-text-secondary font-semibold">{{ destination.pierName }}</p>
    <p v-if="destination.portAddress" class="text-2xs text-text-secondary">{{ destination.portAddress }}</p>
  </div>
</template>

<script setup lang="ts">
export interface Stop {
  time: string;
  island: string;
  pierName?: string;
  portAddress?: string;
}

defineProps<{
  origin: Stop;
  destination: Stop;
  duration: string;
}>();
</script>
