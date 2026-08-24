<template>
  <div class="flex flex-col w-full border border-gray-200 rounded-sm p-5 shadow-sm bg-white">
    <TripCardHeader :type="type" :date="date" @change="$emit('change')" />

    <BaseDivider />

    <div class="flex flex-col gap-y-4 p-5 sm:flex-row sm:gap-x-6 sm:gap-y-0">
      <TripRouteStops :origin="origin" :destination="destination" :duration="duration" />
      <div class="flex flex-col w-full gap-y-5">
        <InfoGrid :items="details" />
        <BaseDivider class="w-full" />
        <div class="flex flex-col gap-y-5">
          <div class="flex flex-col">
            <LabelValue :label='$t("ferry.ferryTripCard.fareLabel", { fare })' :value='priceFare'
              :customClass="{ label: 'font-semibold text-xs text-text-secondary', value: 'font-bold text-xs sm:text-base' }" />
            <LabelValue :label='$t("ferry.ferryTripCard.ferryLabel")' :value='`(x ${passangers}) ${price}`'
              :customClass="{ label: 'font-semibold text-xs text-text-secondary', value: 'font-bold text-xs sm:text-base' }" />
          </div>
          <LabelValue :label='$t("ferry.ferryTripCard.totalPrice")' :value='formatCurrency(total)'
            :customClass="{ label: 'font-bold sm:text-xs text-text-secondary', value: 'font-bold text-xl sm:text-3xl' }" />
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import BaseDivider from '@/shared/components/ui/BaseDivider.vue';
import TripCardHeader from '@/modules/ferry/components/TripCardHeader.vue';
import TripRouteStops from '@/modules/ferry/components/TripRouteStops.vue';
import InfoGrid from '@/shared/components/InfoGrid.vue';
import type { Stop } from '@/modules/ferry/components/TripRouteStops.vue';
import type { InfoGridItem } from '@/shared/components/InfoGrid.vue';
import LabelValue from '@/shared/components/LabelValue.vue';
import { formatCurrency } from '@/shared/utils/currency.utils';

withDefaults(
  defineProps<{
    type?: 'outbound' | 'inbound';
    date: string;
    origin: Stop;
    destination: Stop;
    duration: string;
    details: InfoGridItem[];
    total: number
    price: string
    fare: string
    priceFare: string
    passangers: number
  }>(),
  {
    type: 'outbound',
  },
);

defineEmits<{ change: [] }>();
</script>
