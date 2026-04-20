<template>
  <div
    class="w-full flex border border-gray-200 p-4 rounded-md shadow-sm items-center justify-between"
  >
    <RouteDirection
      :origin-name="originName"
      :origin-island="originIsland"
      :destination-name="destinationName"
      :destination-island="destinationIsland"
    />
    <div class="flex w-full justify-end items-center gap-x-5">
      <div class="flex">
        <BaseIconLabel :prefix-icon="ClockIcon" icon-class="size-4 text-text-muted">
          <small class="text-text-muted text-2xs">{{ duration }}</small>
        </BaseIconLabel>
      </div>

      <div class="flex flex-col items-end">
        <small class="text-text-muted text-2xs">{{ dateLabel }}</small>
        <small class="text-text-muted text-2xs">{{ passengers }} pasajeros</small>
      </div>
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
