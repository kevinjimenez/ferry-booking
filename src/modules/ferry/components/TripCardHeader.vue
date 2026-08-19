<template>
  <div class="flex justify-between items-start gap-x-4 px-5 py-4">
    <div class="flex items-center gap-x-3">
      <span
        class="shrink-0 inline-flex items-center px-3 py-1 rounded text-xs font-bold bg-gray-900 text-white uppercase">
        {{ type === 'outbound' ? $t('ferry.tripCardHeader.outbound') : $t('ferry.tripCardHeader.inbound') }}
      </span>
      <span class="text-sm text-gray-700 font-semibold capitalize">{{ dateLabel }}</span>
    </div>
    <button class="shrink-0 text-sm underline text-gray-700 mt-0.5 font-bold" @click="$emit('change')">
      {{ $t('ferry.tripCardHeader.change') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatDate } from '@/shared/utils/date.utils.ts';
import { DATE_FORMATS } from '@/shared/constants/date-formats.constants.ts';

const props = withDefaults(
  defineProps<{
    type?: 'outbound' | 'inbound';
    date: string;
  }>(),
  {
    type: 'outbound',
  },
);

defineEmits<{ change: [] }>();

const dateLabel = computed(() => formatDate(props.date, DATE_FORMATS.DISPLAY_LONG));
</script>
