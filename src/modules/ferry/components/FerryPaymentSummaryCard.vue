<template>
  <BaseCard :icon="ReceiptIcon" :title="$t('ferry.ferryPaymentSummaryCard.title')" icon-class="size-6"
    title-class="text-base text-text-muted font-semibold">
    <div class="flex flex-col gap-y-1">
      <LabelValue :label="$t('ferry.ferryPaymentSummaryCard.outboundFerry')" :value="outboundLabel" :custom-class="{
        label: 'text-md text-primary font-bold',
        value: 'text-md text-primary font-bold',
      }" />
      <LabelValue v-if="outboundFareName" :label="outboundFareName" :value="outboundFarePrice ?? ''" :custom-class="{
        label: 'text-sm text-text-muted font-semibold',
        value: 'text-sm text-text-muted font-semibold',
      }" />
    </div>

    <div v-if="isRoundTrip" class="flex flex-col gap-y-1">
      <LabelValue :label="$t('ferry.ferryPaymentSummaryCard.inboundFerry')" :value="inboundLabel" :custom-class="{
        label: 'text-md text-primary font-bold',
        value: 'text-md text-primary font-bold',
      }" />
      <LabelValue v-if="inboundFareName" :label="inboundFareName" :value="inboundFarePrice ?? ''" :custom-class="{
        label: 'text-sm text-text-muted font-bold',
        value: 'text-sm text-text-muted font-bold',
      }" />
    </div>

    <LabelValue v-for="extra in extras" :key="extra.id" :label="extra.title" :value="formatCurrency(extra.price)"
      :custom-class="{
        label: 'text-md text-primary font-semibold',
        value: 'text-md text-primary font-semibold',
      }" />

    <LabelValue v-if="discount" :label="$t('ferry.ferryPaymentSummaryCard.discount')" :value="`- ${discount}`"
      :custom-class="{
        label: 'text-md text-success font-semibold',
        value: 'text-md text-success font-semibold',
      }" />

    <BaseDivider />

    <LabelValue :label="$t('ferry.ferryPaymentSummaryCard.total')" :value="total" :custom-class="{
      label: 'text-lg text-primary font-extrabold',
      value: 'text-2xl text-primary font-extrabold',
    }" />
  </BaseCard>
</template>

<script setup lang="ts">
import type { SelectedExtra } from '@/modules/ferry/stores/ferry-selection.store.ts';
import LabelValue from '@/shared/components/LabelValue.vue';
import BaseCard from '@/shared/components/ui/BaseCard.vue';
import BaseDivider from '@/shared/components/ui/BaseDivider.vue';
import ReceiptIcon from '@/shared/icons/ReceiptIcon.vue';
import { formatCurrency } from '@/shared/utils/currency.utils.ts';

defineProps<{
  isRoundTrip: boolean;
  total: string;
  outboundLabel: string;
  inboundLabel: string;
  outboundFareName?: string;
  outboundFarePrice?: string;
  inboundFareName?: string;
  inboundFarePrice?: string;
  extras?: SelectedExtra[];
  discount?: string;
}>();
</script>
