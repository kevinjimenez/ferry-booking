<template>
  <div
    :class="['flex flex-col gap-y-1 p-5 rounded-md', { 'bg-primary/6 border border-primary/10': type === 'outbound', 'bg-secondary/6 border border-secondary/10': type === 'inbound' }]">
    <TripRouteLabel :badge-label="badgeLabel" :origin="origin" :destination="destination" :departure="departure"
      :arrival="arrival" />
    <div class="flex flex-col justify-center">
      <div class="flex justify-center">
        <span v-if="farePrice" class="text-2xs text-text-muted font-medium">{{ $t('ferry.tripLegSummary.ferryPlusFare', { basePrice, farePrice }) }}</span>
        <div class="flex-1" />
        <span class="text-base font-semibold text-secondary">{{ price }}</span>
      </div>
    </div>
    <div class="flex justify-between items-center gap-x-2">
      <span class="text-sm font-semibold text-text-muted">{{ ferry }}</span>
      <BaseBadge v-if="fare" :label="fare ?? ''" :variant="type === 'outbound' ? 'primary' : 'secondary'"
        label-class="font-semibold" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TripRouteLabel from '@/modules/ferry/components/TripRouteLabel.vue';
import BaseBadge from '@/shared/components/ui/BaseBadge.vue';

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
