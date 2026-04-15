<template>
  <FerryNavHeader title="Elige un ferry de ida" @back="goToBack" />
  <section class="flex w-full p-10 gap-x-10">
    <div class="w-3/4 flex flex-col">
      <SearchSummaryCard v-bind="searchSummaryCardProps" />
      <TripTypeBadges class="mt-5" :is-round-trip="storeFerrySearchStore.isRoundTrip" />

      <div class="flex w-full justify-between items-center my-6">
        <span class="text-sm">HORARIOS DISPONIBLES</span>
        <BaseButton size="xs" :prefix-icon="SortIcon" icon-class="size-3.5" variant="soft">
          Ordenar
        </BaseButton>
      </div>

      <div class="flex flex-col gap-y-5">
        <ScheduleCard
          v-for="schedule in schedulesData"
          :key="schedule.id"
          :origin="{
            time: schedule.origin.time,
            port: schedule.origin.port,
            island: schedule.origin.island,
            address: schedule.origin.address,
          }"
          :destination="{
            time: schedule.destination.time,
            port: schedule.destination.port,
            island: schedule.destination.island,
            address: schedule.destination.address,
          }"
          :duration="schedule.duration"
          :price="{ amount: schedule.price, currency: schedule.currency, seats: schedule.seats }"
          :selected="storeFerrySelectionStore.outbound?.id === schedule.id"
          @select="handleSelect(schedule)"
        />
      </div>
    </div>
    <div class="w-1/4 sticky top-14 self-start">
      <div class="flex flex-col gap-y-5">
        <BookingSummaryCard
          :outbound="selectedOutbound"
          :total="formatCurrency(grandTotal)"
          :button-label="buttonLabel"
          @continue="goTo"
        />
        <TripIncludesCard
          title="Incluido en tu viaje"
          :icon="BoxIcon"
          :items="[
            { icon: CheckIcon, text: 'Traslado muelle a muelle' },
            { icon: CheckIcon, text: 'Chaleco salvavidas' },
            { icon: CheckIcon, text: 'Equipaje según operador' },
          ]"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import { useScheduleQuery } from '@/modules/ferry/composables/useScheduleQuery.ts';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { computed } from 'vue';
import SearchSummaryCard from '@/modules/ferry/components/SearchSummaryCard.vue';
import TripTypeBadges from '@/modules/ferry/components/TripTypeBadges.vue';
import ScheduleCard from '@/modules/ferry/components/ScheduleCard.vue';
import BookingSummaryCard from '@/modules/ferry/components/BookingSummaryCard.vue';
import TripIncludesCard from '@/modules/ferry/components/TripIncludesCard.vue';
import BoxIcon from '@/shared/icons/BoxIcon.vue';
import CheckIcon from '@/shared/icons/CheckIcon.vue';
import SortIcon from '@/shared/icons/SortIcon.vue';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import type { Ferry } from '@/modules/ferry/types/ferry.types.ts';
import { storeToRefs } from 'pinia';
import { formatCurrency } from '@/shared/utils/currency.utils.ts';
import { useTripPrice } from '@/modules/ferry/composables/useTripPrice.ts';
import { useRouter } from 'vue-router';

const router = useRouter();

const storeFerrySearchStore = useFerrySearchStore();
const storeFerrySelectionStore = useFerrySelectionStore();

const { values, isRoundTrip } = storeToRefs(storeFerrySearchStore);
const { outbound } = storeToRefs(storeFerrySelectionStore);

const { data: schedulesData, averageDuration } = useScheduleQuery();
const { goToInbound, goToTripSummary } = useFerryNavigation();

const { grandTotal } = useTripPrice();

const selectedOutbound = computed(() => {
  if (!outbound.value) return undefined;
  return {
    origin: outbound.value.origin.port,
    destination: outbound.value.destination.port,
    ferry: outbound.value.ferry.name,
    departure: outbound.value.origin.time,
    arrival: outbound.value.destination.time,
    passengers: `${values.value.passengerCount} adultos`,
    price: formatCurrency(outbound.value.price),
  };
});

const searchSummaryCardProps = computed(() => ({
  originName: values.value.origin?.label ?? '',
  originIsland: (values.value.origin?.extra as Record<string, string>)?.name ?? '',
  destinationName: values.value.destination?.label ?? '',
  destinationIsland: (values.value.destination?.extra as Record<string, string>)?.name ?? '',
  date: values.value.outboundDate,
  passengers: values.value.passengerCount,
  duration: averageDuration.value,
}));

const handleSelect = (schedule: Ferry) => {
  console.log('Selected schedule:', schedule);
  storeFerrySelectionStore.setOutbound(schedule);
};

const buttonLabel = computed(() => (isRoundTrip.value ? 'Seleccionar Ferry' : 'Continuar'));
const goTo = () => (isRoundTrip.value ? goToInbound() : goToTripSummary());
const goToBack = () => {
  router.back();
  storeFerrySelectionStore.reset();
};
</script>
