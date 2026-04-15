<template>
  <FerryNavHeader :title="title" @back="$router.back()" />

  <div class="flex flex-col w-full justify-center items-center">
    <div class="flex w-full justify-center items-center gap-x-10 mt-8">
      <FerryTripCard
        :passenger-count="search.passengerCount"
        type="outbound"
        :date="search?.outboundDate ?? ''"
        :origin="{
          time: outbound!.origin.time,
          port: outbound!.origin.port,
          island: outbound!.origin.island,
        }"
        :destination="{
          time: outbound!.destination.time,
          port: outbound!.destination.port,
          island: outbound!.destination.island,
        }"
        :duration="outbound!.duration"
        :badges="['2h 00m', 'Clase Premium', '20 pasajeros']"
        :details="[
          { label: 'Codigo', value: 'PAR-SC-IS-0412' },
          { label: 'Embarcacion', value: outbound!.ferry.name },
          { label: 'Clase', value: outbound!.ferry.type },
          { label: 'Precio', value: formatCurrency(outbound!.price) },
        ]"
        :subtotal="outboundTotal"
        @change="handleChange"
      />
      <FerryTripCard
        :passengerCount="search.passengerCount"
        v-if="inbound"
        type="inbound"
        :date="search?.inboundDate ?? ''"
        :origin="{
          time: inbound!.origin.time,
          port: inbound!.origin.port,
          island: inbound!.origin.island,
        }"
        :destination="{
          time: inbound!.destination.time,
          port: inbound!.destination.port,
          island: inbound!.destination.island,
        }"
        :duration="inbound!.duration"
        :badges="['2h 00m', 'Clase Premium', '20 pasajeros']"
        :details="[
          { label: 'Codigo', value: 'PAR-SC-IS-0412' },
          { label: 'Embarcacion', value: inbound!.ferry.name },
          { label: 'Clase', value: inbound!.ferry.type },
          { label: 'Precio', value: formatCurrency(inbound!.price) },
        ]"
        :subtotal="inboundTotal"
        @change="handleChange"
      />
    </div>

    <div class="flex flex-col w-1/3">
      <LabelValue
        class="my-8"
        label="Total Ida y Vuelta"
        :value="formatCurrency(grandTotal)"
        :custom-class="{
          label: 'text-lg text-primary font-semibold',
          value: 'text-2xl text-secondary font-semibold',
        }"
      />
      <BaseButton @click="goToPassengerDetails" :suffix-icon="ArrowRightDashedIcon">
        Continuar
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { computed } from 'vue';
import BaseButton from '@/shared/components/base/BaseButton.vue';
import { loggerServices } from '@/shared/services';
import FerryTripCard from '@/modules/ferry/components/FerryTripCard.vue';
import { formatCurrency } from '@/shared/utils/currency.utils.ts';
import LabelValue from '@/shared/components/LabelValue.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import { storeToRefs } from 'pinia';
import { useTripPrice } from '@/modules/ferry/composables/useTripPrice.ts';

const storeFerrySearch = useFerrySearchStore();
const storeFerrySelection = useFerrySelectionStore();
const { values: search } = storeToRefs(storeFerrySearch);
const { inbound, outbound } = storeToRefs(storeFerrySelection);

const title = computed(() =>
  storeFerrySearch.isRoundTrip ? 'Confirma tu viaje — Ida y Vuelta' : 'Confirma tu viaje — Ida',
);
const { goToPassengerDetails } = useFerryNavigation();
const { grandTotal, inboundTotal, outboundTotal } = useTripPrice();

const handleChange = () => {
  loggerServices.log('handleChange');
};
</script>
