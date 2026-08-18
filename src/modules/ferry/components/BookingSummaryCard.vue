<template>
  <div class="flex flex-col shadow-sm rounded-md p-7 gap-y-5 border-2 border-gray-200 bg-white">
    <span class="text-2sm font-bold text-text-secondary"> {{ $t('ferry.bookingSummaryCard.yourSelection') }} </span>

    <EmptyState v-if="!outbound" :title="$t('ferry.bookingSummaryCard.emptyState.title')" :icon="FerryIcon"
      :description="$t('ferry.bookingSummaryCard.emptyState.outboundDescription')">
      <BaseButton class="w-full" :prefix-icon="PlusIcon" icon-class="size-5" disabled>
        {{ $t('ferry.bookingSummaryCard.emptyState.chooseSchedule') }}
      </BaseButton>
    </EmptyState>
    <TripLegSummary v-else v-bind="outbound" :badge-label="$t('ferry.tripTypeBadges.outbound')" />

    <template v-if="isRoundTrip && outbound">
      <EmptyState v-if="!inbound" :title="$t('ferry.bookingSummaryCard.emptyState.title')" :icon="FerryIcon"
        :description="$t('ferry.bookingSummaryCard.emptyState.inboundDescription')">
        <BaseButton class="w-full" :prefix-icon="PlusIcon" icon-class="size-5" disabled>
          {{ $t('ferry.bookingSummaryCard.emptyState.chooseSchedule') }}
        </BaseButton>
      </EmptyState>
      <TripLegSummary v-else v-bind="inbound" :badge-label="$t('ferry.tripTypeBadges.inbound')" type="inbound" />
    </template>

    <template v-if="outbound && (!isRoundTrip || inbound)">
      <LabelValue :label="$t('ferry.bookingSummaryCard.passengers')" :value="outbound?.passengers ?? '0'" :custom-class="{
        label: 'text-sm text-primary font-semibold',
        value: 'text-sm text-primary font-bold',
      }" />
      <hr class="border-gray-200 mt-2.5 border-[0.1rem]" />
      <div class="flex justify-between">
        <span class="text-md font-bold">{{ $t('ferry.bookingSummaryCard.total') }}</span>
        <span class="text-[30px] text-secondary font-bold">{{ total }}</span>
      </div>
      <BaseButton size="lg" :suffix-icon="ArrowRightDashedIcon" @click="$emit('continue')">{{
        buttonLabel
      }}</BaseButton>
    </template>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import FerryIcon from '@/shared/icons/FerryIcon.vue';
import PlusIcon from '@/shared/icons/PlusIcon.vue';
import EmptyState from '@/shared/components/EmptyState.vue';
import TripLegSummary from '@/modules/ferry/components/TripLegSummary.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';
import LabelValue from '@/shared/components/LabelValue.vue';

interface TripLeg {
  origin: string;
  destination: string;
  ferry: string;
  departure: string;
  arrival: string;
  passengers: string;
  fare?: string;
  basePrice?: string;
  farePrice?: string;
  price: string;
}

withDefaults(
  defineProps<{
    outbound?: TripLeg;
    inbound?: TripLeg;
    total: string;
    buttonLabel: string;
    isRoundTrip?: boolean;
  }>(),
  {
    isRoundTrip: false,
  },
);

defineEmits<{ continue: [] }>();
</script>
