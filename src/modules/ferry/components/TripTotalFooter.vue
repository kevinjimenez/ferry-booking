<template>
  <div class="flex flex-col w-full border border-gray-200 rounded-sm shadow-sm bg-white p-5 gap-y-4">
    <div class="flex justify-between items-center p-5">
      <span class="text-base font-semibold text-primary">{{ label }}</span>
      <span class="text-[40px] font-extrabold text-secondary">{{ formatCurrency(total) }}</span>
    </div>
  </div>
  <BaseButton :loading="loading" :suffix-icon="ArrowRightDashedIcon" @click="$emit('continue')" height="h-[4.5rem]">
    <span class="text-sm font-bold">{{ buttonLabel ?? $t('ferry.tripTotalFooter.continueButton') }}</span>
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/shared/components/ui/BaseButton.vue';
import ArrowRightDashedIcon from '@/shared/icons/ArrowRightDashedIcon.vue';
import { formatCurrency } from '@/shared/utils/currency.utils.ts';

withDefaults(
  defineProps<{
    label: string;
    total: number;
    buttonLabel?: string;
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);

defineEmits<{ continue: [] }>();
</script>
