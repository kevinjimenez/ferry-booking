<template>
  <div class="flex md:flex-col gap-x-2 md:gap-y-2 md:items-start md:justify-center shrink-0 md:pr-20">
    <p class="text-4xs sm:text-3xs text-text-secondary md:text-text-muted uppercase font-bold">{{ ferryName }}</p>
    <div class="hidden md:flex items-center justify-start gap-x-2">
      <BriefcaseIcon class="size-6 text-ink-500" />
      <LifeJacketIcon class="size-6 text-ink-500" />
      <WifiIcon class="size-6 text-ink-500" />
    </div>
    <p class="text-4xs sm:text-2xs text-text-muted md:text-ink-500 font-bold">{{ seatLabel }}</p>
  </div>
</template>

<script setup lang="ts">
import BriefcaseIcon from '@/shared/icons/BriefcaseIcon.vue';
import LifeJacketIcon from '@/shared/icons/LifeJacketIcon.vue';
import WifiIcon from '@/shared/icons/WifiIcon.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  ferryName: string;
  seats: number;
}>();

const { t } = useI18n();

const seatLabel = computed(() =>
  props.seats > 0
    ? t('ferry.scheduleFerryInfo.seatsAvailable', { count: props.seats })
    : t('ferry.scheduleFerryInfo.soldOut'),
);
</script>
