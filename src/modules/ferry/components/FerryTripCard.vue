<template>
  <div class="flex flex-col w-1/3">
    <div class="flex border-2 rounded-t-md bg-primary justify-between px-5 py-3">
      <div class="flex items-center gap-x-4">
        <BaseBadge
          :label="type === 'outbound' ? 'IDA' : 'VUELTA'"
          :variant="type === 'outbound' ? 'secondary' : 'primary'"
          class="badge-md"
        />
        <span class="text-white text-xs">{{ dateLabel }}</span>
      </div>
      <BaseButton
        :color="type === 'outbound' ? 'secondary' : 'primary'"
        size="sm"
        @click="$emit('change')"
        >Cambiar</BaseButton
      >
    </div>

    <div class="flex flex-col border-2 border-gray-200 rounded-b-md shadow-sm gap-y-5 p-4 w-full">
      <FerryRoute
        :origin="origin"
        :destination="destination"
        :duration="duration"
        :origin-stop-detail-class="{
          timeClass: 'text-h3 font-semibold',
          portClass: 'text-sm text-gray-400 font-medium',
          islandClass: 'text-xs text-gray-300 font-medium',
        }"
        :destination-stop-detail-class="{
          timeClass: 'text-h3 font-semibold',
          portClass: 'text-sm text-gray-400 font-medium',
          islandClass: 'text-xs text-gray-300 font-medium',
        }"
        timeline-class="w-full"
        class="w-full"
      />

      <div class="flex flex-wrap w-full gap-x-5">
        <BaseBadge
          v-for="badge in badges"
          :key="badge"
          :label="badge"
          :prefix-icon="ClockIcon"
          icon-class="size-4"
          soft
        />
      </div>

      <BaseDivider class="mt-2" />

      <SectionDetails title="DETALLES" :items="details" />

      <BaseDivider class="mb-2" />

      <LabelValue
        :label="`Subtotal (${passengerCount} Pasajeros) ${type === 'outbound' ? 'IDA' : 'VUELTA'}`"
        :value="formatCurrency(subtotal)"
        :custom-class="{
          label: 'text-base text-primary font-semibold',
          value: 'text-lg font-semibold text-primary',
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseBadge from '@/shared/components/base/BaseBadge.vue';
import BaseButton from '@/shared/components/base/BaseButton.vue';
import BaseDivider from '@/shared/components/base/BaseDivider.vue';
import FerryRoute from '@/modules/ferry/components/FerryRoute.vue';
import SectionDetails from '@/shared/components/SectionDetails.vue';
import LabelValue from '@/shared/components/LabelValue.vue';
import ClockIcon from '@/shared/icons/ClockIcon.vue';
import { formatCurrency } from '@/shared/utils/currency.utils.ts';
import { formatDate } from '@/shared/utils/date.utils.ts';
import { DATE_FORMATS } from '@/shared/constants/date-formats.constants.ts';
import { computed } from 'vue';

interface Stop {
  time: string;
  port: string;
  island: string;
}

interface DetailItem {
  label: string;
  value: string;
}

const props = withDefaults(
  defineProps<{
    type?: 'outbound' | 'inbound';
    date: string;
    origin: Stop;
    destination: Stop;
    duration: string;
    badges: string[];
    details: DetailItem[];
    subtotal: number;
    passengerCount: number;
  }>(),
  {
    type: 'outbound',
  },
);

defineEmits<{ change: [] }>();

const dateLabel = computed(() => formatDate(props.date, DATE_FORMATS.DISPLAY_LONG));
</script>
