<!-- src/modules/ferry/components/ScheduleTimeline.vue -->
<template>
  <div class="hidden w-full sm:flex flex-col items-center sm:gap-y-2">
    <TripTypeLabel :type="type" :stops="stops" />
    <BaseRouteBar :stops="stops" />
    <span class="text-3xs md:text-sm text-ink-500">{{ $t('ferry.scheduleTimeline.averageDuration') }}</span>
  </div>
</template>

<script setup lang="ts">
import TripTypeLabel from '@/modules/ferry/components/TripTypeLabel.vue';
import BaseRouteBar from '@/shared/components/ui/BaseRouteBar.vue';

withDefaults(
  defineProps<{
    type?: 'direct' | 'with-stops';
    stops?: number;
  }>(),
  { type: 'direct', stops: 0 },
);
</script>
