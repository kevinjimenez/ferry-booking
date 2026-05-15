<template>
  <div
    class="w-full flex shadow-sm rounded-md p-7 gap-y-5 border-2 border-gray-200 justify-between items-center bg-white"
  >
    <div class="flex justify-center items-center gap-x-5">
      <TripTypeBadges :is-round-trip="isRoundTrip" />

      <div class="flex text-primary items-center gap-x-1 justify-between">
        <h6 class="text-h6 font-bold">{{ departureTime }}</h6>
        <ArrowRightDashedIcon class="size-6 text-ink-500" />
        <h6 class="text-h6 font-bold">{{ arrivalTime }}</h6>
      </div>

      <BaseDivider class="rotate-180 h-10 self-center" />

      <div class="flex flex-col gap-y-1">
        <div class="flex text-primary items-center gap-x-1 w-full justify-between">
          <span class="text-xs font-semibold">{{ origin }}</span>
          <ArrowRightDashedIcon class="size-5" />
          <span class="text-xs font-semibold">{{ destination }}</span>
        </div>
        <span v-if="pier" class="text-2xs">{{ pier }}</span>
      </div>
    </div>

    <div class="flex">
      <span class="flex items-center text-xs font-bold text-heading me-3">
        <span class="flex w-2.5 h-2.5 bg-primary rounded-full me-1.5 shrink-0" />
        {{ routeType }} {{ duration }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import TripTypeBadges from '@/modules/ferry/components/TripTypeBadges.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';
import BaseDivider from '@/shared/components/base/BaseDivider.vue';

defineProps<{
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  pier?: string;
  routeType: string;
  duration: string;
  isRoundTrip: boolean;
}>();
</script>
