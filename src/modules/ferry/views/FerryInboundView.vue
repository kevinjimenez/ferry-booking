<template>
  <div class="flex flex-col h-dvh overflow-hidden lg:h-auto lg:overflow-visible">
    <FerryNavHeader :title="$t('ferry.inbound.headerTitle')" @back="goToBack" />

    <section class="flex flex-col lg:flex-row w-full flex-1 min-h-0 p-4 lg:p-10 gap-y-0 lg:gap-x-10">
      <div
        class="w-full lg:w-3/4 flex flex-col flex-1 min-h-0 overflow-y-auto lg:overflow-visible pb-36 sm:pb-44 lg:pb-0">
        <SearchSummaryCard v-bind="searchSummaryCardProps" />
        <TripTypeBadges class="mt-5" :is-round-trip="isRoundTrip" active="inbound" />

        <div class="flex w-full justify-between items-center my-6">
          <span class="text-lg font-bold">{{ $t('ferry.inbound.availableSchedules') }}</span>
          <!-- <BaseButton size="lg" :suffix-icon="SortIcon" icon-class="size-6" variant="soft">
            {{ $t('ferry.inbound.sortButton') }}
          </BaseButton> -->
        </div>

        <div class="flex flex-col gap-y-5">
          <template v-if="isLoading">
            <ScheduleCardSkeleton v-for="i in 4" :key="i" />
          </template>
          <template v-else-if="!schedulesData?.length">
            <EmptyState :icon="FerryIcon" :title="$t('ferry.inbound.emptyState.title')"
              :description="$t('ferry.inbound.emptyState.description')" />
          </template>
          <template v-else>
            <ScheduleCard v-for="schedule in schedulesData" :key="schedule.id" :origin="schedule.origin"
              :destination="schedule.destination" :price="{
                amount: schedule.price,
                currency: schedule.currency,
                seats: schedule.seats,
              }" :ferry="schedule.ferry" :selected="storeFerrySelectionStore.inbound?.id === schedule.id"
              @select="handleSelect(schedule)" />
          </template>
        </div>
      </div>
      <div
        class="fixed bottom-0 left-0 right-0 z-10 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-4 lg:z-auto lg:shrink-0 lg:w-1/4 lg:p-0 lg:shadow-none lg:bg-transparent lg:sticky lg:top-6 lg:self-start">
        <MobileBookingBar class="lg:hidden" :ferry-name="inbound?.ferry.name" :origin="outbound?.origin.island"
          :destination="outbound?.destination.island" :total="formatCurrency(grandTotal)"
          :button-label="$t('ferry.inbound.continueButton')" @continue="goToInboundFare" />
        <div class="hidden lg:flex flex-col gap-y-5">
          <BookingSummaryCard :outbound="selectedOutbound" :inbound="selectedInbound" :is-round-trip="true"
            :total="formatCurrency(grandTotal)" :button-label="$t('ferry.inbound.continueButton')"
            @continue="goToInboundFare" />
          <TripIncludesCard :title="$t('ferry.inbound.tripIncludes.title')" :icon="BoxIcon" :items="[
            { icon: CheckIcon, text: $t('ferry.inbound.tripIncludes.items.pierTransfer') },
            { icon: CheckIcon, text: $t('ferry.inbound.tripIncludes.items.lifeVest') },
            { icon: CheckIcon, text: $t('ferry.inbound.tripIncludes.items.luggage') },
          ]" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BookingSummaryCard from '@/modules/ferry/components/BookingSummaryCard.vue';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import MobileBookingBar from '@/modules/ferry/components/MobileBookingBar.vue';
import ScheduleCard from '@/modules/ferry/components/ScheduleCard.vue';
import ScheduleCardSkeleton from '@/modules/ferry/components/ScheduleCardSkeleton.vue';
import SearchSummaryCard from '@/modules/ferry/components/SearchSummaryCard.vue';
import TripIncludesCard from '@/modules/ferry/components/TripIncludesCard.vue';
import TripTypeBadges from '@/modules/ferry/components/TripTypeBadges.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import { useScheduleQuery } from '@/modules/ferry/composables/useScheduleQuery.ts';
import { useTripPrice } from '@/modules/ferry/composables/useTripPrice.ts';
import { BookingSummaryMapper } from '@/modules/ferry/mappers/ booking-summary.mapper.ts';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import type { Ferry } from '@/modules/ferry/types/ferry.types.ts';
import EmptyState from '@/shared/components/EmptyState.vue';
import BoxIcon from '@/shared/icons/BoxIcon.vue';
import CheckIcon from '@/shared/icons/CheckIcon.vue';
import FerryIcon from '@/shared/icons/FerryIcon.vue';
import { formatCurrency } from '@/shared/utils/currency.utils.ts';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const storeFerrySearchStore = useFerrySearchStore();
const storeFerrySelectionStore = useFerrySelectionStore();

const { values: search, isRoundTrip } = storeToRefs(storeFerrySearchStore);
const { outbound, inbound, outboundFare, inboundFare } = storeToRefs(storeFerrySelectionStore);

const { data: schedulesData, isLoading } = useScheduleQuery('inbound');
const { goToInboundFare, goToOutbound } = useFerryNavigation();
const { grandTotal } = useTripPrice();

const selectedOutbound = computed(() => {
  if (!outbound.value) return undefined;
  return BookingSummaryMapper.toFerryLegSummary(outbound.value, search.value.passengerCount, outboundFare.value);
});

const selectedInbound = computed(() => {
  if (!inbound.value) return undefined;
  return BookingSummaryMapper.toFerryLegSummary(inbound.value, search.value.passengerCount, inboundFare.value);
});

const searchSummaryCardProps = computed(() =>
  BookingSummaryMapper.toSearchSummaryCardProps(search.value, true),
);

const handleSelect = (schedule: Ferry) => {
  storeFerrySelectionStore.setInbound(schedule);
};

const goToBack = () => {
  goToOutbound();
  storeFerrySelectionStore.reset();
};
</script>
