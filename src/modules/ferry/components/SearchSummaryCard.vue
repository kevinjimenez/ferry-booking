<template>
  <div
    class="w-full flex border border-gray-200 p-10 rounded-sm shadow-sm items-center justify-between bg-white"
  >
    <div class="flex flex-col w-full gap-y-3">
      <small class="text-ink-500 text-2xs font-bold uppercase">{{ dateLabel }}</small>
      <RouteDirection
        :origin-name="originName"
        :origin-island="originIsland"
        :destination-name="destinationName"
        :destination-island="destinationIsland"
      />
    </div>
    <div class="flex w-full justify-end items-center gap-x-5">
      <small class="text-ink-600 text-xs">{{ passengers }} pasajeros</small>
      <BaseIconLabel :prefix-icon="ClockIcon" icon-class="size-4 text-ink-600">
        <small class="text-ink-600 text-xs">{{ duration }}</small>
      </BaseIconLabel>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseIconLabel from '@/shared/components/base/BaseIconLabel.vue';
import RouteDirection from '@/modules/ferry/components/RouteDirection.vue';
import { computed } from 'vue';
import { formatDate } from '@vueuse/core';
import { DATE_FORMATS } from '@/shared/constants/date-formats.constants.ts';
import ClockIcon from '@/shared/icons/ClockIcon.vue';

export interface SearchSummaryCardProps {
  originName: string;
  originIsland: string;
  destinationName: string;
  destinationIsland: string;
  date: string;
  passengers: number;
  duration: string;
}

const props = defineProps<SearchSummaryCardProps>();

const dateLabel = computed(() => formatDate(new Date(props.date), DATE_FORMATS.DISPLAY_LONG));
</script>
