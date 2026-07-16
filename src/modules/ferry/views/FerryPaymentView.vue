<template>
  <FerryNavHeader title="Pago" @back="$router.back()" />

  <FerryPaymentSkeleton v-if="isPending" />

  <div v-else class="flex flex-col sm:flex-row p-5 sm:p-10 gap-y-5 sm:gap-x-10">
    <div class="flex flex-col gap-y-6 sm:w-1/2">
      <FerryPassengersSummaryCard :passengers="ferrySearchStore.values.passengerCount" />

      <FerryPaymentSummaryCard
        :is-round-trip="ferrySearchStore.isRoundTrip"
        :total="formatCurrency(grandTotal)"
        :outbound-label="outboundLabel"
        :inbound-label="inboundLabel"
        :outbound-fare-name="ferrySelectionStore.outboundFare?.name"
        :outbound-fare-price="ferrySelectionStore.outboundFare ? formatCurrency(parseFloat(ferrySelectionStore.outboundFare.price)) : undefined"
        :inbound-fare-name="ferrySelectionStore.inboundFare?.name"
        :inbound-fare-price="ferrySelectionStore.inboundFare ? formatCurrency(parseFloat(ferrySelectionStore.inboundFare.price)) : undefined"
        :extras="ferrySelectionStore.selectedExtras"
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

    <div class="flex flex-col gap-y-6 sm:w-1/2">
      <FerryPayphoneButton
        :token="payphoneToken"
        :store-id="payphoneStoreId"
        :client-transaction-id="transactionId"
        :amount="toCents(Number(ticket!.subtotal))"
        :amount-without-tax="toCents(Number(ticket!.total))"
        :amount-with-tax="toCents(0)"
        reference=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import BoxIcon from '@/shared/icons/BoxIcon.vue';
import CheckIcon from '@/shared/icons/CheckIcon.vue';
import TripIncludesCard from '@/modules/ferry/components/TripIncludesCard.vue';
import FerryPassengersSummaryCard from '@/modules/ferry/components/FerryPassengersSummaryCard.vue';
import FerryPaymentSummaryCard from '@/modules/ferry/components/FerryPaymentSummaryCard.vue';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import { useTripPrice } from '@/modules/ferry/composables/useTripPrice.ts';
import { formatCurrency, toCents } from '@/shared/utils/currency.utils.ts';
import { computed } from 'vue';
import FerryPayphoneButton from '@/modules/ferry/components/FerryPayphoneButton.vue';
import FerryPaymentSkeleton from '@/modules/ferry/components/FerryPaymentSkeleton.vue';
import { env } from '@/config/env.ts';
import { useTicketQuery } from '@/modules/ferry/composables/useTicketQuery.ts';

const ferrySearchStore = useFerrySearchStore();
const ferrySelectionStore = useFerrySelectionStore();
const transactionId = crypto.randomUUID();

const { inboundTotal, outboundTotal, grandTotal } = useTripPrice();

const payphoneToken = env.payphoneToken;
const payphoneStoreId = env.payphoneStoreId;

const { data: ticket, isPending } = useTicketQuery();

const outboundLabel = computed(
  () => `${ferrySearchStore.values.passengerCount} x ${formatCurrency(outboundTotal.value)}`,
);
const inboundLabel = computed(
  () => `${ferrySearchStore.values.passengerCount} x ${formatCurrency(inboundTotal.value)}`,
);
</script>
