<template>
  <div class="flex flex-col h-dvh overflow-hidden lg:h-auto lg:overflow-visible">
    <FerryNavHeader title="Elige un ferry de ida" @back="goToBack" />

    <section class="flex flex-col lg:flex-row w-full flex-1 min-h-0 p-4 lg:p-10 gap-y-0 lg:gap-y-0 lg:gap-x-10">
      <div class="w-full lg:w-3/4 flex flex-col flex-1 min-h-0 overflow-y-auto lg:overflow-visible pb-4 lg:pb-0">
        <SearchSummaryCard v-bind="searchSummaryCardProps" />
        <TripTypeBadges class="mt-5" :is-round-trip="storeFerrySearchStore.isRoundTrip" />

        <div class="flex w-full justify-between items-center my-6">
          <span class="text-xs sm:text-sm lg:text-lg font-bold">HORARIOS DISPONIBLES</span>
          <BaseButton size="lg" :suffix-icon="SortIcon" icon-class="size-6" variant="soft">
            Ordenar
          </BaseButton>
        </div>

        <div class="flex flex-col gap-y-5">
          <template v-if="isLoading">
            <ScheduleCardSkeleton v-for="i in 4" :key="i" />
          </template>
          <template v-else>
            <ScheduleCard v-for="schedule in schedulesData" :key="schedule.id" :origin="schedule.origin"
              :destination="schedule.destination" :duration="schedule.duration" :price="{
                amount: schedule.price,
                currency: schedule.currency,
                seats: schedule.seats,
              }" :ferry="schedule.ferry" :selected="storeFerrySelectionStore.outbound?.id === schedule.id"
              @select="handleSelect(schedule)" />
          </template>
        </div>
      </div>
      <div
        class="shrink-0 w-full bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-4 lg:p-0 lg:shadow-none lg:bg-transparent lg:w-1/4 lg:sticky lg:top-6 lg:self-start">
        <MobileBookingBar class="lg:hidden" :ferry-name="outbound?.ferry.name"
          :route="outbound ? `${outbound.origin.island} → ${outbound.destination.island}` : undefined"
          :total="formatCurrency(grandTotal)" :button-label="buttonLabel" @continue="goToOutboundFare" />
        <div class="hidden lg:flex flex-col gap-y-5">
          <BookingSummaryCard :outbound="selectedOutbound" :total="formatCurrency(grandTotal)"
            :button-label="buttonLabel" @continue="goToOutboundFare" />
          <TripIncludesCard title="Incluido en tu viaje" :icon="BoxIcon" :items="[
            { icon: CheckIcon, text: 'Traslado muelle a muelle' },
            { icon: CheckIcon, text: 'Chaleco salvavidas' },
            { icon: CheckIcon, text: 'Equipaje según operador' },
          ]" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import { useScheduleQuery } from '@/modules/ferry/composables/useScheduleQuery.ts';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { computed } from 'vue';
import SearchSummaryCard from '@/modules/ferry/components/SearchSummaryCard.vue';
import TripTypeBadges from '@/modules/ferry/components/TripTypeBadges.vue';
import ScheduleCard from '@/modules/ferry/components/ScheduleCard.vue';
import ScheduleCardSkeleton from '@/modules/ferry/components/ScheduleCardSkeleton.vue';
import BookingSummaryCard from '@/modules/ferry/components/BookingSummaryCard.vue';
import MobileBookingBar from '@/modules/ferry/components/MobileBookingBar.vue';
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
import { BookingSummaryMapper } from '@/modules/ferry/mappers/ booking-summary.mapper.ts';

const router = useRouter();

const storeFerrySearchStore = useFerrySearchStore();
const storeFerrySelectionStore = useFerrySelectionStore();

const { values: search, isRoundTrip } = storeToRefs(storeFerrySearchStore);
const { outbound, outboundFare } = storeToRefs(storeFerrySelectionStore);

const { data: schedulesData, isLoading, averageDuration } = useScheduleQuery();
const { goToOutboundFare } = useFerryNavigation();

const { grandTotal } = useTripPrice();

const selectedOutbound = computed(() => {
  if (!outbound.value) return undefined;
  return BookingSummaryMapper.toFerryLegSummary(outbound.value, search.value.passengerCount, outboundFare.value);
});

const searchSummaryCardProps = computed(() =>
  BookingSummaryMapper.toSearchSummaryCardProps(search.value, averageDuration.value),
);

const handleSelect = (schedule: Ferry) => {
  storeFerrySelectionStore.setOutbound(schedule);
};

const buttonLabel = computed(() => (isRoundTrip.value ? 'Seleccionar tarifa' : 'Continuar'));

const goToBack = () => {
  router.back();
  storeFerrySelectionStore.reset();
};
</script>
