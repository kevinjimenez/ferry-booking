<template>
  <FerryNavHeader :title="$t('ferry.payment.headerTitle')" @back="$router.back()" />

  <FerryPaymentSkeleton v-if="isPending" />

  <div v-else class="flex flex-col sm:flex-row p-5 sm:p-10 gap-y-5 sm:gap-x-10">
    <div class="flex flex-col gap-y-6 sm:w-1/2">
      <FerryPassengersSummaryCard :passengers="ferrySearchStore.values.passengerCount" />

      <FerryPaymentSummaryCard :is-round-trip="ferrySearchStore.isRoundTrip"
        :total="ticket ? formatCurrency(Number(ticket.total)) : formatCurrency(grandTotal)"
        :discount="ticket && Number(ticket.discount) > 0 ? formatCurrency(Number(ticket.discount)) : undefined"
        :outbound-label="outboundLabel" :inbound-label="inboundLabel"
        :outbound-fare-name="ferrySelectionStore.outboundFare?.name"
        :outbound-fare-price="ferrySelectionStore.outboundFare ? formatCurrency(parseFloat(ferrySelectionStore.outboundFare.price)) : undefined"
        :inbound-fare-name="ferrySelectionStore.inboundFare?.name"
        :inbound-fare-price="ferrySelectionStore.inboundFare ? formatCurrency(parseFloat(ferrySelectionStore.inboundFare.price)) : undefined"
        :extras="ferrySelectionStore.selectedExtras" />

      <TripIncludesCard :title="$t('ferry.payment.tripIncludes.title')" :icon="BoxIcon" :items="[
        { icon: CheckIcon, text: $t('ferry.payment.tripIncludes.items.pierTransfer') },
        { icon: CheckIcon, text: $t('ferry.payment.tripIncludes.items.lifeVest') },
        { icon: CheckIcon, text: $t('ferry.payment.tripIncludes.items.luggage') },
        { icon: CheckIcon, text: $t('ferry.payment.tripIncludes.items.wifi') },
      ]" />

      <TripIncludesCard :title="$t('ferry.payment.tripNotIncluded.title')" :icon="CircleXIcon" :items="[
        { icon: CircleXIcon, text: $t('ferry.payment.tripNotIncluded.items.waterTaxi') },
        { icon: CircleXIcon, text: $t('ferry.payment.tripNotIncluded.items.isabelaPierFee') },
      ]" />
    </div>

    <div class="flex flex-col gap-y-6 sm:w-1/2">
      <div class="flex flex-col gap-y-2">
        <a :href="contractPdfUrl" target="_blank" rel="noopener" class="text-2xs font-semibold text-primary underline">
          {{ $t('ferry.payment.contract.viewLink') }}
        </a>
        <BaseCheckbox v-model="hasAcceptedContract" :label="$t('ferry.payment.contract.acceptLabel')" />
      </div>

      <FerryPayphoneButton v-if="hasAcceptedContract" :token="payphoneToken" :store-id="payphoneStoreId"
        :client-transaction-id="transactionId" :amount="toCents(Number(ticket!.total))"
        :amount-without-tax="toCents(Number(ticket!.total))" :amount-with-tax="toCents(0)" reference="" />
      <BaseButton v-else disabled class="w-full" height="h-[3.5rem]">
        <span class="text-sm">{{ $t('ferry.payment.contract.acceptLabel') }}</span>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import FerryNavHeader from '@/modules/ferry/components/FerryNavHeader.vue';
import BoxIcon from '@/shared/icons/BoxIcon.vue';
import CheckIcon from '@/shared/icons/CheckIcon.vue';
import CircleXIcon from '@/shared/icons/CircleXIcon.vue';
import TripIncludesCard from '@/modules/ferry/components/TripIncludesCard.vue';
import FerryPassengersSummaryCard from '@/modules/ferry/components/FerryPassengersSummaryCard.vue';
import FerryPaymentSummaryCard from '@/modules/ferry/components/FerryPaymentSummaryCard.vue';
import { useFerrySearchStore } from '@/modules/ferry/stores/ferry-search.store.ts';
import { useFerrySelectionStore } from '@/modules/ferry/stores/ferry-selection.store.ts';
import { useTripPrice } from '@/modules/ferry/composables/useTripPrice.ts';
import { formatCurrency, toCents } from '@/shared/utils/currency.utils.ts';
import { computed, ref } from 'vue';
import FerryPayphoneButton from '@/modules/ferry/components/FerryPayphoneButton.vue';
import FerryPaymentSkeleton from '@/modules/ferry/components/FerryPaymentSkeleton.vue';
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import BaseCheckbox from '@/shared/components/ui/BaseCheckbox.vue';
import { env } from '@/config/env.ts';
import { useTicketQuery } from '@/modules/ferry/composables/useTicketQuery.ts';
import { useI18n } from 'vue-i18n';

const ferrySearchStore = useFerrySearchStore();
const ferrySelectionStore = useFerrySelectionStore();
const transactionId = crypto.randomUUID();
const { t } = useI18n();

const hasAcceptedContract = ref(false);
const contractPdfUrl = '/contrato_paradeisos_2020.pdf';

const { inboundTotal, outboundTotal, grandTotal } = useTripPrice();

const payphoneToken = env.payphoneToken;
const payphoneStoreId = env.payphoneStoreId;

const { data: ticket, isPending } = useTicketQuery();

const outboundLabel = computed(() =>
  t('ferry.payment.passengerRateLabel', {
    count: ferrySearchStore.values.passengerCount,
    amount: formatCurrency(outboundTotal.value),
  }),
);
const inboundLabel = computed(() =>
  t('ferry.payment.passengerRateLabel', {
    count: ferrySearchStore.values.passengerCount,
    amount: formatCurrency(inboundTotal.value),
  }),
);
</script>
