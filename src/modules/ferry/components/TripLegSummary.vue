<template>
  <div
    :class="['flex flex-col gap-y-1 p-5', { 'bg-primary/6': type === 'outbound', 'bg-secondary/6': type === 'inbound' }]">
    <TripRouteLabel :badge-label="badgeLabel" :origin="origin" :destination="destination" />
    <div class="flex justify-between items-center">
      <TimeRangeDisplay :departure="departure" :arrival="arrival" />
      <div class="flex flex-col items-end">
        <span class="text-sm font-semibold text-secondary">{{ price }}</span>
        <span v-if="farePrice" class="text-xs text-text-muted">Ferry {{ basePrice }} + Tarifa {{ farePrice }}</span>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <span class="text-sm font-semibold text-text-muted">{{ ferry }}</span>
      <span v-if="fare" class="text-xs font-medium text-text-muted">{{ fare }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import TripRouteLabel from '@/modules/ferry/components/TripRouteLabel.vue';
import TimeRangeDisplay from '@/shared/components/TimeRangeDisplay.vue';

withDefaults(
  defineProps<{
    type?: 'outbound' | 'inbound';
    badgeLabel: string;
    origin: string;
    destination: string;
    ferry: string;
    departure: string;
    arrival: string;
    passengers: string;
    fare?: string;
    basePrice?: string;
    farePrice?: string;
    price: string;
  }>(),
  {
    type: 'outbound',
  },
);

// const badgeVariant = computed(() => (props.type === 'inbound' ? 'secondary' : 'primary'));
</script>
