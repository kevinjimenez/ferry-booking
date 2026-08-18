<template>
  <div class="flex items-center gap-x-10 w-full">
    <div class="flex flex-col flex-1 gap-y-4">
      <span v-if="ferryName" class="text-3xs sm:text-sm text-ink-500 truncate font-semibold">{{
        ferryName
        }}</span>
      <span v-else class="text-2xs text-sm text-ink-500">{{ $t('ferry.mobileBookingBar.selectFerry') }}</span>
      <div v-if="origin && destination" class="flex flex-col justify-center gap-x-5 md:gap-x-10">
        <div class="flex items-center gap-x-2">
          <BaseBadge :label="$t('ferry.mobileBookingBar.departure')" soft label-class="font-semibold text-3xs sm:text-xs" variant="primary" />
          <span class="text-2xs sm:text-base font-bold text-primary">{{
            origin
          }}</span>
        </div>
        <div class="flex items-center gap-x-2">
          <BaseBadge :label="$t('ferry.mobileBookingBar.arrival')" soft label-class="font-semibold text-3xs sm:text-xs" variant="primary" />
          <span class="text-2xs sm:text-base font-bold text-primary">{{
            destination
          }}</span>
        </div>
        <!-- <ArrowRightDashedIcon />
        <span class="text-2xs sm:text-lg font-semibold text-primary">{{
          destination
        }}</span>  -->
      </div>
    </div>

    <div class="flex flex-col gap-y-5">
      <div class="flex flex-col items-center justify-center shrink-0">
        <span class="text-xs sm:text-sm text-ink-500 font-semibold">{{ $t('ferry.mobileBookingBar.total') }}</span>
        <span class="text-4xl sm:text-h2 font-extrabold text-secondary">{{ total }}</span>
      </div>

      <BaseButton :disabled="!ferryName" :suffix-icon="ArrowRightDashedIcon" icon-class="size-4" size="sm"
        class="shrink-0" height="sm:h-[3rem]" @click="$emit('continue')">
        <span class="sm:text-xs font-bold">{{ buttonLabel ?? $t('ferry.mobileBookingBar.continueButton') }}</span>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseBadge from '@/shared/components/ui/BaseBadge.vue';
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';

defineProps<{
  ferryName?: string;
  origin?: string;
  destination?: string;
  total: string;
  buttonLabel?: string;
}>();

defineEmits<{ continue: [] }>();
</script>
