<template>
  <FerryNavHeader title="Pago" @back="$router.back()" />
  <div class="flex p-10 gap-x-10" v-if="!isPending">
    <div class="flex flex-col gap-y-6 w-1/2">
      <FerryPassengersSummaryCard :passengers="ferrySearchStore.values.passengerCount" />

      <FerryPaymentSummaryCard
        :is-round-trip="ferrySearchStore.isRoundTrip"
        :total="formatCurrency(grandTotal)"
        :outbound-label="outboundLabel"
        :inbound-label="inboundLabel"
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

    <div class="flex flex-col gap-y-6 w-1/2">
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
  <BaseButton @click="goToSearch"> de regreso a buscar </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import { useFerryNavigation } from '@/modules/ferry/composables/useFerryNavigation.ts';
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import BoxIcon from '@/shared/icons/BoxIcon.vue';
import CheckIcon from '@/shared/icons/CheckIcon.vue';
import TripIncludesCard from '@/modules/ferry/components/TripIncludesCard.vue';
import FerryPassengersSummaryCard from '@/modules/ferry/components/FerryPassengersSummaryCard.vue';
import FerryPaymentSummaryCard from '@/modules/ferry/components/FerryPaymentSummaryCard.vue';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useTripPrice } from '@/modules/ferry/composables/useTripPrice.ts';
import { formatCurrency, toCents } from '@/shared/utils/currency.utils.ts';
import { computed } from 'vue';
import FerryPayphoneButton from '@/modules/ferry/components/FerryPayphoneButton.vue';
import { env } from '@/config/env.ts';
import { useTicketQuery } from '@/modules/ferry/composables/useTicketQuery.ts';

const ferrySearchStore = useFerrySearchStore();
const transactionId = crypto.randomUUID();

const { goToSearch } = useFerryNavigation();
const { inboundTotal, outboundTotal, grandTotal } = useTripPrice();

const payphoneToken = env.payphoneToken;
const payphoneStoreId = env.payphoneStoreId;

const { data: ticket, isPending } = useTicketQuery();
// loggerServices.log(ticket.value);

// const aa = computed(() => date.)

const outboundLabel = computed(
  () => `${ferrySearchStore.values.passengerCount} x ${formatCurrency(outboundTotal.value)}`,
);
const inboundLabel = computed(
  () => `${ferrySearchStore.values.passengerCount} x ${formatCurrency(inboundTotal.value)}`,
);
</script>
