<template>
  <div class="flex flex-col items-start justify-center gap-y-1 w-full">
    <p class="sm:text-sm text-text-muted font-bold">{{ badgeLabel }}</p>
    <div class="flex items-center justify-between w-full gap-x-2 sm:gap-x-4">
      <div class="flex flex-col items-center rounded-md px-2.5 py-1 sm:px-4 sm:py-2 min-w-14 sm:min-w-20">
        <span class="text-xs sm:text-lg font-extrabold text-primary">{{ origin }}</span>
        <span class="text-3xs sm:text-xs font-bold text-primary">{{ departure }}</span>
      </div>
      <ArrowRightDashedIcon class="size-6 sm:size-10 text-primary shrink-0" />
      <div class="flex flex-col items-center rounded-md px-2.5 py-1 sm:px-4 sm:py-2 min-w-14 sm:min-w-20">
        <span class="text-xs sm:text-lg font-extrabold text-primary">{{ destination }}</span>
        <span class="text-3xs sm:text-xs font-bold text-primary">{{ arrival }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';

defineProps<{
  badgeLabel: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
}>();
</script>
