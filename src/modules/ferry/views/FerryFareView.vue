<template>
  <div>
    <FerryNavHeader :title="headerTitle" :subtitle="headerSubtitle" @back="goToBack"
      class-container="sm:px-8 sm:gap-y-5" />

    <section class="flex flex-col w-full p-5 gap-5 sm:p-10 sm:gap-10 items-center justify-center self-center">
      <FareTripSummaryBar v-bind="fareTripSummaryBarProps" />

      <div class="flex flex-col md:flex-row gap-y-5 sm:gap-x-2 sm:justify-around items-center w-full pb-28 md:pb-0">
        <FareCard v-for="fare in faresResponse" :key="fare.id" :id="fare.id" :name="fare.name"
          :price="Number(fare.price)" :description="fare.description" :features="fare.features" @select="setFare(fare)"
          :selected="selectedFare?.id" />
      </div>

      <FareSelectionFooter :footer-label="footerLabel" :selected-fare-name="selectedFare?.name ?? ''"
        :button-label="buttonLabel" @continue="handleContinue" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import FareTripSummaryBar from '@/modules/ferry/components/FareTripSummaryBar.vue';
import FareCard from '@/modules/ferry/components/FareCard.vue';
import FareSelectionFooter from '@/modules/ferry/components/FareSelectionFooter.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useGetFaresQuery } from '@/modules/ferry/queries/get-fares.query.ts';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import type { FareResponse } from '@/modules/ferry/types/api/responses/fare-response.types.ts';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const { isRoundTrip } = storeToRefs(useFerrySearchStore());
const selectionStore = useFerrySelectionStore();
const { outbound, inbound, outboundFare, inboundFare } = storeToRefs(selectionStore);
const { goToInbound, goToTripSummary } = useFerryNavigation();
const { data: faresResponse } = useGetFaresQuery();

const isOutbound = computed(() => route.meta.direction === 'outbound');

const selectedFare = computed({
  get: () => (isOutbound.value ? outboundFare.value : inboundFare.value),
  set: (fare: FareResponse) =>
    isOutbound.value ? selectionStore.setOutboundFare(fare) : selectionStore.setInboundFare(fare),
});

const setFare = (fare: FareResponse) => {
  selectedFare.value = fare;
};

watch(
  faresResponse,
  fares => {
    if (fares && !selectedFare.value) {
      const defaultFare = fares[0];
      if (defaultFare) selectedFare.value = defaultFare;
    }
  },
  { immediate: true },
);

const fareTripSummaryBarProps = computed(() => {
  const trip = isOutbound.value ? outbound.value : inbound.value;
  return {
    departureTime: trip?.origin.time ?? '00:00',
    arrivalTime: trip?.destination.time ?? '00:00',
    origin: trip?.origin.island ?? '---',
    destination: trip?.destination.island ?? '---',
    routeType: t('ferry.fare.routeTypeDirect'),
    isRoundTrip: false,
  };
});

const headerTitle = computed(() =>
  isOutbound.value ? t('ferry.fare.headerTitleOutbound') : t('ferry.fare.headerTitleInbound'),
);

const headerSubtitle = computed(() => t('ferry.fare.headerSubtitle'));

const footerLabel = computed(() =>
  isOutbound.value ? t('ferry.fare.footerLabelOutbound') : t('ferry.fare.footerLabelInbound'),
);

const buttonLabel = computed(() => {
  if (isOutbound.value && isRoundTrip.value) return t('ferry.fare.selectFerryButton');
  return t('ferry.fare.continueButton');
});

const handleContinue = () => {
  if (isOutbound.value && isRoundTrip.value) {
    goToInbound();
  } else {
    goToTripSummary();
  }
};

const goToBack = () => {
  router.back();
  // selectionStore.reset();
};
</script>
