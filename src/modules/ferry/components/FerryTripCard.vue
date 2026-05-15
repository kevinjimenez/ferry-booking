<template>
  <div class="flex flex-col w-full border border-gray-200 rounded-sm p-5 shadow-sm bg-white">
    <TripCardHeader :type="type" :date="date" @change="$emit('change')" />

    <BaseDivider />

    <div class="flex flex-col gap-y-4 p-5 sm:flex-row sm:gap-x-6 sm:gap-y-0">
      <TripRouteStops :origin="origin" :destination="destination" :duration="duration" />
      <InfoGrid :items="details" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseDivider from '@/shared/components/base/BaseDivider.vue';
import TripCardHeader from '@/modules/ferry/components/TripCardHeader.vue';
import TripRouteStops from '@/modules/ferry/components/TripRouteStops.vue';
import InfoGrid from '@/shared/components/InfoGrid.vue';
import type { Stop } from '@/modules/ferry/components/TripRouteStops.vue';
import type { InfoGridItem } from '@/shared/components/InfoGrid.vue';

withDefaults(
  defineProps<{
    type?: 'outbound' | 'inbound';
    date: string;
    origin: Stop;
    destination: Stop;
    duration: string;
    details: InfoGridItem[];
  }>(),
  {
    type: 'outbound',
  },
);

defineEmits<{ change: [] }>();
</script>
