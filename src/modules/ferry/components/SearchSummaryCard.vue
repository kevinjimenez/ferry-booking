<template>
  <div
    class="w-full flex flex-col lg:flex-row border border-gray-200 p-5 lg:p-10 rounded-sm shadow-sm items-center lg:justify-between bg-white">
    <div class="flex flex-col w-full gap-y-3">
      <small class="text-ink-500 text-4xs sm:text-2xs font-bold uppercase">{{ dateLabel }}</small>
      <RouteDirection :origin-name="originName" :origin-pier-name="originPierName" :origin-port-address="originPortAddress"
        :destination-name="destinationName" :destination-pier-name="destinationPierName"
        :destination-port-address="destinationPortAddress" />
    </div>
    <div class="flex w-full lg:w-auto shrink-0 lg:justify-end items-center gap-x-5">
      <small class="text-ink-600 text-3xs sm:text-xs whitespace-nowrap">{{ $t('ferry.searchSummaryCard.passengers', { count: passengers }) }}</small>
      <BaseIconLabel :prefix-icon="ClockIcon" icon-class="size-4 text-ink-600">
        <small class="text-ink-600 text-3xs sm:text-xs whitespace-nowrap">{{ $t('ferry.scheduleTimeline.averageDuration') }}</small>
      </BaseIconLabel>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseIconLabel from '@/shared/components/ui/BaseIconLabel.vue';
import RouteDirection from '@/modules/ferry/components/RouteDirection.vue';
import { computed } from 'vue';
import dayjs from 'dayjs';
import { DATE_FORMATS } from '@/shared/constants/date-formats.constants.ts';
import ClockIcon from '@/shared/icons/ClockIcon.vue';

export interface SearchSummaryCardProps {
  originName: string;
  originPierName?: string;
  originPortAddress?: string;
  destinationName: string;
  destinationPierName?: string;
  destinationPortAddress?: string;
  date: string;
  passengers: number;
}

const props = defineProps<SearchSummaryCardProps>();

const dateLabel = computed(() => dayjs(props.date).format(DATE_FORMATS.DISPLAY_LONG));
</script>
