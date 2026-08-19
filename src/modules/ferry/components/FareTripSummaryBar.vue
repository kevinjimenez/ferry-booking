<template>
  <div
    class="w-full flex flex-col sm:flex-row shadow-sm rounded-sm p-5 sm:p-7 sm:gap-y-5 border-2 border-gray-200 justify-between items-center bg-white">
    <div class="flex flex-col sm:flex-row justify-center items-center gap-y-3 sm:gap-x-5">
      <TripTypeBadges :is-round-trip="isRoundTrip" />

      <div class="flex text-primary items-center sm:gap-x-1 sm:justify-between">
        <h6 class="text-h6 font-bold">{{ departureTime }}</h6>
        <ArrowRightDashedIcon class="size-6 text-ink-500" />
        <h6 class="text-h6 font-bold">{{ arrivalTime }}</h6>
      </div>

      <BaseDivider class="rotate-270 sm:rotate-180 h-5 sm:h-10 self-center" />

      <div class="flex flex-col gap-y-1">
        <div class="flex text-primary items-center gap-y-1 sm:gap-x-1 w-full sm:justify-between">
          <span class="text-xs font-semibold">{{ origin }}</span>
          <ArrowRightDashedIcon class="size-5" />
          <span class="text-xs font-semibold">{{ destination }}</span>
        </div>
        <span v-if="pier" class="text-2xs">{{ pier }}</span>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row">
      <span class="flex items-center text-3xs sm:text-xs font-bold text-heading me-3">
        <span class="flex w-2.5 h-2.5 bg-primary rounded-full me-1.5 shrink-0" />
        {{ routeType }} {{ $t('ferry.scheduleTimeline.averageDuration') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import TripTypeBadges from '@/modules/ferry/components/TripTypeBadges.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';
import BaseDivider from '@/shared/components/ui/BaseDivider.vue';

defineProps<{
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  pier?: string;
  routeType: string;
  isRoundTrip: boolean;
}>();
</script>
